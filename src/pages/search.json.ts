import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { formatDate } from '../utils/format';
import { publicData } from '../data/public-data';

export async function GET(context: APIContext) {
  const files = await getCollection('files');
  const guides = await getCollection('guides');
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

  for (const dataset of publicData) {
    docs.push({
      id: 'data-' + dataset.id,
      title: dataset.title,
      category: 'DATA',
      date: dataset.updated,
      size: dataset.rows.length + ' rows',
      license: dataset.license,
      sha256: null,
      tags: ['DATA', ...dataset.columns],
      summary: dataset.summary,
      url: `/data/${dataset.id}/`,
      download: `/data/${dataset.id}.json`,
      source: dataset.source,
      text: [dataset.title, dataset.summary, ...dataset.columns, ...dataset.rows.map((row) => row.join(' '))].join('\n'),
    });
  }

  for (const entry of guides) {
    let text = '';
    try {
      text = await readFile(
        path.join(process.cwd(), 'src/content/guides', `${entry.id}.md`),
        'utf8',
      );
      text = text.replace(/^---\n[\s\S]*?\n---\n?/, '');
      text = text.replace(/^---\n[\s\S]*?\n---\n?/, '');
    } catch {
      text = '';
    }
    docs.push({
      id: entry.id,
      title: entry.data.title,
      category: 'GUIDE',
      date: formatDate(entry.data.updated),
      size: entry.data.readingTime,
      license: 'SITE TEXT',
      sha256: null,
      tags: entry.data.tags,
      summary: entry.data.summary,
      url: `/guides/${entry.id}/`,
      download: `/guides/${entry.id}.md`,
      source: null,
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
