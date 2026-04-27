import type { ReactNode } from 'react';
import { Check, X } from 'lucide-react';

export function DocTable({
  headers,
  rows,
}: {
  headers: ReactNode[];
  rows: ReactNode[][];
}) {
  const cols = headers.length;
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1F2630] dark:bg-[#11161D]">
      <div
        className="grid gap-4 border-b border-[#E2E8F0] bg-[#F1F5F9] px-5 py-3 text-[12px] font-semibold uppercase tracking-wider text-[#64748B] dark:border-[#1F2630] dark:bg-[#161C25]"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {headers.map((h, i) => (
          <span key={i}>{h}</span>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div
          key={ri}
          className={`grid gap-4 px-5 py-3.5 text-[14px] ${
            ri < rows.length - 1
              ? 'border-b border-[#E2E8F0] dark:border-[#1F2630]'
              : ''
          }`}
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {row.map((cell, ci) => (
            <div
              key={ci}
              className="text-[#475569] dark:text-[#94A3B8]"
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function CheckCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[#0EA5B7]">
        <Check className="h-4 w-4" />
        <span className="text-[13px] text-[#475569] dark:text-[#94A3B8]">
          Supported
        </span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[#94A3B8]">
        <X className="h-4 w-4" />
        <span className="text-[13px]">Not supported</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[#0EA5B7]">
      <Check className="h-4 w-4" />
      <span className="text-[13px] text-[#475569] dark:text-[#94A3B8]">
        {value}
      </span>
    </span>
  );
}
