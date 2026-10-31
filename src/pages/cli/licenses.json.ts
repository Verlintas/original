import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import {
  licenseFeatures,
  featureRows,
  featureValue,
  type FeatureGroup,
} from '../../data/license-features';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://original.wales');
  const files = await getCollection('files');
  const bySlug = new Map(files.map((entry) => [entry.id, entry]));

  const groups: FeatureGroup[] = ['PERMISSIONS', 'CONDITIONS', 'LIMITATIONS'];

  const licenses = licenseFeatures.map((license) => {
    const entry = bySlug.get(license.slug);
    const values: Record<string, Record<string, string>> = {};
    for (const group of groups) {
      values[group] = {};
      for (const row of featureRows.filter((feature) => feature.group === group)) {
        values[group][row.key] = featureValue(license, row);
      }
    }
    return {
      id: license.id,
      name: license.name,
      spdx: license.spdx,
      slug: license.slug,
      page: new URL(`/files/${license.slug}/`, site).href,
      download: entry?.data.file ? new URL(entry.data.file, site).href : null,
      sha256: entry?.data.sha256 ?? null,
      values,
    };
  });

  const body = {
    generated: new Date().toISOString(),
    source: 'https://choosealicense.com/appendix/',
    note: 'Comparison aid, not legal advice. Read the full license text before use.',
    groups,
    features: featureRows.map((row) => ({
      group: row.group,
      key: row.key,
      label: row.label,
    })),
    defaults: ['mit', 'apache-2.0', 'gpl-3.0', 'agpl-3.0', 'mpl-2.0'],
    values: {
      yes: 'granted / required / applies',
      no: 'not granted / not required / does not apply',
      source: 'notice required in source distributions only',
    },
    licenses,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
