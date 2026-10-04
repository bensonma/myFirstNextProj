import { Pool } from 'pg';

// Reuse a single pool across hot reloads in development so we don't
// exhaust database connections every time a file changes.
const globalForDb = globalThis as unknown as { pgPool?: Pool };

export const pool =
  globalForDb.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pgPool = pool;
}
