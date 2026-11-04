import type { APIContext } from 'astro';
import { directory, directoryCategories } from '../../data/directory';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  return new Response(
    JSON.stringify(
      {
        generated: new Date().toISOString(),
        page: new URL('/guides/directory/', site).href,
        categories: directoryCategories,
        entries: directory,
      },
      null,
      2,
    ),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
