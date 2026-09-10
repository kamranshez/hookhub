import { categoryLabel, type Hook } from "@/data/hooks";

const CATEGORY_STYLES: Record<Hook["category"], string> = {
  security:
    "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  "code-quality":
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  observability:
    "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  notifications:
    "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  git: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  context:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  formatting:
    "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  utility:
    "bg-zinc-200 text-zinc-800 dark:bg-zinc-700/60 dark:text-zinc-300",
};

export default function HookCard({ hook }: { hook: Hook }) {
  return (
    <a
      href={hook.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:shadow-black/20"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-zinc-400 to-zinc-500 transition-transform duration-200 group-hover:scale-x-100 dark:from-zinc-500 dark:to-zinc-400"
      />

      <div className="flex items-center justify-between gap-2">
        <span
          className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_STYLES[hook.category]}`}
        >
          {categoryLabel(hook.category)}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          className="h-4 w-4 shrink-0 -translate-x-1 text-zinc-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-zinc-600"
        >
          <path
            d="M6 14L14 6M14 6H8M14 6V12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold leading-snug tracking-tight text-zinc-950 transition-colors group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-200">
        {hook.name}
      </h3>

      <p className="line-clamp-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {hook.description}
      </p>

      {hook.events && hook.events.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {hook.events.map((event) => (
            <span
              key={event}
              className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-zinc-600 ring-1 ring-inset ring-zinc-200/60 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-700/60"
            >
              {event}
            </span>
          ))}
        </div>
      )}

      {hook.author && (
        <p className="border-t border-zinc-100 pt-2.5 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          by {hook.author}
        </p>
      )}
    </a>
  );
}
