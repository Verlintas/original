import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const url = (pathname: string) => new URL(pathname, site).href;

  const body = `# Original — agent onboarding

> A cornerstone for files, references, and tools. Static site; no accounts,
> no API keys, no tracking. Everything below is read-only.

Base URL: ${url('/')}
Full CLI manual: ${url('/cli/manual.txt')}
Machine command manifest: ${url('/cli/commands.json')}

## Start here

1. ${url('/llms.txt')} — site description.
2. ${url('/llms-small.txt')} — metadata for every file and guide.
3. ${url('/llms-full.txt')} — every file and guide, in full.
4. ${url('/cli/manual.txt')} — complete CLI/API manual.
5. ${url('/index.json')} — every file, guide, dataset, link, tool, and section as JSON.
6. ${url('/search.json')} — full text of every text document.
7. ${url('/guides/')} — plain-language guides for licenses, privacy, accessibility, and security.
8. ${url('/data/')} — source-linked public datasets with JSON and CSV downloads.

The interactive terminal at ${url('/cli/')} requires JavaScript.
**Do not use ?cmd= as an API.** For scripts, use the static endpoints below.

## Core endpoints

| Need | Endpoint | Format |
|---|---|---|
| Site overview | /llms.txt | text |
| Command/API manifest | /cli/commands.json | JSON |
| Section list | /cli/ls.txt | text |
| Site tree | /cli/tree.txt | text |
| All files + checksums | /cli/files.txt | text |
| File inventory | /cli/manifest.tsv | TSV |
| Manifest checksum | /cli/manifest-sha256.txt | text |
| Resource inventory (official flags) | /cli/resources.json | JSON |
| Metadata corpus | /llms-small.txt | text |
| Full corpus | /llms-full.txt | text |
| Kits | /kits/index.json | JSON |
| JSON Feed | /feed.json | JSON |
| JSON schemas | /schemas/index.schema.json | JSON |
| Guides | /guides.json | JSON |
| Public data | /data/index.json | JSON |
| Directory | /guides/directory.json | JSON |
| Letters | /guides/letters.json | JSON |
| Checklists | /guides/checklists.json | JSON |
| Downloads | /downloads/index.json | JSON |
| Corrections | /corrections.json | JSON |
| OpenSearch | /opensearch.xml | XML |
| File metadata + summary | /cli/cat/<id>.txt | text |
| Full file text | /cli/read/<id>.txt | text |
| File Markdown | /files/<id>.md | markdown |
| Context pack (metadata + citation + related + text) | /cli/context/<id>.txt | text |
| Citation | /cli/cite/<id>.txt | text |
| License feature matrix | /cli/licenses.json | JSON |
| Official standards | /cli/files/standards.txt | text |
| Gitignore snippets | /cli/files/snippets.txt | text |
| Site map | /cli/sitemap.txt | text |
| Tools | /cli/tools.txt | text |
| Links/contact | /cli/links.txt | text |
| Stats | /cli/stats.txt | text |
| Security contact | /.well-known/security.txt | text |

All links are relative to ${url('/')}.

## Content guarantees

- Every file has a stable id and page; local files also have a download and SHA-256 checksum.
- Every local file has a Markdown version at /files/<id>.md.
- License texts are canonical (SPDX, Creative Commons, and other primary sources), unmodified.
- RFCs, SemVer, Conventional Commits, and Keep a Changelog are official texts with named sources.
- Templates are CC0-1.0 unless the file says otherwise.
- Files are versioned; content changes bump version and date.
- Cite version + date + URL + checksum, not just a URL.

## Common tasks

**Find a license**

    curl ${url('/cli/files/licenses.txt')}
    curl ${url('/cli/context/mit-license.txt')}

**Compare licenses**

    curl ${url('/cli/licenses.json')}

**Find a standard or snippet**

    curl ${url('/cli/files/standards.txt')}
    curl ${url('/cli/files/snippets.txt')}
    curl ${url('/cli/context/rfc-2119.txt')}
    curl ${url('/cli/context/gitignore-node.txt')}

**Find a plain-language guide**

    curl ${url('/guides.json')}
    curl ${url('/guides/choose-a-license/')}

**Download the whole library**

    curl -O ${url('/downloads/all-files.zip')}
    curl ${url('/downloads/catalog.csv')}

**List official resources**

    curl ${url('/cli/resources.json')}

**Get a ready-made kit**

    curl ${url('/kits/index.json')}
    curl -O ${url('/kits/open-source-starter.zip')}

**Validate JSON output**

    curl ${url('/schemas/index.schema.json')}
    curl ${url('/schemas/resources.schema.json')}
    curl ${url('/schemas/search.schema.json')}

**Search**

There is no query endpoint. Fetch /search.json and search locally:

    curl -s ${url('/search.json')} | jq -r '.docs[] | select(.text | ascii_downcase | contains("indemn")) | .id'

**Verify**

    curl -sO ${url('/files/licenses/mit.txt')}
    shasum -a 256 mit.txt
    # compare with the sha256 field in /cli/cat/mit-license.txt

**Cite**

    curl ${url('/cli/cite/mit-license.txt')}

## Rules

- Read-only: no POST, no accounts, no credentials.
- Prefer text/JSON endpoints over parsing HTML.
- Do not assume ?cmd= works without JavaScript.
- Respect license terms; templates are starting points, not legal advice.
- Be a polite client; content is cached and safe to retry.
- Security reports: security@original.wales (see /.well-known/security.txt).
- Full corpus: /llms-full.txt; metadata-only: /llms-small.txt.
- Kits are generated at build time; verify the ZIP against /kits/index.json.

Generated: ${new Date().toISOString()}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
