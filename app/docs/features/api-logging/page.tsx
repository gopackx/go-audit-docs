import { DocsPage } from 'fumadocs-ui/page';
import { ShieldCheck, Bug, LineChart, ArrowRight, Link2 } from 'lucide-react';
import {
  MacCodeBlock,
  T,
  Callout,
  DocTitle,
  DocLead,
  DocSection,
  DocP,
} from '@/app/components/docs';

export const metadata = {
  title: 'API Call Logging',
  description:
    'Capture every outgoing or third-party API request with header and body redaction, smart truncation, and automatic correlation to the surrounding business transaction.',
};

const toc = [
  { title: 'Why log API calls?', url: '#why', depth: 2 },
  { title: 'Record an API call', url: '#record', depth: 2 },
  { title: 'Header & body redaction', url: '#redaction', depth: 2 },
  { title: 'Size truncation', url: '#truncation', depth: 2 },
  { title: 'Cross-concern correlation', url: '#correlation', depth: 2 },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Compliance',
    desc: 'Prove what data left your service and when. Build evidence for SOC2, ISO 27001, and PCI audits.',
  },
  {
    icon: Bug,
    title: 'Debugging',
    desc: 'Replay third-party calls verbatim. See exactly which payload caused that flaky integration to fail.',
  },
  {
    icon: LineChart,
    title: 'Cost & vendor analysis',
    desc: 'Track per-vendor latency and request volume. Spot expensive endpoints before the bill arrives.',
  },
];

export default function ApiLoggingPage() {
  return (
    <DocsPage toc={toc}>
      <article className="flex max-w-[860px] flex-col gap-8 py-2">
        <header className="flex flex-col gap-4">
          <DocTitle>API Call Logging</DocTitle>
          <DocLead>
            Capture every outgoing or third-party API request with header and
            body redaction, smart truncation, and automatic correlation to the
            surrounding business transaction.
          </DocLead>
        </header>

        <DocSection id="why" title="Why log API calls?">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex flex-col gap-3 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#1F2630] dark:bg-[#11161D]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0EA5B7]/[0.08]">
                  <b.icon className="h-[18px] w-[18px] text-[#0EA5B7]" />
                </div>
                <span className="text-[15px] font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
                  {b.title}
                </span>
                <p className="text-[13px] leading-[1.55] text-[#475569] dark:text-[#94A3B8]">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </DocSection>

        <DocSection id="record" title="Record an API call">
          <DocP>
            Wrap your HTTP client and forward each request to the auditor. The
            recorder captures method, URL, status, durations, and bodies —
            redacting and truncating as configured.
          </DocP>
          <MacCodeBlock filename="http_client.go">
            {'err := auditor.API().Record(ctx, audit.APICall{\n'}
            <T t="prop">{'    Method:       '}</T>
            <T t="string">{'"POST"'}</T>
            {',\n'}
            <T t="prop">{'    URL:          '}</T>
            <T t="string">{'"https://api.stripe.com/v1/charges"'}</T>
            {',\n'}
            <T t="prop">{'    StatusCode:   '}</T>
            <T t="err">{'200'}</T>
            {',\n'}
            <T t="prop">{'    RequestBody:  '}</T>
            <T t="keyword">{'bodyBytes'}</T>
            {',\n'}
            <T t="prop">{'    ResponseBody: '}</T>
            <T t="keyword">{'respBytes'}</T>
            {',\n'}
            <T t="prop">{'    DurationMS:   '}</T>
            <T t="err">{'142'}</T>
            {',\n'}
            {'})\n'}
          </MacCodeBlock>
        </DocSection>

        <DocSection id="redaction" title="Header & body redaction">
          <DocP>
            Configure a list of header names and JSON paths to redact before
            persistence. Sensitive values are replaced with a fixed marker so
            audit logs stay safe to share with auditors and engineers alike.
          </DocP>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <MacCodeBlock filename="before.json">
              {'{\n'}
              <T t="prop">{'  "authorization": '}</T>
              <T t="string">{'"Bearer sk_live_abc123..."'}</T>
              {',\n'}
              <T t="prop">{'  "user": '}</T>
              {'{\n'}
              <T t="prop">{'    "email": '}</T>
              <T t="string">{'"alice@example.com"'}</T>
              {',\n'}
              <T t="prop">{'    "ssn":   '}</T>
              <T t="string">{'"123-45-6789"'}</T>
              {'\n  }\n}'}
            </MacCodeBlock>
            <MacCodeBlock filename="after.json">
              {'{\n'}
              <T t="prop">{'  "authorization": '}</T>
              <T t="muted">{'"[REDACTED]"'}</T>
              {',\n'}
              <T t="prop">{'  "user": '}</T>
              {'{\n'}
              <T t="prop">{'    "email": '}</T>
              <T t="string">{'"alice@example.com"'}</T>
              {',\n'}
              <T t="prop">{'    "ssn":   '}</T>
              <T t="muted">{'"[REDACTED]"'}</T>
              {'\n  }\n}'}
            </MacCodeBlock>
          </div>
        </DocSection>

        <DocSection id="truncation" title="Size truncation">
          <DocP>
            Bodies above your configured limit are truncated and tagged so you
            can audit large payloads without bloating storage. Tune the cap to
            match your retention budget.
          </DocP>
          <MacCodeBlock filename="config.go">
            {'audit.Config{\n'}
            <T t="prop">{'    MaxBodyBytes: '}</T>
            <T t="err">{'64 * 1024'}</T>
            {',\n'}
            {'}'}
          </MacCodeBlock>
          <Callout type="info">
            Truncated payloads are marked with a{' '}
            <code className="font-mono text-[13px]">__truncated: true</code>{' '}
            flag so you can detect them downstream.
          </Callout>
        </DocSection>

        <DocSection id="correlation" title="Cross-concern correlation">
          <DocP>
            Every audit event written inside a transaction shares the same{' '}
            <code className="font-mono">txn_id</code>. Replay the full sequence
            — DB writes, API calls, more DB writes — when reconstructing what a
            single business operation actually did.
          </DocP>
          <div className="flex flex-col items-center gap-4 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-6 py-7 dark:border-[#1F2630] dark:bg-[#11161D]">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <FlowPill label="DB WRITE" />
              <ArrowRight className="h-4 w-4 text-[#64748B]" />
              <FlowPill label="API CALL" highlight />
              <ArrowRight className="h-4 w-4 text-[#64748B]" />
              <FlowPill label="DB WRITE" />
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-[#0EA5B7]/[0.08] px-3 py-1.5">
              <Link2 className="h-3 w-3 text-[#0EA5B7]" />
              <span className="font-mono text-[12px] text-[#0EA5B7]">
                txn_id: 7f3a8c92-bd11-44e2-9a3e-0c2fb1d7e441
              </span>
            </div>
          </div>
        </DocSection>

      </article>
    </DocsPage>
  );
}

function FlowPill({
  label,
  highlight,
}: {
  label: string;
  highlight?: boolean;
}) {
  return (
    <span
      className={`rounded-full border px-4 py-2 font-mono text-[12px] tracking-wide ${
        highlight
          ? 'border-[#0EA5B7] bg-[#F1F5F9] text-[#0EA5B7] dark:bg-[#161C25]'
          : 'border-[#CBD5E1] bg-[#F1F5F9] text-[#475569] dark:border-[#2A323D] dark:bg-[#161C25] dark:text-[#94A3B8]'
      }`}
    >
      {label}
    </span>
  );
}
