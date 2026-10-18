import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { filesBody, textResponse } from '../../utils/cli-text';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );
  return textResponse([`ORIGINAL — FILES (${files.length})`, '', ...filesBody(files, site)]);
}
