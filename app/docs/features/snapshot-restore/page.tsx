import { DocsPage } from 'fumadocs-ui/page';
import { Camera, Infinity as InfinityIcon } from 'lucide-react';
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
  title: 'Snapshot & Restore',
  description:
    "Reconstruct any entity's exact state at any past moment. When you need to — or roll back live data. Every operation is itself recorded, so a restore is just another auditable event.",
};

const toc = [
  { title: 'How snapshots work', url: '#how', depth: 2 },
  { title: 'Capture a snapshot', url: '#capture', depth: 2 },
  { title: 'Restore an entity', url: '#restore', depth: 2 },
  { title: 'Purge old logs', url: '#purge', depth: 2 },
];

const events = [
  { id: 't0', label: 'create', x: 5 },
  { id: 't1', label: 'update', x: 30 },
  { id: 't2', label: 'snapshot', x: 55, snap: true },
  { id: 't3', label: 'update', x: 78 },
];

export default function SnapshotRestorePage() {
  return (
    <DocsPage toc={toc}>
      <article className="flex max-w-[860px] flex-col gap-8 py-2">
        <header className="flex flex-col gap-4">
          <DocTitle>Snapshots &amp; Restore</DocTitle>
          <DocLead>
            Reconstruct any entity&apos;s exact state at any past moment. When
            you need to — or roll back live data. Every operation is itself
            recorded, so a restore is just another auditable event.
          </DocLead>
        </header>

        <DocSection id="how" title="How snapshots work">
          <DocP>
            Every Create, Update, and Delete captured by go-audit is stored as
            an immutable change record. Calling{' '}
            <code className="font-mono">Snapshot(asOf)</code> rewinds those
            records up to the moment you ask for, returning the entity exactly
            as it existed at that timestamp.
          </DocP>
          <Timeline />
        </DocSection>

        <DocSection id="capture" title="Capture a snapshot">
          <DocP>
            <code className="font-mono">Snapshot()</code> takes an entity ID
            and a timestamp. Pass that asOf for the current state, or any past
            time. Use the past for a forensic audit. The replay is purely
            in-memory.
          </DocP>
          <MacCodeBlock filename="snapshot.go">
            <T t="comment">{'// reconstruct user 42 at the start of 2026'}</T>
            {'\n'}
            {'asOf := time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC)\n'}
            {'snap, err := auditor.Snapshot(ctx, '}
            <T t="string">{'"users"'}</T>
            {', '}
            <T t="string">{'"42"'}</T>
            {', asOf)\n'}
            {'if err != nil {\n'}
            {'    return err\n'}
            {'}\n\n'}
            <T t="comment">{'// snap.State is the user as it was on Jan 1.'}</T>
          </MacCodeBlock>
        </DocSection>

        <DocSection id="restore" title="Restore an entity">
          <DocP>
            Restore writes the historical data back into the live store, using
            a regular adapter write — every restore is itself a fresh audit
            entry. Idempotent — re-running a Restore at the same point you just
            restored to is a no-op.
          </DocP>
          <MacCodeBlock filename="restore.go">
            {'target := time.Date(2026, 4, 27, 12, 0, 0, 0, time.UTC)\n'}
            {'if err := auditor.Restore(ctx, '}
            <T t="string">{'"users"'}</T>
            {', '}
            <T t="string">{'"42"'}</T>
            {', target); err != nil {\n'}
            {'    log.Fatal(err)\n'}
            {'}\n'}
          </MacCodeBlock>
          <Callout type="warn">
            Restore is not destructive — the previous state remains in audit
            logs. But it does overwrite live rows, so production restores
            should always be approved out-of-band.
          </Callout>
        </DocSection>

        <DocSection id="purge" title="Purge old logs">
          <DocP>
            Snapshots only work for those ranges that still exist in the audit
            log. Run <code className="font-mono">Purge</code> as a scheduled
            job to drop entries older than your retention threshold — 7 years
            by default for SOX, 180 days for default ops.
          </DocP>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <RetentionPreset
              icon={<InfinityIcon className="h-4 w-4" />}
              label="Forever"
              detail="No purge — full history"
            />
            <RetentionPreset label="180 days" detail="Default ops retention" />
            <RetentionPreset
              label="7 years"
              detail="Financial / SOX compliance"
            />
          </div>
          <MacCodeBlock filename="cron.go">
            <T t="comment">{'// run nightly: drop entries older than 180 days'}</T>
            {'\n'}
            {'cutoff := time.Now().AddDate(0, 0, -180)\n'}
            {'n, err := auditor.Purge(ctx, audit.PurgeOptions{\n'}
            <T t="prop">{'    Before: '}</T>
            {'cutoff,\n'}
            <T t="prop">{'    Tables: '}</T>
            {'[]string{'}
            <T t="string">{'"audit_log"'}</T>
            {', '}
            <T t="string">{'"audit_api_log"'}</T>
            {'},\n'}
            {'})\n'}
            {'log.Printf('}
            <T t="string">{'"purged %d rows"'}</T>
            {', n)'}
          </MacCodeBlock>
          <Callout type="warn">
            <span className="font-semibold">Purge is irreversible.</span>{' '}
            Deleted entries cannot be reconstructed. Snapshot any time-travel
            cutoff before running purge in production.
          </Callout>
        </DocSection>

      </article>
    </DocsPage>
  );
}

function Timeline() {
  return (
    <div className="rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-6 py-7 dark:border-[#1F2630] dark:bg-[#11161D]">
      <div className="relative h-24">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-[#CBD5E1] dark:bg-[#2A323D]" />
        {events.map((e) => (
          <div
            key={e.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
            style={{ left: `${e.x}%`, top: '50%' }}
          >
            <span
              className={`text-[11px] font-semibold uppercase tracking-wider ${
                e.snap
                  ? 'text-[#0EA5B7]'
                  : 'text-[#64748B]'
              }`}
            >
              {e.label}
            </span>
            <span
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                e.snap
                  ? 'bg-[#0EA5B7] ring-4 ring-[#0EA5B7]/20'
                  : 'bg-[#CBD5E1] dark:bg-[#2A323D]'
              }`}
            />
            <span className="font-mono text-[10px] text-[#94A3B8]">
              {e.id}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-[#64748B]">
        <Camera className="h-3.5 w-3.5 text-[#0EA5B7]" />
        snapshot point — reconstruct entity state up to here
      </div>
    </div>
  );
}

function RetentionPreset({
  label,
  detail,
  icon,
}: {
  label: string;
  detail: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 dark:border-[#1F2630] dark:bg-[#11161D]">
      <span className="flex items-center gap-2 text-[15px] font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
        {icon}
        {label}
      </span>
      <span className="text-[12px] text-[#64748B]">{detail}</span>
    </div>
  );
}

