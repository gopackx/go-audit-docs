import type { ReactNode } from 'react';
import Link from 'next/link';

export function DocBreadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-[13px] text-[#64748B]"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-[#0F172A] dark:hover:text-[#F1F5F9]">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[#475569] dark:text-[#94A3B8]">
              {item.label}
            </span>
          )}
          {i < items.length - 1 ? <span aria-hidden>/</span> : null}
        </span>
      ))}
    </nav>
  );
}

export function DocTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1px] text-[#0F172A] dark:text-[#F1F5F9]">
      {children}
    </h1>
  );
}

export function DocLead({ children }: { children: ReactNode }) {
  return (
    <p className="text-[17px] leading-[1.6] text-[#475569] dark:text-[#94A3B8]">
      {children}
    </p>
  );
}

export function DocSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2
        id={id}
        className="scroll-mt-24 text-[24px] font-semibold tracking-[-0.4px] text-[#0F172A] dark:text-[#F1F5F9]"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function DocP({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] leading-[1.6] text-[#475569] dark:text-[#94A3B8]">
      {children}
    </p>
  );
}
