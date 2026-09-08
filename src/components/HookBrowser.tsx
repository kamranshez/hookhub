"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, type Category, type Hook } from "@/data/hooks";
import HookCard from "./HookCard";

export default function HookBrowser({ hooks }: { hooks: Hook[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hooks.filter((hook) => {
      const matchesCategory = category === null || hook.category === category;
      const matchesQuery =
        q === "" ||
        hook.name.toLowerCase().includes(q) ||
        hook.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [hooks, query, category]);

  const clearFilters = () => {
    setQuery("");
    setCategory(null);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search hooks by name or description…"
          aria-label="Search hooks"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 sm:max-w-xs"
        />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {filtered.length} {filtered.length === 1 ? "hook" : "hooks"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <FilterChip
          label="All"
          active={category === null}
          onClick={() => setCategory(null)}
        />
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c.value}
            label={c.label}
            active={category === c.value}
            onClick={() => setCategory(c.value)}
          />
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((hook) => (
            <HookCard key={hook.slug} hook={hook} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No hooks match your filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-zinc-950 bg-zinc-950 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950"
          : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      {label}
    </button>
  );
}
