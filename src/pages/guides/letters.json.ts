import type { APIContext } from 'astro';
import { letters } from '../../data/letters';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  return new Response(
    JSON.stringify(
      {
        generated: new Date().toISOString(),
        page: new URL('/guides/letters/', site).href,
        letters: letters.map((letter) => ({
          id: letter.id,
          title: letter.title,
          summary: letter.summary,
          audience: letter.audience,
          fields: letter.fields,
          url: new URL(`/guides/letters/${letter.id}/`, site).href,
        })),
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
