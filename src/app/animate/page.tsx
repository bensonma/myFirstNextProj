'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Variant = 'default' | 'success' | 'error';

type Toast = {
  id: number;
  title: string;
  description: string;
  variant: Variant;
  removing: boolean;
};

const TOAST_HEIGHT = 64;
const GAP = 12;
const VISIBLE = 3;
const DURATION = 4000;
const EXIT_MS = 300;

const SAMPLES: Record<Variant, { title: string; description: string }> = {
  default: { title: 'Event created', description: 'Friday, October 9 at 5:00 PM' },
  success: { title: 'Changes saved', description: 'Your profile has been updated.' },
  error: { title: 'Upload failed', description: 'The file is larger than 10 MB.' },
};

const DOT: Record<Variant, string> = {
  default: 'bg-neutral-400',
  success: 'bg-emerald-500',
  error: 'bg-rose-500',
};

export default function AnimatePage() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [expanded, setExpanded] = useState(false);
  const expandedRef = useRef(false);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((ts) => ts.map((t) => (t.id === id ? { ...t, removing: true } : t)));
    setTimeout(() => setToasts((ts) => ts.filter((t) => t.id !== id)), EXIT_MS);
  }, []);

  const scheduleDismiss = useCallback(
    (id: number) => {
      setTimeout(function tick() {
        // Hold toasts open while the stack is hovered, then try again.
        if (expandedRef.current) setTimeout(tick, 1000);
        else dismiss(id);
      }, DURATION);
    },
    [dismiss],
  );

  const add = (variant: Variant) => {
    const id = nextId.current++;
    setToasts((ts) => [...ts, { id, ...SAMPLES[variant], variant, removing: false }]);
    scheduleDismiss(id);
  };

  const setHover = (value: boolean) => {
    expandedRef.current = value;
    setExpanded(value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Toast stack</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Fire a few, then hover the stack to expand it.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {(['default', 'success', 'error'] as const).map((v) => (
          <button
            key={v}
            onClick={() => add(v)}
            className="press rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            {v === 'default' ? 'Show toast' : v === 'success' ? 'Success' : 'Error'}
          </button>
        ))}
      </div>

      <ol
        aria-live="polite"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="fixed bottom-6 left-1/2 w-[356px] max-w-[calc(100vw-32px)] -translate-x-1/2"
        style={{ height: expanded ? toasts.length * (TOAST_HEIGHT + GAP) : TOAST_HEIGHT }}
      >
        {toasts.map((toast, i) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            index={toasts.length - 1 - i}
            expanded={expanded}
            onDismiss={() => dismiss(toast.id)}
          />
        ))}
      </ol>
    </main>
  );
}

function ToastItem({
  toast,
  index,
  expanded,
  onDismiss,
}: {
  toast: Toast;
  index: number;
  expanded: boolean;
  onDismiss: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Paint once off-screen so the enter transition has a starting point.
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  let transform: string;
  let opacity = 1;

  if (!mounted || toast.removing) {
    transform = 'translateY(100%)';
    opacity = 0;
  } else if (expanded) {
    transform = `translateY(${-index * (TOAST_HEIGHT + GAP)}px)`;
  } else {
    transform = `translateY(${-index * 14}px) scale(${1 - index * 0.05})`;
    if (index >= VISIBLE) opacity = 0;
  }

  return (
    <li
      className="toast absolute bottom-0 left-0 right-0 flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
      style={{
        height: TOAST_HEIGHT,
        transform,
        opacity,
        zIndex: 100 - index,
        pointerEvents: toast.removing ? 'none' : 'auto',
      }}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${DOT[toast.variant]}`} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{toast.title}</p>
        <p className="truncate text-xs text-neutral-500">{toast.description}</p>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="press rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="round" />
        </svg>
      </button>
    </li>
  );
}
