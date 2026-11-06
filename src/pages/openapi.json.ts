import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const url = (pathname: string) => new URL(pathname, site).href;

  const text = {
    get: {
      responses: {
        200: { description: 'Plain text', content: { 'text/plain': { schema: { type: 'string' } } } },
      },
    },
  };
  const json = {
    get: {
      responses: {
        200: { description: 'JSON', content: { 'application/json': { schema: { type: 'object' } } } },
      },
    },
  };

  return new Response(
    JSON.stringify(
      {
        openapi: '3.1.0',
        info: {
          title: 'Original static endpoints',
          version: '1.0.0',
          description:
            'Read-only static endpoints for files, guides, data, kits, licenses, search, and the CLI. No authentication.',
        },
        servers: [{ url: url('/') }],
        paths: {
          '/index.json': json,
          '/search.json': json,
          '/llms.txt': text,
          '/llms-small.txt': text,
          '/llms-full.txt': text,
          '/AGENTS.md': text,
          '/cli/manual.txt': text,
          '/cli/commands.json': json,
          '/cli/files.txt': text,
          '/cli/files/{category}.txt': {
            get: {
              parameters: [{ name: 'category', in: 'path', required: true, schema: { type: 'string' } }],
              responses: { 200: { description: 'Plain text' } },
            },
          },
          '/cli/read/{id}.txt': {
            get: {
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              responses: { 200: { description: 'Plain text' } },
            },
          },
          '/cli/context/{id}.txt': {
            get: {
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              responses: { 200: { description: 'Plain text' } },
            },
          },
          '/cli/manifest.tsv': text,
          '/cli/manifest-sha256.txt': text,
          '/cli/licenses.json': json,
          '/cli/resources.json': json,
          '/cli/stats.txt': text,
          '/guides.json': json,
          '/data/index.json': json,
          '/data/{id}.json': {
            get: {
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              responses: { 200: { description: 'JSON dataset' } },
            },
          },
          '/data/{id}.csv': {
            get: {
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              responses: { 200: { description: 'CSV dataset' } },
            },
          },
          '/downloads/index.json': json,
          '/guides/directory.json': json,
          '/guides/letters.json': json,
          '/guides/checklists.json': json,
          '/corrections.json': json,
          '/feed.json': json,
          '/status/sources.json': json,
          '/opensearch.xml': { get: { responses: { 200: { description: 'OpenSearch description' } } } },
        },
        components: {
          securitySchemes: {},
        },
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
