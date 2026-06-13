"use client";

import {
  Search,
  Pencil,
  Trash2,
  Users,
  GraduationCap,
  BookOpen,
  Filter,
  RefreshCw,
} from "lucide-react";
import React, { useMemo, useState } from "react";

function StudentsTable({
  setShowForm,
  students,
  setStudents,
  setEditingId,
  setFormData,
}) {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedBatch, setSelectedBatch] = useState("All");

  // ১. ডাইনামিক্যালি ডাটা থেকে ইউনিক কোর্স এবং ব্যাচ লিস্ট জেনারেট করা (হার্ডকোড করা লাগবে না)
  const availableCourses = useMemo(() => {
    const courses = students.map((s) => s.course).filter(Boolean);
    return ["All", ...new Set(courses)];
  }, [students]);

  const availableBatches = useMemo(() => {
    // মনে করুন আপনার স্টুডেন্ট অবজেক্টে `batch` প্রোপার্টি আছে (যেমন: "Batch 1", "Batch 2")
    // যদি না থাকে, এটি সেফলি ফলব্যাক হ্যান্ডেল করবে।
    const batches = students.map((s) => s.batch).filter(Boolean);
    return ["All", ...new Set(batches)];
  }, [students]);

  // ২. রিচ মাল্টি-লেয়ার ফিল্টারিং ইঞ্জিন (Search + Course + Batch)
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = `${student.name} ${student.email} ${student.course}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCourse =
        selectedCourse === "All" || student.course === selectedCourse;

      const matchesBatch =
        selectedBatch === "All" || student.batch === selectedBatch;

      return matchesSearch && matchesCourse && matchesBatch;
    });
  }, [students, search, selectedCourse, selectedBatch]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCourse("All");
    setSelectedBatch("All");
  };

  const handleEdit = (student) => {
    if (setEditingId && setFormData) {
      setEditingId(student.id);
      setFormData({
        name: student.name,
        email: student.email,
        course: student.course,
        phone: student.phone,
        date: student.date,
        batch: student.batch || "", // ব্যাচ ফিল্ড ব্যাকআপ
      });
    }
    setShowForm(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this student?")) return;
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="w-full space-y-8 p-1">
      {/* 📊 স্ট্যাটাস কার্ড গ্রিড (Ultra Posh Look) */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/40">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Total Matrix
              </p>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {students.length}
              </h2>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 transition-transform group-hover:scale-105 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Users size={22} />
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/40">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Active Pulse
              </p>
              <h2 className="text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                {students.filter((s) => s.status === "Active").length}
              </h2>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600 transition-transform group-hover:scale-105 dark:bg-emerald-500/10 dark:text-emerald-400">
              <GraduationCap size={22} />
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/40 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Cohorts Enrolled
              </p>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {filteredStudents.length} <span className="text-xs font-medium text-slate-400">filtered</span>
              </h2>
            </div>
            <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-600 transition-transform group-hover:scale-105 dark:bg-cyan-500/10 dark:text-cyan-400">
              <BookOpen size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* 🏎️ মেইন ডাটা চেসিস ও এলিট ফিল্টার কন্ট্রোল প্যানেল */}
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xs dark:border-zinc-800/80 dark:bg-zinc-900/80 backdrop-blur-md">
        
        {/* 🛠️ ফিল্টার বার ম্যাট্রিক্স (হাই-এন্ড রেসপন্সিভ গ্রিড) */}
        <div className="border-b border-slate-50 p-5 dark:border-zinc-800/60 bg-slate-50/20 dark:bg-zinc-900/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            
            {/* সার্চ পার্ট */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-4 top-3.5 text-slate-400 dark:text-zinc-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Search dossiers by name, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200/70 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 dark:border-zinc-700/60 dark:bg-zinc-950 dark:text-white"
              />
            </div>

            {/* ড্রপডাউন ফিল্টারস গ্রুপ */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* কোর্স ফিল্টার */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-700/60 px-3 py-1.5 rounded-xl shadow-2xs">
                <Filter size={14} className="text-slate-400" />
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 dark:text-zinc-300 outline-none cursor-pointer pr-2"
                >
                  <option value="All">All Courses</option>
                  {availableCourses.filter(c => c !== "All").map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              {/* ব্যাচ ফিল্টার */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-950 border border-slate-200/70 dark:border-zinc-700/60 px-3 py-1.5 rounded-xl shadow-2xs">
                <Filter size={14} className="text-slate-400" />
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 dark:text-zinc-300 outline-none cursor-pointer pr-2"
                >
                  <option value="All">All Batches</option>
                  {availableBatches.filter(b => b !== "All").map((batch) => (
                    <option key={batch} value={batch}>{batch}</option>
                  ))}
                </select>
              </div>

              {/* রিসেট বাটন */}
              {(search || selectedCourse !== "All" || selectedBatch !== "All") && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:opacity-90 px-3 py-2 rounded-xl transition cursor-pointer"
                >
                  <RefreshCw size={12} /> Clear Filter
                </button>
              )}
            </div>

          </div>
        </div>

        {/* 📋 রেসপন্সিভ প্রিমিয়াম টেবিল */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/40 font-bold text-slate-500 dark:border-zinc-800/60 dark:bg-zinc-800/20 dark:text-zinc-400">
                <th className="p-4 pl-6">Student Info</th>
                <th className="p-4">Syllabus Cohort</th>
                <th className="p-4">Batch Index</th>
                <th className="p-4">Contact Matrix</th>
                <th className="p-4">Matriculation Date</th>
                <th className="p-4 pr-6 text-center">Operational Trigger</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100/70 text-slate-700 dark:divide-zinc-800/50 dark:text-zinc-300">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="group transition-colors hover:bg-slate-50/30 dark:hover:bg-zinc-800/10"
                >
                  {/* স্টুডেন্ট অবতার ও ইনফো */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-zinc-800 font-bold text-xs flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-slate-200/40 dark:border-zinc-700">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {student.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 mt-0.5">{student.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* কোর্স ব্যাজ */}
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-lg bg-indigo-50/60 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                      {student.course}
                    </span>
                  </td>

                  {/* ব্যাচ কলাম (নতুন সংযোজন!) */}
                  <td className="p-4 font-mono text-xs font-bold text-slate-500 dark:text-zinc-400">
                    {student.batch || "N/A"}
                  </td>

                  <td className="p-4 font-mono text-xs text-slate-500 dark:text-zinc-400">
                    {student.phone}
                  </td>

                  <td className="p-4 text-slate-500 dark:text-zinc-400">
                    {student.date}
                  </td>

                  {/* অ্যাকশন বাটনস */}
                  <td className="p-4 pr-6">
                    <div className="flex justify-center gap-1.5">
                      <button
                        onClick={() => handleEdit(student)}
                        className="rounded-xl cursor-pointer border border-slate-200 p-2 text-slate-500 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                        title="Edit Student"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        onClick={() => handleDelete(student.id)}
                        className="rounded-xl cursor-pointer border border-slate-200 p-2 text-slate-400 transition-all hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 dark:border-zinc-700 dark:text-zinc-500 dark:hover:border-rose-500/30 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
                        title="Delete Student"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🔍 এম্পটি স্টেট (যদি কোনো ফিল্টার ম্যাচ না করে) */}
          {filteredStudents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-300">
              <div className="rounded-2xl bg-slate-50 p-4 text-slate-400 dark:bg-zinc-800 dark:text-zinc-500">
                <Search size={28} />
              </div>
              <p className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                No matching student dossiers found
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-zinc-500 max-w-xs">
                We couldn't find anything matching your search query or filter combination.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 text-xs font-bold text-white bg-slate-900 dark:bg-white dark:text-zinc-950 px-4 py-2 rounded-xl hover:opacity-90 active:scale-95 transition cursor-pointer"
              >
                Reset System Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentsTable;