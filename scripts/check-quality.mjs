import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const dist = path.join(root, 'dist');
const errors = [];

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

const index = await readJson(path.join(dist, 'index.json'));
const search = await readJson(path.join(dist, 'search.json'));
const feed = await readJson(path.join(dist, 'feed.json'));
const dataIndex = await readJson(path.join(dist, 'data/index.json'));
const downloads = await readJson(path.join(dist, 'downloads/index.json'));
const resources = await readJson(path.join(dist, 'cli/resources.json'));

if (index.files.length !== resources.total) {
  errors.push(`index files ${index.files.length} != resources ${resources.total}`);
}
if (index.guides.length !== 10) errors.push(`expected 10 guides, found ${index.guides.length}`);
const expectedDocs = index.files.length + index.guides.length + dataIndex.datasets.length;
if (search.docs.length !== expectedDocs) {
  errors.push(`search docs ${search.docs.length} != files + guides + data ${expectedDocs}`);
}
if (feed.items.length !== index.files.length + index.guides.length) {
  errors.push(`feed items ${feed.items.length} != files + guides`);
}

for (const dataset of dataIndex.datasets) {
  const csv = await fs.readFile(path.join(dist, 'data', `${dataset.id}.csv`), 'utf8');
  const rows = csv.trim().split('\n').length - 1;
  if (rows !== dataset.rows) errors.push(`dataset ${dataset.id}: csv ${rows} != ${dataset.rows}`);
}

for (const entry of index.files) {
  if (!entry.sha256) continue;
  const absolute = path.join(root, 'public', entry.download || '');
  if (!entry.download) continue;
  try {
    const buffer = await fs.readFile(absolute);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    if (hash !== entry.sha256) errors.push(`hash mismatch: ${entry.id}`);
  } catch {
    errors.push(`missing asset: ${entry.id} ${entry.download}`);
  }
}

for (const file of ['all-files.zip', 'catalog.csv', 'catalog.md', 'index.json']) {
  try {
    await fs.access(path.join(dist, 'downloads', file));
  } catch {
    errors.push(`missing download: ${file}`);
  }
}

let missingLinks = 0;
const walk = async (dir) => {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(absolute);
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;
    const html = await fs.readFile(absolute, 'utf8');
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
      const href = match[1];
      const target = path.join(dist, href.replace(/^\//, ''));
      let exists = false;
      try {
        await fs.access(href.endsWith('/') ? path.join(target, 'index.html') : target);
        exists = true;
      } catch {
        try {
          await fs.access(path.join(dist, href.replace(/^\//, ''), 'index.html'));
          exists = true;
        } catch {
          exists = false;
        }
      }
      if (!exists) {
        missingLinks += 1;
        if (missingLinks <= 10) console.error(`missing link: ${path.relative(dist, absolute)} -> ${href}`);
      }
    }
  }
};
await walk(dist);
if (missingLinks) errors.push(`${missingLinks} missing internal links`);

if (errors.length) {
  console.error('\nQUALITY CHECK FAILED');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `QUALITY CHECK OK — ${index.files.length} files, ${index.guides.length} guides, ${dataIndex.datasets.length} datasets, ${downloads.downloads.length} archives`,
);
