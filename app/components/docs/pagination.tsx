import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function DocPagination({
  prev,
  next,
}: {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}) {
  return (
    <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="flex flex-col gap-1.5 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] px-5 py-4 transition hover:border-[#0EA5B7] dark:border-[#2A323D] dark:bg-[#11161D]"
        >
          <span className="flex items-center gap-1.5 text-xs tracking-[0.4px] text-[#64748B]">
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous
          </span>
          <span className="text-base font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
            {prev.label}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="flex flex-col items-end gap-1.5 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] px-5 py-4 transition hover:border-[#0EA5B7] dark:border-[#2A323D] dark:bg-[#11161D]"
        >
          <span className="flex items-center gap-1.5 text-xs tracking-[0.4px] text-[#64748B]">
            Next
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="text-base font-semibold text-[#0EA5B7]">
            {next.label} →
          </span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
