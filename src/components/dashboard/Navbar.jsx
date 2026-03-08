"use client";

import { Bell, Search } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  return (
    <header
      className="h-16 flex items-center justify-between px-6
     bg-white dark:bg-zinc-900 border-b dark:border-zinc-800"
    >
      <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg">
        <Search size={18} />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" />
        <ThemeToggle />
      </div>
    </header>
  );
}
