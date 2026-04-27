import Link from 'next/link';
import Image from 'next/image';
import type { ComponentType, SVGProps } from 'react';
import {
  Archive,
  ArrowRight,
  BookOpen,
  Copy,
  Database,
  Globe,
  History,
  Link as LinkIcon,
  Mail,
  MessageCircle,
  Plug,
  Rocket,
  Trash2,
} from 'lucide-react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

const features: {
  icon: IconComponent;
  title: string;
  desc: string;
  href: string;
}[] = [
  {
    icon: Database,
    title: 'Automatic data-change capture',
    desc: 'Hook into your ORM and capture every insert, update, and delete with zero boilerplate.',
    href: '/docs/features/auto-diff',
  },
  {
    icon: Globe,
    title: 'API call logging',
    desc: 'Middleware records every request and response with status, latency, and actor metadata.',
    href: '/docs/features/api-logging',
  },
  {
    icon: LinkIcon,
    title: 'Cross-concern correlation',
    desc: 'Trace IDs unify API calls and DB changes so you can replay an entire user action end-to-end.',
    href: '/docs/features/transaction-correlation',
  },
  {
    icon: History,
    title: 'Snapshot & restore',
    desc: 'Time-travel any record to any point in history and restore previous state with a single call.',
    href: '/docs/features/snapshot-restore',
  },
  {
    icon: Trash2,
    title: 'Soft-delete detection',
    desc: 'Recognises GORM, Bun and Ent soft-delete patterns automatically — no extra wiring required.',
    href: '/docs/adapters/overview',
  },
  {
    icon: Archive,
    title: 'Retention & purge',
    desc: 'Configure rolling retention windows and compliant data purge to keep storage bounded.',
    href: '/docs/guides/production-tips',
  },
];

const quickLinks: {
  icon: IconComponent;
  title: string;
  desc: string;
  href: string;
}[] = [
  {
    icon: Rocket,
    title: 'Quickstart',
    desc: 'Get auditing in 5 minutes — install, configure, and capture your first change event.',
    href: '/docs/getting-started/installation',
  },
  {
    icon: BookOpen,
    title: 'API Reference',
    desc: 'Every type, function, and option documented with copy-pasteable Go examples.',
    href: '/docs/api',
  },
  {
    icon: Plug,
    title: 'ORM Adapters',
    desc: 'Detailed integration recipes for GORM, Bun, and Ent — including custom hooks.',
    href: '/docs/adapters/overview',
  },
];

const footerCols: { title: string; links: { text: string; url: string }[] }[] =
  [
    {
      title: 'Product',
      links: [
        { text: 'Features', url: '#features' },
        { text: 'Adapters', url: '/docs/adapters/overview' },
        { text: 'Changelog', url: '/docs/changelog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Docs', url: '/docs/getting-started/installation' },
        { text: 'API Reference', url: '/docs/api-reference' },
        { text: 'Examples', url: '/docs/examples/basic' },
        {
          text: 'Migration guide',
          url: '/docs/guides/migration-from-manual',
        },
      ],
    },
    {
      title: 'Community',
      links: [
        { text: 'GitHub', url: 'https://github.com/gopackx/go-audit' },
        {
          text: 'Discussions',
          url: 'https://github.com/gopackx/go-audit/discussions',
        },
        {
          text: 'Contributors',
          url: 'https://github.com/gopackx/go-audit/graphs/contributors',
        },
        {
          text: 'License',
          url: 'https://github.com/gopackx/go-audit/blob/main/LICENSE',
        },
      ],
    },
  ];

const goSnippet = `// Initialise the auditor
auditor, err := goaudit.New(goaudit.Config{
    DB:     db,
    Driver: goaudit.PostgreSQL,
    Tables: goaudit.Tables{
        DataChanges: "audit_logs",
        APICalls:    "api_logs",
    },
})

// Run schema migration
auditor.Migrate(ctx)

// Plug into GORM
gormdb.Use(gormadapter.New(auditor))`;

const cls = {
  bgBase: 'bg-white dark:bg-[#0B0F14]',
  bgSurface: 'bg-[#F8FAFC] dark:bg-[#11161D]',
  bgElevated: 'bg-[#F1F5F9] dark:bg-[#161C25]',
  textPrimary: 'text-[#0F172A] dark:text-[#F1F5F9]',
  textSecondary: 'text-[#475569] dark:text-[#94A3B8]',
  borderSubtle: 'border-[#E2E8F0] dark:border-[#1F2630]',
  borderDefault: 'border-[#CBD5E1] dark:border-[#2A323D]',
};

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions}>
      <main className={`${cls.bgBase} ${cls.textPrimary}`}>
        <Hero />
        <Stats />
        <Features />
        <CodeExample />
        <QuickLinks />
        <SiteFooter />
      </main>
    </HomeLayout>
  );
}

function Hero() {
  return (
    <section
      className={`flex flex-col items-stretch px-[22px] py-6 md:items-center md:px-8 md:py-[120px] ${cls.bgBase}`}
    >
      <div className="flex flex-col items-stretch gap-4 md:items-center md:gap-6">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#0EA5B7] bg-[#0EA5B7]/[0.08] px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0EA5B7]" />
          <span className="text-xs font-semibold tracking-tight text-[#0EA5B7]">
            v1.0 · MIT
          </span>
        </span>

        <h1
          className={`text-[32px] font-bold leading-[1.15] tracking-[-0.5px] md:max-w-[900px] md:text-center md:text-5xl md:leading-[1.05] md:tracking-[-2px] lg:text-[68px] ${cls.textPrimary}`}
        >
          Audit trails for Go, made effortless.
        </h1>

        <p
          className={`text-[15px] leading-[1.55] md:max-w-[720px] md:text-center md:text-base lg:text-[19px] ${cls.textSecondary}`}
        >
          Automatic data-change capture, API call logging, and time-travel
          snapshots — with zero external dependencies in the core.
        </p>

        <div className="flex w-full flex-col items-stretch gap-2.5 pt-1 md:w-auto md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-3 md:pt-0">
          <Link
            href="/docs/getting-started/installation"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[#0EA5B7] px-[22px] text-[15px] font-semibold text-[#0F172A] transition hover:opacity-90 md:h-auto md:rounded-lg md:py-[14px]"
          >
            Get started <span aria-hidden>→</span>
          </Link>
          <Link
            href="https://github.com/gopackx/go-audit"
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border px-[22px] text-[15px] font-semibold transition hover:opacity-90 md:h-auto md:rounded-lg md:py-[14px] ${cls.borderDefault} ${cls.bgSurface} ${cls.textPrimary}`}
          >
            <GithubIcon className="h-4 w-4" />
            <span className="md:hidden">GitHub</span>
            <span className="hidden md:inline">View on GitHub</span>
          </Link>
        </div>

        <div
          className={`flex items-center justify-between gap-3 rounded-[10px] border px-[14px] py-3 font-mono text-xs md:w-auto md:justify-start md:rounded-lg md:py-[10px] md:text-[13px] ${cls.borderSubtle} ${cls.bgSurface}`}
        >
          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            <span className="hidden text-[#64748B] md:inline">$</span>
            <span className={`truncate ${cls.textPrimary}`}>
              go get github.com/gopackx/go-audit
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden h-[18px] w-px bg-[#E2E8F0] md:inline-block dark:bg-[#1F2630]" />
            <Copy className="h-4 w-4 text-[#64748B]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const mobileStats: { value: string; label: string }[] = [
    { value: '0', label: 'core deps' },
    { value: '3', label: 'ORMs' },
    { value: '3', label: 'DBs' },
    { value: 'MIT', label: 'License' },
  ];
  const desktopStats: { value: string; label: string; highlight: boolean }[] = [
    { value: '0 deps', label: 'in core', highlight: true },
    { value: '0', label: 'GitHub stars', highlight: true },
    {
      value: 'PostgreSQL · MySQL · SQLite',
      label: 'Supported databases',
      highlight: false,
    },
    { value: 'MIT', label: 'License', highlight: true },
  ];
  return (
    <section
      className={`px-[22px] py-2 md:border-y md:bg-[#F8FAFC] md:px-8 md:py-10 md:dark:bg-[#11161D] ${cls.borderSubtle}`}
    >
      <div className="grid grid-cols-4 gap-2 md:hidden">
        {mobileStats.map((s) => (
          <div
            key={s.label}
            className={`flex flex-col gap-0.5 rounded-[10px] border px-3 py-2.5 ${cls.borderSubtle} ${cls.bgSurface}`}
          >
            <span className={`text-[18px] font-bold leading-none ${cls.textPrimary}`}>
              {s.value}
            </span>
            <span className="text-[11px] text-[#64748B]">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="mx-auto hidden max-w-[1200px] flex-wrap items-center justify-around gap-x-6 gap-y-8 sm:justify-between md:flex">
        {desktopStats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <span
              className={
                s.highlight
                  ? 'text-[28px] font-bold leading-none text-[#0EA5B7]'
                  : `text-[18px] font-semibold leading-none ${cls.textPrimary}`
              }
            >
              {s.value}
            </span>
            <span className="text-[13px] text-[#64748B]">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section
      id="features"
      className={`flex flex-col items-stretch gap-4 px-[22px] py-5 md:items-center md:gap-12 md:px-8 md:py-[100px] ${cls.bgBase}`}
    >
      <div className="flex flex-col items-stretch gap-1.5 md:items-center md:gap-3">
        <span className="text-[11px] font-semibold tracking-[1.2px] text-[#0EA5B7] md:text-xs md:font-bold md:tracking-[2px]">
          <span className="md:hidden">WHAT IT DOES</span>
          <span className="hidden md:inline">FEATURES</span>
        </span>
        <h2
          className={`text-[22px] font-bold leading-[1.25] tracking-[-0.3px] md:max-w-[800px] md:text-center md:text-3xl md:leading-tight md:tracking-tight lg:text-[40px] ${cls.textPrimary}`}
        >
          <span className="md:hidden">
            Everything you need to audit confidently.
          </span>
          <span className="hidden md:inline">
            Everything you need to ship audit-ready
          </span>
        </h2>
        <p
          className={`hidden md:block md:max-w-[720px] md:text-center md:text-base ${cls.textSecondary}`}
        >
          Battle-tested primitives that drop into any Go service, big or small.
        </p>
      </div>

      <div className="flex w-full max-w-[1200px] flex-col gap-2.5 md:grid md:grid-cols-1 md:gap-5 lg:grid-cols-3">
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  href,
}: {
  icon: IconComponent;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`group grid grid-cols-[40px_1fr] items-start gap-x-3.5 gap-y-1 rounded-[14px] border p-4 outline-none transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#0EA5B7]/40 hover:shadow-[0_8px_20px_-4px_rgba(14,165,183,0.25),0_2px_6px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.08)] focus-visible:border-[#0EA5B7] focus-visible:shadow-[0_8px_20px_-4px_rgba(14,165,183,0.25),0_2px_6px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.08)] dark:hover:border-[#0EA5B7]/40 dark:hover:shadow-[0_10px_28px_-4px_rgba(14,165,183,0.4),0_16px_rgba(14,165,183,0.2),0_1px_rgba(255,255,255,0.1)] dark:focus-visible:shadow-[0_10px_28px_-4px_rgba(14,165,183,0.4),0_16px_rgba(14,165,183,0.2),0_1px_rgba(255,255,255,0.1)] md:grid-cols-1 md:gap-y-4 md:rounded-xl md:p-7 ${cls.borderSubtle} ${cls.bgSurface}`}
    >
      <div className="row-span-2 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#0EA5B7]/[0.08] md:row-span-1 md:h-11 md:w-11">
        <Icon className="h-5 w-5 text-[#0EA5B7]" />
      </div>
      <h3
        className={`text-[15px] font-semibold leading-tight transition-colors group-hover:text-[#0EA5B7] md:text-[17px] ${cls.textPrimary}`}
      >
        {title}
      </h3>
      <p
        className={`text-[13px] leading-[1.5] md:text-sm md:leading-[1.55] ${cls.textSecondary}`}
      >
        {desc}
      </p>
    </Link>
  );
}

function CodeExample() {
  const pills = ['GORM hook', 'Auto migrations', 'Trace IDs propagated'];
  return (
    <section
      className={`px-[22px] py-1 md:border-y md:bg-[#F8FAFC] md:px-8 md:py-[100px] md:dark:bg-[#11161D] ${cls.borderSubtle}`}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-3.5 md:gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5 md:gap-5">
          <span className="text-[11px] font-semibold tracking-[1.2px] text-[#0EA5B7] md:text-xs md:font-bold md:tracking-[2px]">
            <span className="md:hidden">INTEGRATION</span>
            <span className="hidden md:inline">DROP-IN INTEGRATION</span>
          </span>
          <h2
            className={`text-[22px] font-bold leading-[1.25] tracking-[-0.3px] md:text-3xl md:leading-[1.1] md:tracking-tight lg:text-[38px] ${cls.textPrimary}`}
          >
            Drop-in for GORM
          </h2>
          <p className={`text-[13px] leading-[1.55] md:text-base md:leading-[1.65] ${cls.textSecondary}`}>
            Three lines of setup is all it takes. Register the auditor, run the
            migration, and plug it into your ORM. go-audit takes over from there
            — capturing changes, snapshots, and correlation IDs across your
            stack.
          </p>
          <div className="hidden flex-wrap gap-2 md:flex">
            {pills.map((p) => (
              <span
                key={p}
                className={`rounded-full border px-3 py-1.5 text-xs ${cls.borderSubtle} ${cls.bgElevated} ${cls.textSecondary}`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`overflow-hidden rounded-xl border bg-white dark:bg-[#0A0E13] ${cls.borderDefault}`}
        >
          <div
            className={`flex items-center gap-2 border-b px-3.5 py-2.5 md:h-10 md:px-4 md:py-0 ${cls.borderSubtle} ${cls.bgElevated}`}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57] md:h-3 md:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E] md:h-3 md:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840] md:h-3 md:w-3" />
            </div>
            <span className="flex-1 text-center font-mono text-[11px] text-[#64748B] md:text-xs">
              main.go
            </span>
            <span className="w-8 md:w-[42px]" />
          </div>
          <pre
            className={`overflow-x-auto px-4 py-4 font-mono text-[11px] leading-[1.6] md:px-6 md:py-6 md:text-[13px] ${cls.textPrimary}`}
          >
            <code>{goSnippet}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section
      className={`flex flex-col items-stretch gap-4 px-[22px] py-1 md:items-center md:gap-12 md:px-8 md:py-[100px] ${cls.bgBase}`}
    >
      <div className="flex flex-col items-stretch gap-1.5 md:items-center md:gap-3">
        <span className="text-[11px] font-semibold tracking-[1.2px] text-[#0EA5B7] md:text-xs md:font-bold md:tracking-[2px]">
          DIVE DEEPER
        </span>
        <h2
          className={`text-[22px] font-bold leading-[1.25] tracking-[-0.3px] md:text-3xl md:tracking-tight lg:text-[36px] ${cls.textPrimary}`}
        >
          <span className="md:hidden">Browse the docs</span>
          <span className="hidden md:inline">Pick where to start</span>
        </h2>
      </div>

      <div className="flex w-full max-w-[1200px] flex-col gap-2.5 md:grid md:grid-cols-1 md:gap-5 lg:grid-cols-3">
        {quickLinks.map((l) => (
          <QuickLinkCard key={l.title} {...l} />
        ))}
      </div>
    </section>
  );
}

function QuickLinkCard({
  icon: Icon,
  title,
  desc,
  href,
}: {
  icon: IconComponent;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-xl border transition hover:border-[#0EA5B7] ${cls.borderSubtle} ${cls.bgSurface}`}
    >
      <div className="flex items-center justify-between gap-3 px-[18px] py-4 md:hidden">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className={`text-[15px] font-semibold ${cls.textPrimary}`}>
            {title}
          </span>
          <span className="text-xs leading-[1.5] text-[#64748B]">{desc}</span>
        </div>
        <ArrowRight className="h-[18px] w-[18px] shrink-0 text-[#0EA5B7] transition group-hover:translate-x-0.5" />
      </div>
      <div className="hidden flex-col gap-4 p-8 md:flex">
        <Icon className="h-7 w-7 text-[#0EA5B7]" />
        <div className="flex items-center gap-1.5">
          <span className={`text-xl font-semibold ${cls.textPrimary}`}>
            {title}
          </span>
          <span className="text-xl font-semibold text-[#0EA5B7] transition group-hover:translate-x-0.5">
            →
          </span>
        </div>
        <p className={`text-sm leading-[1.55] ${cls.textSecondary}`}>{desc}</p>
      </div>
    </Link>
  );
}

function SiteFooter() {
  const social: { Icon: IconComponent; href: string; label: string }[] = [
    {
      Icon: GithubIcon,
      href: 'https://github.com/gopackx/go-audit',
      label: 'GitHub',
    },
    { Icon: XIcon, href: '#', label: 'X' },
    { Icon: MessageCircle, href: '#', label: 'Discord' },
    { Icon: Mail, href: '#', label: 'Email' },
  ];
  return (
    <footer
      className={`border-t px-[22px] pb-6 pt-6 md:px-8 md:pb-8 md:pt-16 ${cls.borderSubtle} ${cls.bgSurface}`}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 md:gap-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 hidden flex-col gap-3 lg:flex lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/go-audit-primary-logo.png"
                alt="go-audit"
                width={24}
                height={24}
              />
              <span className={`font-semibold ${cls.textPrimary}`}>
                Go Audit
              </span>
            </div>
            <p className="whitespace-pre-line text-[13px] leading-[1.6] text-[#64748B]">
              {'Audit trails for Go,\nmade effortless.'}
            </p>
          </div>

          {footerCols.map((col, i) => (
            <div
              key={col.title}
              className={`flex flex-col gap-3 md:gap-4 ${i >= 2 ? 'hidden lg:flex' : ''}`}
            >
              <span
                className={`text-[12px] font-bold tracking-[0.8px] md:text-[13px] md:tracking-[1px] ${cls.textPrimary}`}
              >
                {col.title}
              </span>
              <ul className="flex flex-col gap-2.5 md:gap-3">
                {col.links.map((l) => (
                  <li key={l.text}>
                    <Link
                      href={l.url}
                      className={`text-[13px] transition hover:text-[#0F172A] dark:hover:text-[#F1F5F9] ${cls.textSecondary} md:text-[#64748B] md:dark:text-[#64748B]`}
                    >
                      {l.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-[#E2E8F0] dark:bg-[#1F2630]" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-3">
          <div className="flex items-center gap-3.5 md:order-2 md:gap-2.5">
            {social.map(({ Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] transition md:border md:border-[#E2E8F0] md:bg-[#F1F5F9] md:text-[#475569] md:hover:bg-white md:dark:border-[#1F2630] md:dark:bg-[#161C25] md:dark:text-[#94A3B8] md:dark:hover:bg-[#11161D]"
              >
                <Icon className="h-[18px] w-[18px] md:h-4 md:w-4" />
              </Link>
            ))}
          </div>
          <span className="text-xs text-[#64748B] md:order-1 md:text-[13px]">
            © 2026 gopackx · Go Audit · MIT License
          </span>
        </div>
      </div>
    </footer>
  );
}
