import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  return new Response(
    JSON.stringify(
      {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: new URL('/schemas/data.schema.json', site).href,
        title: 'Original public dataset',
        type: 'object',
        required: ['id', 'title', 'summary', 'source', 'license', 'updated', 'columns', 'rows'],
        properties: {
          $schema: { type: 'string', format: 'uri' },
          generated: { type: 'string', format: 'date-time' },
          id: { type: 'string' },
          title: { type: 'string' },
          summary: { type: 'string' },
          source: { type: 'string', format: 'uri' },
          license: { type: 'string' },
          updated: { type: 'string', format: 'date' },
          page: { type: 'string', format: 'uri' },
          csv: { type: 'string', format: 'uri' },
          columns: { type: 'array', items: { type: 'string' } },
          rows: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: { type: ['string', 'number', 'boolean', 'null'] },
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
