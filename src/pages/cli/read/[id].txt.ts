import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { TEXT_HEADERS } from '../../../utils/cli-text';

export async function getStaticPaths() {
  const files = await getCollection('files');
  return files.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
}

export async function GET(context: APIContext) {
  const entry = context.props.entry as CollectionEntry<'files'>;

  if (!entry.data.file) {
    return new Response('This file is not mirrored on this site.\n', { headers: TEXT_HEADERS });
  }

  try {
    const abs = path.join(process.cwd(), 'public', entry.data.file);
    const text = await readFile(abs, 'utf8');
    return new Response(text, { headers: TEXT_HEADERS });
  } catch {
    return new Response('Could not read this file.\n', { status: 500, headers: TEXT_HEADERS });
  }
}
