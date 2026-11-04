import type { APIContext } from 'astro';
import { publicData } from '../../data/public-data';

export async function getStaticPaths() {
  return publicData.map((dataset) => ({ params: { id: dataset.id }, props: { dataset } }));
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const dataset = context.props.dataset as (typeof publicData)[number];
  const records = dataset.rows.map((row) =>
    Object.fromEntries(dataset.columns.map((column, index) => [column, row[index]])),
  );

  return new Response(
    JSON.stringify(
      {
        $schema: new URL('/schemas/data.schema.json', site).href,
        generated: new Date().toISOString(),
        id: dataset.id,
        title: dataset.title,
        summary: dataset.summary,
        source: dataset.source,
        license: dataset.license,
        updated: dataset.updated,
        page: new URL(`/data/${dataset.id}/`, site).href,
        csv: new URL(`/data/${dataset.id}.csv`, site).href,
        columns: dataset.columns,
        rows: records,
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
