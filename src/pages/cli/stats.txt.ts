import { getCollection } from 'astro:content';
import { createHash } from 'node:crypto';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { links } from '../../data/links';
import { tools } from '../../data/tools';
import { buildInfo } from '../../data/build-info';
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

  const corpusHash = createHash('sha256')
    .update(
      files
        .map((entry) => entry.data.sha256 ?? '')
        .sort()
        .join('\n'),
    )
    .digest('hex');

  const order = ['LICENSES', 'STANDARDS', 'SNIPPETS', 'HEADERS', 'POLICIES', 'GOVERNANCE', 'AGENTS'];
  const lines = [
    'ORIGINAL — STATS',
    '',
    `files:       ${files.length}`,
    ...order
      .filter((category) => counts[category])
      .map((category) => `${category.toLowerCase().padEnd(12)}${counts[category]}`),
    `links:       ${links.length}`,
    `tools:       ${tools.length}`,
    `total bytes: ${bytes}`,
    `corpus sha:  ${corpusHash}`,
    `commit:      ${buildInfo.commit ?? 'unknown'}`,
    `generated:   ${buildInfo.generated}`,
  ];
  return textResponse(lines);
}
