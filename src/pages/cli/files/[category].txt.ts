import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { filesBody, textResponse } from '../../../utils/cli-text';

export async function getStaticPaths() {
  return ['licenses', 'headers', 'policies', 'governance'].map((category) => ({
    params: { category },
  }));
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const category = String(context.params.category).toUpperCase();
  const files = (await getCollection('files')).filter(
    (entry) => entry.data.category === category,
  );
  return textResponse([`ORIGINAL — FILES / ${category} (${files.length})`, '', ...filesBody(files, site)]);
}
