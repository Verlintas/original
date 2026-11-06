export interface Tool {
  id: string;
  index: string;
  name: string;
  url: string;
  description: string;
}

export const tools: Tool[] = [
  {
    id: 'checksum',
    index: '01',
    name: 'CHECKSUM',
    url: '/universe/checksum/',
    description: 'Compute the SHA-256 checksum of any file, locally in the browser.',
  },
  {
    id: 'json',
    index: '02',
    name: 'JSON',
    url: '/universe/json/',
    description: 'Validate, format, and minify JSON without leaving the page.',
  },
  {
    id: 'license-compare',
    index: '03',
    name: 'LICENSE COMPARE',
    url: '/universe/license-compare/',
    description: 'Compare permissions, conditions, and limitations across sixteen common licenses.',
  },
  {
    id: 'license-chooser',
    index: '04',
    name: 'LICENSE CHOOSER',
    url: '/universe/license-chooser/',
    description: 'Answer four questions and get a short list of licenses that fit.',
  },
  {
    id: 'privacy-policy',
    index: '05',
    name: 'PRIVACY POLICY',
    url: '/universe/privacy-policy/',
    description: 'Build a plain-text privacy policy from the data your small site actually handles.',
  },
  {
    id: 'accessibility-statement',
    index: '06',
    name: 'ACCESSIBILITY STATEMENT',
    url: '/universe/accessibility-statement/',
    description: 'Generate an honest accessibility statement with a feedback route.',
  },
  {
    id: 'security-txt',
    index: '07',
    name: 'SECURITY.TXT',
    url: '/universe/security-txt/',
    description: 'Generate a valid RFC 9116 security.txt for your site.',
  },
  {
    id: 'exif',
    index: '08',
    name: 'EXIF REMOVER',
    url: '/universe/exif/',
    description: 'Re-encode a photo in the browser to remove GPS and camera metadata.',
  },
  {
    id: 'contrast',
    index: '09',
    name: 'COLOR CONTRAST',
    url: '/universe/contrast/',
    description: 'Check WCAG contrast ratios for text and background colors.',
  },
  {
    id: 'readability',
    index: '10',
    name: 'READABILITY',
    url: '/universe/readability/',
    description: 'Estimate reading ease and grade level for a piece of text.',
  },
  {
    id: 'timestamp',
    index: '11',
    name: 'TIMESTAMP',
    url: '/universe/timestamp/',
    description: 'Convert between RFC 3339, Unix seconds, UTC, and local time.',
  },
  {
    id: 'diff',
    index: '12',
    name: 'TEXT DIFF',
    url: '/universe/diff/',
    description: 'Compare two texts line by line in the browser.',
  },
  {
    id: 'spdx',
    index: '13',
    name: 'SPDX EXPRESSION',
    url: '/universe/spdx/',
    description: 'Check the syntax of an SPDX license expression.',
  },
];
