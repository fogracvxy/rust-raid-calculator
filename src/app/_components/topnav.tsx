"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
export function TopNav() {
  const router = useRouter();

  return (
    <nav className="flex  border-b p-4 text-xl font-semibold">
      <div className="flex max-w-6xl flex-row font-mono items-center">
        <Link href="/">Home</Link>
        <Link className="ml-5" href="/raid">
          Calculator
        </Link>
        <Link
          className="ml-5"
          href="https://www.battlemetrics.com/servers/rust/4729828"
        >
          BattleMetrics
        </Link>
      </div>
    </nav>
  );
}
