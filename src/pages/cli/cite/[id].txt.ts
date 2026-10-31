import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { citationFor, textResponse } from '../../../utils/cli-text';

export async function getStaticPaths() {
  const files = await getCollection('files');
  return files.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const entry = context.props.entry as CollectionEntry<'files'>;
  const url = (pathname: string) => new URL(pathname, site).href;
  const plain = citationFor(entry, site);

  const lines = [
    `CITATION — ${entry.data.title}`,
    '',
    'plain:',
    plain,
    '',
    'markdown:',
    `[${entry.data.title}](${url(`/files/${entry.id}/`)}) — Original, v${entry.data.version}, ${entry.data.date instanceof Date ? entry.data.date.toISOString().slice(0, 10) : entry.data.date}.${entry.data.sha256 ? ` SHA-256: ${entry.data.sha256}.` : ''}`,
    '',
    'fields:',
    `  title: ${entry.data.title}`,
    `  version: ${entry.data.version}`,
    `  date: ${entry.data.date instanceof Date ? entry.data.date.toISOString().slice(0, 10) : entry.data.date}`,
    `  url: ${url(`/files/${entry.id}/`)}`,
    `  sha256: ${entry.data.sha256 ?? ''}`,
    `  license: ${entry.data.license}`,
  ];

  return textResponse(lines);
}
