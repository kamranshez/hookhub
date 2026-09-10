import { hooks } from "@/data/hooks";
import Hero from "@/components/Hero";
import HookBrowser from "@/components/HookBrowser";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-12 sm:py-16">
        <Hero />

        <HookBrowser hooks={hooks} />
      </main>
    </div>
  );
}
