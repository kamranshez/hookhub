# HookHub — MVP Spec

Guidance for building HookHub. This file is the source of truth for the MVP; when working
in this repo, follow it alongside the root `CLAUDE.md`.

## What HookHub is

HookHub is a browsable directory of open-source **Claude Code hooks**. People land on the
site, scan a grid of hook cards, narrow by category or a search box, and click through to
the GitHub repository that hosts the hook. That is the whole product for v1.

Background: Claude Code hooks are command / HTTP / prompt handlers configured under a
`hooks` key in `.claude/settings.json`, keyed by lifecycle event with an optional
`matcher`. Hooks live in ordinary GitHub repos, and the community currently discovers them
through scattered "awesome" lists. HookHub is a nicer front door to that.

### Non-goals for the MVP

No auth. No submission form. No ratings or comments. No install flow. No GitHub API calls.
No database. No detail pages. Adding a hook means editing a JSON file and opening a PR.

## Data model

The single source of truth. Implementation must match these types exactly.

```ts
// src/data/types.ts
export type Category =
  | "security"
  | "code-quality"
  | "observability"
  | "notifications"
  | "git"
  | "context"
  | "formatting"
  | "utility";

export type HookEvent =
  | "PreToolUse"
  | "PostToolUse"
  | "UserPromptSubmit"
  | "SessionStart"
  | "SessionEnd"
  | "Stop"
  | "SubagentStop"
  | "Notification"
  | "PreCompact"
  | "FileChanged";

export type Hook = {
  slug: string;          // unique, kebab-case; used as the React key
  name: string;
  description: string;   // 1-2 sentences, plain text, ~200 chars max
  category: Category;
  repoUrl: string;       // https://github.com/<owner>/<repo>[/tree/...]
  events?: HookEvent[];  // lifecycle events the hook fires on
  author?: string;       // GitHub owner, shown as the card byline
};
```

`HookEvent` values are real Claude Code events — do not invent names. The full event list
is at https://code.claude.com/docs/en/hooks; the ten above are the ones worth surfacing.

### Where the data lives

- `src/data/hooks.json` — the array of hooks. Seed with 10–15 real hooks sourced from
  community collections (e.g. `ithiria894/awesome-claude-code-hooks`,
  `pascalporedda/awesome-claude-code`, `rohitg00/awesome-claude-code-toolkit`).
- `src/data/hooks.ts` — imports the JSON, types it as `Hook[]`, and exports it along with
  a `CATEGORIES` array of `{ value: Category; label: string }` for the filter chips.

Example entry:

```json
{
  "slug": "lasso-prompt-injection-scanner",
  "name": "Lasso Claude-Hooks",
  "description": "Scans tool outputs for 50+ prompt-injection patterns and blocks the turn when one matches.",
  "category": "security",
  "repoUrl": "https://github.com/lasso-security/claude-hooks",
  "events": ["PostToolUse"],
  "author": "lasso-security"
}
```

## Routes and components

One route. Keep the component tree shallow.

| Path | File | Kind |
|---|---|---|
| `/` | `src/app/page.tsx` | Server Component — reads `hooks.ts`, renders header + `<HookBrowser>` |
| — | `src/components/HookBrowser.tsx` | Client Component — owns search + category state, renders the grid |
| — | `src/components/HookCard.tsx` | Presentational — one card |

`src/app/layout.tsx` metadata (title, description) is updated to HookHub.

## UI spec — main page

**Header.** "HookHub" wordmark, one-line tagline ("Browse open-source hooks for Claude
Code"), and a link to the project's own repo.

**Controls row.** A text input and a row of category filter chips including an "All" chip.

- Search matches a case-insensitive substring against `name` and `description`.
- Filters compose with AND: search text **and** selected category.
- Category selection is single-select; "All" clears it.
- Show a result count ("12 hooks").

**Grid.** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`, inside
`max-w-6xl mx-auto px-4`.

**Card.** The entire card is a link to `repoUrl`, opened with
`target="_blank" rel="noopener noreferrer"`. Contents, top to bottom:

1. Category badge (colored pill).
2. Hook name.
3. Description, line-clamped to 3 lines.
4. Event tags, if `events` is present — small monospace chips.
5. Author byline, if present.

Hover raises the border/shadow. Cards in a row are equal height (`h-full` on the link).

**Empty state.** When filters match nothing, show a short message and a "Clear filters"
button that resets both search and category.

**Responsive & theming.** Must hold at 360px, 768px, and 1280px. Dark mode comes from the
existing `prefers-color-scheme` tokens in `src/app/globals.css` — both themes must be
legible.

## Implementation constraints

- **Next 15.5.x**, per the root `CLAUDE.md`. Next 16 generated route types
  (`PageProps<...>`, `LayoutProps<"/">`) do not exist here — type route props explicitly.
  Do not bump to 16.
- **Tailwind v4 only.** There is no `tailwind.config.*`; add any new design tokens to the
  `@theme inline` block in `src/app/globals.css`.
- **No new runtime dependencies.** Filtering is plain `Array.prototype.filter`; no search
  library, no UI kit.
- Filtering runs inside a `useMemo` keyed on `(query, category)`.
- `src/app/page.tsx` currently holds the `create-next-app` splash — replace it entirely.
- There is no test framework in this repo; verification is lint, typecheck, and manual.

## Acceptance criteria

1. `/` renders one card per entry in `src/data/hooks.json`.
2. Typing in the search box filters the grid live, matching name and description.
3. Clicking a category chip narrows the grid to that category; "All" restores everything.
4. Search and category compose — selecting a category then typing narrows further.
5. A no-match state appears with a working "Clear filters" button.
6. Clicking any card opens its `repoUrl` in a new tab.
7. The result count reflects the filtered set.
8. `npm run lint` passes with no errors.
9. `npx tsc --noEmit` passes.
10. Layout is correct at 360px, 768px, and 1280px; no horizontal page scroll.
11. Light and dark mode are both legible.

## Post-MVP backlog

Out of scope for v1, listed so they are not accidentally built:

- Per-hook detail pages (`/hooks/[slug]`) with README content.
- GitHub API integration for star counts and last-updated dates.
- A submission flow (form or issue template).
- Multi-select tag facets, sorting (stars / recency / name).
- Copy-paste `.claude/settings.json` install snippet on each card.
- Per-hook OG images and richer SEO metadata.

## References

- Claude Code hooks reference — https://code.claude.com/docs/en/hooks
- https://github.com/ithiria894/awesome-claude-code-hooks
- https://github.com/pascalporedda/awesome-claude-code
