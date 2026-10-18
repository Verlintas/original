import { textResponse } from '../../utils/cli-text';

export async function GET() {
  return textResponse([
    'ORIGINAL — ABOUT',
    '',
    'A cornerstone for files, references, and tools.',
    '',
    'Original is a personal working site maintained by Verlintas. It holds canonical',
    'license texts, copyright headers, policy and governance templates, live status',
    'checks, and small browser tools. Content is public; there are no accounts and no',
    'tracking scripts.',
    '',
    'FILES are plain text, versioned in git, with size, date, and SHA-256 checksums.',
    'Licenses and other canonical texts name their source. Templates written for this',
    'site are released under CC0-1.0 unless the file says otherwise.',
    '',
    'CONTACT',
    '  email:  contact@original.wales',
    '  github: https://github.com/Verlintas',
    '  security: /.well-known/security.txt',
  ]);
}
