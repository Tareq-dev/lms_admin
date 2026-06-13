"use client";

import { Bell, Search, Command, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  return (
    <header className="h-16 sticky top-0 z-40 flex items-center justify-between px-6 md:px-8 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-100 dark:border-zinc-900/60 transition-all duration-300">
      
      {/* 🔍 গ্লোবাল কমান্ড সার্চ বার (Stripe/Linear Inspired) */}
      <div className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100/80 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/70 border border-slate-200/40 dark:border-zinc-800/50 px-3.5 py-2 rounded-xl w-64 sm:w-80 transition-all group focus-within:w-72 sm:focus-within:w-96 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/5">
        <Search 
          size={16} 
          className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" 
        />
        <input
          type="text"
          placeholder="Search shortcuts..."
          className="bg-transparent outline-none text-xs font-medium text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 w-full"
        />
        {/* ⌨️ পশ কীবোর্ড শর্টকাট হিন্ট */}
        <div className="hidden sm:flex items-center gap-0.5 text-[10px] font-bold font-mono text-slate-400 bg-white dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800/80 px-1.5 py-0.5 rounded-md shadow-2xs">
          <Command size={10} />
          <span>K</span>
        </div>
      </div>

      {/* 🎛️ রাইট কন্ট্রোল প্যানেল (মেটা হাব) */}
      <div className="flex items-center gap-4">
        
        {/* 🌓 ডার্ক/লাইট মোড সুইচ */}
        <div className="hover:scale-105 active:scale-95 transition-transform">
          <ThemeToggle />
        </div>

        {/* 🔔 নোটিফিকেশন উইজেট (With Live Pulse Badge) */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-900/60 transition cursor-pointer group">
          <Bell size={18} strokeWidth={2} className="group-hover:rotate-12 transition-transform" />
          {/* লাইভ নোটিফিকেশন গ্লোয়িং ডট */}
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 border border-white dark:border-zinc-950">
            <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-75" />
          </span>
        </button>

        {/* 🧬 ডিভাইডার লাইন */}
        <div className="h-5 w-px bg-slate-200/80 dark:bg-zinc-800/60" />

        {/* 👤 কুইক প্রোফাইল ক্যাভার (অ্যাভাটার) */}
        <div className="flex items-center gap-2 pl-1 group cursor-pointer">
          <div className="relative">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="User Profile"
              className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 p-0.5"
            />
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-white dark:border-zinc-950" />
          </div>
          <ChevronDown 
            size={14} 
            className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-zinc-200 transition-colors hidden sm:block" 
          />
        </div>

      </div>
    </header>
  );
}