import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const files = await getCollection('files');
  const notes = await getCollection('notes');

  const items = [
    ...notes.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: `/notes/${entry.id}/`,
    })),
    ...files.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: `/files/${entry.id}/`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Original',
    description: 'A plain place for files, notes, and things worth keeping.',
    site: context.site!,
    items,
    customData: '<language>en</language>',
  });
}
