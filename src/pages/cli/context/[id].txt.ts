import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { citationFor, relatedFor, textResponse } from '../../../utils/cli-text';
import { formatDate } from '../../../utils/format';

export async function getStaticPaths() {
  const files = await getCollection('files');
  return files.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const entry = context.props.entry as CollectionEntry<'files'>;
  const all = await getCollection('files');
  const related = relatedFor(entry, all);
  const url = (pathname: string) => new URL(pathname, site).href;

  const lines = [
    `# CONTEXT PACK — ${entry.data.title}`,
    `# Generated ${new Date().toISOString()}`,
    '',
    `id: ${entry.id}`,
    `title: ${entry.data.title}`,
    `category: ${entry.data.category}`,
    `date: ${formatDate(entry.data.date)}`,
    `version: ${entry.data.version}`,
    `format: ${entry.data.format}`,
    `size: ${entry.data.size}`,
    `license: ${entry.data.license}`,
    `tags: ${(entry.data.tags ?? []).join(', ')}`,
    `page: ${url(`/files/${entry.id}/`)}`,
  ];

  if (entry.data.sha256) lines.push(`sha256: ${entry.data.sha256}`);
  if (entry.data.source) lines.push(`source: ${entry.data.source}`);
  if (entry.data.file) lines.push(`download: ${url(entry.data.file)}`);
  if (entry.data.external) lines.push(`external: ${entry.data.external}`);

  lines.push('', 'summary:', entry.data.summary, '', 'citation:', citationFor(entry, site), '');

  if (related.length) {
    lines.push('related:');
    for (const item of related) {
      lines.push(`  - ${item.id}\t${item.data.title}\t${url(`/files/${item.id}/`)}`);
    }
    lines.push('');
  }

  lines.push('--- BEGIN CONTENT ---');

  if (entry.data.file) {
    try {
      const abs = path.join(process.cwd(), 'public', entry.data.file);
      const content = await readFile(abs, 'utf8');
      lines.push(content.trimEnd());
    } catch {
      lines.push('(content unavailable)');
    }
  } else if (entry.data.external) {
    lines.push(`External only. Download: ${entry.data.external}`);
  } else {
    lines.push('(no content mirror)');
  }

  lines.push('--- END CONTENT ---', '');

  return textResponse(lines);
}
