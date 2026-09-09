import { hooks } from "@/data/hooks";
import HookBrowser from "@/components/HookBrowser";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-12 sm:py-16">
        <header className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              HookHub App
            </h1>
            {/* TODO: point at the real HookHub repo once it has a GitHub remote */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              View on GitHub
            </a>
          </div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Browse open-source hooks for Claude Code.
          </p>
        </header>

        <HookBrowser hooks={hooks} />
      </main>
    </div>
  );
}
