import { getCollection } from 'astro:content';
import { textResponse } from '../../utils/cli-text';

export async function GET() {
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );
  const categories = ['licenses', 'headers', 'policies', 'governance'];
  const lines = ['/'];

  for (const category of categories) {
    const items = files.filter((entry) => entry.data.category.toLowerCase() === category);
    if (!items.length) continue;
    lines.push(`  files/`, `    ${category}/`);
    for (const entry of items) {
      const name = entry.data.file ? entry.data.file.split('/').pop() : entry.id;
      lines.push(`      ${name}`);
    }
  }

  lines.push(
    '  index.json',
    '  search.json',
    '  llms.txt',
    '  rss.xml',
    '',
    `TOTAL: ${files.length} files`,
  );
  return textResponse(lines);
}
