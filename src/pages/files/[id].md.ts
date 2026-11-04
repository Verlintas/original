import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { formatDate } from '../../utils/format';

export async function getStaticPaths() {
  const files = await getCollection('files');
  return files.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const entry = context.props.entry as CollectionEntry<'files'>;
  const { data } = entry;

  let text = '';
  if (data.file) {
    try {
      text = await readFile(path.join(process.cwd(), 'public', data.file), 'utf8');
    } catch {
      text = '';
    }
  }

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(data.title)}`,
    `category: ${data.category}`,
    `date: ${formatDate(data.date)}`,
    `version: ${JSON.stringify(data.version)}`,
    `format: ${JSON.stringify(data.format)}`,
    `size: ${JSON.stringify(data.size)}`,
    `license: ${JSON.stringify(data.license)}`,
    ...(data.sha256 ? [`sha256: ${data.sha256}`] : []),
    ...(data.source ? [`source: ${JSON.stringify(data.source)}`] : []),
    ...(data.file ? [`download: ${JSON.stringify(new URL(data.file, site).href)}`] : []),
    ...(data.external ? [`external: ${JSON.stringify(data.external)}`] : []),
    `tags: ${JSON.stringify(data.tags ?? [])}`,
    `summary: ${JSON.stringify(data.summary)}`,
    `canonical: ${JSON.stringify(new URL(`/files/${entry.id}/`, site).href)}`,
    '---',
  ].join('\n');

  const body = [
    frontmatter,
    '',
    `# ${data.title}`,
    '',
    data.summary,
    '',
    ...(text ? ['## TEXT', '', text.trimEnd(), ''] : []),
    ...(!text && data.external ? ['## EXTERNAL', '', data.external, ''] : []),
    '## SOURCE',
    '',
    data.source ?? 'Original',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
