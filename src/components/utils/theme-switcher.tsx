"use client";

import { useGetTheme } from "@/hooks/useGetTheme";
import { twMerge } from "tailwind-merge";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useGetTheme();

  return (
    <button
      className={twMerge("size-8 rounded-full bg-amber-500 dark:bg-zinc-50")}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
};
