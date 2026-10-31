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
  const categories = ['LICENSES', 'HEADERS', 'POLICIES', 'GOVERNANCE', 'AGENTS'];
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

export function citationFor(entry: CollectionEntry<'files'>, site: URL): string {
  const page = new URL(`/files/${entry.id}/`, site).href;
  const parts = [
    `${entry.data.title} (v${entry.data.version}, ${formatDate(entry.data.date)}).`,
    'Original.',
    page,
  ];
  if (entry.data.sha256) parts.push(`SHA-256: ${entry.data.sha256}.`);
  if (entry.data.source) parts.push(`Source: ${entry.data.source}.`);
  return parts.join(' ');
}

export function relatedFor(
  entry: CollectionEntry<'files'>,
  all: CollectionEntry<'files'>[],
  limit = 3,
): CollectionEntry<'files'>[] {
  const tags = new Set(entry.data.tags ?? []);
  return all
    .filter((candidate) => candidate.id !== entry.id)
    .map((candidate) => {
      const shared = (candidate.data.tags ?? []).filter((tag) => tags.has(tag)).length;
      const sameCategory = candidate.data.category === entry.data.category ? 1 : 0;
      return { candidate, score: shared * 2 + sameCategory };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.data.title.localeCompare(b.candidate.data.title))
    .slice(0, limit)
    .map((item) => item.candidate);
}
