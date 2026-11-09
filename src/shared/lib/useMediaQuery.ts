'use client';

import { useCallback, useSyncExternalStore } from 'react';

// One MediaQueryList per query: getSnapshot runs on every render and must stay cheap.
const lists = new Map<string, MediaQueryList>();

function getList(query: string): MediaQueryList {
  let list = lists.get(query);
  if (!list) {
    list = window.matchMedia(query);
    lists.set(query, list);
  }
  return list;
}

/** Subscribes to a CSS media query. Returns `fallback` during server rendering. */
export function useMediaQuery(query: string, fallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = getList(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => getList(query).matches,
    () => fallback,
  );
}
