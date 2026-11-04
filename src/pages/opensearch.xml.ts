import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>Original</ShortName>
  <Description>Search the public library, guides, and data on Original.</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Url type="text/html" template="${new URL('/search/', site).href}?q={searchTerms}" />
</OpenSearchDescription>
`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/opensearchdescription+xml; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
