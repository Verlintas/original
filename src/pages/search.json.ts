import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { formatDate } from '../utils/format';

export async function GET(context: APIContext) {
  const files = await getCollection('files');
  const docs = [];

  for (const entry of files) {
    let text = '';
    if (entry.data.file && entry.data.format.toUpperCase().includes('TXT')) {
      try {
        const abs = path.join(process.cwd(), 'public', entry.data.file);
        text = await readFile(abs, 'utf8');
      } catch {
        text = '';
      }
    }

    docs.push({
      id: entry.id,
      title: entry.data.title,
      category: entry.data.category,
      date: formatDate(entry.data.date),
      size: entry.data.size,
      license: entry.data.license,
      sha256: entry.data.sha256 ?? null,
      tags: entry.data.tags ?? [],
      summary: entry.data.summary,
      url: `/files/${entry.id}/`,
      download: entry.data.file,
      source: entry.data.source ?? null,
      text,
    });
  }

  return new Response(
    JSON.stringify({
      $schema: new URL('/schemas/search.schema.json', context.site ?? new URL('https://original.wales')).href,
      generated: new Date().toISOString(),
      docs,
    }), {

    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
