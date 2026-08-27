"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";

export function usePersistentArrayState<T>(
  key: string,
  fallback: T[],
  legacyKey?: string,
): [T[], Dispatch<SetStateAction<T[]>>] {
  const storageEvent = `recipe-planner:${key}`;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handleStorageChange = (event: Event) => {
        if (event.type === "storage" || event.type === storageEvent) {
          onStoreChange();
        }
      };

      window.addEventListener("storage", handleStorageChange);
      window.addEventListener(storageEvent, handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener(storageEvent, handleStorageChange);
      };
    },
    [storageEvent],
  );

  const getSnapshot = useCallback(() => {
    return (
      window.localStorage.getItem(key) ??
      (legacyKey ? window.localStorage.getItem(legacyKey) : null)
    );
  }, [key, legacyKey]);

  const rawValue = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const value = useMemo(() => {
    try {
      const parsed = rawValue ? JSON.parse(rawValue) : undefined;
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }, [rawValue, fallback]);

  const setValue: Dispatch<SetStateAction<T[]>> = useCallback(
    (nextValue) => {
      let currentValue: T[];

      try {
        const raw = getSnapshot();
        const parsed = raw ? JSON.parse(raw) : undefined;
        currentValue = Array.isArray(parsed) ? parsed : fallback;
      } catch {
        currentValue = fallback;
      }

      const resolvedValue =
        typeof nextValue === "function"
          ? nextValue(currentValue)
          : nextValue;

      window.localStorage.setItem(key, JSON.stringify(resolvedValue));
      window.dispatchEvent(new Event(storageEvent));
    },
    [fallback, getSnapshot, key, storageEvent],
  );

  return [value, setValue];
}