import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    if (saved === null) return initialValue;
    try {
      return JSON.parse(saved);
    } catch {
      return saved;
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
