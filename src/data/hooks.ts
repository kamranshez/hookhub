import hooksData from "./hooks.json";
import type { Category, Hook } from "./types";

export const hooks: Hook[] = hooksData as Hook[];

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "security", label: "Security" },
  { value: "code-quality", label: "Code Quality" },
  { value: "observability", label: "Observability" },
  { value: "notifications", label: "Notifications" },
  { value: "git", label: "Git" },
  { value: "context", label: "Context" },
  { value: "formatting", label: "Formatting" },
  { value: "utility", label: "Utility" },
];

export function categoryLabel(category: Category): string {
  return CATEGORIES.find((c) => c.value === category)?.label ?? category;
}

export type { Category, Hook, HookEvent } from "./types";
