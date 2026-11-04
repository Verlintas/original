import type { APIContext } from 'astro';
import { publicData } from '../../data/public-data';

export async function getStaticPaths() {
  return publicData.map((dataset) => ({ params: { id: dataset.id }, props: { dataset } }));
}

function csvCell(value: string | number): string {
  const text = String(value);
  return /[",\n\r]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
}

export async function GET(context: APIContext) {
  const dataset = context.props.dataset as (typeof publicData)[number];
  const lines = [
    dataset.columns.map(csvCell).join(','),
    ...dataset.rows.map((row) => row.map(csvCell).join(',')),
  ];

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Content-Disposition': `attachment; filename="${dataset.id}.csv"`,
    },
  });
}
