import { getCollection } from 'astro:content';
import { textResponse } from '../../utils/cli-text';

export async function GET() {
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );
  const categories = ['licenses', 'standards', 'snippets', 'headers', 'policies', 'governance', 'agents'];
  const lines = ['/', '  files/'];

  for (const category of categories) {
    const items = files.filter((entry) => entry.data.category.toLowerCase() === category);
    if (!items.length) continue;
    lines.push(`    ${category}/`);
    for (const entry of items) {
      const name = entry.data.file ? entry.data.file.split('/').pop() : entry.id;
      lines.push(`      ${name}`);
    }
  }

  lines.push(
    '    kits/',
    '  guides/',
    '  data/',
    '  downloads/',
    '  search/',
    '  index.json',
    '  search.json',
    '  feed.json',
    '  llms.txt',
    '  llms-small.txt',
    '  llms-full.txt',
    '  rss.xml',
    '',
    `TOTAL: ${files.length} files`,
  );
  return textResponse(lines);
}
