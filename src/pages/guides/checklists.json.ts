import type { APIContext } from 'astro';
import { checklists } from '../../data/checklists';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  return new Response(
    JSON.stringify(
      {
        generated: new Date().toISOString(),
        page: new URL('/guides/checklists/', site).href,
        checklists: checklists.map((checklist) => ({
          ...checklist,
          url: new URL('/guides/checklists/', site).href + '#' + checklist.id,
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
