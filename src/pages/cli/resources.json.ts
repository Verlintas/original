import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { formatDate } from '../../utils/format';

const categoryOrder = [
  'LICENSES',
  'STANDARDS',
  'SNIPPETS',
  'HEADERS',
  'POLICIES',
  'GOVERNANCE',
  'AGENTS',
];

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const files = await getCollection('files');

  const resources = files
    .map((entry) => {
      const tags = entry.data.tags ?? [];
      return {
        id: entry.id,
        title: entry.data.title,
        category: entry.data.category,
        date: formatDate(entry.data.date),
        version: entry.data.version,
        format: entry.data.format,
        size: entry.data.size,
        license: entry.data.license,
        sha256: entry.data.sha256 ?? null,
        tags,
        summary: entry.data.summary,
        page: new URL(`/files/${entry.id}/`, site).href,
        download: entry.data.file ? new URL(entry.data.file, site).href : null,
        external: entry.data.external ?? null,
        source: entry.data.source ?? null,
        official: tags.includes('OFFICIAL') || entry.data.license === 'CANONICAL TEXT',
      };
    })
    .sort(
      (a, b) =>
        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
        a.title.localeCompare(b.title),
    );

  const categories = categoryOrder
    .map((name) => ({
      name,
      count: resources.filter((resource) => resource.category === name).length,
    }))
    .filter((category) => category.count > 0);

  const body = {
    $schema: new URL('/schemas/resources.schema.json', site).href,
    generated: new Date().toISOString(),
    site: site.href,
    description:
      'Inventory of every file on Original, grouped by category, with official-source flags, checksums, and download URLs.',
    total: resources.length,
    categories,
    note:
      'official=true means the entry is a canonical third-party text or is tagged OFFICIAL. Templates authored for this site are official=false.',
    resources,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
