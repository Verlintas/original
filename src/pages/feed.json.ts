import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );

  const body = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Original',
    home_page_url: new URL('/', site).href,
    feed_url: new URL('/feed.json', site).href,
    description: 'Files, standards, policies, and tools from Original.',
    language: 'en',
    items: files.map((entry) => ({
      id: new URL(`/files/${entry.id}/`, site).href,
      url: new URL(`/files/${entry.id}/`, site).href,
      title: entry.data.title,
      summary: entry.data.summary,
      content_text: [entry.data.summary, '', ...(entry.data.tags ?? [])].join('\n'),
      date_published: entry.data.date.toISOString(),
      tags: entry.data.tags ?? [],
      attachments: entry.data.file
        ? [
            {
              url: new URL(entry.data.file, site).href,
              mime_type: 'text/plain',
              title: entry.data.title,
            },
          ]
        : [],
    })),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
