import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const contentDir = path.join(root, 'src/content/files');
const publicDir = path.join(root, 'public');
const outDir = path.join(publicDir, 'kits');
const kits = JSON.parse(fs.readFileSync(path.join(root, 'src/data/kits.json'), 'utf8')).kits;

function readField(frontmatter, name) {
  const match = frontmatter.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
  if (!match) return null;
  const value = match[1].trim();
  if (value.startsWith('"')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.replace(/^"|"$/g, '');
    }
  }
  return value.replace(/^'|'$/g, '');
}

const files = new Map();
for (const name of fs.readdirSync(contentDir)) {
  if (!name.endsWith('.md')) continue;
  const raw = fs.readFileSync(path.join(contentDir, name), 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) continue;
  const id = name.slice(0, -3);
  const frontmatter = match[1];
  files.set(id, {
    id,
    title: readField(frontmatter, 'title') || id,
    category: readField(frontmatter, 'category') || 'FILES',
    file: readField(frontmatter, 'file'),
    license: readField(frontmatter, 'license'),
    sha256: readField(frontmatter, 'sha256'),
  });
}

const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i += 1) {
  let value = i;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  crcTable[i] = value >>> 0;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function localHeader(name, data, crc, offset) {
  const nameBuffer = Buffer.from(name, 'utf8');
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(0, 6);
  header.writeUInt16LE(0, 8);
  header.writeUInt16LE(0, 10);
  header.writeUInt16LE(0, 12);
  header.writeUInt32LE(crc, 14);
  header.writeUInt32LE(data.length, 18);
  header.writeUInt32LE(data.length, 22);
  header.writeUInt16LE(nameBuffer.length, 26);
  header.writeUInt16LE(0, 28);
  return { header, nameBuffer, offset };
}

function centralHeader(entry, offset) {
  const header = Buffer.alloc(46);
  header.writeUInt32LE(0x02014b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(20, 6);
  header.writeUInt16LE(0, 8);
  header.writeUInt16LE(0, 10);
  header.writeUInt16LE(0, 12);
  header.writeUInt16LE(0, 14);
  header.writeUInt32LE(entry.crc, 16);
  header.writeUInt32LE(entry.data.length, 20);
  header.writeUInt32LE(entry.data.length, 24);
  header.writeUInt16LE(entry.nameBuffer.length, 28);
  header.writeUInt16LE(0, 30);
  header.writeUInt16LE(0, 32);
  header.writeUInt16LE(0, 34);
  header.writeUInt16LE(0, 36);
  header.writeUInt32LE(0, 38);
  header.writeUInt32LE(offset, 42);
  return { header, nameBuffer: entry.nameBuffer };
}

function makeZip(entries) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const entry of entries) {
    const data = Buffer.isBuffer(entry.data) ? entry.data : Buffer.from(entry.data, 'utf8');
    const crc = crc32(data);
    const nameBuffer = Buffer.from(entry.name, 'utf8');
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuffer.length, 26);
    local.writeUInt16LE(0, 28);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuffer.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);

    localParts.push(local, nameBuffer, data);
    centralParts.push(central, nameBuffer);
    offset += local.length + nameBuffer.length + data.length;
  }

  const centralSize = centralParts.reduce((total, part) => total + part.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, ...centralParts, end]);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const kitIndex = [];
for (const kit of kits) {
  const entries = [];
  const manifestLines = [
    `ORIGINAL — ${kit.name}`,
    '='.repeat(`ORIGINAL — ${kit.name}`.length),
    '',
    kit.summary,
    '',
    kit.description,
    '',
    `Generated: ${new Date().toISOString()}`,
    `Page: https://original.wales/files/kits/${kit.id}/`,
    '',
    'FILES',
  ];

  for (const id of kit.files) {
    const file = files.get(id);
    if (!file || !file.file) throw new Error(`Kit ${kit.id}: missing file entry ${id}`);
    const absolute = path.join(publicDir, file.file.replace(/^\//, ''));
    if (!fs.existsSync(absolute)) throw new Error(`Kit ${kit.id}: missing asset ${file.file}`);
    const data = fs.readFileSync(absolute);
    const name = `files/${file.category.toLowerCase()}/${path.basename(file.file)}`;
    entries.push({ name, data });
    manifestLines.push(
      `  ${name}`,
      `    title:  ${file.title}`,
      `    sha256: ${file.sha256 || crypto.createHash('sha256').update(data).digest('hex')}`,
    );
  }

  manifestLines.push('', 'SOURCE', 'https://original.wales/files/kits/', '');
  entries.unshift({ name: 'KIT.txt', data: Buffer.from(manifestLines.join('\n'), 'utf8') });

  const zip = makeZip(entries);
  const zipPath = path.join(outDir, `${kit.id}.zip`);
  fs.writeFileSync(zipPath, zip);
  kitIndex.push({
    id: kit.id,
    name: kit.name,
    summary: kit.summary,
    page: `https://original.wales/files/kits/${kit.id}/`,
    download: `https://original.wales/kits/${kit.id}.zip`,
    files: kit.files,
    bytes: zip.length,
    sha256: crypto.createHash('sha256').update(zip).digest('hex'),
  });
  console.log(`${kit.id.padEnd(26)} ${String(zip.length).padStart(7)} bytes  ${entries.length} entries`);
}

fs.writeFileSync(
  path.join(outDir, 'index.json'),
  JSON.stringify({ generated: new Date().toISOString(), kits: kitIndex }, null, 2) + '\n',
);
console.log(`Wrote ${kitIndex.length} kits to public/kits/`);

// --- public library downloads ------------------------------------------------

const downloadsDir = path.join(publicDir, 'downloads');
fs.rmSync(downloadsDir, { recursive: true, force: true });
fs.mkdirSync(downloadsDir, { recursive: true });

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
}

const localFiles = [...files.values()]
  .filter((file) => file.file)
  .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));

const catalogRows = localFiles.map((file) => ({
  id: file.id,
  title: file.title,
  category: file.category,
  license: file.license || '',
  sha256: file.sha256 || '',
  page: `https://original.wales/files/${file.id}/`,
  download: `https://original.wales${file.file}`,
}));

const catalogCsv = [
  ['id', 'title', 'category', 'license', 'sha256', 'page', 'download'],
  ...catalogRows.map((row) => [row.id, row.title, row.category, row.license, row.sha256, row.page, row.download]),
]
  .map((row) => row.map(csvCell).join(','))
  .join('\n') + '\n';

const catalogMd = [
  '# Original — public library catalog',
  '',
  `Generated: ${new Date().toISOString()}`,
  `Files: ${localFiles.length}`,
  '',
  '| ID | Title | Category | License | SHA-256 |',
  '|---|---|---|---|---|',
  ...catalogRows.map(
    (row) => `| [${row.id}](${row.page}) | ${row.title} | ${row.category} | ${row.license} | \`${row.sha256}\` |`,
  ),
  '',
  'Source: https://original.wales/files/',
  '',
].join('\n');

fs.writeFileSync(path.join(downloadsDir, 'catalog.csv'), catalogCsv);
fs.writeFileSync(path.join(downloadsDir, 'catalog.md'), catalogMd);

const downloadsIndex = [];

function writeDownload(id, name, entries) {
  const zip = makeZip(entries);
  const filePath = path.join(downloadsDir, `${id}.zip`);
  fs.writeFileSync(filePath, zip);
  downloadsIndex.push({
    id,
    name,
    download: `https://original.wales/downloads/${id}.zip`,
    bytes: zip.length,
    sha256: crypto.createHash('sha256').update(zip).digest('hex'),
    files: entries.length,
  });
  console.log(`download ${id.padEnd(24)} ${String(zip.length).padStart(8)} bytes  ${entries.length} entries`);
}

function libraryEntries(items) {
  return [
    { name: 'CATALOG.md', data: Buffer.from(catalogMd, 'utf8') },
    { name: 'catalog.csv', data: Buffer.from(catalogCsv, 'utf8') },
    ...items.map((file) => ({
      name: `files/${file.category.toLowerCase()}/${path.basename(file.file)}`,
      data: fs.readFileSync(path.join(publicDir, file.file.replace(/^\//, ''))),
    })),
  ];
}

writeDownload('all-files', 'FULL LIBRARY', libraryEntries(localFiles));
for (const category of [...new Set(localFiles.map((file) => file.category))].sort()) {
  const items = localFiles.filter((file) => file.category === category);
  writeDownload(category.toLowerCase(), `${category} FILES`, libraryEntries(items));
}

fs.writeFileSync(
  path.join(downloadsDir, 'index.json'),
  JSON.stringify(
    {
      generated: new Date().toISOString(),
      page: 'https://original.wales/downloads/',
      catalog: {
        csv: 'https://original.wales/downloads/catalog.csv',
        markdown: 'https://original.wales/downloads/catalog.md',
      },
      totalFiles: localFiles.length,
      downloads: downloadsIndex,
    },
    null,
    2,
  ) + '\n',
);
console.log(`Wrote ${downloadsIndex.length} library downloads to public/downloads/`);
