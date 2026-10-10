import { getShows } from '@/lib/data/shows';

export async function GET() {
  try {
    return Response.json(await getShows());
  } catch (error) {
    console.error('Failed to fetch shows:', error);
    return Response.json({ error: 'Failed to fetch shows' }, { status: 500 });
  }
}
