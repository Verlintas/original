import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  return new Response(
    JSON.stringify(
      {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: new URL('/schemas/index.schema.json', site).href,
        title: 'Original index',
        type: 'object',
        required: ['name', 'contact', 'site', 'generated', 'files', 'machine'],
        properties: {
          name: { type: 'string' },
          contact: { type: 'string' },
          site: { type: 'string', format: 'uri' },
          description: { type: 'string' },
          generated: { type: 'string', format: 'date-time' },
          sections: { type: 'array', items: { $ref: '#/$defs/section' } },
          sites: { type: 'array', items: { type: 'object' } },
          tools: { type: 'array', items: { $ref: '#/$defs/tool' } },
          files: { type: 'array', items: { $ref: '#/$defs/file' } },
          links: { type: 'array', items: { type: 'object' } },
          build: {
            type: 'object',
            properties: {
              generated: { type: 'string', format: 'date-time' },
              commit: { type: ['string', 'null'] },
              commitUrl: { type: ['string', 'null'] },
              runId: { type: ['string', 'null'] },
              runUrl: { type: ['string', 'null'] },
              repository: { type: 'string' },
            },
          },
          kits: { type: 'array', items: { type: 'object' } },
          machine: { type: 'object', additionalProperties: { type: 'string' } },
        },
        $defs: {
          section: {
            type: 'object',
            required: ['name', 'path', 'description'],
            properties: {
              name: { type: 'string' },
              path: { type: 'string' },
              description: { type: 'string' },
            },
          },
          tool: {
            type: 'object',
            required: ['id', 'name', 'url', 'description'],
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              url: { type: 'string' },
              description: { type: 'string' },
            },
          },
          file: {
            type: 'object',
            required: ['id', 'title', 'category', 'date', 'version', 'format', 'size', 'url'],
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              category: { type: 'string' },
              date: { type: 'string', format: 'date' },
              version: { type: 'string' },
              format: { type: 'string' },
              size: { type: 'string' },
              bytes: { type: ['integer', 'null'] },
              license: { type: 'string' },
              sha256: { type: ['string', 'null'] },
              tags: { type: 'array', items: { type: 'string' } },
              summary: { type: 'string' },
              url: { type: 'string' },
              download: { type: ['string', 'null'] },
              external: { type: ['string', 'null'] },
              source: { type: ['string', 'null'] },
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
