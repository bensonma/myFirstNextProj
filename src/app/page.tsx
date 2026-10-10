import { getShows } from '@/lib/data/shows';
import ShowsTable from './ShowsTable';

// Query the database on every request instead of once at build time.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const shows = await getShows();

  return (
    <main style={{ padding: 24 }}>
      <ShowsTable shows={shows} />
    </main>
  );
}
