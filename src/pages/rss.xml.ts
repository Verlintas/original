import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );

  const items = files.map((entry) => ({
    title: entry.data.title,
    description: entry.data.summary,
    pubDate: entry.data.date,
    link: `/files/${entry.id}/`,
  }));

  return rss({
    title: 'Original',
    description: 'Files, status, tools, and other useful things.',
    site: context.site!,
    items,
    customData: '<language>en</language>',
  });
}
