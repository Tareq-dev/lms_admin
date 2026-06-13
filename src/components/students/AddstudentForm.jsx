"use client";

import React from "react";
import { UserPlus, UserCheck, X, Layers } from "lucide-react";

function AddstudentForm({
  editingId,
  resetForm,
  handleSubmit,
  formData,
  handleChange,
}) {
  return (
    <div className="h-fit w-full rounded-3xl border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 dark:border-zinc-800/80 dark:bg-zinc-900/80 backdrop-blur-md animate-in slide-in-from-top-4 duration-300">
      
      {/* 🏷️ Header Section */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-50 pb-4 dark:border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-2xl p-2.5 transition-colors ${
              editingId 
                ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" 
                : "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
            }`}
          >
            {editingId ? <UserCheck size={20} /> : <UserPlus size={20} />}
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              {editingId ? "Modify Student Profile" : "Onboard Premium Student"}
            </h2>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
              {editingId
                ? "Update core student dossier and system credentials below."
                : "Fill in metadata to register a new cohort member."}
            </p>
          </div>
        </div>
      </div>

      {/* 📝 Form Section */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          
          {/* Student Name */}
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="e.g. Alex Mercer"
              value={formData.name || ""}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-zinc-700/60 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="alex@example.com"
              value={formData.email || ""}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-zinc-700/60 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="e.g. +880 1712-345678"
              value={formData.phone || ""}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-zinc-700/60 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          {/* Enrolled Course */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Enrolled Course
            </label>
            <input
              name="course"
              type="text"
              placeholder="e.g. Next.js Premium Course"
              value={formData.course || ""}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-zinc-700/60 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          {/* ⏳ নতুন ব্যাচ সিলেক্টর ড্রপডাউন (Batch Logic Integration) */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Layers size={12} className="text-indigo-500" /> Allocated Batch
            </label>
            <div className="relative">
              <select
                name="batch"
                value={formData.batch || ""}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-zinc-700/60 dark:bg-zinc-950 dark:text-white cursor-pointer appearance-none"
              >
                <option value="" disabled hidden>Select Target Batch</option>
                <option value="Batch 1">Batch 01 (Core Alpha)</option>
                <option value="Batch 2">Batch 02 (Premium Beta)</option>
                <option value="Batch 3">Batch 03 (Elite Gamma)</option>
                <option value="Batch 4">Batch 04 (Next Gen)</option>
              </select>
              {/* কাস্টম পশ ইন্ডিকেটর অ্যারো */}
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                <span className="text-[10px]">▼</span>
              </div>
            </div>
          </div>

          {/* Enrollment Date */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Enrollment Matriculation Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-zinc-700/60 dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>

        {/* 🎬 Action Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-50 dark:border-zinc-900/40 w-full sm:max-w-md">
          <button
            type="submit"
            className="flex-1 rounded-xl cursor-pointer bg-slate-900 py-3 text-xs font-black text-white tracking-wide transition-all hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-zinc-950 dark:hover:bg-slate-100 shadow-sm"
          >
            {editingId ? "Save Profile Blueprint" : "Publish Enrollment"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="flex items-center cursor-pointer justify-center gap-1.5 rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X size={14} strokeWidth={2.5} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddstudentForm;