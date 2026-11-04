import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { formatDate } from '../utils/format';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const guides = (await getCollection('guides')).sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );

  const body = {
    generated: new Date().toISOString(),
    site: new URL('/', site).href,
    guides: guides.map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      summary: entry.data.summary,
      audience: entry.data.audience,
      updated: formatDate(entry.data.updated),
      readingTime: entry.data.readingTime,
      tags: entry.data.tags,
      url: new URL(`/guides/${entry.id}/`, site).href,
      markdown: new URL(`/guides/${entry.id}.md`, site).href,
    })),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
