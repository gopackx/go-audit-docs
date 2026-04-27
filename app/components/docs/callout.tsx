import type { ReactNode } from 'react';
import { Info, TriangleAlert, Lightbulb } from 'lucide-react';

const variants = {
  info: {
    icon: Info,
    border: 'border-l-[#0EA5B7]',
    bg: 'bg-[#0EA5B7]/[0.08]',
    iconColor: 'text-[#0EA5B7]',
  },
  warn: {
    icon: TriangleAlert,
    border: 'border-l-[#F59E0B]',
    bg: 'bg-[#F59E0B]/[0.08]',
    iconColor: 'text-[#F59E0B]',
  },
  tip: {
    icon: Lightbulb,
    border: 'border-l-[#10B981]',
    bg: 'bg-[#10B981]/[0.08]',
    iconColor: 'text-[#10B981]',
  },
} as const;

export function Callout({
  type = 'info',
  children,
}: {
  type?: keyof typeof variants;
  children: ReactNode;
}) {
  const v = variants[type];
  const Icon = v.icon;
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border-l-[3px] py-3.5 pl-[18px] pr-4 text-sm leading-[1.55] text-[#0F172A] dark:text-[#F1F5F9] ${v.border} ${v.bg}`}
    >
      <Icon className={`mt-0.5 h-[18px] w-[18px] shrink-0 ${v.iconColor}`} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function InfoNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[13px] text-[#64748B]">
      <Info className="h-3.5 w-3.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
