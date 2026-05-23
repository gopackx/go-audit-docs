import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { InferPageType } from 'fumadocs-core/source';
import type { source } from '@/lib/source';

const DOCS_DIR = path.join(process.cwd(), 'content', 'docs');

type DocPage = InferPageType<typeof source>;

function stripFrontmatter(src: string): string {
  if (!src.startsWith('---')) return src;
  const end = src.indexOf('\n---', 3);
  if (end === -1) return src;
  const newline = src.indexOf('\n', end + 1);
  return newline === -1 ? '' : src.slice(newline + 1).replace(/^\s+/, '');
}

async function readRaw(slugs: string[]): Promise<string | null> {
  const rel = slugs.join('/');
  const candidates = rel
    ? [path.join(DOCS_DIR, `${rel}.mdx`), path.join(DOCS_DIR, rel, 'index.mdx')]
    : [path.join(DOCS_DIR, 'index.mdx')];
  for (const file of candidates) {
    try {
      return stripFrontmatter(await fs.readFile(file, 'utf8'));
    } catch {
      // try the next candidate
    }
  }
  return null;
}

// rawMarkdownPath returns the route that serves a page's raw markdown.
export function rawMarkdownPath(slugs: string[]): string {
  return slugs.length > 0 ? `/llms/${slugs.join('/')}` : '/llms';
}

// getLLMText renders a page as standalone markdown for LLM consumption.
export async function getLLMText(page: DocPage): Promise<string> {
  const body = (await readRaw(page.slugs)) ?? '';
  const header = [`# ${page.data.title}`, `URL: ${page.url}`];
  if (page.data.description) header.splice(1, 0, '', page.data.description);
  return `${header.join('\n')}\n\n${body}`.trim() + '\n';
}
