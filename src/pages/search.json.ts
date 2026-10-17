import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function GET() {
  const files = await getCollection('files');
  const docs = [];

  for (const entry of files) {
    if (!entry.data.file) continue;
    if (!entry.data.format.toUpperCase().includes('TXT')) continue;

    let text = '';
    try {
      const abs = path.join(process.cwd(), 'public', entry.data.file);
      text = await readFile(abs, 'utf8');
    } catch {
      text = '';
    }
    if (!text) continue;

    docs.push({
      id: entry.id,
      title: entry.data.title,
      category: entry.data.category,
      tags: entry.data.tags ?? [],
      summary: entry.data.summary,
      url: `/files/${entry.id}/`,
      download: entry.data.file,
      text,
    });
  }

  return new Response(JSON.stringify({ generated: new Date().toISOString(), docs }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
