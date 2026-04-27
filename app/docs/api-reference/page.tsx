import { DocsPage } from 'fumadocs-ui/page';
import {
  ApiMethodCard,
  ApiCodeExample,
  T,
  DocTitle,
  DocLead,
} from '@/app/components/docs';

export const metadata = {
  title: 'API Reference',
  description:
    'Public methods on the Auditor type. All methods accept a context.Context and return errors using fmt.Errorf wrapping for cause inspection.',
};

const toc = [
  { title: 'Query', url: '#query', depth: 2 },
  { title: 'API().Record', url: '#api-record', depth: 2 },
  { title: 'Snapshot', url: '#snapshot', depth: 2 },
  { title: 'Restore', url: '#restore', depth: 2 },
  { title: 'Purge', url: '#purge', depth: 2 },
];

export default function ApiReferencePage() {
  return (
    <DocsPage toc={toc}>
      <article className="flex max-w-[860px] flex-col gap-8 py-2">
        <header className="flex flex-col gap-4">
          <DocTitle>API Reference</DocTitle>
          <DocLead>
            Public methods on the Auditor type. All methods accept a{' '}
            <code className="font-mono text-[15px]">context.Context</code> and
            return errors using <code className="font-mono text-[15px]">fmt.Errorf</code>{' '}
            wrapping for cause inspection.
          </DocLead>
        </header>

        <div className="flex flex-col gap-5">
          <ApiMethodCard
            id="query"
            signature={
              <>
                Query
                <T t="muted">(ctx, opts</T>{' '}
                <T t="prop">QueryOptions</T>
                <T t="muted">)</T>
              </>
            }
            badges={[
              { kind: 'read', label: 'Read' },
              { kind: 'sync', label: 'Sync' },
            ]}
            description="Query audit logs by entity, action, or date range. Supports cursor-based pagination and returns entries ordered by occurredAt descending."
            params={[
              {
                name: 'ctx',
                type: 'context.Context',
                desc: 'Request-scoped context, propagated to the underlying SQL driver.',
              },
              {
                name: 'opts',
                type: 'QueryOptions',
                desc: 'Filter, ordering, and pagination knobs. See QueryOptions.',
              },
            ]}
            returns={'([]Entry, error)'}
            example={
              <ApiCodeExample filename="query.go">
                {'entries, err := auditor.Query(ctx, audit.QueryOptions{\n'}
                <T t="prop">{'    Entity: '}</T>
                <T t="string">{'"users"'}</T>
                {',\n'}
                <T t="prop">{'    Action: '}</T>
                <T t="string">{'"update"'}</T>
                {',\n'}
                <T t="prop">{'    Limit:  '}</T>
                {'50,\n'}
                {'})\n'}
              </ApiCodeExample>
            }
          />

          <ApiMethodCard
            id="api-record"
            signature={
              <>
                API
                <T t="muted">{'().'}</T>Record
                <T t="muted">(ctx, call</T> <T t="prop">APICall</T>
                <T t="muted">)</T>
              </>
            }
            badges={[
              { kind: 'write', label: 'Write' },
              { kind: 'async', label: 'Async' },
            ]}
            description="Log third-party API calls with automatic header and body redaction. Headers like Authorization and Cookie are masked, and JSON paths can be configured for body redaction."
            params={[
              {
                name: 'ctx',
                type: 'context.Context',
                desc: 'Request context. Cancellation aborts the write.',
              },
              {
                name: 'call',
                type: 'APICall',
                desc: 'Outbound HTTP call snapshot — endpoint, status, latency, headers, body.',
              },
            ]}
            returns="error"
            example={
              <ApiCodeExample filename="api_record.go">
                {'err := auditor.API().Record(ctx, audit.APICall{\n'}
                <T t="prop">{'    Endpoint: '}</T>
                <T t="string">{'"https://api.stripe.com/v1/charges"'}</T>
                {',\n'}
                <T t="prop">{'    Method:   '}</T>
                <T t="string">{'"POST"'}</T>
                {',\n'}
                <T t="prop">{'    Status:   '}</T>
                {'200,\n'}
                <T t="prop">{'    Latency:  '}</T>
                {'180 * time.Millisecond,\n'}
                {'})\n'}
              </ApiCodeExample>
            }
          />

          <ApiMethodCard
            id="snapshot"
            signature={
              <>
                Snapshot
                <T t="muted">(ctx, entityID</T>{' '}
                <T t="prop">string</T>
                <T t="muted">, asOf</T> <T t="prop">time.Time</T>
                <T t="muted">)</T>
              </>
            }
            badges={[
              { kind: 'read', label: 'Read' },
              { kind: 'sync', label: 'Sync' },
            ]}
            description="Retrieve entity state at a specific point in time by replaying audit log entries up to the cutoff. Read-only — does not modify any data."
            params={[
              {
                name: 'ctx',
                type: 'context.Context',
                desc: 'Cancelable context for the read.',
              },
              {
                name: 'entityID',
                type: 'string',
                desc: 'Stable identifier of the entity to reconstruct.',
              },
              {
                name: 'asOf',
                type: 'time.Time',
                desc: 'Cutoff timestamp; UTC recommended.',
              },
            ]}
            returns="(Snapshot, error)"
            example={
              <ApiCodeExample filename="snapshot.go">
                {'snap, err := auditor.Snapshot(ctx, '}
                <T t="string">{'"user-42"'}</T>
                {', cutoff)\n'}
                {'if err != nil { return err }\n'}
                <T t="comment">{'// snap.State is the projected entity at `cutoff`.'}</T>
                {'\n'}
              </ApiCodeExample>
            }
          />

          <ApiMethodCard
            id="restore"
            signature={
              <>
                Restore
                <T t="muted">(ctx, entityID</T>{' '}
                <T t="prop">string</T>
                <T t="muted">, asOf</T> <T t="prop">time.Time</T>
                <T t="muted">)</T>
              </>
            }
            badges={[
              { kind: 'mutating', label: 'Mutating' },
              { kind: 'sync', label: 'Sync' },
            ]}
            description="Revert an entity to its state at a previous timestamp. The restore itself is recorded as a new audit entry, preserving the full chain of changes."
            params={[
              {
                name: 'ctx',
                type: 'context.Context',
                desc: 'Cancelable context for the write transaction.',
              },
              {
                name: 'entityID',
                type: 'string',
                desc: 'Identifier of the entity to roll back.',
              },
              {
                name: 'asOf',
                type: 'time.Time',
                desc: 'Target timestamp to restore to.',
              },
            ]}
            returns="error"
            example={
              <ApiCodeExample filename="restore.go">
                {'if err := auditor.Restore(ctx, '}
                <T t="string">{'"user-42"'}</T>
                {', t); err != nil {\n'}
                {'    log.Fatal(err)\n'}
                {'}\n'}
              </ApiCodeExample>
            }
          />

          <ApiMethodCard
            id="purge"
            signature={
              <>
                Purge
                <T t="muted">(ctx, before</T> <T t="prop">time.Time</T>
                <T t="muted">)</T>
              </>
            }
            badges={[
              { kind: 'mutating', label: 'Mutating' },
              { kind: 'async', label: 'Async' },
            ]}
            description="Permanently delete audit log entries older than the cutoff. Returns the number of rows deleted. Use with caution — purged data cannot be recovered."
            params={[
              {
                name: 'ctx',
                type: 'context.Context',
                desc: 'Cancelable context. Cancellation rolls back uncommitted batches.',
              },
              {
                name: 'before',
                type: 'time.Time',
                desc: 'All entries strictly older than this timestamp are removed.',
              },
            ]}
            returns="(int64, error)"
            example={
              <ApiCodeExample filename="purge.go">
                {'n, err := auditor.Purge(ctx, time.Now().AddDate(-1, 0, 0))\n'}
                <T t="comment">{'// n is the number of rows removed.'}</T>
                {'\n'}
              </ApiCodeExample>
            }
          />
        </div>

      </article>
    </DocsPage>
  );
}
