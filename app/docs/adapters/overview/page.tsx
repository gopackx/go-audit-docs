import { DocsPage } from 'fumadocs-ui/page';
import { Database, Layers, Workflow } from 'lucide-react';
import {
  MacCodeBlock,
  InlineCodeBlock,
  T,
  Callout,
  DocTitle,
  DocLead,
  DocSection,
  DocP,
  DocTable,
  CheckCell,
  DocTabs,
  AdapterCard,
} from '@/app/components/docs';

export const metadata = {
  title: 'ORM Adapters',
  description:
    'go-audit ships first-class adapters for the three most popular Go ORMs. Pick the one matching your stack — installation is identical across all three.',
};

const toc = [
  { title: 'Install', url: '#install', depth: 2 },
  { title: 'Register the plugin', url: '#register', depth: 2 },
  { title: 'What gets captured', url: '#captured', depth: 2 },
  { title: 'Soft delete detection', url: '#soft-delete', depth: 2 },
  { title: 'Comparison', url: '#compare', depth: 2 },
];

export default function AdaptersOverviewPage() {
  return (
    <DocsPage toc={toc}>
      <article className="flex max-w-[860px] flex-col gap-7 py-2">
        <header className="flex flex-col gap-4">
          <DocTitle>ORM Adapters</DocTitle>
          <DocLead>
            go-audit ships first-class adapters for the three most popular Go
            ORMs. Pick the one matching your stack — installation is identical
            across all three.
          </DocLead>
        </header>

        <DocTabs
          tabs={[
            { label: 'GORM', href: '/docs/adapters/overview' },
            { label: 'Bun', href: '/docs/adapters/bun' },
            { label: 'Ent', href: '/docs/adapters/ent' },
          ]}
          active="GORM"
        >
          <p className="text-[13px] leading-[1.6] text-[#64748B]">
            Currently viewing the GORM adapter. Switch tabs above to see Bun
            and Ent installation flows.
          </p>
        </DocTabs>

        <DocSection id="install" title="Install the GORM adapter">
          <DocP>
            Pull the adapter package alongside the core go-audit module. The
            adapter only depends on what you already have in your GORM project.
          </DocP>
          <InlineCodeBlock>
            <T t="muted">$</T> go get
            github.com/gopackx/go-audit/adapters/auditgorm
          </InlineCodeBlock>
        </DocSection>

        <DocSection id="register" title="Register the plugin">
          <DocP>
            Once installed, plug the adapter into your GORM database. It hooks
            into create, update, and delete callbacks automatically.
          </DocP>
          <MacCodeBlock filename="main.go">
            <T t="string">{'import "github.com/gopackx/go-audit/adapters/auditgorm"'}</T>
            {'\n\n'}
            <T t="comment">{'// after auditor is initialised'}</T>
            {'\n'}
            {'_ = gormDB.Use(auditgorm.Plugin(auditor, auditgorm.Options{\n'}
            <T t="prop">{'    SkipUnchanged: '}</T>
            {'true,\n'}
            <T t="prop">{'    IgnoreTables:  '}</T>
            {'[]string{'}
            <T t="string">{'"sessions"'}</T>
            {'},\n'}
            {'}))'}
          </MacCodeBlock>
        </DocSection>

        <DocSection id="captured" title="What gets captured">
          <DocP>
            The plugin records mutations driven through GORM. Raw SQL queries
            that bypass GORM&apos;s callbacks are not captured — use the API
            logging middleware for those.
          </DocP>
          <DocTable
            headers={['Operation', 'Captured']}
            rows={[
              [
                <code key="op" className="font-mono text-[#0F172A] dark:text-[#F1F5F9]">INSERT</code>,
                <CheckCell key="v" value="Full row + diff" />,
              ],
              [
                <code key="op" className="font-mono text-[#0F172A] dark:text-[#F1F5F9]">UPDATE</code>,
                <CheckCell key="v" value="Field-by-field diff" />,
              ],
              [
                <code key="op" className="font-mono text-[#0F172A] dark:text-[#F1F5F9]">DELETE</code>,
                <CheckCell key="v" value="Final row state" />,
              ],
              [
                <code key="op" className="font-mono text-[#0F172A] dark:text-[#F1F5F9]">Bulk insert</code>,
                <CheckCell key="v" value="Per-row entries" />,
              ],
              [
                <code key="op" className="font-mono text-[#0F172A] dark:text-[#F1F5F9]">Soft delete</code>,
                <CheckCell key="v" value="Tagged separately" />,
              ],
              [
                <code key="op" className="font-mono text-[#0F172A] dark:text-[#F1F5F9]">Raw SQL</code>,
                <CheckCell key="v" value={false} />,
              ],
            ]}
          />
        </DocSection>

        <DocSection id="soft-delete" title="Soft delete detection">
          <DocP>
            GORM marks rows as soft-deleted when the model embeds{' '}
            <code className="font-mono">gorm.DeletedAt</code>. The adapter
            detects this convention automatically — you don&apos;t need to
            configure anything.
          </DocP>
          <MacCodeBlock filename="user.go">
            {'type User struct {\n'}
            <T t="prop">{'    ID        '}</T>
            {'uint\n'}
            <T t="prop">{'    Email     '}</T>
            {'string\n'}
            <T t="prop">{'    DeletedAt '}</T>
            <T t="muted">gorm.DeletedAt</T>
            {' '}
            <T t="string">{'`gorm:"index"`'}</T>
            {'\n}'}
          </MacCodeBlock>
          <Callout type="info">
            Will detect record as soft-deleted, since it has the corresponding
            framework hook applied.
          </Callout>
        </DocSection>

        <DocSection
          id="compare"
          title="Comparison: GORM vs Bun vs Ent"
        >
          <DocP>
            All three adapters expose the same auditing surface. Differences
            come down to how each ORM exposes hooks and metadata.
          </DocP>
          <DocTable
            headers={['Feature', 'GORM', 'Bun', 'Ent']}
            rows={[
              [
                'Go 1.21+',
                <CheckCell key="g" value={true} />,
                <CheckCell key="b" value={true} />,
                <CheckCell key="e" value={true} />,
              ],
              [
                'Soft-delete detection',
                <CheckCell key="g" value="Auto" />,
                <CheckCell key="b" value={false} />,
                <CheckCell key="e" value="Manual" />,
              ],
              [
                'Bulk insert capture',
                <CheckCell key="g" value={true} />,
                <CheckCell key="b" value={true} />,
                <CheckCell key="e" value={true} />,
              ],
              [
                'Field-level diff',
                <CheckCell key="g" value={true} />,
                <CheckCell key="b" value={true} />,
                <CheckCell key="e" value={true} />,
              ],
              [
                'Generated query API',
                <CheckCell key="g" value={false} />,
                <CheckCell key="b" value={false} />,
                <CheckCell key="e" value={true} />,
              ],
            ]}
          />
        </DocSection>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <AdapterCard
            name="GORM"
            description="The most popular Go ORM. Plug-in based hooks for callbacks."
            href="/docs/adapters/gorm"
            active
            logo={<Database className="h-5 w-5" />}
          />
          <AdapterCard
            name="Bun"
            description="SQL-first, lightweight. Uses query hooks for capture."
            href="/docs/adapters/bun"
            logo={<Layers className="h-5 w-5" />}
          />
          <AdapterCard
            name="Ent"
            description="Schema-as-code. Generated query API with rich hooks."
            href="/docs/adapters/ent"
            logo={<Workflow className="h-5 w-5" />}
          />
        </div>

      </article>
    </DocsPage>
  );
}
