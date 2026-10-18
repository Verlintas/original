import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { fileBlock, textResponse } from '../../../utils/cli-text';

export async function getStaticPaths() {
  const files = await getCollection('files');
  return files.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const entry = context.props.entry as CollectionEntry<'files'>;
  return textResponse([
    entry.data.title,
    '='.repeat(entry.data.title.length),
    '',
    ...fileBlock(entry, site),
    '',
    'SUMMARY',
    entry.data.summary,
    '',
    `Full text: ${new URL(`/cli/read/${entry.id}.txt`, site).href}`,
  ]);
}
