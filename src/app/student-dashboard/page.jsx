"use client";

import React, { useState } from "react";
import { 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Clock, 
  CheckCircle, 
  Calendar,
  Compass,
  Zap,
  BookOpen,
  Trophy,
  Video,
  ChevronRight,
  FileText
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function StudentDashboard() {
  // 🎛️ একটিভ ট্যাব স্টেট (Routine vs Leaderboard এর জন্য)
  const [activeTab, setActiveTab] = useState("routine");

  // 👤 স্টুডেন্ট প্রোফাইল মেটা
  const [studentProfile] = useState({
    name: "Alex Mercer",
    batch: "Cohort 02 (Premium Alpha)",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    overallProgress: 68,
    rank: 4,
    points: 2450
  });

  // 📚 Enrolled Courses ডেটা
  const [myCourses] = useState([
    { id: 1, title: "Next.js 14 Ultra-Posh Development", instructor: "Jhankar Mahbub", progress: 71, glowColor: "from-indigo-500 to-violet-500", shadow: "shadow-indigo-500/10", totalModules: 45, completedModules: 32 },
    { id: 2, title: "Tailwind CSS Advanced Mechanics", instructor: "Sumit Saha", progress: 90, glowColor: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/10", totalModules: 20, completedModules: 18 },
  ]);

  // 📝 My Assignment Desk ডেটা
  const [assignments] = useState([
    { id: 1, title: "Build a Glassmorphic SaaS Dashboard", deadline: "June 20", status: "Pending", marks: "Pending" },
    { id: 2, title: "Multi-Layer Context API Filter Integration", deadline: "Passed", status: "Completed", marks: "95/100" },
    { id: 3, title: "Prisma Orchestration & Schema Design", deadline: "Passed", status: "Completed", marks: "88/100" },
  ]);

  // ⏳ Class Routine ডেটা
  const [routine] = useState([
    { id: 1, topic: "Next.js Server Actions & Optimistic Updates", date: "Tonight", time: "09:00 PM", isLive: true },
    { id: 2, topic: "Advanced Framer Motion & Layout Animations", date: "June 16", time: "09:00 PM", isLive: false },
  ]);

  // 🏆 Leaderboard ডেটা
  const [leaderboard] = useState([
    { rank: 1, name: "Naimur Rahman", points: 2900, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naimur" },
    { rank: 2, name: "Sadia Afrin", points: 2750, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sadia" },
    { rank: 3, name: "Tanvir Hossain", points: 2600, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvir" },
    { rank: 4, name: "Alex Mercer (You)", points: 2450, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", isUser: true },
  ]);

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto space-y-8 relative antialiased animate-in fade-in zoom-in-98 duration-500">
        
        {/* 🌌 Ambient Background Luxury Glow */}
        <div className="absolute top-[-5%] left-[10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[120px] pointer-events-none" />

        {/* 👤 ১. স্টুডেন্ট লাক্সারি ইনফো বার */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-xs dark:border-zinc-800/80 dark:from-zinc-900/40 dark:to-zinc-950/60 backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-2xl blur-md opacity-40" />
                <img src={studentProfile.avatar} alt="Avatar" className="h-14 w-14 rounded-2xl bg-white dark:bg-zinc-900 border p-0.5 relative z-10" />
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-slate-900 dark:text-white">Hi, {studentProfile.name}</h1>
                  <Sparkles size={16} className="text-amber-500 animate-pulse" />
                </div>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 uppercase tracking-wide">{studentProfile.batch}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <div className="bg-white/80 dark:bg-zinc-950/60 border border-slate-200/40 dark:border-zinc-800/60 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xs">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase block">Leaderboard</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">Rank #{studentProfile.rank}</span>
                </div>
                <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 flex items-center justify-center"><Trophy size={14} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* 📊 ২. Analytics Cards Section */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* কার্ড ১: টোটাল সিলেবাস সিঙ্ক প্রোগ্রেস */}
          <div className="rounded-3xl border border-slate-200/50 bg-white p-6 dark:border-zinc-800/60 dark:bg-zinc-900/20 shadow-2xs">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Syllabus Sync</span>
              <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl dark:bg-indigo-500/10 dark:text-indigo-400"><Zap size={16} className="fill-current" /></div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{studentProfile.overallProgress}%</h2>
              <span className="text-xs font-medium text-emerald-500">On Track</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-zinc-950 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: `${studentProfile.overallProgress}%` }} />
            </div>
          </div>

          {/* কার্ড ২: একটিভ কোর্স কাউন্টার */}
          <div className="rounded-3xl border border-slate-200/50 bg-white p-6 dark:border-zinc-800/60 dark:bg-zinc-900/20 shadow-2xs">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Active Cohorts</span>
              <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl dark:bg-emerald-500/10 dark:text-emerald-400"><BookOpen size={16} /></div>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{myCourses.length} Courses</h2>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2 font-medium">Access unlocked to premium masterclasses</p>
          </div>

          {/* কার্ড ৩: পেন্ডিং অ্যাসাইনমেন্ট ট্র্যাকার */}
          <div className="rounded-3xl border border-slate-200/50 bg-white p-6 dark:border-zinc-800/60 dark:bg-zinc-900/20 shadow-2xs sm:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Pending Desk</span>
              <div className="bg-rose-50 text-rose-600 p-2.5 rounded-xl dark:bg-rose-500/10 dark:text-rose-400"><Clock size={16} /></div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black tracking-tight text-rose-500 dark:text-rose-400">
                {assignments.filter(a => a.status === "Pending").length} Tasks
              </h2>
            </div>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2 font-medium">Action required before token expiration</p>
          </div>

        </div>

        {/* ⚡ ৩. মেইন মেগা গ্রিড লেআউট */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* 🏷️ বাম পাশের পার্ট: Enrolled Courses (২ কলাম স্পেস) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-slate-400 px-1">
              <Compass size={14} className="text-indigo-500" />
              <h3 className="text-xs font-bold uppercase tracking-widest dark:text-zinc-400">Enrolled Courses</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {myCourses.map((course) => (
                <div key={course.id} className={`group relative border border-slate-200/50 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/20 p-5 rounded-2xl shadow-xs ${course.shadow} flex flex-col justify-between h-48 transition-all duration-300 hover:scale-[1.01]`}>
                  <div>
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-zinc-100 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">{course.title}</h4>
                      <div className="h-6 w-6 rounded-md bg-slate-50 dark:bg-zinc-950 flex items-center justify-center text-slate-400 shrink-0 border dark:border-zinc-800"><ArrowUpRight size={12} /></div>
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1">by {course.instructor}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 font-mono">
                      <span>{course.completedModules}/{course.totalModules} MODS</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-950 rounded-full overflow-hidden p-[1px]">
                      <div className={`h-full bg-gradient-to-r ${course.glowColor} rounded-full`} style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 🎯 ৪. My Assignment Desk */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-slate-400 px-1">
                <FileText size={14} className="text-purple-500" />
                <h3 className="text-xs font-bold uppercase tracking-widest dark:text-zinc-400">My Assignment Desk</h3>
              </div>
              
              <div className="border border-slate-200/50 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/10 rounded-2xl p-5 shadow-2xs divide-y divide-slate-100 dark:divide-zinc-800/60">
                {assignments.map((task) => (
                  <div key={task.id} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0 gap-4">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-800 dark:text-zinc-200 line-clamp-1">{task.title}</p>
                      <p className="text-[10px] font-medium text-slate-400 dark:text-zinc-500">Due Date: {task.deadline} • Grade: <span className="text-slate-600 dark:text-zinc-300 font-bold">{task.marks}</span></p>
                    </div>
                    <div className="shrink-0">
                      {task.status === "Pending" ? (
                        <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-100/50 dark:border-rose-500/10 animate-pulse">Pending</span>
                      ) : (
                        <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-500/10">Verified</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ⚡ ডান পাশের পার্ট: Class Routine / Leaderboard Tabbed Component (১ কলাম স্পেস) */}
          <div className="space-y-4">
            
            {/* ডাইনামিক গ্লাস ট্যাব সুইচ */}
            <div className="flex p-1 bg-slate-100 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800">
              <button 
                onClick={() => setActiveTab("routine")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${activeTab === "routine" ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs" : "text-slate-400 dark:text-zinc-500 hover:text-slate-600"}`}
              >
                <Calendar size={12} /> Routine
              </button>
              <button 
                onClick={() => setActiveTab("leaderboard")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${activeTab === "leaderboard" ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs" : "text-slate-400 dark:text-zinc-500 hover:text-slate-600"}`}
              >
                <Trophy size={12} /> Leaderboard
              </button>
            </div>

            {/* কন্ডিশনাল কনটেন্ট ১: ক্লাস রুটিন */}
            {activeTab === "routine" && (
              <div className="border border-slate-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 rounded-2xl p-5 shadow-2xs space-y-4 animate-in fade-in duration-200">
                {routine.map((slot) => (
                  <div key={slot.id} className="group relative border-b last:border-0 border-slate-100 dark:border-zinc-800/60 pb-3.5 last:pb-0 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="flex items-center gap-1 text-[10px] font-bold font-mono text-indigo-500">
                        <Clock size={10} /> {slot.date} • {slot.time}
                      </span>
                      <p className="text-xs font-bold text-slate-800 dark:text-zinc-200 line-clamp-2">{slot.topic}</p>
                    </div>
                    {slot.isLive && (
                      <button className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md bg-rose-500 text-white shadow-sm hover:bg-rose-600 transition shrink-0 cursor-pointer animate-bounce">
                        <Video size={10} /> Live
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* কন্ডিশনাল কনটেন্ট ২: লিডারবোর্ড */}
            {activeTab === "leaderboard" && (
              <div className="border border-slate-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 rounded-2xl p-4 shadow-2xs space-y-3 animate-in fade-in duration-200">
                {leaderboard.map((user) => (
                  <div key={user.rank} className={`flex items-center justify-between p-2 rounded-xl transition ${user.isUser ? "bg-indigo-500/10 border border-indigo-500/20" : ""}`}>
                    <div className="flex items-center gap-2.5">
                      <span className={`text-xs font-mono font-bold w-4 text-center ${user.rank === 1 ? "text-amber-500" : user.rank === 2 ? "text-slate-400" : "text-slate-400"}`}>
                        #{user.rank}
                      </span>
                      <img src={user.avatar} alt="User" className="h-7 w-7 rounded-lg bg-slate-100 dark:bg-zinc-800 border" />
                      <span className={`text-xs font-medium ${user.isUser ? "font-bold text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-zinc-300"}`}>{user.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-zinc-500">{user.points} XP</span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}