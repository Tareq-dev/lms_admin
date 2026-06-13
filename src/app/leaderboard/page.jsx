"use client";

import React, { useState } from "react";
import { 
  Trophy, 
  Medal, 
  Crown, 
  Search, 
  Flame, 
  Sparkles, 
  ArrowUpRight, 
  Award,
  Zap
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

// 🏆 মক লিডারবোর্ড ডেটা ল্যাব
const LEADERBOARD_DATA = [
  { rank: 1, name: "Naimur Rahman", xp: 14850, streak: 42, Avatar: "Naimur", badge: "Grandmaster" },
  { rank: 2, name: "Alex Mercer", xp: 13200, streak: 28, Avatar: "Alex", badge: "Elite" },
  { rank: 3, name: "Anika Tahsin", xp: 12950, streak: 15, Avatar: "Anika", badge: "Elite" },
  { rank: 4, name: "Zayan Ahmed", xp: 11400, streak: 12, Avatar: "Zayan", badge: "Pro" },
  { rank: 5, name: "Samiul Islam", xp: 9850, streak: 9, Avatar: "Samiul", badge: "Pro" },
  { rank: 6, name: "Fariha Zaman", xp: 8900, streak: 21, Avatar: "Fariha", badge: "Rising Star" },
  { rank: 7, name: "Tanvir Hossain", xp: 7650, streak: 5, Avatar: "Tanvir", badge: "Rising Star" },
];

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState("");

  // ফিল্টারড ডেটা (সার্চের জন্য)
  const filteredLeaders = LEADERBOARD_DATA.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // প্রথম ৩ জন টপারদের আলাদা করা (পোডিয়ামের জন্য)
  const topThree = LEADERBOARD_DATA.slice(0, 3);
  // বাকিদের লিস্টের জন্য রাখা
  const restOfLeaders = filteredLeaders.filter(user => user.rank > 3);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white p-4 lg:p-8 space-y-8 antialiased relative overflow-hidden">
        
        {/* 🎆 Ambient Luxury Glows */}
        <div className="absolute top-0 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/10 dark:bg-indigo-500/10 blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-10 h-[300px] w-[300px] rounded-full bg-violet-600/5 dark:bg-violet-500/5 blur-[100px] pointer-events-none" />

        {/* 🏷️ হেডার জোন */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-200/60 dark:border-zinc-900 pb-6 gap-4">
          <div className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              <Sparkles size={12} className="animate-pulse" /> Global Standings
            </span>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl flex items-center gap-2.5">
              EduPulse Hall of Fame <Trophy className="text-amber-500 animate-bounce" size={24} />
            </h1>
            <p className="text-xs text-zinc-400 font-medium">Resetting in 4 days • Compete with the top 1% minds</p>
          </div>

          {/* 🔍 স্লিম লাক্সারি সার্চ বার */}
          <div className="relative w-full md:w-80 group">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search peer cohort..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 backdrop-blur-md focus:outline-hidden focus:border-indigo-500/50 dark:focus:border-indigo-400/30 font-medium transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* 👑 ৩ টপার পোডিয়াম সেকশন (যদি সার্চ কুয়েরি ফাকা থাকে তবেই সুন্দর লাগবে) */}
        {!searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-8 max-w-4xl mx-auto">
            
            {/* 🥈 Rank 2: বাম পাশে */}
            {topThree[1] && (
              <div className="bg-white/60 dark:bg-zinc-900/30 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 p-6 rounded-2xl flex flex-col items-center text-center order-2 md:order-1 relative group hover:-translate-y-1 transition duration-300 shadow-xl">
                <div className="absolute top-4 left-4 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono font-black px-2 py-0.5 rounded-md text-zinc-500">#2</div>
                <div className="relative mb-3">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[1].Avatar}`} className="h-16 w-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" alt="" />
                  <span className="absolute -bottom-2 -right-2 bg-slate-400 text-white p-1 rounded-md shadow-lg"><Medal size={12} /></span>
                </div>
                <h3 className="text-sm font-black tracking-tight">{topThree[1].name}</h3>
                <p className="text-[10px] font-bold text-indigo-500/80 mb-2">{topThree[1].badge}</p>
                <div className="flex items-center gap-4 text-xs font-bold pt-2 border-t dark:border-zinc-800/80 w-full justify-center">
                  <span className="text-zinc-500 flex items-center gap-1 font-mono"><Zap size={11} className="text-amber-500" /> {topThree[1].xp} XP</span>
                  <span className="text-orange-500 flex items-center gap-0.5 font-mono"><Flame size={11} /> {topThree[1].streak}d</span>
                </div>
              </div>
            )}

            {/* 🥇 Rank 1: মাঝখানে (সবচেয়ে বড় ও গ্লোয়িং) */}
            {topThree[0] && (
              <div className="bg-gradient-to-b from-amber-500/10 via-white/80 to-white/40 dark:from-amber-500/10 dark:via-zinc-900/60 dark:to-zinc-900/20 backdrop-blur-md border-2 border-amber-500/30 dark:border-amber-500/20 p-8 rounded-3xl flex flex-col items-center text-center order-1 md:order-2 relative group hover:-translate-y-1 transition duration-300 shadow-2xl scale-105 z-10">
                <div className="absolute -top-5 text-amber-500 animate-bounce"><Crown size={32} className="fill-current" /></div>
                <div className="absolute top-4 left-4 bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-black px-2 py-0.5 rounded-md">1ST PLACE</div>
                <div className="relative mb-4 mt-2">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[0].Avatar}`} className="h-20 w-20 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-2 border-amber-500/40" alt="" />
                  <span className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-1.5 rounded-md shadow-lg"><Trophy size={14} className="fill-current" /></span>
                </div>
                <h3 className="text-base font-black tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">{topThree[0].name}</h3>
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-500 mb-3">{topThree[0].badge}</p>
                <div className="flex items-center gap-5 text-xs font-bold pt-3 border-t border-amber-500/10 w-full justify-center">
                  <span className="text-zinc-800 dark:text-zinc-200 flex items-center gap-1 font-mono text-sm"><Zap size={13} className="text-amber-500 fill-current" /> {topThree[0].xp} XP</span>
                  <span className="text-orange-500 flex items-center gap-0.5 font-mono"><Flame size={13} /> {topThree[0].streak} Day Streak</span>
                </div>
              </div>
            )}

            {/* 🥉 Rank 3: ডান পাশে */}
            {topThree[2] && (
              <div className="bg-white/60 dark:bg-zinc-900/30 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 p-6 rounded-2xl flex flex-col items-center text-center order-3 relative group hover:-translate-y-1 transition duration-300 shadow-xl">
                <div className="absolute top-4 left-4 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono font-black px-2 py-0.5 rounded-md text-zinc-500">#3</div>
                <div className="relative mb-3">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[2].Avatar}`} className="h-16 w-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" alt="" />
                  <span className="absolute -bottom-2 -right-2 bg-amber-700 text-white p-1 rounded-md shadow-lg"><Medal size={12} /></span>
                </div>
                <h3 className="text-sm font-black tracking-tight">{topThree[2].name}</h3>
                <p className="text-[10px] font-bold text-indigo-500/80 mb-2">{topThree[2].badge}</p>
                <div className="flex items-center gap-4 text-xs font-bold pt-2 border-t dark:border-zinc-800/80 w-full justify-center">
                  <span className="text-zinc-500 flex items-center gap-1 font-mono"><Zap size={11} className="text-amber-500" /> {topThree[2].xp} XP</span>
                  <span className="text-orange-500 flex items-center gap-0.5 font-mono"><Flame size={11} /> {topThree[2].streak}d</span>
                </div>
              </div>
            )}

          </div>
        )}

        {/* 📊 মেইন মেম্বারস লিস্ট / টেবিল ল্যাব */}
        <div className="max-w-4xl mx-auto space-y-2.5">
          {/* টেবিল হেডার লেবেল */}
          <div className="flex items-center justify-between px-6 py-2 text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            <div className="flex items-center gap-8">
              <span className="w-6 text-center">Rank</span>
              <span>Student Profile</span>
            </div>
            <div className="flex items-center gap-12 md:gap-20">
              <span className="hidden sm:inline">Streak</span>
              <span>Badges</span>
              <span className="w-16 text-right">Score</span>
            </div>
          </div>

          {/* লিস্ট আইটেমস */}
          {restOfLeaders.length > 0 ? (
            restOfLeaders.map((user) => (
              <div 
                key={user.rank}
                className="flex items-center justify-between p-4 bg-white/70 dark:bg-zinc-900/20 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-900 rounded-2xl hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all duration-200 group group/row"
              >
                {/* বাম পাশ: র‍্যাঙ্ক ও প্রোফাইল */}
                <div className="flex items-center gap-6 md:gap-8">
                  <span className="w-6 text-center text-xs font-mono font-black text-zinc-400 dark:text-zinc-500 group-hover/row:text-indigo-500 transition-colors">
                    {user.rank.toString().padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.Avatar}`} 
                      className="h-9 w-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-800 shrink-0" 
                      alt="" 
                    />
                    <div>
                      <h4 className="text-xs font-black tracking-tight text-zinc-800 dark:text-zinc-200 group-hover/row:text-indigo-600 dark:group-hover/row:text-indigo-400 transition-colors">
                        {user.name}
                      </h4>
                      <span className="text-[9px] text-zinc-400 font-medium">Cohort Peer</span>
                    </div>
                  </div>
                </div>

                {/* ডান পাশ: স্কোর, স্ট্রিক ও ব্যাজ */}
                <div className="flex items-center gap-12 md:gap-20 text-xs font-bold">
                  {/* স্ট্রিক */}
                  <span className="hidden sm:flex items-center gap-0.5 text-orange-500 font-mono text-[11px]">
                    <Flame size={12} className="fill-current" /> {user.streak}d
                  </span>
                  
                  {/* ব্যাজ */}
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md border dark:border-zinc-800 text-center min-w-[75px]">
                    {user.badge}
                  </span>

                  {/* টোটাল এক্সপি */}
                  <span className="w-16 text-right font-mono text-zinc-900 dark:text-white flex items-center justify-end gap-1 text-[13px] font-black">
                    {user.xp.toLocaleString()} <span className="text-[9px] font-sans font-bold text-zinc-400">XP</span>
                  </span>
                </div>

              </div>
            ))
          ) : (
            // ফাকা ডাটা হ্যান্ডেলার
            <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 text-xs font-medium">
              No elite coders found matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* 🏆 কারেন্ট ইউজারের নিজের পজিশন স্টিকি ডক (Udemy/Leetcode Style) */}
        <div className="max-w-4xl mx-auto pt-4">
          <div className="bg-gradient-to-r from-indigo-900/90 to-violet-900/90 dark:from-indigo-950/50 dark:to-violet-950/50 backdrop-blur-xl text-white p-4 rounded-2xl border border-indigo-500/30 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 h-8 w-8 rounded-lg flex items-center justify-center font-mono font-black text-xs text-indigo-200">#18</div>
              <div>
                <p className="text-xs font-black tracking-tight flex items-center gap-1">Your Standing <ArrowUpRight size={12} className="text-emerald-400" /></p>
                <p className="text-[10px] text-indigo-200/70 font-medium">You are outperforming 78% of your cohort</p>
              </div>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs font-bold">
              <span className="text-orange-400 flex items-center gap-0.5"><Flame size={12} /> 4d streak</span>
              <span className="bg-white text-indigo-950 px-3 py-1.5 rounded-xl font-black text-[11px] shadow-xs">4,850 XP</span>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}