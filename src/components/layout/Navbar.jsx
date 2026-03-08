"use client";

import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {

  return (
    <div className="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-800 shadow">

      <h1 className="font-semibold text-lg text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      <ThemeToggle />

    </div>
  );
}