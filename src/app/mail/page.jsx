"use client";

import React, { useState } from "react";
import { Send, Users, Sparkles, FileText, Globe, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AdminBroadcastCenter() {
  const [isSending, setIsSending] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* 🏷️ Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
              Broadcast Center <Sparkles size={18} className="text-indigo-500" />
            </h1>
            <p className="text-zinc-400 text-sm mt-1">Send bulk announcements to your students.</p>
          </div>
          <div className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
            System Admin Mode
          </div>
        </div>

        {/* ✉️ Main Form */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-6">
          
          {/* 👥 Bulk Selection Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase">Target Audience</label>
              <select className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-medium focus:ring-2 ring-indigo-500/20 outline-none">
                <option>All Active Students</option>
                <option>Trial Users Only</option>
                <option>Premium Subscribers</option>
                <option>Specific Course Cohort</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase">Delivery Channel</label>
              <div className="flex gap-2">
                <button className="flex-1 p-4 rounded-2xl bg-indigo-600 text-white font-bold text-sm">Email</button>
                <button className="flex-1 p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 font-bold text-sm text-zinc-500">Push App</button>
              </div>
            </div>
          </div>

          {/* 📝 Subject & Body */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase">Subject Line</label>
            <input type="text" className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm" placeholder="Ex: New module launch alert!" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase">Message Content</label>
            <textarea className="w-full h-64 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm resize-none" placeholder="Write your announcement here..."></textarea>
          </div>

          {/* 🚀 Action Button */}
          <button 
            onClick={() => setIsSending(true)}
            disabled={isSending}
            className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-black rounded-2xl hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            {isSending ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Send size={18} /> Broadcast Message
              </>
            )}
          </button>
        </div>

        {/* 💡 Stats Snippet */}
        <div className="flex items-center gap-6 text-xs text-zinc-400 justify-center">
          <span className="flex items-center gap-1"><Users size={14}/> 1,240 Total Recipients</span>
          <span className="flex items-center gap-1"><Globe size={14}/> Delivery Rate: 98%</span>
        </div>

      </div>
    </DashboardLayout>
  );
}