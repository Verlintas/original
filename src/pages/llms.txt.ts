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
    'policy and governance templates, live status checks, and small browser tools. Content is public; there',
    'are no accounts and no tracking scripts.',
    '',
    '## Sections',
    '- [STATUS](' + new URL('/status/', site).href + '): live checks for sites, GitHub projects, and services.',
    '- [FILES](' + new URL('/files/', site).href + '): licenses, headers, and policy/governance templates.',
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
    `- [index.json](${new URL('/index.json', site).href}): every file, link, and section as JSON.`,
    `- [search.json](${new URL('/search.json', site).href}): full text of every text file, for client-side search.`,
    `- [Contact](mailto:contact@original.wales): contact@original.wales.`,
    `- [CLI](${new URL('/cli/?cmd=ls', site).href}): HTML terminal output.`,
    `- [RSS](${new URL('/rss.xml', site).href}): feed of published files.`,
    `- [Sitemap](${new URL('/sitemap-index.xml', site).href}): index of pages.`,
    '',
    '## CLI',
    'Open /cli/ and type commands, or run one through the URL: /cli/?cmd=<command>',
    'Multiple commands can be separated with %3B (semicolon). Add --json to get machine-readable output.',
    '',
    'Commands: help, ls [-l] [path], cd <path>, pwd, tree, files [category|tag], cat <file>,',
    'read <file>, head <file> [n], tail <file> [n], search <term>, verify <file>,',
    'download <file>, open <section|file|url>, status, links, tools, contact, stats, about, date,',
    'whoami, source, history, clear, exit.',
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
