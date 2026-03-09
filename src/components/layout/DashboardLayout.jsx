"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white dark:bg-zinc-900 fixed left-0 top-0 h-screen">
        <Sidebar />
      </aside>
      {/* Main Area */}

      {/* Content */}
      <main className="ml-64 flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-950">
        <Navbar />
        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </main>
       
    </div>
  );
}
