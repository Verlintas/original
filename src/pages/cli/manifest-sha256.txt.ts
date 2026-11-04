import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { createHash } from 'node:crypto';
import { manifestTsv } from '../../utils/manifest';
import { textResponse } from '../../utils/cli-text';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );
  const tsv = await manifestTsv(files, site);
  const hash = createHash('sha256').update(tsv).digest('hex');
  return textResponse([`${hash}  manifest.tsv`]);
}
