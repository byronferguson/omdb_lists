import { useEffect, useState } from 'react';

export function useLocalStorage<T>(value: T, key: string) {
  const [state, setState] = useState(() => {
    const retrievedValue = localStorage.getItem(key);

    return retrievedValue ? (JSON.parse(retrievedValue) as T) : value;
  });

  useEffect(() => {
    if (!state) return;

    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState] as const;
}
