import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { sections } from '../../data/sections';
import { tools } from '../../data/tools';
import { textResponse } from '../../utils/cli-text';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const url = (pathname: string) => new URL(pathname, site).href;
  const files = (await getCollection('files')).sort(
    (a, b) => a.data.title.localeCompare(b.data.title),
  );

  const lines = ['# Original — plain-text sitemap', `# Generated ${new Date().toISOString()}`, ''];

  for (const section of sections) {
    lines.push(`PAGE\t${url(section.path)}\t${section.name}\t${section.description}`);
  }
  for (const page of [
    ['/search/', 'SEARCH', 'Full-text search across every text file and guide.'],
    ['/guides/', 'GUIDES', 'Plain-language guides.'],
    ['/guides/paths/', 'PATHS', 'Learning paths by audience.'],
    ['/guides/checklists/', 'CHECKLISTS', 'Public checklists.'],
    ['/guides/letters/', 'LETTERS', 'Letter templates.'],
    ['/guides/directory/', 'DIRECTORY', 'Public source directory.'],
    ['/guides/transparency/', 'TRANSPARENCY', 'Editorial policy and corrections.'],
    ['/data/', 'DATA', 'Public datasets.'],
    ['/downloads/', 'DOWNLOADS', 'Library and category archives.'],
    ['/contribute/', 'CONTRIBUTE', 'How to contribute.'],
    ['/embed/', 'EMBED', 'Embeddable tools.'],
    ['/status/sources/', 'SOURCE HEALTH', 'Latest source check.'],
    ['/files/kits/', 'KITS', 'Curated downloadable bundles.'],
    ['/files/recent/', 'RECENT', 'Every file, newest first.'],
    ['/feed.json', 'FEED', 'JSON Feed 1.1.'],
    ['/privacy/', 'PRIVACY', 'Privacy policy.'],
    ['/security/', 'SECURITY', 'Security policy.'],
    ['/license/', 'LICENSE', 'Site license.'],
    ['/accessibility/', 'ACCESSIBILITY', 'Accessibility statement.'],
  ]) {
    lines.push(`PAGE\t${url(page[0])}\t${page[1]}\t${page[2]}`);
  }

  lines.push('');
  for (const tool of tools) {
    lines.push(`TOOL\t${url(tool.url)}\t${tool.name}\t${tool.description}`);
  }

  lines.push('');
  for (const entry of files) {
    lines.push(`FILE\t${url(`/files/${entry.id}/`)}\t${entry.id}\t${entry.data.title}`);
    if (entry.data.file) lines.push(`DOWNLOAD\t${url(entry.data.file)}\t${entry.id}`);
  }

  lines.push('');
  for (const endpoint of [
    '/AGENTS.md',
    '/cli/manual.txt',
    '/cli/commands.json',
    '/cli/ls.txt',
    '/cli/tree.txt',
    '/cli/files.txt',
    '/cli/cat/<id>.txt',
    '/cli/read/<id>.txt',
    '/cli/context/<id>.txt',
    '/cli/cite/<id>.txt',
    '/cli/manifest.tsv',
    '/cli/manifest-sha256.txt',
    '/kits/index.json',
    '/feed.json',
    '/files/<id>.md',
    '/guides.json',
    '/data/index.json',
    '/data/<id>.json',
    '/data/<id>.csv',
    '/guides/<id>.md',
    '/guides/directory.json',
    '/guides/letters.json',
    '/guides/checklists.json',
    '/downloads/index.json',
    '/corrections.json',
    '/opensearch.xml',
    '/status/sources.json',
    '/openapi.json',
    '/llms-full.txt',
    '/llms-small.txt',
    '/schemas/index.schema.json',
    '/schemas/resources.schema.json',
    '/schemas/search.schema.json',
    '/schemas/licenses.schema.json',
    '/cli/sitemap.txt',
    '/cli/tools.txt',
    '/cli/links.txt',
    '/cli/stats.txt',
    '/cli/about.txt',
    '/cli/licenses.json',
    '/cli/resources.json',
    '/index.json',
    '/search.json',
    '/llms.txt',
    '/.well-known/security.txt',
    '/rss.xml',
    '/sitemap-index.xml',
  ]) {
    lines.push(`API\t${endpoint.startsWith('/cli/<') || endpoint.includes('<') ? endpoint : url(endpoint)}`);
  }

  return textResponse(lines);
}
