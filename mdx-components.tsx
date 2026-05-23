import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Callout, InfoNote } from '@/app/components/docs/callout';
import { NumberedChecklist } from '@/app/components/docs/checklist';
import { MacCodeBlock } from '@/app/components/docs/mac-code-block';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Render every fenced code block as a macOS-style window.
    pre: MacCodeBlock,
    Callout,
    InfoNote,
    NumberedChecklist,
    ...components,
  };
}
