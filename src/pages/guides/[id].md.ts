import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { formatDate } from '../../utils/format';

export async function getStaticPaths() {
  const guides = await getCollection('guides');
  return guides.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const entry = context.props.entry as CollectionEntry<'guides'>;
  const raw = await readFile(path.join(process.cwd(), 'src/content/guides', `${entry.id}.md`), 'utf8');
  const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '').trim();

  const combined = [
    '---',
    `title: ${JSON.stringify(entry.data.title)}`,
    `summary: ${JSON.stringify(entry.data.summary)}`,
    `audience: ${JSON.stringify(entry.data.audience)}`,
    `updated: ${formatDate(entry.data.updated)}`,
    `readingTime: ${JSON.stringify(entry.data.readingTime)}`,
    `tags: ${JSON.stringify(entry.data.tags)}`,
    `canonical: ${JSON.stringify(new URL(`/guides/${entry.id}/`, site).href)}`,
    '---',
    '',
    `# ${entry.data.title}`,
    '',
    entry.data.summary,
    '',
    body,
    '',
  ].join('\n');

  return new Response(combined, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
