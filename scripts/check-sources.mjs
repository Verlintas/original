import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const contentDir = path.join(root, 'src/content/files');
const outDir = path.join(root, 'public/status');
const limit = Number(process.env.SOURCE_CHECK_LIMIT || 0);

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

const entries = [];
for (const name of await fs.readdir(contentDir)) {
  if (!name.endsWith('.md')) continue;
  const raw = await fs.readFile(path.join(contentDir, name), 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) continue;
  const source = readField(match[1], 'source');
  if (!source) continue;
  entries.push({
    id: name.slice(0, -3),
    title: readField(match[1], 'title') || name,
    category: readField(match[1], 'category') || 'UNKNOWN',
    url: source,
  });
}

const unique = [...new Map(entries.map((entry) => [entry.url, entry])).values()].slice(
  0,
  limit || undefined,
);

async function check(url) {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'Original source check (+https://original.wales)' },
    });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': 'Original source check (+https://original.wales)' },
      });
    }
    return {
      status: response.ok ? 'ok' : 'error',
      httpStatus: response.status,
      finalUrl: response.url,
      ms: Date.now() - started,
      error: response.ok ? null : `HTTP ${response.status}`,
    };
  } catch (error) {
    return {
      status: error.name === 'AbortError' ? 'timeout' : 'error',
      httpStatus: null,
      finalUrl: null,
      ms: Date.now() - started,
      error: error.message,
    };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
const queue = [...unique];
const workers = Array.from({ length: Math.min(6, queue.length) }, async () => {
  while (queue.length) {
    const entry = queue.shift();
    const result = await check(entry.url);
    results.push({ ...entry, ...result, checkedAt: new Date().toISOString() });
    console.log(`${result.status.padEnd(8)} ${result.httpStatus ?? '-'} ${entry.id} ${entry.url}`);
  }
});
await Promise.all(workers);

results.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
const summary = {
  generated: new Date().toISOString(),
  total: results.length,
  ok: results.filter((item) => item.status === 'ok').length,
  error: results.filter((item) => item.status !== 'ok').length,
  sources: results,
};

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, 'sources.json'), JSON.stringify(summary, null, 2) + '\n');
await fs.writeFile(
  path.join(outDir, 'sources.txt'),
  [
    'ORIGINAL — SOURCE HEALTH',
    '',
    `Generated: ${summary.generated}`,
    `Total: ${summary.total}`,
    `OK: ${summary.ok}`,
    `Problems: ${summary.error}`,
    '',
    ...results.map(
      (item) =>
        `${item.status.toUpperCase().padEnd(8)} ${String(item.httpStatus ?? '-').padEnd(4)} ${item.id} — ${item.url}`,
    ),
    '',
  ].join('\n'),
);
console.log(`Wrote ${results.length} source checks to public/status/`);
