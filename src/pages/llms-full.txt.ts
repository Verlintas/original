import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { formatDate } from '../utils/format';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );

  const lines = [
    '# Original — full corpus',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Site: ${new URL('/', site).href}`,
    `Files: ${files.length}`,
    '',
    'Every local text file, in full, with metadata and checksums.',
    'The metadata-only corpus is /llms-small.txt. The site index is /llms.txt.',
    '',
  ];

  for (const entry of files) {
    lines.push(
      `## ${entry.data.title}`,
      '',
      `id: ${entry.id}`,
      `category: ${entry.data.category}`,
      `date: ${formatDate(entry.data.date)}`,
      `version: ${entry.data.version}`,
      `format: ${entry.data.format}`,
      `size: ${entry.data.size}`,
      `license: ${entry.data.license}`,
      `tags: ${(entry.data.tags ?? []).join(', ')}`,
      `page: ${new URL(`/files/${entry.id}/`, site).href}`,
      `markdown: ${new URL(`/files/${entry.id}.md`, site).href}`,
      ...(entry.data.file ? [`download: ${new URL(entry.data.file, site).href}`] : []),
      ...(entry.data.source ? [`source: ${entry.data.source}`] : []),
      ...(entry.data.sha256 ? [`sha256: ${entry.data.sha256}`] : []),
      '',
      entry.data.summary,
      '',
      '--- BEGIN CONTENT ---',
    );

    if (entry.data.file) {
      try {
        const abs = path.join(process.cwd(), 'public', entry.data.file);
        lines.push((await readFile(abs, 'utf8')).trimEnd());
      } catch {
        lines.push('(content unavailable)');
      }
    } else if (entry.data.external) {
      lines.push(`External only: ${entry.data.external}`);
    } else {
      lines.push('(no content mirror)');
    }

    lines.push('--- END CONTENT ---', '');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
