import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  return new Response(
    JSON.stringify(
      {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: new URL('/schemas/licenses.schema.json', site).href,
        title: 'Original license comparison matrix',
        type: 'object',
        required: ['generated', 'source', 'groups', 'features', 'licenses'],
        properties: {
          generated: { type: 'string', format: 'date-time' },
          source: { type: 'string', format: 'uri' },
          note: { type: 'string' },
          groups: { type: 'array', items: { type: 'string' } },
          features: {
            type: 'array',
            items: {
              type: 'object',
              required: ['group', 'key', 'label'],
              properties: {
                group: { type: 'string' },
                key: { type: 'string' },
                label: { type: 'string' },
              },
            },
          },
          defaults: { type: 'array', items: { type: 'string' } },
          values: { type: 'object' },
          licenses: {
            type: 'array',
            items: {
              type: 'object',
              required: ['id', 'name', 'spdx', 'slug', 'page', 'values'],
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                spdx: { type: 'string' },
                slug: { type: 'string' },
                page: { type: 'string', format: 'uri' },
                download: { type: ['string', 'null'] },
                sha256: { type: ['string', 'null'] },
                values: { type: 'object' },
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
