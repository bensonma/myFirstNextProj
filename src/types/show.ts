// A row from the netflix_shows table, as returned by /api/shows.
export type Show = {
  show_id: string;
  type: string;
  title: string;
  director: string | null;
  cast_members: string | null;
  country: string | null;
  date_added: string | null;
  release_year: number;
  rating: string | null;
  duration: string | null;
  listed_in: string | null;
  description: string | null;
};
