import { hooks, CATEGORIES } from "@/data/hooks";

export default function Hero() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white px-6 py-14 dark:border-zinc-800 dark:bg-zinc-900 sm:px-12 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.12),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(16,185,129,0.10),transparent_40%)]"
      />

      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {hooks.length} hooks across {CATEGORIES.length} categories
          </span>

          {/* TODO: point at the real HookHub repo once it has a GitHub remote */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 sm:inline-block"
          >
            View on GitHub →
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            Find the right hook for your Claude Code workflow
          </h1>
          <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            A community-curated directory of open-source hooks — security
            checks, formatters, notifications, and more. Browse, search, and
            wire one up in minutes.
          </p>
        </div>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 sm:hidden"
        >
          View on GitHub →
        </a>
      </div>
    </header>
  );
}
