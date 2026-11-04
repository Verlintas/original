import type { CollectionEntry } from 'astro:content';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { formatDate } from './format';

export async function manifestRows(
  files: CollectionEntry<'files'>[],
  site: URL,
): Promise<string[][]> {
  return Promise.all(
    files.map(async (entry) => {
      let bytes = '';
      if (entry.data.file) {
        try {
          bytes = String(
            (await stat(path.join(process.cwd(), 'public', entry.data.file))).size,
          );
        } catch {
          bytes = '';
        }
      }
      return [
        entry.id,
        entry.data.category,
        entry.data.title,
        formatDate(entry.data.date),
        entry.data.version,
        entry.data.format,
        entry.data.size,
        bytes,
        entry.data.license,
        entry.data.sha256 ?? '',
        new URL(`/files/${entry.id}/`, site).href,
        entry.data.file ? new URL(entry.data.file, site).href : '',
        entry.data.source ?? '',
        (entry.data.tags ?? []).join(','),
      ];
    }),
  );
}

export async function manifestTsv(
  files: CollectionEntry<'files'>[],
  site: URL,
): Promise<string> {
  const header = [
    'id',
    'category',
    'title',
    'date',
    'version',
    'format',
    'size',
    'bytes',
    'license',
    'sha256',
    'page',
    'download',
    'source',
    'tags',
  ];
  const rows = await manifestRows(files, site);
  return [header.join('\t'), ...rows.map((row) => row.join('\t'))].join('\n') + '\n';
}
