import Link from 'next/link';
import type { ReactNode } from 'react';

export function DocTabs({
  tabs,
  active,
  children,
}: {
  tabs: { label: string; href: string }[];
  active: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex border-b border-[#E2E8F0] dark:border-[#1F2630]">
        {tabs.map((t) => {
          const isActive = t.label === active;
          return (
            <Link
              key={t.label}
              href={t.href}
              className={
                isActive
                  ? 'border-b-2 border-[#0EA5B7] px-4 py-3 text-[14px] font-semibold text-[#0EA5B7]'
                  : 'border-b-2 border-transparent px-4 py-3 text-[14px] font-medium text-[#64748B] transition hover:text-[#0F172A] dark:hover:text-[#F1F5F9]'
              }
            >
              {t.label}
            </Link>
          );
        })}
      </div>
      <div className="pt-4">{children}</div>
    </div>
  );
}

export function AdapterCard({
  name,
  description,
  href,
  active,
  logo,
}: {
  name: string;
  description: string;
  href: string;
  active?: boolean;
  logo?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col gap-3.5 rounded-xl border bg-[#F8FAFC] p-5 transition dark:bg-[#11161D] ${
        active
          ? 'border-[#0EA5B7]'
          : 'border-[#CBD5E1] hover:border-[#0EA5B7] dark:border-[#2A323D]'
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg ${
          active
            ? 'bg-[#0EA5B7]/[0.08] text-[#0EA5B7]'
            : 'bg-[#F1F5F9] text-[#475569] dark:bg-[#161C25] dark:text-[#94A3B8]'
        }`}
      >
        {logo}
      </div>
      <span className="text-[16px] font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
        {name}
      </span>
      <p className="text-[13px] leading-[1.5] text-[#64748B]">{description}</p>
      <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0EA5B7]">
        View docs <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
