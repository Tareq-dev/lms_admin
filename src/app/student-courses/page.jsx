"use client";

import React, { useState } from "react";
import {
  Star,
  ArrowRight,
  Search,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CourseCatalog() {
  // কোর্স ডাটাতে প্রোগ্রেস ও ট্র্যাকিং মেট্রিদ যোগ করা হয়েছে
  const [courses] = useState([
    {
      id: "nextjs-14",
      title: "Next.js 14 Ultra-Posh Development",
      instructor: "Jhankar Mahbub",
      level: "Advanced",
      rating: 4.9,
      price: "৳৪,৫০০",
      progress: 71, // ৭৫% কমপ্লিট
      totalModules: 45,
      completedModules: 32,
    },
    {
      id: "tailwind-css",
      title: "Tailwind CSS Advanced Mechanics",
      instructor: "Sumit Saha",
      level: "Intermediate",
      rating: 4.8,
      price: "৳২,০০০",
      progress: 100, // ১০০% কমপ্লিট
      totalModules: 20,
      completedModules: 20,
    },
    {
      id: "prisma-backend",
      title: "Prisma Orchestration & PostgreSQL Masterclass",
      instructor: "Anisul Islam",
      level: "Advanced",
      rating: 4.9,
      price: "৳৩,৫০০",
      progress: 0, // নতুন এনরোলড, এখনও শুরু করেনি
      totalModules: 30,
      completedModules: 0,
    },
  ]);

  // সার্চ স্টেট
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="w-full max-w-6xl mx-auto px-4 py-12 space-y-10 antialiased animate-in fade-in duration-500">
        {/* 🚀 হেডার জোন: সার্চ ও ফিল্টার */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-100 dark:border-zinc-900 pb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Your Academic Vault
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Track your synchronized cohorts and resume your standard learning
              modules.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search your courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* 📚 এনরোলড কোর্স গ্রিড */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group relative border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 rounded-2xl p-5 flex flex-col justify-between h-72 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
            >
              {/* কার্ড টপ: লেভেল, রেটিং ও টাইটেল */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {course.level}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star size={12} className="fill-current" /> {course.rating}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    by {course.instructor}
                  </p>
                </div>
              </div>

              {/* কার্ড মিডল: ডাইনামিক প্রোগ্রেস বার ইঞ্জিন */}
              <div className="space-y-2 my-2">
                <div className="flex justify-between text-[10px] font-bold text-zinc-400 font-mono tracking-wide">
                  <span>
                    {course.completedModules}/{course.totalModules} MODULES
                  </span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-950 rounded-full overflow-hidden p-[1px]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      course.progress === 100
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                        : "bg-gradient-to-r from-indigo-500 to-violet-500"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* ⚡ কার্ড বটম: কন্ডিশনাল অ্যাকশন বাটন */}
              <div className="border-t border-zinc-100 dark:border-zinc-900 pt-4 flex justify-between items-center">
                <div>
                  <span className="block text-[9px] font-mono font-bold text-zinc-400">
                    VALUE
                  </span>
                  <span className="text-base font-black text-zinc-900 dark:text-white">
                    {course.price}
                  </span>
                </div>

                {/* প্রোগ্রেস ট্র্যাক করে বাটন রেন্ডার */}
                {course.progress === 100 ? (
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-100/50 dark:border-emerald-500/10">
                    <CheckCircle2 size={12} /> Completed
                  </div>
                ) : (
                  <Link
                    href={`/student-courses/${course.id}`}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all shadow-xs cursor-pointer"
                  >
                    <PlayCircle size={14} />
                    <span>
                      {course.progress === 0 ? "Start Class" : "Resume Class"}
                    </span>
                    <ArrowRight
                      size={12}
                      className="opacity-60 group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
