export interface LetterField {
  key: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
}

export interface Letter {
  id: string;
  title: string;
  summary: string;
  audience: string;
  fields: LetterField[];
  body: string;
  notes: string[];
}

export const letters: Letter[] = [
  {
    id: 'data-access-request',
    title: 'DATA ACCESS REQUEST',
    summary: 'Ask an organization what personal data it holds about you.',
    audience: 'Everyone',
    fields: [
      { key: 'name', label: 'Your name', placeholder: 'Alex Example' },
      { key: 'email', label: 'Your email' },
      { key: 'address', label: 'Your postal address', multiline: true },
      { key: 'organization', label: 'Organization name' },
      { key: 'account', label: 'Account, email, or identifier used with the service' },
      { key: 'jurisdiction', label: 'Country or state', placeholder: 'England and Wales' },
      { key: 'date', label: 'Date', placeholder: '2026-11-04' },
    ],
    body: `To: {{organization}}
Privacy or data protection contact

Date: {{date}}

Subject: Request for access to my personal data

Dear Sir or Madam,

I am writing to request access to the personal data you hold about me, under the data protection laws applicable in {{jurisdiction}}.

I believe you process data relating to the following identifier: {{account}}.

Please provide:
1. a copy of the personal data you hold about me;
2. the purposes of the processing;
3. the categories of data concerned;
4. the recipients or categories of recipients;
5. the retention period, or the criteria used to determine it;
6. the source of the data, if it was not collected from me;
7. any automated decision-making or profiling that applies to me.

Please send the response to the contact details below.

Yours faithfully,

{{name}}
{{email}}
{{address}}`,
    notes: [
      'This is a template, not legal advice.',
      'The exact rights and response times depend on your jurisdiction.',
      'Keep a copy of the request and the date it was sent.',
    ],
  },
  {
    id: 'data-deletion-request',
    title: 'DATA DELETION REQUEST',
    summary: 'Ask an organization to delete personal data it no longer needs.',
    audience: 'Everyone',
    fields: [
      { key: 'name', label: 'Your name' },
      { key: 'email', label: 'Your email' },
      { key: 'organization', label: 'Organization name' },
      { key: 'account', label: 'Account, email, or identifier used with the service' },
      { key: 'extra', label: 'Additional data or context', multiline: true },
      { key: 'jurisdiction', label: 'Country or state' },
      { key: 'date', label: 'Date', placeholder: '2026-11-04' },
    ],
    body: `To: {{organization}}
Privacy or data protection contact

Date: {{date}}

Subject: Request for deletion of my personal data

Dear Sir or Madam,

I am writing to request the deletion of the personal data you hold about me, under the data protection laws applicable in {{jurisdiction}}.

Identifier: {{account}}

{{extra}}

Please delete the data and confirm which categories were deleted, which were retained, and the legal basis for any retention. If you have shared the data with third parties, please inform them of the request where required.

Please send the response to the contact details below.

Yours faithfully,

{{name}}
{{email}}`,
    notes: [
      'This is a template, not legal advice.',
      'Some data may be retained for legal or contractual reasons.',
      'Do not include more personal information than necessary.',
    ],
  },
  {
    id: 'dmca-takedown',
    title: 'DMCA TAKEDOWN NOTICE',
    summary: 'A draft notice for reporting allegedly infringing material hosted in the United States.',
    audience: 'Rights holders',
    fields: [
      { key: 'name', label: 'Your name' },
      { key: 'address', label: 'Your postal address', multiline: true },
      { key: 'phone', label: 'Telephone' },
      { key: 'email', label: 'Email' },
      { key: 'work', label: 'The copyrighted work' },
      { key: 'infringing_url', label: 'URL of the allegedly infringing material', multiline: true },
      { key: 'description', label: 'How the material infringes', multiline: true },
      { key: 'date', label: 'Date', placeholder: '2026-11-04' },
    ],
    body: `To: The designated copyright agent

Date: {{date}}

Subject: Notice of claimed copyright infringement under 17 U.S.C. § 512

1. I am the owner, or authorized to act on behalf of the owner, of the copyright in the following work:

{{work}}

2. The allegedly infringing material is located at:

{{infringing_url}}

3. The material is infringing because:

{{description}}

4. I have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.

5. The information in this notice is accurate, and, under penalty of perjury, I am the owner or authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.

6. My contact details:

{{name}}
{{address}}
{{phone}}
{{email}}

Signature: {{name}}`,
    notes: [
      'This is a template, not legal advice.',
      'A DMCA notice has legal consequences. Do not submit one for material you do not own or control.',
      'The service provider may have its own form or required fields.',
    ],
  },
  {
    id: 'dmca-counter-notice',
    title: 'DMCA COUNTER-NOTICE',
    summary: 'A draft response when your material was removed by mistake or misidentification.',
    audience: 'Uploaders',
    fields: [
      { key: 'name', label: 'Your name' },
      { key: 'address', label: 'Your postal address', multiline: true },
      { key: 'phone', label: 'Telephone' },
      { key: 'email', label: 'Email' },
      { key: 'removed_url', label: 'URL of the removed material', multiline: true },
      { key: 'reason', label: 'Why the removal was a mistake', multiline: true },
      { key: 'jurisdiction', label: 'Your country or state' },
      { key: 'date', label: 'Date', placeholder: '2026-11-04' },
    ],
    body: `To: The designated copyright agent

Date: {{date}}

Subject: Counter-notice under 17 U.S.C. § 512(g)

1. The material identified below was removed or disabled:

{{removed_url}}

2. I have a good-faith belief that the material was removed or disabled as a result of mistake or misidentification.

3. The reason:

{{reason}}

4. I consent to the jurisdiction of the federal district court for the judicial district in which my address is located, or if my address is outside the United States, for any judicial district in which the service provider may be found. I will accept service of process from the person who provided the original notification or an agent of that person.

5. My contact details:

{{name}}
{{address}}
{{phone}}
{{email}}
{{jurisdiction}}

Signature: {{name}}`,
    notes: [
      'This is a template, not legal advice.',
      'A counter-notice has legal consequences and may lead to litigation.',
      'Keep evidence that you have the right to use the material.',
    ],
  },
  {
    id: 'accessibility-feedback',
    title: 'ACCESSIBILITY FEEDBACK',
    summary: 'Tell a site owner about a barrier with enough detail to fix it.',
    audience: 'Everyone',
    fields: [
      { key: 'name', label: 'Your name' },
      { key: 'email', label: 'Your email' },
      { key: 'url', label: 'Page or feature' },
      { key: 'barrier', label: 'What went wrong', multiline: true },
      { key: 'technology', label: 'Browser, device, or assistive technology', placeholder: 'Safari 18 with VoiceOver' },
      { key: 'expected', label: 'What you expected', multiline: true },
      { key: 'date', label: 'Date', placeholder: '2026-11-04' },
    ],
    body: `To: The site owner

Date: {{date}}

Subject: Accessibility barrier on {{url}}

Hello,

I am reporting an accessibility barrier on {{url}}.

What happened:

{{barrier}}

What I expected:

{{expected}}

Environment: {{technology}}

I am happy to provide more detail if that helps.

{{name}}
{{email}}`,
    notes: [
      'This is a template, not legal advice.',
      'You do not have to disclose a disability to report a barrier.',
      'Specific reproduction steps are more useful than a general complaint.',
    ],
  },
  {
    id: 'security-report',
    title: 'SECURITY REPORT',
    summary: 'A clear private report for a vulnerability, with scope and reproduction steps.',
    audience: 'Researchers',
    fields: [
      { key: 'name', label: 'Your name or handle' },
      { key: 'email', label: 'Contact email' },
      { key: 'target', label: 'Affected URL or product' },
      { key: 'summary', label: 'One-line summary' },
      { key: 'steps', label: 'Reproduction steps', multiline: true },
      { key: 'impact', label: 'Observed impact', multiline: true },
      { key: 'environment', label: 'Browser, version, or environment' },
      { key: 'disclosure', label: 'Disclosure preference', placeholder: 'Private until fixed' },
      { key: 'date', label: 'Date', placeholder: '2026-11-04' },
    ],
    body: `To: The security contact

Date: {{date}}

Subject: Security report for {{target}} — {{summary}}

Hello,

I am reporting a potential security issue in {{target}}.

Reproduction steps:

{{steps}}

Observed impact:

{{impact}}

Environment: {{environment}}

I have not accessed data that is not mine, disrupted the service, or published this report. My disclosure preference is: {{disclosure}}.

Please let me know if you need more detail.

{{name}}
{{email}}`,
    notes: [
      'This is a template, not legal advice.',
      'Report privately and give the maintainer time to respond.',
      'Do not include other people’s personal data in the report.',
    ],
  },
];
