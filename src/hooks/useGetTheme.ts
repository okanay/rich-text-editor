'use client'
import { useAtom, atom } from 'jotai';
import { useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

const themeAtom = atom<Theme>('system');

export const useGetTheme = () => {
  const [theme, setThemeMode] = useAtom(themeAtom);

  const setTheme = (theme: Theme) => {
    setThemeMode(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setThemeMode(storedTheme);
    } else {
      const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setThemeMode(systemTheme);
    }

    // Listen for system theme changes
    const listener = window.matchMedia('(prefers-color-scheme: dark)');
    listener.addEventListener('change', (e) => {
      if (theme === 'system') {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
      }
    });

    return () => {
      listener.removeEventListener('change', () => {});
    }
  }, [theme, setThemeMode]);

  return { theme, setTheme };
}
