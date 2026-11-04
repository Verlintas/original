import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  return new Response(
    JSON.stringify(
      {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: new URL('/schemas/resources.schema.json', site).href,
        title: 'Original resource inventory',
        type: 'object',
        required: ['generated', 'site', 'total', 'categories', 'resources'],
        properties: {
          generated: { type: 'string', format: 'date-time' },
          site: { type: 'string', format: 'uri' },
          description: { type: 'string' },
          total: { type: 'integer', minimum: 0 },
          categories: {
            type: 'array',
            items: {
              type: 'object',
              required: ['name', 'count'],
              properties: {
                name: { type: 'string' },
                count: { type: 'integer', minimum: 0 },
              },
            },
          },
          note: { type: 'string' },
          resources: {
            type: 'array',
            items: {
              type: 'object',
              required: ['id', 'title', 'category', 'page', 'official'],
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                category: { type: 'string' },
                date: { type: 'string', format: 'date' },
                version: { type: 'string' },
                format: { type: 'string' },
                size: { type: 'string' },
                license: { type: 'string' },
                sha256: { type: ['string', 'null'] },
                tags: { type: 'array', items: { type: 'string' } },
                summary: { type: 'string' },
                page: { type: 'string', format: 'uri' },
                download: { type: ['string', 'null'] },
                external: { type: ['string', 'null'] },
                source: { type: ['string', 'null'] },
                official: { type: 'boolean' },
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
