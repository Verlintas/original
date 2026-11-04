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
    'PAGES',
    `  ${new URL('/search/', site).href} full-text search`,
    `  ${new URL('/guides/', site).href} guides`,
    `  ${new URL('/data/', site).href} public data`,
    `  ${new URL('/downloads/', site).href} downloads`,
    `  ${new URL('/contribute/', site).href} contribute`,
    `  ${new URL('/files/kits/', site).href} kit bundles`,
    `  ${new URL('/files/recent/', site).href} all files, newest first`,
    `  ${new URL('/privacy/', site).href} privacy`,
    `  ${new URL('/security/', site).href} security`,
    `  ${new URL('/license/', site).href} license`,
    `  ${new URL('/accessibility/', site).href} accessibility`,
    '',
    'MACHINE',
    `  ${new URL('/cli/manual.txt', site).href} manual for agents`,
    `  ${new URL('/AGENTS.md', site).href}       agent onboarding`,
    `  ${new URL('/cli/help.txt', site).href}    command list and endpoints`,
    `  ${new URL('/cli/files.txt', site).href}  every file`,
    `  ${new URL('/cli/resources.json', site).href} resource inventory`,
    `  ${new URL('/index.json', site).href}     JSON index`,
    `  ${new URL('/search.json', site).href}    full-text search data`,
    `  ${new URL('/llms-full.txt', site).href} full corpus`,
    `  ${new URL('/llms-small.txt', site).href} metadata corpus`,
    `  ${new URL('/kits/index.json', site).href} kit bundles`,
    `  ${new URL('/cli/manifest-sha256.txt', site).href} manifest checksum`,
    `  ${new URL('/schemas/index.schema.json', site).href} JSON schemas`,
    `  ${new URL('/feed.json', site).href}    JSON Feed`,
  );
  return textResponse(lines);
}
