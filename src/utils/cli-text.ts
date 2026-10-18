import type { CollectionEntry } from 'astro:content';
import { formatDate } from './format';

export const TEXT_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};

export const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};

export function textResponse(lines: string[]): Response {
  return new Response(lines.join('\n').trimEnd() + '\n', { headers: TEXT_HEADERS });
}

function absolute(pathname: string, site: URL): string {
  return new URL(pathname, site).href;
}

export function fileBlock(entry: CollectionEntry<'files'>, site: URL): string[] {
  const lines = [
    `  ◯ ${entry.data.title}`,
    `    id:       ${entry.id}`,
    `    category: ${entry.data.category}`,
    `    date:     ${formatDate(entry.data.date)}`,
    `    size:     ${entry.data.size}`,
    `    page:     ${absolute(`/files/${entry.id}/`, site)}`,
  ];
  if (entry.data.sha256) lines.push(`    sha256:   ${entry.data.sha256}`);
  if (entry.data.license) lines.push(`    license:  ${entry.data.license}`);
  if (entry.data.tags?.length) lines.push(`    tags:     ${entry.data.tags.join(', ')}`);
  if (entry.data.file) lines.push(`    download: ${absolute(entry.data.file, site)}`);
  if (entry.data.external) lines.push(`    mirror:   ${entry.data.external}`);
  if (entry.data.source) lines.push(`    source:   ${entry.data.source}`);
  return lines;
}

export function filesBody(entries: CollectionEntry<'files'>[], site: URL): string[] {
  const lines: string[] = [];
  const categories = ['LICENSES', 'HEADERS', 'POLICIES', 'GOVERNANCE'];
  for (const category of categories) {
    const items = entries.filter((entry) => entry.data.category === category);
    if (!items.length) continue;
    lines.push(`${category} (${items.length})`);
    for (const entry of items) {
      lines.push(...fileBlock(entry, site));
      lines.push('');
    }
  }
  lines.push(`TOTAL: ${entries.length} files`);
  return lines;
}
