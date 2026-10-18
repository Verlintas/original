import type { APIContext } from 'astro';
import { sections } from '../../data/sections';
import { textResponse } from '../../utils/cli-text';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const lines = ['ORIGINAL — sections', ''];
  for (const section of sections) {
    lines.push(`  ${new URL(section.path, site).href.padEnd(42)} ${section.name} — ${section.description}`);
  }
  lines.push(
    '',
    'MACHINE',
    `  ${new URL('/cli/help.txt', site).href}   command list and endpoints`,
    `  ${new URL('/cli/files.txt', site).href}  every file`,
    `  ${new URL('/index.json', site).href}     JSON index`,
    `  ${new URL('/search.json', site).href}    full-text search data`,
  );
  return textResponse(lines);
}
