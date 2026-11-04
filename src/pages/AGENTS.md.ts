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
2. ${url('/cli/manual.txt')} — complete CLI/API manual.
3. ${url('/index.json')} — every file, link, tool, and section as JSON.
4. ${url('/search.json')} — full text of every text file.

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
| Resource inventory (official flags) | /cli/resources.json | JSON |
| File metadata + summary | /cli/cat/<id>.txt | text |
| Full file text | /cli/read/<id>.txt | text |
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

- Every file has a stable id, page, download, and SHA-256 checksum.
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

**List official resources**

    curl ${url('/cli/resources.json')}

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

Generated: ${new Date().toISOString()}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
