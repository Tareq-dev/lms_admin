import React from "react";

export default function StatCard({ title, value, change, icon, trend }) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group">
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট (হোভার করলে জ্বলবে) */}
      <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-indigo-500/5 blur-xl group-hover:bg-indigo-500/10 transition-colors" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className="rounded-xl bg-slate-50 text-slate-600 border border-slate-100 p-2.5 dark:bg-zinc-800/50 dark:text-zinc-400 dark:border-zinc-700/60 transition-transform group-hover:scale-105 duration-300">
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2.5">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </h3>
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-lg font-mono ${
            trend === "up"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}