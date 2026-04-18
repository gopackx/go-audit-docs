# go-audit — Documentation Website Plan

## Stack

- **Framework:** Next.js (App Router)
- **Docs Engine:** Fumadocs
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Domain:** `go-audit.andrianprasetya.com`

---

## Landing Page (Homepage)

### Hero Section

```
Logo: shield/audit icon

# GO AUDIT

Automatic audit trail and API call logging for Go applications.
One line setup. Zero manual code. Full traceability.

$ go get github.com/gopackx/go-audit

[Get Started]  [View on GitHub]
```

### Feature Cards (3x3 grid, same style as open-swag-go)

```
1. ORM Auto-Hooks
   Automatic create/update/delete tracking via GORM, Bun, and Ent plugins.
   → /docs/adapters/overview

2. Auto Diff
   Captures old vs new values automatically. Stores only changed fields.
   → /docs/features/auto-diff

3. API Call Logging
   Track third-party API calls with request/response, duration, and status.
   → /docs/features/api-logging

4. Multi-Database
   First-class support for PostgreSQL, MySQL, and SQLite with dialect-aware optimization.
   → /docs/features/multi-database

5. Auto Redaction
   Sensitive data (API keys, passwords) automatically redacted before storage.
   → /docs/features/redaction

6. Transaction Correlation
   Link data changes and API calls with shared transaction IDs for full traceability.
   → /docs/features/transaction-correlation

7. Custom Table Names
   Use your own table names for audit logs. Separate tables for data and API logs.
   → /docs/features/custom-tables

8. Query Builder
   Filter audit logs by entity, user, action, date range, or status code.
   → /docs/features/query-builder

9. Field Exclusion
   Exclude sensitive fields like password and token from being audited.
   → /docs/features/field-exclusion
```

### Footer

```
GO AUDIT © 2026
GitHub | MIT License
Made for Andrian Prasetya
```

---

## Sidebar Navigation Structure

```
docs/
├── index                          → Overview (Go Audit)
│
├── Getting Started/
│   ├── installation               → Installation
│   └── quick-start                → Quick Start
│
├── Features/
│   ├── auto-diff                  → Auto Diff
│   ├── api-logging                → API Call Logging
│   ├── multi-database             → Multi-Database Support
│   ├── redaction                  → Auto Redaction
│   ├── transaction-correlation    → Transaction Correlation
│   ├── custom-tables              → Custom Table Names
│   ├── query-builder              → Query Builder
│   └── field-exclusion            → Field Exclusion
│
├── Adapters/
│   ├── overview                   → Adapter Overview
│   ├── gorm                       → GORM Adapter
│   ├── bun                        → Bun Adapter
│   └── ent                        → Ent Adapter
│
├── Schema/
│   ├── audit-logs                 → audit_logs Table
│   └── audit-api-logs             → audit_api_logs Table
│
├── API Reference/
│   ├── core                       → Core (Auditor, Config, Types)
│   ├── data-audit                 → Data Audit API
│   ├── api-audit                  → API Audit API
│   ├── query                      → Query & Filters
│   └── dialect                    → Dialect Interface
│
├── Examples/
│   ├── basic                      → Basic (GORM + PostgreSQL)
│   ├── api-logging                → API Call Logging
│   ├── multi-database             → Multi-Database Setup
│   └── full-example               → Full Example (Data + API + Correlation)
│
├── Guides/
│   ├── migration-from-manual      → Migrating from Manual Audit
│   ├── laravel-comparison         → Coming from Laravel
│   └── production-tips            → Production Tips & Best Practices
│
├── changelog                      → Changelog
├── faq                            → FAQ
├── troubleshooting                → Troubleshooting
└── contributing                   → Contributing
```

---

## Page Content Outlines

### docs/index — Overview

```markdown
# Go Audit

Go Audit provides automatic audit trail and API call logging for Go
applications. Register a plugin with your ORM, and every create, update,
and delete is tracked — who changed what, when, from what value to what
value.

## Key Features
- ORM Auto-Hooks — GORM, Bun, Ent (zero manual code)
- Auto Diff — old vs new values, only changed fields stored
- API Call Logging — track third-party requests/responses
- Multi-Database — PostgreSQL, MySQL, SQLite
- Auto Redaction — sensitive data protection
- Transaction Correlation — link data changes + API calls
- Query Builder — filter by entity, user, action, date range

## Quick Navigation
[Getting Started] [Features] [Adapters] [API Reference] [Examples]
```

### docs/getting-started/installation — Installation

```markdown
# Installation

## Requirements
- Go 1.21 or later
- One of: GORM, Bun, or Ent

## Install Core
  go get github.com/gopackx/go-audit

## Install ORM Adapter

| ORM  | Package                                          |
|------|--------------------------------------------------|
| GORM | go get github.com/gopackx/go-audit/adapters/gorm |
| Bun  | go get github.com/gopackx/go-audit/adapters/bun  |
| Ent  | go get github.com/gopackx/go-audit/adapters/ent  |

## Supported Databases

| Database   | JSON Type | Index Support     |
|------------|-----------|-------------------|
| PostgreSQL | JSONB     | GIN index on JSON |
| MySQL      | JSON      | Standard indexes  |
| SQLite     | TEXT      | Standard indexes  |
```

### docs/getting-started/quick-start — Quick Start

```markdown
# Quick Start

Full runnable example: GORM + PostgreSQL + auto audit.

## The Full Program
  [Complete main.go with GORM setup, audit plugin registration,
   and sample CRUD operations that get auto-audited]

## Step-by-Step Walkthrough
  1. Configure the auditor (dialect, user func, exclude fields)
  2. Register GORM plugin (db.Use)
  3. Run auto-migration (create audit tables)
  4. Perform CRUD — audit logs appear automatically

## Verify It Works
  [Query audit logs and show the output]

## Next Steps
  → Add API call logging
  → Try different adapters
  → Browse examples
```

### docs/features/auto-diff — Auto Diff

```markdown
# Auto Diff

Explains how the diff engine works internally.

## How It Works
  - BeforeUpdate hook captures current state (old values)
  - ORM performs the update
  - AfterUpdate hook compares old vs new
  - Only changed fields are stored

## Example Output
  [Show JSON of old_values and new_values with only diff]

## Nested Structs
  [How embedded/nested struct changes are tracked]

## Excluded Fields
  [Fields in ExcludeFields config are recorded as "[EXCLUDED]"]
```

### docs/features/api-logging — API Call Logging

```markdown
# API Call Logging

Track third-party API calls alongside data changes.

## Setup
  [Enable APIAudit in config]

## Recording an API Call
  [auditor.API().Record() with BCA transfer example]

## Auto Redaction
  [How Authorization headers get redacted]

## Body Truncation
  [MaxBodySize config, what happens when exceeded]

## Linking to Data Changes
  [Transaction correlation with shared transaction_id]
```

### docs/features/multi-database — Multi-Database Support

```markdown
# Multi-Database Support

## PostgreSQL
  - Uses JSONB for old_values, new_values, metadata
  - GIN indexes for JSON queries
  - TIMESTAMPTZ for created_at

## MySQL
  - Uses JSON type
  - Standard B-tree indexes
  - TIMESTAMP for created_at

## SQLite
  - Uses TEXT (JSON stored as string)
  - json_extract() for queries
  - DATETIME for created_at

## Auto-Detection
  [GORM adapter auto-detects dialect from db.Dialector.Name()]

## Dialect-Specific Queries
  [How the query builder adapts JSON queries per dialect]
```

### docs/features/transaction-correlation — Transaction Correlation

```markdown
# Transaction Correlation

Link multiple audit records across data changes and API calls.

## Generating a Transaction ID
  [audit.NewTransactionID() + audit.WithTransactionID(ctx, txID)]

## Full Flow Example
  [User clicks transfer → API call to BCA → update balance in DB
   → all records share same transaction_id]

## Querying by Transaction
  [auditor.QueryByTransaction(ctx, txID)]

## Output
  [TransactionLog struct with DataLogs + APILogs]
```

### docs/adapters/overview — Adapter Overview

```markdown
# Adapter Overview

go-audit supports ORMs that provide lifecycle hooks.

## Comparison Table

| ORM  | Hook Mechanism        | Auto Old Values | Batch Support |
|------|-----------------------|-----------------|---------------|
| GORM | Callbacks (plugin)    | Yes             | Yes           |
| Bun  | Query hooks           | Yes             | Yes           |
| Ent  | Mutation interceptors | Yes             | Yes           |

## Why No sqlx/pgx?
  [These are thin SQL wrappers without lifecycle hooks.
   go-audit requires hooks to auto-track changes.]

## Choosing an Adapter
  [Decision guide based on project needs]
```

### docs/adapters/gorm — GORM Adapter

```markdown
# GORM Adapter

## Installation
  go get github.com/gopackx/go-audit/adapters/gorm

## Setup
  [Full code: create auditor, register plugin]

## How It Works
  - Registers BeforeUpdate callback → fetches old record via SELECT
  - Registers AfterCreate callback → records new values
  - Registers AfterUpdate callback → diffs old vs new, records changes
  - Registers AfterDelete callback → records deleted values

## Supported Operations
  - db.Create()
  - db.Save()
  - db.Updates()
  - db.Delete()
  - Batch updates (shared transaction_id)
  - Soft deletes (if GORM soft delete enabled)

## Configuration
  [ExcludeFields, ExcludeEntities, custom metadata]

## Caveats
  - Raw SQL via db.Exec() is NOT tracked (bypasses hooks)
  - db.Session(&gorm.Session{SkipHooks: true}) skips audit
```

### docs/adapters/bun — Bun Adapter

```markdown
# Bun Adapter

## Installation
  go get github.com/gopackx/go-audit/adapters/bun

## Setup
  [Register hooks with auditbun.Register(bunDB, auditor)]

## How It Works
  - BeforeUpdateHook → captures old state
  - AfterUpdateHook → diffs and records
  - AfterDeleteHook → records deleted values
  - AfterInsertHook → records created values

## Supported Operations
  [NewInsert, NewUpdate, NewDelete]
```

### docs/adapters/ent — Ent Adapter

```markdown
# Ent Adapter

## Installation
  go get github.com/gopackx/go-audit/adapters/ent

## Setup
  [Register mutation interceptors]

## How It Works
  - Intercept mutation operations
  - Capture old values before mutation
  - Record diff after mutation completes
```

### docs/schema/audit-logs — audit_logs Table

```markdown
# audit_logs Table

## Schema

| Column         | PostgreSQL    | MySQL              | SQLite   | Description                     |
|----------------|---------------|--------------------|---------|---------------------------------|
| id             | BIGSERIAL PK  | BIGINT UNSIGNED PK | INTEGER | Auto-increment primary key      |
| entity_type    | VARCHAR(100)  | VARCHAR(100)       | TEXT    | Table/model name                |
| entity_id      | VARCHAR(100)  | VARCHAR(100)       | TEXT    | Record ID                       |
| action         | VARCHAR(20)   | VARCHAR(20)        | TEXT    | create, update, delete          |
| old_values     | JSONB         | JSON               | TEXT    | Values before change            |
| new_values     | JSONB         | JSON               | TEXT    | Values after change             |
| user_id        | VARCHAR(100)  | VARCHAR(100)       | TEXT    | Who made the change             |
| user_type      | VARCHAR(50)   | VARCHAR(50)        | TEXT    | user, admin, system             |
| metadata       | JSONB         | JSON               | TEXT    | IP, user agent, reason, etc     |
| transaction_id | VARCHAR(100)  | VARCHAR(100)       | TEXT    | Groups related operations       |
| created_at     | TIMESTAMPTZ   | TIMESTAMP          | DATETIME| When the change occurred        |

## Indexes
  [List all indexes per dialect]

## Go Struct
  [AuditLog struct definition]

## Example Records
  [JSON examples for create, update, delete actions]
```

### docs/schema/audit-api-logs — audit_api_logs Table

```markdown
# audit_api_logs Table

## Schema

| Column           | PostgreSQL    | MySQL              | SQLite   | Description                 |
|------------------|---------------|--------------------|---------|-----------------------------|
| id               | BIGSERIAL PK  | BIGINT UNSIGNED PK | INTEGER | Auto-increment primary key  |
| service          | VARCHAR(100)  | VARCHAR(100)       | TEXT    | Service name (bca, jne)     |
| endpoint         | VARCHAR(500)  | VARCHAR(500)       | TEXT    | API endpoint path           |
| method           | VARCHAR(10)   | VARCHAR(10)        | TEXT    | GET, POST, PUT, DELETE      |
| status_code      | INT           | INT                | INTEGER | HTTP status code            |
| request_headers  | JSONB         | JSON               | TEXT    | Request headers (redacted)  |
| request_body     | JSONB         | JSON               | TEXT    | Request body (redacted)     |
| response_body    | JSONB         | JSON               | TEXT    | Response body (truncated)   |
| duration_ms      | INT           | INT                | INTEGER | Request duration            |
| error_message    | TEXT          | TEXT               | TEXT    | Error message if failed     |
| user_id          | VARCHAR(100)  | VARCHAR(100)       | TEXT    | Who triggered the call      |
| metadata         | JSONB         | JSON               | TEXT    | Extra context               |
| transaction_id   | VARCHAR(100)  | VARCHAR(100)       | TEXT    | Links to data changes       |
| created_at       | TIMESTAMPTZ   | TIMESTAMP          | DATETIME| When the call was made      |

## Go Struct
  [AuditAPILog struct definition]

## Example Records
  [JSON examples for payment API call, shipping API call]
```

### docs/api-reference/core — Core API Reference

```markdown
# Core API Reference

## audit.New(db, config) → Auditor
  [Constructor, parameters, return value]

## audit.Config
  [All config fields with descriptions and defaults]

## audit.DataAuditConfig
  [Table, Enabled, ExcludeFields, ExcludeEntities]

## audit.APIAuditConfig
  [Table, Enabled, RedactHeaders, RedactBodyFields, MaxBodySize]

## audit.UserFunc
  [Function signature, how to extract from context]

## Constants
  - audit.ActionCreate = "create"
  - audit.ActionUpdate = "update"
  - audit.ActionDelete = "delete"
  - audit.PostgreSQL
  - audit.MySQL
  - audit.SQLite
```

### docs/api-reference/data-audit — Data Audit API

```markdown
# Data Audit API

## Auditor.Query(ctx, filter) → ([]AuditLog, error)
  [Query data change logs with filters]

## audit.DataFilter
  [All filter fields: EntityType, EntityID, Action, UserID,
   DateFrom, DateTo, Limit, Offset]

## audit.AuditLog
  [Struct definition with field descriptions]
```

### docs/api-reference/api-audit — API Audit API

```markdown
# API Audit API

## Auditor.API().Record(ctx, entry) → error
  [Record an API call]

## Auditor.API().Query(ctx, filter) → ([]AuditAPILog, error)
  [Query API call logs]

## audit.APIEntry
  [All entry fields for recording]

## audit.APIFilter
  [All filter fields: Service, Method, StatusCode, DateFrom, DateTo, etc]

## audit.AuditAPILog
  [Struct definition with field descriptions]
```

### docs/api-reference/query — Query & Filters

```markdown
# Query & Filters

## Auditor.QueryByTransaction(ctx, txID) → (*TransactionLog, error)
  [Cross-query data + API logs by transaction]

## audit.TransactionLog
  [Struct: DataLogs []AuditLog, APILogs []AuditAPILog]

## Pagination
  [Using Limit and Offset in filters]

## Sorting
  [Default: created_at DESC]
```

### docs/examples/basic — Basic Example

```markdown
# Basic Example

GORM + PostgreSQL, data audit only.

## Complete Code
  [Full main.go: setup DB, register plugin, CRUD, query audit logs]

## Output
  [Show audit_logs table content after operations]
```

### docs/examples/api-logging — API Logging Example

```markdown
# API Call Logging Example

Track BCA payment gateway calls alongside order data changes.

## Complete Code
  [Full example: create order → call BCA API → record API log
   → update order status → query by transaction]
```

### docs/examples/full-example — Full Example

```markdown
# Full Example

Complete e-commerce flow: order creation → payment API → shipping API
→ status updates. All correlated via transaction_id.

## Complete Code
  [Comprehensive example with multiple API calls and data changes]

## Querying the Audit Trail
  [Show full transaction history]
```

### docs/guides/laravel-comparison — Coming from Laravel

```markdown
# Coming from Laravel

If you used laravel-auditing, here's how go-audit maps to familiar concepts.

## Comparison Table

| Laravel (laravel-auditing)   | Go (go-audit)                    |
|------------------------------|----------------------------------|
| use Auditable trait on Model | db.Use(auditgorm.Plugin(auditor))|
| $model->audits()             | auditor.Query(ctx, filter)       |
| config/audit.php             | audit.Config{}                   |
| Audit::$exclude              | ExcludeFields: []string{...}     |
| getAuditExclude()            | ExcludeEntities: []string{...}   |

## Key Differences
  [What's different and why]
```

### docs/guides/production-tips — Production Tips

```markdown
# Production Tips & Best Practices

## Table Partitioning
  [Partition audit_logs by created_at for large datasets]

## Retention Policy
  [Cron job to clean old records, regulatory requirements]

## Performance
  [Async writing, batch inserts, index tuning]

## Monitoring
  [Track audit table growth, query performance]

## Security
  [Restrict write access, prevent audit log tampering]
```

### docs/changelog — Changelog

```markdown
# Changelog

## v0.1.0 (unreleased)
- Initial release
- Core: auto-diff, transaction correlation, multi-dialect
- GORM adapter with full auto-hooks
- API call logging with redaction
- PostgreSQL, MySQL, SQLite support
- Query builder with filters
```

### docs/faq — FAQ

```markdown
# FAQ

## Does go-audit work with sqlx or raw database/sql?
  No. go-audit requires ORM lifecycle hooks to auto-track changes.
  sqlx and database/sql don't provide hooks.

## Does go-audit make HTTP calls?
  No. The core package has zero network dependencies. It only writes
  to the database connection you provide.

## Will audit logs slow down my application?
  Minimal impact. Each CRUD adds one INSERT to the audit table.
  The diff computation is in-memory and sub-millisecond.

## Can I use custom table names?
  Yes. Configure via DataAudit.Table and APIAudit.Table.

## Does it support soft deletes?
  Yes, for GORM with soft delete enabled. The action is recorded
  as "delete" with the soft-deleted record's values.

## How do I audit bulk/batch operations?
  Batch operations are automatically grouped under a shared
  transaction_id. Each affected record gets its own audit log entry.
```

### docs/troubleshooting — Troubleshooting

```markdown
# Troubleshooting

## Audit logs not being created
  - Check plugin is registered: db.Use(auditgorm.Plugin(auditor))
  - Check AutoMigrate() was called
  - Check entity is not in ExcludeEntities
  - Check you're using db.WithContext(ctx) — UserFunc needs context

## old_values is always null on update
  - BeforeUpdate hook might not be firing
  - Check GORM session: SkipHooks must be false

## "table audit_logs does not exist"
  - Call auditor.AutoMigrate() before any CRUD operations

## JSON fields stored as empty {}
  - Check your struct has json tags
  - Check the field is exported (uppercase)
```

### docs/contributing — Contributing

```markdown
# Contributing

## Development Setup
  [Clone, install deps, run tests]

## Running Tests
  [Docker compose for PostgreSQL + MySQL, SQLite in-memory]

## Adding a New Adapter
  [Step-by-step guide: implement Adapter interface, register hooks]

## Code Style
  [gofmt, golangci-lint, conventional commits]

## Pull Request Process
  [Fork, branch, test, PR, review]
```

---

## Fumadocs File Structure

```
apps/docs/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                          → Landing page (hero + feature cards)
│   ├── docs/
│   │   └── [[...slug]]/
│   │       └── page.tsx                  → Docs page renderer
│   └── api/
│       └── search/
│           └── route.ts                  → Search API
│
├── content/
│   └── docs/
│       ├── index.mdx                     → Overview
│       ├── getting-started/
│       │   ├── installation.mdx
│       │   └── quick-start.mdx
│       ├── features/
│       │   ├── auto-diff.mdx
│       │   ├── api-logging.mdx
│       │   ├── multi-database.mdx
│       │   ├── redaction.mdx
│       │   ├── transaction-correlation.mdx
│       │   ├── custom-tables.mdx
│       │   ├── query-builder.mdx
│       │   └── field-exclusion.mdx
│       ├── adapters/
│       │   ├── overview.mdx
│       │   ├── gorm.mdx
│       │   ├── bun.mdx
│       │   └── ent.mdx
│       ├── schema/
│       │   ├── audit-logs.mdx
│       │   └── audit-api-logs.mdx
│       ├── api-reference/
│       │   ├── core.mdx
│       │   ├── data-audit.mdx
│       │   ├── api-audit.mdx
│       │   ├── query.mdx
│       │   └── dialect.mdx
│       ├── examples/
│       │   ├── basic.mdx
│       │   ├── api-logging.mdx
│       │   ├── multi-database.mdx
│       │   └── full-example.mdx
│       ├── guides/
│       │   ├── migration-from-manual.mdx
│       │   ├── laravel-comparison.mdx
│       │   └── production-tips.mdx
│       ├── changelog.mdx
│       ├── faq.mdx
│       ├── troubleshooting.mdx
│       └── contributing.mdx
│
├── public/
│   ├── go-audit-icon.png                 → Logo icon
│   └── og-image.png                      → Open Graph image
│
├── source.config.ts                      → Fumadocs source config
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## source.config.ts (Sidebar Definition)

```typescript
import { defineDocs } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});
```

## meta.json (Sidebar Order)

```json
{
  "title": "Go Audit",
  "pages": [
    "---Getting Started---",
    "getting-started/installation",
    "getting-started/quick-start",
    "---Features---",
    "features/auto-diff",
    "features/api-logging",
    "features/multi-database",
    "features/redaction",
    "features/transaction-correlation",
    "features/custom-tables",
    "features/query-builder",
    "features/field-exclusion",
    "---Adapters---",
    "adapters/overview",
    "adapters/gorm",
    "adapters/bun",
    "adapters/ent",
    "---Schema---",
    "schema/audit-logs",
    "schema/audit-api-logs",
    "---API Reference---",
    "api-reference/core",
    "api-reference/data-audit",
    "api-reference/api-audit",
    "api-reference/query",
    "api-reference/dialect",
    "---Examples---",
    "examples/basic",
    "examples/api-logging",
    "examples/multi-database",
    "examples/full-example",
    "---Guides---",
    "guides/migration-from-manual",
    "guides/laravel-comparison",
    "guides/production-tips",
    "---",
    "changelog",
    "faq",
    "troubleshooting",
    "contributing"
  ]
}
```

---

## Development Priority

### Phase 1 — Minimal Docs for v0.1.0 Launch

Write these pages first (enough to ship):

1. Landing page (hero + feature cards)
2. docs/index (overview)
3. docs/getting-started/installation
4. docs/getting-started/quick-start
5. docs/adapters/gorm
6. docs/schema/audit-logs
7. docs/schema/audit-api-logs
8. docs/examples/basic
9. docs/changelog
10. docs/faq

### Phase 2 — Complete Docs

Fill in remaining pages:

- All features pages
- All API reference pages
- Remaining adapters (bun, ent)
- Remaining examples
- All guides
- Troubleshooting
- Contributing

### Phase 3 — Polish

- Open Graph images for social sharing
- Algolia or Fumadocs search integration
- Code syntax highlighting theme matching
- Mobile responsive testing
- SEO meta tags per page
