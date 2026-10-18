import type { APIContext } from 'astro';
import { links } from '../../data/links';
import { textResponse } from '../../utils/cli-text';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const lines = [`ORIGINAL — LINKS (${links.length})`, ''];
  for (const link of links) {
    lines.push(`  ${link.name}`, `    ${new URL(link.url, site).href}`, `    ${link.note}`, '');
  }
  return textResponse(lines);
}
