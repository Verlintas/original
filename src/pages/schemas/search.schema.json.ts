import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  return new Response(
    JSON.stringify(
      {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: new URL('/schemas/search.schema.json', site).href,
        title: 'Original full-text search corpus',
        type: 'object',
        required: ['generated', 'docs'],
        properties: {
          generated: { type: 'string', format: 'date-time' },
          docs: {
            type: 'array',
            items: {
              type: 'object',
              required: ['id', 'title', 'category', 'url', 'text'],
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                category: { type: 'string' },
                date: { type: 'string', format: 'date' },
                size: { type: 'string' },
                license: { type: 'string' },
                sha256: { type: ['string', 'null'] },
                tags: { type: 'array', items: { type: 'string' } },
                summary: { type: 'string' },
                url: { type: 'string' },
                download: { type: ['string', 'null'] },
                source: { type: ['string', 'null'] },
                text: { type: 'string' },
              },
            },
          },
        },
      },
      null,
      2,
    ),
    {
      headers: {
        'Content-Type': 'application/schema+json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
