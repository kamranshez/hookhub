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
  slug: string;
  name: string;
  description: string;
  category: Category;
  repoUrl: string;
  events?: HookEvent[];
  author?: string;
};
