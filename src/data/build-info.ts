import { execSync } from 'node:child_process';

export interface BuildInfo {
  generated: string;
  commit: string | null;
  commitUrl: string | null;
  runId: string | null;
  runUrl: string | null;
  repository: string;
}

function git(args: string[]): string | null {
  try {
    return execSync(`git ${args.join(' ')}`, { cwd: process.cwd(), encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

const repository = process.env.GITHUB_REPOSITORY || 'Verlintas/original';
const commit =
  process.env.GITHUB_SHA?.slice(0, 7) ||
  git(['rev-parse', '--short=7', 'HEAD']) ||
  null;
const runId = process.env.GITHUB_RUN_ID || null;

export const buildInfo: BuildInfo = {
  generated: new Date().toISOString(),
  commit,
  commitUrl: commit ? `https://github.com/${repository}/commit/${commit}` : null,
  runId,
  runUrl: runId ? `https://github.com/${repository}/actions/runs/${runId}` : null,
  repository,
};
