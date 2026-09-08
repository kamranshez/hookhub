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
      className="group flex h-full flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <span
        className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_STYLES[hook.category]}`}
      >
        {categoryLabel(hook.category)}
      </span>

      <h3 className="text-lg font-semibold leading-snug text-zinc-950 group-hover:underline dark:text-zinc-50">
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
              className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {event}
            </span>
          ))}
        </div>
      )}

      {hook.author && (
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          by {hook.author}
        </p>
      )}
    </a>
  );
}
