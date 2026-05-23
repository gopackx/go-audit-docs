import { source } from '@/lib/source';
import { getLLMText } from '@/lib/llm-content';

export const revalidate = false;

export async function GET() {
  const pages = source.getPages();
  const docs = await Promise.all(pages.map((page) => getLLMText(page)));

  return new Response(docs.join('\n\n---\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
