"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-950">
        <Navbar />
        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
