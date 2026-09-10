"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:text-zinc-50"
    >
      {isDark === null ? null : isDark ? (
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M10 2.5a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 10 2.5Zm0 12.75a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75ZM17.5 10a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75ZM4.25 10a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75Zm10.407-5.657a.75.75 0 0 1 0 1.06l-.708.708a.75.75 0 1 1-1.06-1.06l.707-.708a.75.75 0 0 1 1.06 0ZM7.11 14.596a.75.75 0 0 1 0 1.06l-.707.708a.75.75 0 0 1-1.06-1.06l.707-.708a.75.75 0 0 1 1.06 0Zm8.239 1.768a.75.75 0 0 1-1.06 0l-.708-.707a.75.75 0 1 1 1.06-1.06l.708.707a.75.75 0 0 1 0 1.06ZM5.404 5.404a.75.75 0 0 1-1.06 0l-.708-.708a.75.75 0 0 1 1.061-1.06l.707.707a.75.75 0 0 1 0 1.06ZM10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        </svg>
      ) : (
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}
