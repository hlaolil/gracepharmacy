import postgres from 'postgres'

// Neon Postgres connection. DATABASE_URL is added to the Vercel project automatically
// when Neon is connected (Vercel → Storage → Neon). Without it, refill requests can only
// be emailed and refill reminders are turned off.

// Refill requests hold health details, so they are deleted after this many days.
export const RETENTION_DAYS = 30

export interface RefillRow {
  id: string // bigint comes back from postgres.js as a string
  name: string
  prescription: string
  phone: string
  notes: string
  status: 'pending' | 'done'
  created_at: Date
  done_at: Date | null
}

type Sql = ReturnType<typeof postgres>

// Reuse one client across hot reloads in development.
const globalForDb = globalThis as unknown as { sql?: Sql; schemaReady?: Promise<void> | null }

function client(): Sql | null {
  const url = process.env.DATABASE_URL
  if (!url) return null
  // prepare: false keeps it compatible with Neon's pooled (PgBouncer) connection string.
  globalForDb.sql ??= postgres(url, { max: 1, prepare: false, idle_timeout: 20 })
  return globalForDb.sql
}

async function ensureSchema(sql: Sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS refill_requests (
      id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name         text NOT NULL,
      prescription text NOT NULL,
      phone        text NOT NULL,
      notes        text NOT NULL DEFAULT '',
      status       text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'done')),
      created_at   timestamptz NOT NULL DEFAULT now(),
      done_at      timestamptz
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS refill_requests_created_at_idx ON refill_requests (created_at)`

  // Email refill reminders (see lib/reminders.ts). A row stays until the patient
  // unsubscribes or staff delete it. "medicine" is a staff-only note and is never emailed.
  await sql`
    CREATE TABLE IF NOT EXISTS refill_reminders (
      id                 bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name               text NOT NULL,
      email              text NOT NULL,
      phone              text NOT NULL DEFAULT '',
      medicine           text NOT NULL DEFAULT '',
      interval_days      integer NOT NULL CHECK (interval_days BETWEEN 7 AND 180),
      next_due           date NOT NULL,
      remind_days_before integer NOT NULL DEFAULT 3 CHECK (remind_days_before BETWEEN 0 AND 14),
      active             boolean NOT NULL DEFAULT true,
      last_reminded_for  date,
      last_sent_at       timestamptz,
      token              text NOT NULL UNIQUE,
      source             text NOT NULL DEFAULT 'web' CHECK (source IN ('web', 'staff')),
      created_at         timestamptz NOT NULL DEFAULT now()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS refill_reminders_next_due_idx ON refill_reminders (next_due) WHERE active`
}

// Returns a ready-to-use client, or null when no database is configured.
export async function getDb(): Promise<Sql | null> {
  const sql = client()
  if (!sql) return null
  globalForDb.schemaReady ??= ensureSchema(sql).catch((err) => {
    globalForDb.schemaReady = null // retry on the next request
    throw err
  })
  await globalForDb.schemaReady
  return sql
}

export async function deleteExpiredRefills(sql: Sql) {
  await sql`DELETE FROM refill_requests WHERE created_at < now() - make_interval(days => ${RETENTION_DAYS})`
}
