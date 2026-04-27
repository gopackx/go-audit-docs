import type { ReactNode } from 'react';

export function NumberedChecklist({ items }: { items: ReactNode[] }) {
  return (
    <ol className="flex flex-col gap-3.5 pt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3.5">
          <span className="mt-0.5 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-[#CBD5E1] bg-[#F1F5F9] font-mono text-xs font-semibold text-[#475569] dark:border-[#2A323D] dark:bg-[#161C25] dark:text-[#94A3B8]">
            {i + 1}
          </span>
          <div className="flex-1 pt-[3px] text-[15px] leading-[1.6] text-[#475569] dark:text-[#94A3B8]">
            {item}
          </div>
        </li>
      ))}
    </ol>
  );
}
