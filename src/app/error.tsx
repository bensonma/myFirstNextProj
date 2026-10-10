'use client';

import Alert from '@mui/material/Alert';

// Shown when any page under src/app throws, e.g. when the shows query fails.
export default function Error() {
  return (
    <main style={{ padding: 24 }}>
      <Alert severity="error">Something went wrong loading this page.</Alert>
    </main>
  );
}
