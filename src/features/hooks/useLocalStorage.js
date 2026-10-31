import { useState, useEffect } from "react";

/**
 * Works exactly like useState but persists the value in localStorage.
 * @param {string} key      - localStorage key
 * @param {*}     initial   - default value when nothing is stored yet
 */
const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`Could not save "${key}" to localStorage.`);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
