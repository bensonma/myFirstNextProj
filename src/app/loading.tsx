import CircularProgress from '@mui/material/CircularProgress';

// Shown while the page's server component is waiting on the database.
export default function Loading() {
  return (
    <main style={{ padding: 24 }}>
      <CircularProgress />
    </main>
  );
}
