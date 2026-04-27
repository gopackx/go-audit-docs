import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Callout, InfoNote } from '@/app/components/docs/callout';
import { NumberedChecklist } from '@/app/components/docs/checklist';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Callout,
    InfoNote,
    NumberedChecklist,
    ...components,
  };
}
