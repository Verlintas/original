import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { links } from '../data/links';
import { sites } from '../data/sites';
import { tools } from '../data/tools';
import { sections } from '../data/sections';
import { formatDate } from '../utils/format';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );

  const filesWithBytes = await Promise.all(
    files.map(async (entry) => {
      let bytes: number | null = null;
      if (entry.data.file) {
        try {
          const abs = path.join(process.cwd(), 'public', entry.data.file);
          bytes = (await stat(abs)).size;
        } catch {
          bytes = null;
        }
      }
      return {
        id: entry.id,
        title: entry.data.title,
        category: entry.data.category,
        date: formatDate(entry.data.date),
        version: entry.data.version,
        format: entry.data.format,
        size: entry.data.size,
        bytes,
        license: entry.data.license,
        sha256: entry.data.sha256 ?? null,
        tags: entry.data.tags ?? [],
        summary: entry.data.summary,
        url: `/files/${entry.id}/`,
        download: entry.data.file ?? null,
        external: entry.data.external ?? null,
        source: entry.data.source ?? null,
      };
    }),
  );

  const body = {
    name: 'Original',
    contact: 'contact@original.wales',
    site: site.href,
    description: 'A cornerstone for files, references, and tools.',
    generated: new Date().toISOString(),
    sections,
    sites: sites.map((entry) => ({ name: entry.name, url: entry.url, note: entry.note })),
    tools: tools.map((tool) => ({
      id: tool.id,
      name: tool.name,
      url: tool.url,
      description: tool.description,
    })),
    files: filesWithBytes,
    links: links.map((link) => ({ name: link.name, url: link.url, note: link.note })),
    machine: {
      cli: '/cli/',
      cliHelp: '/cli/help.txt',
      cliList: '/cli/ls.txt',
      cliTree: '/cli/tree.txt',
      cliFiles: '/cli/files.txt',
      cliStats: '/cli/stats.txt',
      index: '/index.json',
      search: '/search.json',
      compare: '/universe/license-compare/',
      security: '/.well-known/security.txt',
      llms: '/llms.txt',
      rss: '/rss.xml',
    },
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
