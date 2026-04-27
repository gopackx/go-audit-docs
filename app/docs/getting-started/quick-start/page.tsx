import { DocsPage } from 'fumadocs-ui/page';
import {
  MacCodeBlock,
  InlineCodeBlock,
  T,
  Callout,
  InfoNote,
  NumberedChecklist,
  DocTitle,
  DocLead,
  DocSection,
  DocP,
} from '@/app/components/docs';

export const metadata = {
  title: 'Quickstart',
  description:
    'Get go-audit running in under 5 minutes. This guide walks through installation, configuration and recording your first audit log entry.',
};

const toc = [
  { title: 'Install the package', url: '#install', depth: 2 },
  { title: 'Initialize the auditor', url: '#init', depth: 2 },
  { title: 'Run migrations', url: '#migrate', depth: 2 },
  { title: 'Plug into GORM', url: '#gorm', depth: 2 },
  { title: 'Verify it works', url: '#verify', depth: 2 },
];

export default function QuickstartPage() {
  return (
    <DocsPage toc={toc}>
      <article className="flex max-w-[760px] flex-col gap-10 py-2">
        <header className="flex flex-col gap-4">
          <DocTitle>Quickstart</DocTitle>
          <DocLead>
            Get go-audit running in under 5 minutes. This guide walks through
            installation, configuration and recording your first audit log
            entry.
          </DocLead>
        </header>

        <DocSection id="install" title="Install the package">
          <DocP>
            Pull the module into your Go project. The library has zero
            non-stdlib dependencies for the core, ORM adapters are opt-in.
          </DocP>
          <InlineCodeBlock>
            <T t="muted">$</T> go get github.com/gopackx/go-audit
          </InlineCodeBlock>
          <InfoNote>Requires Go 1.21+</InfoNote>
        </DocSection>

        <DocSection id="init" title="Initialize the auditor">
          <DocP>
            Wire up an Auditor with your <code>*sql.DB</code> and a{' '}
            <code>UserFunc</code> that resolves the actor for each transaction.
          </DocP>
          <MacCodeBlock filename="main.go">
            <T t="string">{'import "github.com/gopackx/go-audit"'}</T>
            {'\n\n'}
            auditor, err := audit.New(sqlDB, audit.Config
            <T t="muted">{'{'}</T>
            {'\n'}
            <T t="prop">{'    Dialect:'}</T>
            {'  audit.SQLite,\n'}
            <T t="keyword">{'    UserFunc:'}</T>
            {' func(ctx context.Context) (string, string) {\n'}
            <T t="muted">{'        return '}</T>
            <T t="string">{'ctx.Value("user_id").(string), "user"'}</T>
            {'\n'}
            <T t="muted">{'    },'}</T>
            {'\n'}
            <T t="muted">{'})'}</T>
          </MacCodeBlock>
        </DocSection>

        <DocSection id="migrate" title="Run migrations">
          <DocP>
            Create the <code>audit_log</code> and <code>audit_snapshots</code>{' '}
            tables. Safe to call on every boot — it is idempotent.
          </DocP>
          <InlineCodeBlock>
            <T t="keyword">_ = auditor.AutoMigrate(ctx)</T>
          </InlineCodeBlock>
        </DocSection>

        <DocSection id="gorm" title="Plug into GORM">
          <DocP>
            Register the GORM plugin once on your <code>*gorm.DB</code>. From
            there, every Create/Update/Delete is recorded automatically.
          </DocP>
          <InlineCodeBlock>
            <T t="err">{'_ = gormDB.Use(auditgorm.Plugin(auditor))'}</T>
          </InlineCodeBlock>
          <Callout type="info">
            Bun and Ent adapters are also available — see{' '}
            <a
              href="/docs/adapters/overview"
              className="font-medium underline underline-offset-2"
            >
              ORM Adapters
            </a>
            .
          </Callout>
        </DocSection>

        <DocSection id="verify" title="Verify it works">
          <DocP>
            Quick sanity check that everything is wired up end-to-end.
          </DocP>
          <NumberedChecklist
            items={[
              'Create or update a record through GORM inside a request handler.',
              <>
                Query{' '}
                <code className="font-mono text-[14px]">
                  auditor.History(ctx, &quot;users&quot;, id)
                </code>{' '}
                and confirm a row is returned.
              </>,
              'Inspect the diff JSON column — you should see before/after values for each changed field.',
            ]}
          />
        </DocSection>

      </article>
    </DocsPage>
  );
}
