import type { ReactNode } from 'react';
import { Copy } from 'lucide-react';

export function MacCodeBlock({
  filename,
  children,
}: {
  filename?: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A323D] dark:bg-[#0A0E13]">
      <div className="flex h-9 items-center gap-3 border-b border-[#E2E8F0] bg-[#F1F5F9] px-3.5 dark:border-[#1F2630] dark:bg-[#161C25]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        {filename ? (
          <span className="flex-1 text-center font-mono text-xs text-[#64748B]">
            {filename}
          </span>
        ) : (
          <span className="flex-1" />
        )}
        <span className="w-[60px]" />
      </div>
      <pre className="overflow-x-auto px-6 py-5 font-mono text-[13.5px] leading-[1.6] text-[#0F172A] dark:text-[#F1F5F9]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function InlineCodeBlock({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4 dark:border-[#1F2630] dark:bg-[#11161D]">
      <code className="overflow-x-auto whitespace-nowrap font-mono text-[13.5px] text-[#0F172A] dark:text-[#F1F5F9]">
        {children}
      </code>
      <Copy className="h-4 w-4 shrink-0 text-[#64748B]" />
    </div>
  );
}

const tokenColors = {
  comment: 'text-[#64748B]',
  keyword: 'text-[#8250DF] dark:text-[#C084FC]',
  string: 'text-[#0A3069] dark:text-[#86EFAC]',
  fn: 'text-[#8250DF] dark:text-[#60A5FA]',
  prop: 'text-[#0550AE] dark:text-[#F472B6]',
  err: 'text-[#CF222E] dark:text-[#F87171]',
  muted: 'text-[#475569] dark:text-[#94A3B8]',
} as const;

export type Token = keyof typeof tokenColors;

export function T({
  t,
  children,
}: {
  t: Token;
  children: ReactNode;
}) {
  return <span className={tokenColors[t]}>{children}</span>;
}
