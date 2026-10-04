import { pool } from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM netflix_shows');
    return Response.json(rows);
  } catch (error) {
    console.error('Failed to fetch shows:', error);
    return Response.json({ error: 'Failed to fetch shows' }, { status: 500 });
  }
}
