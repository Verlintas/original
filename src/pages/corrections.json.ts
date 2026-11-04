import type { APIContext } from 'astro';
import { corrections } from '../data/corrections';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  return new Response(
    JSON.stringify(
      {
        generated: new Date().toISOString(),
        page: new URL('/guides/transparency/', site).href,
        corrections,
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
