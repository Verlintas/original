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
