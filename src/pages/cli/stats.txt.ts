import { getCollection } from 'astro:content';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { links } from '../../data/links';
import { tools } from '../../data/tools';
import { textResponse } from '../../utils/cli-text';

export async function GET() {
  const files = await getCollection('files');
  const counts: Record<string, number> = {};
  let bytes = 0;

  for (const entry of files) {
    counts[entry.data.category] = (counts[entry.data.category] || 0) + 1;
    if (entry.data.file) {
      try {
        bytes += (await stat(path.join(process.cwd(), 'public', entry.data.file))).size;
      } catch {
        /* ignore missing files */
      }
    }
  }

  const lines = [
    'ORIGINAL — STATS',
    '',
    `files:       ${files.length}`,
    ...Object.entries(counts).map(
      ([category, count]) => `${category.toLowerCase().padEnd(12)}${count}`,
    ),
    `links:       ${links.length}`,
    `tools:       ${tools.length}`,
    `total bytes: ${bytes}`,
    `generated:   ${new Date().toISOString()}`,
  ];
  return textResponse(lines);
}
