import { source } from '@/lib/source';
import { rawMarkdownPath } from '@/lib/llm-content';

export const revalidate = false;

export function GET() {
  const pages = source.getPages();
  const lines = [
    '# Go Audit',
    '',
    'Automated audit trail and API call logging for Go applications, with adapter-based support for GORM, Bun, and Ent across PostgreSQL, MySQL, and SQLite.',
    '',
    '## Docs',
    '',
    ...pages.map((page) => {
      const desc = page.data.description ? `: ${page.data.description}` : '';
      return `- [${page.data.title}](${rawMarkdownPath(page.slugs)})${desc}`;
    }),
  ];

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
