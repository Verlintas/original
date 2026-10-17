export type LicenseId =
  | 'mit'
  | 'apache-2.0'
  | 'gpl-3.0'
  | 'gpl-2.0'
  | 'lgpl-3.0'
  | 'agpl-3.0'
  | 'mpl-2.0'
  | 'epl-2.0'
  | 'eupl-1.2'
  | 'isc'
  | 'bsd-3-clause'
  | 'bsl-1.0'
  | 'cc0-1.0'
  | 'unlicense'
  | 'zlib'
  | '0bsd';

export interface LicenseFeatureData {
  id: LicenseId;
  name: string;
  spdx: string;
  slug: string;
  permissions: string[];
  conditions: string[];
  limitations: string[];
}

export type FeatureGroup = 'PERMISSIONS' | 'CONDITIONS' | 'LIMITATIONS';

export interface FeatureRow {
  group: FeatureGroup;
  key: string;
  label: string;
  note?: string;
}

export const licenseFeatures: LicenseFeatureData[] = [
  {
    id: 'mit',
    name: 'MIT',
    spdx: 'MIT',
    slug: 'mit-license',
    permissions: ['commercial-use', 'modifications', 'distribution', 'private-use'],
    conditions: ['include-copyright'],
    limitations: ['liability', 'warranty'],
  },
  {
    id: 'apache-2.0',
    name: 'APACHE 2.0',
    spdx: 'Apache-2.0',
    slug: 'apache-license-2-0',
    permissions: ['commercial-use', 'modifications', 'distribution', 'patent-use', 'private-use'],
    conditions: ['include-copyright', 'document-changes'],
    limitations: ['trademark-use', 'liability', 'warranty'],
  },
  {
    id: 'gpl-3.0',
    name: 'GPL 3.0',
    spdx: 'GPL-3.0',
    slug: 'gpl-3-0',
    permissions: ['commercial-use', 'modifications', 'distribution', 'patent-use', 'private-use'],
    conditions: ['include-copyright', 'document-changes', 'disclose-source', 'same-license'],
    limitations: ['liability', 'warranty'],
  },
  {
    id: 'gpl-2.0',
    name: 'GPL 2.0',
    spdx: 'GPL-2.0',
    slug: 'gpl-2-0',
    permissions: ['commercial-use', 'modifications', 'distribution', 'private-use'],
    conditions: ['include-copyright', 'document-changes', 'disclose-source', 'same-license'],
    limitations: ['liability', 'warranty'],
  },
  {
    id: 'lgpl-3.0',
    name: 'LGPL 3.0',
    spdx: 'LGPL-3.0',
    slug: 'lgpl-3-0',
    permissions: ['commercial-use', 'modifications', 'distribution', 'patent-use', 'private-use'],
    conditions: ['include-copyright', 'document-changes', 'disclose-source', 'same-license--library'],
    limitations: ['liability', 'warranty'],
  },
  {
    id: 'agpl-3.0',
    name: 'AGPL 3.0',
    spdx: 'AGPL-3.0',
    slug: 'agpl-3-0',
    permissions: ['commercial-use', 'modifications', 'distribution', 'patent-use', 'private-use'],
    conditions: [
      'include-copyright',
      'document-changes',
      'disclose-source',
      'network-use-disclose',
      'same-license',
    ],
    limitations: ['liability', 'warranty'],
  },
  {
    id: 'mpl-2.0',
    name: 'MPL 2.0',
    spdx: 'MPL-2.0',
    slug: 'mpl-2-0',
    permissions: ['commercial-use', 'modifications', 'distribution', 'patent-use', 'private-use'],
    conditions: ['include-copyright', 'disclose-source', 'same-license--file'],
    limitations: ['liability', 'trademark-use', 'warranty'],
  },
  {
    id: 'epl-2.0',
    name: 'EPL 2.0',
    spdx: 'EPL-2.0',
    slug: 'epl-2-0',
    permissions: ['commercial-use', 'modifications', 'distribution', 'patent-use', 'private-use'],
    conditions: ['include-copyright', 'disclose-source', 'same-license'],
    limitations: ['liability', 'warranty'],
  },
  {
    id: 'eupl-1.2',
    name: 'EUPL 1.2',
    spdx: 'EUPL-1.2',
    slug: 'eupl-1-2',
    permissions: ['commercial-use', 'modifications', 'distribution', 'patent-use', 'private-use'],
    conditions: [
      'include-copyright',
      'document-changes',
      'disclose-source',
      'network-use-disclose',
      'same-license',
    ],
    limitations: ['liability', 'trademark-use', 'warranty'],
  },
  {
    id: 'isc',
    name: 'ISC',
    spdx: 'ISC',
    slug: 'isc-license',
    permissions: ['commercial-use', 'modifications', 'distribution', 'private-use'],
    conditions: ['include-copyright'],
    limitations: ['liability', 'warranty'],
  },
  {
    id: 'bsd-3-clause',
    name: 'BSD 3-CLAUSE',
    spdx: 'BSD-3-Clause',
    slug: 'bsd-3-clause',
    permissions: ['commercial-use', 'modifications', 'distribution', 'private-use'],
    conditions: ['include-copyright'],
    limitations: ['liability', 'warranty'],
  },
  {
    id: 'bsl-1.0',
    name: 'BSL 1.0',
    spdx: 'BSL-1.0',
    slug: 'bsl-1-0',
    permissions: ['commercial-use', 'modifications', 'distribution', 'private-use'],
    conditions: ['include-copyright--source'],
    limitations: ['liability', 'warranty'],
  },
  {
    id: 'cc0-1.0',
    name: 'CC0 1.0',
    spdx: 'CC0-1.0',
    slug: 'cc0-1-0',
    permissions: ['commercial-use', 'modifications', 'distribution', 'private-use'],
    conditions: [],
    limitations: ['liability', 'trademark-use', 'patent-use', 'warranty'],
  },
  {
    id: 'unlicense',
    name: 'UNLICENSE',
    spdx: 'Unlicense',
    slug: 'unlicense',
    permissions: ['commercial-use', 'modifications', 'distribution', 'private-use'],
    conditions: [],
    limitations: ['liability', 'warranty'],
  },
  {
    id: 'zlib',
    name: 'ZLIB',
    spdx: 'Zlib',
    slug: 'zlib-license',
    permissions: ['commercial-use', 'modifications', 'distribution', 'private-use'],
    conditions: ['include-copyright--source', 'document-changes'],
    limitations: ['liability', 'warranty'],
  },
  {
    id: '0bsd',
    name: '0BSD',
    spdx: '0BSD',
    slug: '0bsd-license',
    permissions: ['commercial-use', 'modifications', 'distribution', 'private-use'],
    conditions: [],
    limitations: ['liability', 'warranty'],
  },
];

export const featureRows: FeatureRow[] = [
  { group: 'PERMISSIONS', key: 'commercial-use', label: 'Commercial use' },
  { group: 'PERMISSIONS', key: 'modifications', label: 'Modification' },
  { group: 'PERMISSIONS', key: 'distribution', label: 'Distribution' },
  { group: 'PERMISSIONS', key: 'private-use', label: 'Private use' },
  { group: 'PERMISSIONS', key: 'patent-use', label: 'Patent grant' },
  { group: 'CONDITIONS', key: 'notice', label: 'Copyright notice' },
  { group: 'CONDITIONS', key: 'document-changes', label: 'State changes' },
  { group: 'CONDITIONS', key: 'disclose-source', label: 'Disclose source' },
  { group: 'CONDITIONS', key: 'network-use-disclose', label: 'Network disclosure' },
  { group: 'CONDITIONS', key: 'same-license', label: 'Same license (derivative)' },
  { group: 'CONDITIONS', key: 'same-license--file', label: 'Same license (file)' },
  { group: 'CONDITIONS', key: 'same-license--library', label: 'Same license (library)' },
  { group: 'LIMITATIONS', key: 'liability', label: 'Liability disclaimer' },
  { group: 'LIMITATIONS', key: 'warranty', label: 'Warranty disclaimer' },
  { group: 'LIMITATIONS', key: 'trademark-use', label: 'Trademark restriction' },
  { group: 'LIMITATIONS', key: 'patent-use', label: 'Patent restriction' },
];

export function featureValue(
  license: LicenseFeatureData,
  row: FeatureRow,
): 'yes' | 'no' | 'source' {
  if (row.key === 'notice') {
    if (license.conditions.includes('include-copyright')) return 'yes';
    if (license.conditions.includes('include-copyright--source')) return 'source';
    return 'no';
  }
  if (row.group === 'PERMISSIONS') {
    return license.permissions.includes(row.key) ? 'yes' : 'no';
  }
  if (row.group === 'CONDITIONS') {
    return license.conditions.includes(row.key) ? 'yes' : 'no';
  }
  return license.limitations.includes(row.key) ? 'yes' : 'no';
}
