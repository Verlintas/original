import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { formatDate } from '../../utils/format';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );

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

  const rows = await Promise.all(
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
      ].join('\t');
    }),
  );

  return new Response([header.join('\t'), ...rows].join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/tab-separated-values; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
