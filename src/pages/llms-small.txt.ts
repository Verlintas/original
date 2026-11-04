import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { formatDate } from '../utils/format';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const guides = (await getCollection('guides')).sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );

  const lines = [
    '# Original — file index (small)',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Site: ${new URL('/', site).href}`,
    `Files: ${files.length}`,
    `Guides: ${guides.length}`,
    '',
    'This is the metadata-only corpus. Full texts are in /llms-full.txt.',
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
    );
  }

  lines.push('', '## Guides', '');
  for (const entry of guides) {
    lines.push(
      `### ${entry.data.title}`,
      '',
      `id: ${entry.id}`,
      `audience: ${entry.data.audience}`,
      `updated: ${formatDate(entry.data.updated)}`,
      `readingtime: ${entry.data.readingTime}`,
      `tags: ${entry.data.tags.join(', ')}`,
      `url: ${new URL(`/guides/${entry.id}/`, site).href}`,
      `markdown: ${new URL(`/guides/${entry.id}.md`, site).href}`,
      '',
      entry.data.summary,
      '',
    );
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
