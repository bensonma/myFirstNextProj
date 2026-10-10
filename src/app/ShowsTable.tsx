'use client';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { Show } from '@/types/show';

type Column = {
  key: keyof Show;
  label: string;
  minWidth?: number;
  format?: (value: Show[keyof Show]) => string;
};

const columns: Column[] = [
  { key: 'title', label: 'Title', minWidth: 160 },
  { key: 'type', label: 'Type' },
  { key: 'director', label: 'Director', minWidth: 140 },
  { key: 'cast_members', label: 'Cast', minWidth: 300 },
  { key: 'country', label: 'Country', minWidth: 120 },
  {
    key: 'date_added',
    label: 'Date Added',
    minWidth: 110,
    // Fixed locale and time zone so the server render matches the browser
    // render; otherwise React reports a hydration mismatch.
    format: (value) =>
      value
        ? new Date(value).toLocaleDateString('en-US', { timeZone: 'UTC' })
        : '',
  },
  { key: 'release_year', label: 'Release Year' },
  { key: 'rating', label: 'Rating' },
  { key: 'duration', label: 'Duration', minWidth: 100 },
  { key: 'listed_in', label: 'Genres', minWidth: 200 },
  { key: 'description', label: 'Description', minWidth: 300 },
];

export default function ShowsTable({ shows }: { shows: Show[] }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key} style={{ minWidth: col.minWidth }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {shows.map((show) => (
            <TableRow key={show.show_id} hover>
              {columns.map((col) => {
                const value = show[col.key];
                return (
                  <TableCell key={col.key}>
                    {col.format ? col.format(value) : (value ?? '')}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
