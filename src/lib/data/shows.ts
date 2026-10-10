import 'server-only';

import { pool } from '@/lib/db';
import type { Show } from '@/types/show';

// date_added is a Postgres `date`, which pg would turn into a JS Date.
// Casting to text returns a plain 'YYYY-MM-DD' string, matching the Show type.
export async function getShows(): Promise<Show[]> {
  const { rows } = await pool.query<Show>(
    `SELECT show_id, type, title, director, cast_members, country,
            date_added::text AS date_added, release_year, rating,
            duration, listed_in, description
       FROM netflix_shows
      ORDER BY title
      LIMIT 10`
  );
  return rows;
}
