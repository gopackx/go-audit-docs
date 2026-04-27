import type { ReactNode } from 'react';
import { T } from './code-block';

export type BadgeKind = 'read' | 'write' | 'async' | 'sync' | 'mutating' | 'public';

const badgeStyles: Record<BadgeKind, string> = {
  read: 'border-[#0EA5B7]/40 bg-[#0EA5B7]/[0.08] text-[#0EA5B7]',
  write: 'border-[#F59E0B]/40 bg-[#F59E0B]/[0.08] text-[#F59E0B]',
  async: 'border-[#8B5CF6]/40 bg-[#8B5CF6]/[0.08] text-[#8B5CF6]',
  sync: 'border-[#64748B]/40 bg-[#64748B]/[0.08] text-[#475569] dark:text-[#94A3B8]',
  mutating: 'border-[#DC2626]/40 bg-[#DC2626]/[0.08] text-[#DC2626]',
  public: 'border-[#10B981]/40 bg-[#10B981]/[0.08] text-[#10B981]',
};

export function Badge({ kind, children }: { kind: BadgeKind; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide ${badgeStyles[kind]}`}
    >
      {children}
    </span>
  );
}

export function ApiMethodCard({
  id,
  signature,
  badges,
  description,
  params,
  returns,
  example,
}: {
  id?: string;
  signature: ReactNode;
  badges?: { kind: BadgeKind; label: string }[];
  description: ReactNode;
  params?: { name: string; type: ReactNode; desc: ReactNode }[];
  returns: ReactNode;
  example: ReactNode;
}) {
  return (
    <div
      id={id}
      className="flex overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1F2630] dark:bg-[#11161D]"
    >
      <div className="w-1 shrink-0 bg-[#0EA5B7]" />
      <div className="flex flex-1 flex-col gap-3.5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-[15px] font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
            {signature}
          </div>
          {badges && badges.length > 0 ? (
            <div className="flex items-center gap-2">
              {badges.map((b) => (
                <Badge key={b.label} kind={b.kind}>
                  {b.label}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
        <p className="text-sm leading-[1.6] text-[#475569] dark:text-[#94A3B8]">
          {description}
        </p>
        {params && params.length > 0 ? <ParamsTable params={params} /> : null}
        <ReturnsRow>{returns}</ReturnsRow>
        <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-white dark:border-[#1F2630] dark:bg-[#0A0E13]">
          {example}
        </div>
      </div>
    </div>
  );
}

function ParamsTable({
  params,
}: {
  params: { name: string; type: ReactNode; desc: ReactNode }[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-white dark:border-[#1F2630] dark:bg-[#0B0F14]">
      <div className="grid grid-cols-[1fr_1.2fr_2fr] gap-4 border-b border-[#E2E8F0] bg-[#F1F5F9] px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] dark:border-[#1F2630] dark:bg-[#161C25]">
        <span>Parameter</span>
        <span>Type</span>
        <span>Description</span>
      </div>
      {params.map((p, i) => (
        <div
          key={p.name}
          className={`grid grid-cols-[1fr_1.2fr_2fr] gap-4 px-4 py-3.5 text-sm leading-[1.5] ${
            i < params.length - 1
              ? 'border-b border-[#E2E8F0] dark:border-[#1F2630]'
              : ''
          }`}
        >
          <code className="font-mono text-[13px] text-[#0F172A] dark:text-[#F1F5F9]">
            {p.name}
          </code>
          <code className="font-mono text-[13px] text-[#0550AE] dark:text-[#F472B6]">
            {p.type}
          </code>
          <span className="text-[13px] text-[#475569] dark:text-[#94A3B8]">
            {p.desc}
          </span>
        </div>
      ))}
    </div>
  );
}

function ReturnsRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 dark:border-[#1F2630] dark:bg-[#0B0F14]">
      <span className="w-[140px] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
        Returns
      </span>
      <code className="font-mono text-[13px] text-[#CF222E] dark:text-[#F87171]">
        {children}
      </code>
    </div>
  );
}

export function ApiCodeExample({
  filename,
  children,
}: {
  filename?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F1F5F9] px-4 py-2.5 dark:border-[#1F2630] dark:bg-[#161C25]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        {filename ? (
          <span className="font-mono text-[11px] text-[#64748B]">
            {filename}
          </span>
        ) : null}
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-[1.6] text-[#0F172A] dark:text-[#F1F5F9]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export { T };
