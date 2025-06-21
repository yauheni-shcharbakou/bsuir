import { useEffect, useState } from 'react';
import { StorageKey } from '../constants/enums';

export default function useThemeState() {
  const [isDark, setIsDark] = useState(true);

  const isDarkMode = () => localStorage.getItem(StorageKey.DARK_MODE) !== 'false';
  const saveDarkMode = (isDark: boolean) =>
    localStorage.setItem(StorageKey.DARK_MODE, JSON.stringify(isDark));
  const toggleThemeHandler = () => setIsDark((prev) => !prev);

  useEffect(() => setIsDark(isDarkMode), []);
  useEffect(() => saveDarkMode(isDark), [isDark]);

  return {
    isDark,
    toggleThemeHandler,
  };
}
