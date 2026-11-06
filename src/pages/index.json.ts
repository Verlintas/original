import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { links } from '../data/links';
import { sites } from '../data/sites';
import { tools } from '../data/tools';
import { sections } from '../data/sections';
import { formatDate } from '../utils/format';
import { buildInfo } from '../data/build-info';
import kitData from '../data/kits.json';
import { publicData } from '../data/public-data';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const guides = (await getCollection('guides')).sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
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
    $schema: new URL('/schemas/index.schema.json', site).href,
    name: 'Original',
    contact: 'contact@original.wales',
    site: site.href,
    description: 'A cornerstone for files, references, and tools.',
    generated: new Date().toISOString(),
    build: buildInfo,
    sections,
    sites: sites.map((entry) => ({ name: entry.name, url: entry.url, note: entry.note })),
    tools: tools.map((tool) => ({
      id: tool.id,
      name: tool.name,
      url: tool.url,
      description: tool.description,
    })),
    files: filesWithBytes,
    guides: guides.map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      summary: entry.data.summary,
      audience: entry.data.audience,
      updated: formatDate(entry.data.updated),
      readingTime: entry.data.readingTime,
      tags: entry.data.tags,
      url: `/guides/${entry.id}/`,
      markdown: `/guides/${entry.id}.md`,
    })),
    data: publicData.map((dataset) => ({
      id: dataset.id,
      title: dataset.title,
      summary: dataset.summary,
      source: dataset.source,
      license: dataset.license,
      updated: dataset.updated,
      rows: dataset.rows.length,
      page: `/data/${dataset.id}/`,
      json: `/data/${dataset.id}.json`,
      csv: `/data/${dataset.id}.csv`,
    })),
    links: links.map((link) => ({ name: link.name, url: link.url, note: link.note })),
    kits: kitData.kits.map((kit) => ({
      id: kit.id,
      name: kit.name,
      summary: kit.summary,
      page: `/files/kits/${kit.id}/`,
      download: `/kits/${kit.id}.zip`,
      files: kit.files,
    })),
    machine: {
      cli: '/cli/',
      cliHelp: '/cli/help.txt',
      cliList: '/cli/ls.txt',
      cliTree: '/cli/tree.txt',
      cliFiles: '/cli/files.txt',
      cliStats: '/cli/stats.txt',
      manual: '/cli/manual.txt',
      agents: '/AGENTS.md',
      commands: '/cli/commands.json',
      manifest: '/cli/manifest.tsv',
      sitemapText: '/cli/sitemap.txt',
      context: '/cli/context/<id>.txt',
      cite: '/cli/cite/<id>.txt',
      licenses: '/cli/licenses.json',
      resources: '/cli/resources.json',
      manifestHash: '/cli/manifest-sha256.txt',
      kits: '/kits/index.json',
      kitsPage: '/files/kits/',
      guides: '/guides/',
      guidesJson: '/guides.json',
      data: '/data/',
      dataIndex: '/data/index.json',
      downloads: '/downloads/',
      downloadsIndex: '/downloads/index.json',
      directory: '/guides/directory/',
      directoryJson: '/guides/directory.json',
      letters: '/guides/letters/',
      lettersJson: '/guides/letters.json',
      checklists: '/guides/checklists/',
      corrections: '/corrections.json',
      opensearch: '/opensearch.xml',
      sourceHealth: '/status/sources.json',
      openapi: '/openapi.json',
      embed: '/embed/',
      contribute: '/contribute/',
      searchPage: '/search/',
      recent: '/files/recent/',
      feed: '/feed.json',
      llmsFull: '/llms-full.txt',
      llmsSmall: '/llms-small.txt',
      schemas: '/schemas/index.schema.json',
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
