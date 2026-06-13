"use client";

import React, { useState } from "react";
import { User, Lock, Bell, Camera, ShieldCheck, Mail, ChevronRight, Sparkles } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-12">
        
        {/* 🌟 Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-white flex items-center gap-3">
            Account Settings <Sparkles size={20} className="text-amber-500" />
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Personalize your EduPulse experience and manage your security.</p>
        </div>

        {/* 💳 Profile Section (Glass Card) */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-sm space-y-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" className="h-24 w-24 rounded-3xl bg-zinc-100 dark:bg-zinc-800 p-1 border-2 border-zinc-200 dark:border-zinc-700" alt="Avatar" />
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transition-transform">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h2 className="text-lg font-bold">Alex Mercer</h2>
              <p className="text-xs font-mono text-indigo-500 font-bold tracking-widest uppercase">Owner Account</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full Name" placeholder="Alex Mercer" />
            <InputField label="Email Address" placeholder="alex@edupulse.com" disabled />
          </div>
        </div>

        {/* 🛡️ Security Section (Subtle Border) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
            <Lock size={20} className="text-indigo-500" />
            <h2 className="font-black text-xl">Security & Credentials</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="password" placeholder="Current Password" className="col-span-1 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm focus:ring-2 ring-indigo-500/20 outline-none" />
            <input type="password" placeholder="New Password" className="col-span-1 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm focus:ring-2 ring-indigo-500/20 outline-none" />
            <button className="col-span-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-2xl hover:opacity-90 transition-all">
              Change Password
            </button>
          </div>
        </div>

        {/* 🔔 Notifications List (Clean Row Style) */}
        <div className="space-y-4">
          <h2 className="font-black text-xl flex items-center gap-2">
            <Bell size={20} className="text-amber-500" /> Notification Preferences
          </h2>
          <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 divide-y dark:divide-zinc-800 overflow-hidden">
            <NotificationRow title="Email Notifications" desc="Get course updates and reports via email." />
            <NotificationRow title="Security Alerts" desc="Receive login and account security logs." />
            <NotificationRow title="Instructor Messages" desc="Stay connected with your mentors." />
          </div>
        </div>

        {/* 🚀 Action Bar */}
        <div className="flex justify-end pt-6 border-t border-zinc-200 dark:border-zinc-800 gap-4">
          <button className="px-8 py-3 text-sm font-bold text-zinc-500">Reset</button>
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all">
            Save Changes
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

// 🧩 Helper Components for Clean Code
function InputField({ label, placeholder, disabled }) {
  return (
    <div>
      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder} 
        disabled={disabled}
        className={`w-full mt-2 p-4 rounded-2xl border bg-zinc-50 dark:bg-zinc-900 ${disabled ? 'opacity-50 cursor-not-allowed' : 'border-zinc-200 dark:border-zinc-800'} text-sm focus:ring-2 ring-indigo-500/20 outline-none`} 
      />
    </div>
  );
}

function NotificationRow({ title, desc }) {
  return (
    <div className="flex items-center justify-between p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
      <div>
        <h4 className="text-sm font-bold">{title}</h4>
        <p className="text-xs text-zinc-500">{desc}</p>
      </div>
      <div className="h-6 w-11 bg-indigo-600 rounded-full flex items-center p-1 cursor-pointer">
        <div className="h-4 w-4 bg-white rounded-full ml-auto" />
      </div>
    </div>
  );
}