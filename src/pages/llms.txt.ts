import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { publicData } from '../data/public-data';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const guides = (await getCollection('guides')).sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );

  const lines = [
    '# Original',
    '',
    '> A cornerstone for files, references, and tools, maintained by Verlintas. Contact: contact@original.wales',
    '',
    'Original is a public cornerstone for reference work: canonical license texts, official standards,',
    'plain-language guides, everyday letters, public data, copyright headers, policies, governance, and',
    'agent templates. Content is public; there are no accounts and no tracking scripts.',
    '',
    '## Start here (agents)',
    `- [Manual](${new URL('/cli/manual.txt', site).href}): complete CLI and static API manual for agents.`,
    `- [AGENTS.md](${new URL('/AGENTS.md', site).href}): onboarding, guarantees, and common tasks.`,
    `- [commands.json](${new URL('/cli/commands.json', site).href}): machine-readable command and endpoint manifest.`,
    `- [manifest.tsv](${new URL('/cli/manifest.tsv', site).href}): file inventory with checksums.`,
    `- [manifest-sha256.txt](${new URL('/cli/manifest-sha256.txt', site).href}): checksum of the manifest itself.`,
    `- [resources.json](${new URL('/cli/resources.json', site).href}): resource inventory with official-source flags.`,
    `- [llms-small.txt](${new URL('/llms-small.txt', site).href}): metadata for every file.`,
    `- [llms-full.txt](${new URL('/llms-full.txt', site).href}): every file, in full.`,
    `- [search](${new URL('/search/', site).href}): full-text search UI; the raw corpus is /search.json.`,
    '',
    '## Sections',
    '- [STATUS](' + new URL('/status/', site).href + '): build information, live checks for sites, GitHub projects, and services.',
    '- [FILES](' + new URL('/files/', site).href + '): licenses, standards, snippets, headers, policies, governance, and agent templates; includes [kits](' + new URL('/files/kits/', site).href + '), [search](' + new URL('/search/', site).href + '), [recent](' + new URL('/files/recent/', site).href + '), and [downloads](' + new URL('/downloads/', site).href + ').',
    '- [GUIDES](' + new URL('/guides/', site).href + '): plain-language guides, learning paths, checklists, letters, directory, and transparency.',
    '- [UNIVERSE](' + new URL('/universe/', site).href + '): browser tools — checksums, JSON, license comparison, and a license chooser.',
    '- [DATA](' + new URL('/data/', site).href + '): source-linked public datasets with JSON and CSV downloads.',
    '- [ABOUT](' + new URL('/about/', site).href + '): what the site is and who maintains it.',
    '- [CLI](' + new URL('/cli/', site).href + '): terminal interface; run a command with ?cmd= (for example ?cmd=ls).',
    '',
    '## Tools',
    `- [CHECKSUM](${new URL('/universe/checksum/', site).href}): SHA-256 checksums for local files.`,
    `- [JSON](${new URL('/universe/json/', site).href}): validate, format, and minify JSON.`,
    `- [LICENSE COMPARE](${new URL('/universe/license-compare/', site).href}): compare permissions, conditions, and limitations across sixteen common licenses.`,
    `- [LICENSE CHOOSER](${new URL('/universe/license-chooser/', site).href}): four questions, three suggestions.`,
    '',
    '## Guides',
    ...guides.map((guide) => `- [${guide.data.title}](${new URL(`/guides/${guide.id}/`, site).href}): ${guide.data.summary}`),
    '',
    '## Data',
    ...publicData.map((dataset) => `- [${dataset.title}](${new URL(`/data/${dataset.id}/`, site).href}): ${dataset.rows.length} rows. ${dataset.summary}`),
    '',
    '## Public pages',
    `- [Learning paths](${new URL('/guides/paths/', site).href}) · [Checklists](${new URL('/guides/checklists/', site).href}) · [Letters](${new URL('/guides/letters/', site).href}) · [Directory](${new URL('/guides/directory/', site).href}) · [Transparency](${new URL('/guides/transparency/', site).href}) · [Contribute](${new URL('/contribute/', site).href})`,
    '',
    '## Site policies',
    `- [Privacy](${new URL('/privacy/', site).href}) · [Security](${new URL('/security/', site).href}) · [License](${new URL('/license/', site).href}) · [Accessibility](${new URL('/accessibility/', site).href})`,
    '',
    '## Files',
  ];

  for (const entry of files) {
    lines.push(
      `- [${entry.data.title}](${new URL(`/files/${entry.id}/`, site).href}): ${entry.data.summary}`,
    );
    if (entry.data.file) {
      lines.push(`  Download: ${new URL(entry.data.file, site).href}`);
      lines.push(`  Markdown: ${new URL(`/files/${entry.id}.md`, site).href}`);
    }
  }

  lines.push(
    '',
    '## Machine interfaces',
    `- [index.json](${new URL('/index.json', site).href}): every file, link, tool, and section as JSON. CORS: *.`,
    `- [search.json](${new URL('/search.json', site).href}): full text of every text file. CORS: *.`,
    `- [help.txt](${new URL('/cli/help.txt', site).href}): static CLI command list and endpoints.`,
    `- [ls.txt](${new URL('/cli/ls.txt', site).href}) · [tree.txt](${new URL('/cli/tree.txt', site).href}) · [files.txt](${new URL('/cli/files.txt', site).href})`,
    `- [tools.txt](${new URL('/cli/tools.txt', site).href}) · [links.txt](${new URL('/cli/links.txt', site).href}) · [stats.txt](${new URL('/cli/stats.txt', site).href}) · [about.txt](${new URL('/cli/about.txt', site).href})`,
    `- Per file: [cat/<id>.txt](${new URL('/cli/cat/mit-license.txt', site).href}) metadata and summary; [read/<id>.txt](${new URL('/cli/read/mit-license.txt', site).href}) full text.`,
    `- [RSS](${new URL('/rss.xml', site).href}) · [Sitemap](${new URL('/sitemap-index.xml', site).href})`,
    `- [context](${new URL('/cli/context/mit-license.txt', site).href}): metadata, citation, related files, and full text per file.`,
    `- [cite](${new URL('/cli/cite/mit-license.txt', site).href}): citation line per file.`,
    `- [licenses.json](${new URL('/cli/licenses.json', site).href}): license feature matrix (16 common licenses).`,
    `- [resources.json](${new URL('/cli/resources.json', site).href}): every resource, grouped by category, with checksums and sources.`,
    `- [kits/index.json](${new URL('/kits/index.json', site).href}): downloadable kit bundles with checksums.`,
    `- [JSON Feed](${new URL('/feed.json', site).href}) · [OpenSearch](${new URL('/opensearch.xml', site).href}) · [JSON schemas](${new URL('/schemas/index.schema.json', site).href})`,
    `- [guides.json](${new URL('/guides.json', site).href}) · [data/index.json](${new URL('/data/index.json', site).href}) · [directory.json](${new URL('/guides/directory.json', site).href}) · [letters.json](${new URL('/guides/letters.json', site).href})`,
    `- [downloads/index.json](${new URL('/downloads/index.json', site).href}) · [corrections.json](${new URL('/corrections.json', site).href})`,
    `- [llms-full.txt](${new URL('/llms-full.txt', site).href}) · [llms-small.txt](${new URL('/llms-small.txt', site).href})`,
    `- [security.txt](${new URL('/.well-known/security.txt', site).href}): report vulnerabilities to security@original.wales.`,
    '',
    '## CLI',
    'The interactive terminal at /cli/ requires JavaScript.',
    'Scripts and agents should use the static text endpoints above; they are rendered at build time.',
    '?cmd=<command> is a browser-only convenience and does not work without JavaScript.',
    'Commands: help, manual, agents, api, ls, cd, pwd, tree, files, cat, read, head, tail,',
    'search, context, cite, related, verify, manifest, sitemap, licenses, resources, kits, guides,',
    'data, downloads, compare,',
    'download, open, status, links, tools, contact, stats, about, date, whoami, source, history,',
    'clear, exit.',
    'Add --json for machine-readable output in the browser.',
    `Complete manual: ${new URL('/cli/manual.txt', site).href}`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
