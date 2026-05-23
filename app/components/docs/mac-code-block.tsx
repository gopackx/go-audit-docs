'use client';

import {
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
  type RefObject,
} from 'react';
import {
  CodeBlock,
  type CodeBlockProps,
  Pre,
} from 'fumadocs-ui/components/codeblock';
import { Check, Copy } from 'lucide-react';

// Shell/command languages: plain code block, but keep the copy button (you
// want to copy commands).
const COMMAND_LANGS = new Set([
  'bash',
  'sh',
  'shell',
  'shellscript',
  'zsh',
  'console',
  'powershell',
  'ps',
  'ps1',
  'bat',
  'cmd',
]);

// Output / result / log blocks: plain code block with NO copy button (there's
// nothing useful to copy). A fence with no language resolves to "plaintext"
// via rehype-code's defaultLanguage.
const OUTPUT_LANGS = new Set([
  'text',
  'plaintext',
  'txt',
  'ansi',
  'log',
  'output',
]);

// Friendly display names for the file-type label.
const LANG_NAMES: Record<string, string> = {
  go: 'Go',
  json: 'JSON',
  jsonc: 'JSON',
  sql: 'SQL',
  ts: 'TypeScript',
  tsx: 'TSX',
  js: 'JavaScript',
  jsx: 'JSX',
  yaml: 'YAML',
  yml: 'YAML',
  toml: 'TOML',
  dockerfile: 'Dockerfile',
  md: 'Markdown',
  mdx: 'MDX',
  http: 'HTTP',
  diff: 'Diff',
  text: 'Text',
  plaintext: 'Text',
};

function codeLanguage(children: ReactNode): string | undefined {
  if (isValidElement(children)) {
    const className = (children.props as { className?: string }).className ?? '';
    return /language-([\w-]+)/.exec(className)?.[1]?.toLowerCase();
  }
  return undefined;
}

function langLabel(lang?: string): string {
  if (!lang) return 'Code';
  return LANG_NAMES[lang] ?? lang.toUpperCase();
}

// MacDots renders the three "traffic light" buttons of a macOS window.
function MacDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="size-3 rounded-full bg-[#FF5F57]" />
      <span className="size-3 rounded-full bg-[#FEBC2E]" />
      <span className="size-3 rounded-full bg-[#28C840]" />
    </div>
  );
}

function CopyButton({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const [copied, setCopied] = useState(false);

  function onClick() {
    const pre = targetRef.current?.querySelector('pre');
    if (!pre) return;
    const clone = pre.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('.nd-copy-ignore').forEach((n) => n.remove());
    void navigator.clipboard.writeText(clone.textContent ?? '');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      aria-label="Copy code"
      onClick={onClick}
      className="inline-flex size-6 items-center justify-center rounded-md text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      {copied ? (
        <Check className="size-3.5 text-[#28C840]" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}

function MacWindow({
  children,
  title,
  lang,
  figureProps,
}: {
  children: ReactNode;
  title?: string;
  lang?: string;
  figureProps: ComponentProps<'figure'>;
}) {
  const ref = useRef<HTMLElement>(null);
  const [stats, setStats] = useState<{ lines: number; chars: number } | null>(
    null,
  );

  useEffect(() => {
    const pre = ref.current?.querySelector('pre');
    if (!pre) return;
    const text = (pre.textContent ?? '').replace(/\n$/, '');
    const lines = pre.querySelectorAll('.line').length || text.split('\n').length;
    setStats({ lines, chars: text.length });
  }, []);

  const { className, ...rest } = figureProps;
  const label = langLabel(lang);

  return (
    <figure
      ref={ref}
      dir="ltr"
      {...rest}
      className={`shiki not-prose my-4 overflow-hidden rounded-xl border bg-fd-card text-sm shadow-sm ${className ?? ''}`}
    >
      <div className="flex h-9.5 items-center gap-3 border-b px-4">
        <MacDots />
        {title ? (
          <figcaption className="truncate font-mono text-[13px] text-fd-muted-foreground">
            {title}
          </figcaption>
        ) : null}
        <span className="ms-auto rounded-md bg-fd-secondary px-2 py-0.5 text-[11px] font-medium text-fd-muted-foreground">
          {label}
        </span>
        <CopyButton targetRef={ref} />
      </div>

      <div
        role="region"
        tabIndex={0}
        className="fd-scroll-container max-h-[600px] overflow-auto py-3.5 focus-visible:outline-none"
      >
        <Pre>{children}</Pre>
      </div>

      <div className="flex h-8 items-center justify-between border-t px-4 text-[11px] text-fd-muted-foreground">
        <span>{title ? label : `${label} snippet`}</span>
        <span>{stats ? `${stats.lines} lines · ${stats.chars} chars` : ''}</span>
      </div>
    </figure>
  );
}

// MacCodeBlock overrides the MDX `pre` element. Real source code renders inside
// a macOS-style window — header shows the filename and file type, footer shows
// line/character info. Shell/command blocks render as a plain code block.
export function MacCodeBlock({ children, ...props }: ComponentProps<'pre'>) {
  const lang = codeLanguage(children);

  // Shell/command → plain block, keep copy button.
  if (lang && COMMAND_LANGS.has(lang)) {
    return (
      <CodeBlock {...(props as CodeBlockProps)}>
        <Pre>{children}</Pre>
      </CodeBlock>
    );
  }

  // Output/result/log, or a fence with no language → plain block, no copy.
  if (!lang || OUTPUT_LANGS.has(lang)) {
    return (
      <CodeBlock {...(props as CodeBlockProps)} allowCopy={false}>
        <Pre>{children}</Pre>
      </CodeBlock>
    );
  }

  const { title, icon: _icon, ...figureProps } = props as ComponentProps<'pre'> & {
    title?: string;
    icon?: ReactNode;
  };

  return (
    <MacWindow title={title} lang={lang} figureProps={figureProps as ComponentProps<'figure'>}>
      {children}
    </MacWindow>
  );
}
