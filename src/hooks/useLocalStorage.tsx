import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if (saved === null) return initialValue;
    try {
      return JSON.parse(saved) as T;
    } catch {
      return saved as unknown as T;
    }
  });

  useEffect(() => {
    const stringifiedValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
