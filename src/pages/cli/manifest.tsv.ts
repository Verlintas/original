import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { manifestTsv } from '../../utils/manifest';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );
  const tsv = await manifestTsv(files, site);

  return new Response(tsv, {
    headers: {
      'Content-Type': 'text/tab-separated-values; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
