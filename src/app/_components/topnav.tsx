"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
export function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="flex border-b p-4 justify-center text-xl font-semibold">
      <div className="flex max-w-6xl flex-row font-mono items-center">
        <Link
          className={`link ${pathname === "/" ? "border-b-2" : ""} ml-5`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`link ${pathname === "/raid" ? "border-b-2" : ""} ml-5`}
          href="/raid"
        >
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
