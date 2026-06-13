"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  ShoppingCart,
  BarChart3,
  FileText,
  Ticket,
  Bell,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FolderGit2,
  Tv,
  Wallet,
  Coins,
  ShieldCheck,
  Award,
  LifeBuoy,
} from "lucide-react";

// 📂 মেনু আইটেমগুলোকে প্রিমিয়াম ক্যাটাগরিতে ভাগ করা হয়েছে
const menuGroups = [
  {
    groupName: "STUDENTS & COURSES",
    items: [
      {
        name: "STU Dashboard",
        icon: LayoutDashboard,
        path: "/student-dashboard",
      },
      { name: "STU - My Courses", icon: BarChart3, path: "/student-courses" },
    ],
  },
  {
    groupName: "Core",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/" },
      { name: "Analytics", icon: BarChart3, path: "/analytics" },
    ]
  },
  {
    groupName: "Academics",
    items: [
      { name: "Courses", icon: BookOpen, path: "/courses" },
      { name: "Exams", icon: FileText, path: "/exams" },
      // { name: "Assignments", icon: FolderGit2, path: "/assignments", badge: "New" },
      // { name: "Live Classes", icon: Tv, path: "/live-classes" },
    ]
  },
  {
    groupName: "Users & Support",
    items: [
      { name: "Students", icon: Users, path: "/students" },
      { name: "Instructors", icon: GraduationCap, path: "/instructors" },
      // { name: "Support Tickets", icon: LifeBuoy, path: "/support", badge: "2" },
    ]
  },
  {
    groupName: "Finance & Sales",
    items: [
      { name: "Orders", icon: ShoppingCart, path: "/orders", badge: "Hot" },
    ]
  },

  {
    groupName: "System",
    items: [
      { name: "Notifications", icon: Bell, path: "/notifications", badge: "9+" },
      { name: "Settings", icon: Settings, path: "/settings" },
    ]
  }
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* 📱 মোবাইল মেনু ট্রিগার */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800/80 shadow-xs text-slate-700 dark:text-zinc-300 active:scale-95 transition"
      >
        <Menu size={18} />
      </button>

      {/* 🌫️ ব্লার ওভারলে (মোবাইলের জন্য) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/30 dark:bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* 🏰 মেইন লাক্সারি এন্টারপ্রাইজ সাইডবার */}
      <div
        className={`fixed lg:sticky top-0 z-50 h-screen bg-white dark:bg-zinc-950 border-r border-slate-100/80 dark:border-zinc-900/80 transition-all duration-300 ease-in-out flex flex-col justify-between
        ${collapsed ? "w-[78px]" : "w-64"}
        ${mobileOpen ? "left-0" : "-left-64 lg:left-0"}
        `}
      >
        {/* টপ স্ক্রোল কন্টেইনার */}
        <div className="flex flex-col h-[calc(100vh-70px)] overflow-y-auto no-scrollbar">
          {/* 🏷️ ব্র্যান্ডিং হেডার জোন */}
          <div className="flex items-center justify-between px-4.5 h-16 border-b border-slate-50 dark:border-zinc-900/40 sticky top-0 bg-white/80 dark:bg-zinc-950/85 backdrop-blur-md z-10">
            {!collapsed && (
              <div className="flex items-center gap-2 animate-in my-10 fade-in duration-300">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                  <Sparkles size={14} className="animate-pulse" />
                </div>
                <h1 className="font-black text-base tracking-tight text-slate-900 dark:text-white bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                  EduPulse{" "}
                  <span className="text-[9px] bg-indigo-500 text-white font-mono px-1 py-0.2 rounded-md align-middle ml-1">
                    LMS
                  </span>
                </h1>
              </div>
            )}

            <button
              onClick={() =>
                mobileOpen ? setMobileOpen(false) : setCollapsed(!collapsed)
              }
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-700 dark:hover:text-zinc-200 transition"
            >
              {mobileOpen ? (
                <X size={18} />
              ) : collapsed ? (
                <ChevronRight size={18} className="hidden lg:block" />
              ) : (
                <ChevronLeft size={18} className="hidden lg:block" />
              )}
            </button>
          </div>

          {/* 🧭 ন্যাভিগেশন লিংকস ম্যাট্রিক্স */}
          <div className="p-3 space-y-4">
            {menuGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                {/* ক্যাটাগরি সাব-হেডিং */}
                {!collapsed ? (
                  <h3 className="px-3 text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-1.5 animate-in fade-in duration-300">
                    {group.groupName}
                  </h3>
                ) : (
                  <div className="h-px bg-slate-100 dark:bg-zinc-900 my-4" /> // কোলাপ্স থাকলে ডিভাইডার লাইন
                )}

                {/* গ্রুপ আইটেমস */}
                {group.items.map((item, index) => {
                  const Icon = item.icon;
                  // const isActive = pathname === item.path;
                  const isActive =
                    pathname === item.path ||
                    (item.path === "/student-courses" &&
                      pathname.startsWith("/student-courses/"));
                  return (
                    <Link
                      key={index}
                      href={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`relative flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 font-medium group text-sm
                        ${
                          isActive
                            ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs font-semibold"
                            : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900/50 hover:text-slate-900 dark:hover:text-zinc-100"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`transition-transform duration-200 ${!isActive && "group-hover:scale-105"}`}
                        >
                          <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                        </div>
                        {!collapsed && (
                          <span className="tracking-tight truncate">
                            {item.name}
                          </span>
                        )}
                      </div>

                      {/* 💎 নোটিফিকেশন / ট্রেন্ডিং ব্যাজেস */}
                      {!collapsed && item.badge && (
                        <span
                          className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-md leading-none transition-colors
                            ${
                              isActive
                                ? "bg-white/20 text-white dark:bg-zinc-900 dark:text-white"
                                : item.badge === "New"
                                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                  : item.badge === "Hot"
                                    ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                                    : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                            }
                          `}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* একটিভ অ্যান্ড কোলাপ্সড ইন্ডিকেটর */}
                      {isActive && collapsed && (
                        <div className="absolute left-0 w-1 h-5 bg-indigo-600 dark:bg-white rounded-r-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* 👤 বটম প্রোফাইল (সুপার অ্যাডমিন প্রোফাইল ট্যাগ) */}
        <div className="p-3 border-t border-slate-50 dark:border-zinc-900/60 bg-slate-50/20 dark:bg-zinc-950/40 sticky bottom-0">
          <div className="flex items-center gap-3 p-1">
            <div className="relative shrink-0">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Admin Avatar"
                className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/40 dark:border-zinc-800"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-950" />
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate animate-in fade-in duration-300">
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 leading-tight flex items-center gap-1">
                  Alex Mercer{" "}
                  <ShieldCheck size={12} className="text-indigo-500" />
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  Owner Account
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* স্ক্রোলবার হাইড করার গ্লোবাল CSS হ্যাক (আপনার global.css এ দিয়ে দিতে পারেন) */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
