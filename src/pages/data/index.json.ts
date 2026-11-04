import type { APIContext } from 'astro';
import { publicData } from '../../data/public-data';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  return new Response(
    JSON.stringify(
      {
        generated: new Date().toISOString(),
        page: new URL('/data/', site).href,
        datasets: publicData.map((dataset) => ({
          id: dataset.id,
          title: dataset.title,
          summary: dataset.summary,
          source: dataset.source,
          license: dataset.license,
          updated: dataset.updated,
          columns: dataset.columns,
          rows: dataset.rows.length,
          page: new URL(`/data/${dataset.id}/`, site).href,
          json: new URL(`/data/${dataset.id}.json`, site).href,
          csv: new URL(`/data/${dataset.id}.csv`, site).href,
        })),
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
