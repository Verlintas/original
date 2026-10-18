import type { APIContext } from 'astro';
import { tools } from '../../data/tools';
import { textResponse } from '../../utils/cli-text';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const lines = [`ORIGINAL — TOOLS (${tools.length})`, ''];
  for (const tool of tools) {
    lines.push(
      `  ${tool.name}`,
      `    ${new URL(tool.url, site).href}`,
      `    ${tool.description}`,
      '',
    );
  }
  return textResponse(lines);
}
