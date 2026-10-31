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
    '/cli/sitemap.txt',
    '/cli/tools.txt',
    '/cli/links.txt',
    '/cli/stats.txt',
    '/cli/about.txt',
    '/cli/licenses.json',
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
