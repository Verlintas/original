import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const files = (await getCollection('files')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );

  const lines = [
    '# Original',
    '',
    '> A cornerstone for files, references, and tools, maintained by Verlintas. Contact: contact@original.wales',
    '',
    'Original is a cornerstone for reference work: canonical license texts, copyright headers,',
    'policy, governance, and agent templates, live status checks, and small browser tools. Content is public; there',
    'are no accounts and no tracking scripts.',
    '',
    '## Start here (agents)',
    `- [Manual](${new URL('/cli/manual.txt', site).href}): complete CLI and static API manual for agents.`,
    `- [AGENTS.md](${new URL('/AGENTS.md', site).href}): onboarding, guarantees, and common tasks.`,
    `- [commands.json](${new URL('/cli/commands.json', site).href}): machine-readable command and endpoint manifest.`,
    `- [manifest.tsv](${new URL('/cli/manifest.tsv', site).href}): file inventory with checksums.`,
    '',
    '## Sections',
    '- [STATUS](' + new URL('/status/', site).href + '): live checks for sites, GitHub projects, and services.',
    '- [FILES](' + new URL('/files/', site).href + '): licenses, headers, policies, governance, and agent templates.',
    '- [UNIVERSE](' + new URL('/universe/', site).href + '): browser tools — checksums, JSON, and license comparison.',
    '- [ABOUT](' + new URL('/about/', site).href + '): what the site is and who maintains it.',
    '- [CLI](' + new URL('/cli/', site).href + '): terminal interface; run a command with ?cmd= (for example ?cmd=ls).',
    '',
    '## Tools',
    `- [CHECKSUM](${new URL('/universe/checksum/', site).href}): SHA-256 checksums for local files.`,
    `- [JSON](${new URL('/universe/json/', site).href}): validate, format, and minify JSON.`,
    `- [LICENSE COMPARE](${new URL('/universe/license-compare/', site).href}): compare permissions, conditions, and limitations across sixteen licenses.`,
    '',
    '## Files',
  ];

  for (const entry of files) {
    lines.push(
      `- [${entry.data.title}](${new URL(`/files/${entry.id}/`, site).href}): ${entry.data.summary}`,
    );
    if (entry.data.file) {
      lines.push(`  Download: ${new URL(entry.data.file, site).href}`);
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
    `- [licenses.json](${new URL('/cli/licenses.json', site).href}): license feature matrix (16 licenses).`,
    `- [security.txt](${new URL('/.well-known/security.txt', site).href}): report vulnerabilities to security@original.wales.`,
    '',
    '## CLI',
    'The interactive terminal at /cli/ requires JavaScript.',
    'Scripts and agents should use the static text endpoints above; they are rendered at build time.',
    '?cmd=<command> is a browser-only convenience and does not work without JavaScript.',
    'Commands: help, manual, agents, api, ls, cd, pwd, tree, files, cat, read, head, tail,',
    'search, context, cite, related, verify, manifest, sitemap, licenses, compare, download,',
    'open, status, links, tools, contact, stats, about, date, whoami, source, history, clear, exit.',
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
