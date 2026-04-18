import Link from 'next/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';

const features = [
  {
    title: 'ORM Auto-Hooks',
    description:
      'Automatic create/update/delete tracking via GORM, Bun, and Ent plugins.',
    href: '/docs/adapters/overview',
  },
  {
    title: 'Auto Diff',
    description:
      'Captures old vs new values automatically. Stores only changed fields.',
    href: '/docs/features/auto-diff',
  },
  {
    title: 'API Call Logging',
    description:
      'Track third-party API calls with request/response, duration, and status.',
    href: '/docs/features/api-logging',
  },
  {
    title: 'Multi-Database',
    description:
      'First-class support for PostgreSQL, MySQL, and SQLite with dialect-aware optimization.',
    href: '/docs/features/multi-database',
  },
  {
    title: 'Auto Redaction',
    description:
      'Sensitive data (API keys, passwords) automatically redacted before storage.',
    href: '/docs/features/redaction',
  },
  {
    title: 'Transaction Correlation',
    description:
      'Link data changes and API calls with shared transaction IDs for full traceability.',
    href: '/docs/features/transaction-correlation',
  },
  {
    title: 'Custom Table Names',
    description:
      'Use your own table names for audit logs. Separate tables for data and API logs.',
    href: '/docs/features/custom-tables',
  },
  {
    title: 'Query Builder',
    description:
      'Filter audit logs by entity, user, action, date range, or status code.',
    href: '/docs/features/query-builder',
  },
  {
    title: 'Field Exclusion',
    description:
      'Exclude sensitive fields like password and token from being audited.',
    href: '/docs/features/field-exclusion',
  },
];

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions}>
      <main className="flex-1">
        <Hero />
        <FeatureGrid />
        <Footer />
      </main>
    </HomeLayout>
  );
}

function Hero() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-20 text-center">
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-fd-primary/10 text-fd-primary">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
        GO AUDIT
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-fd-muted-foreground sm:text-xl">
        Automatic audit trail and API call logging for Go applications.
        <br />
        One line setup. Zero manual code. Full traceability.
      </p>
      <div className="mb-10 w-full max-w-xl">
        <pre className="overflow-x-auto rounded-lg border border-fd-border bg-fd-muted/50 px-5 py-4 text-left font-mono text-sm">
          <code>
            <span className="text-fd-muted-foreground">$ </span>
            go get github.com/gopackx/go-audit
          </code>
        </pre>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs/getting-started/installation"
          className="inline-flex h-11 items-center rounded-md bg-fd-primary px-6 text-sm font-medium text-fd-primary-foreground transition hover:bg-fd-primary/90"
        >
          Get Started
        </Link>
        <Link
          href="https://github.com/gopackx/go-audit"
          className="inline-flex h-11 items-center rounded-md border border-fd-border px-6 text-sm font-medium transition hover:bg-fd-muted"
        >
          View on GitHub
        </Link>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="group rounded-xl border border-fd-border bg-fd-card p-6 transition hover:border-fd-primary/50 hover:bg-fd-muted/30"
          >
            <h3 className="mb-2 font-semibold transition group-hover:text-fd-primary">
              {f.title}
            </h3>
            <p className="text-sm text-fd-muted-foreground">{f.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-fd-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-fd-muted-foreground sm:flex-row">
        <p>GO AUDIT © 2026</p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/gopackx/go-audit"
            className="hover:text-fd-foreground"
          >
            GitHub
          </Link>
          <span>·</span>
          <Link
            href="https://github.com/gopackx/go-audit/blob/main/LICENSE"
            className="hover:text-fd-foreground"
          >
            MIT License
          </Link>
        </div>
        <p>Made for Andrian Prasetya</p>
      </div>
    </footer>
  );
}
