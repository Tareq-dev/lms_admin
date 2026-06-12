"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus, ArrowLeft } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import CourseTable from "@/components/courses/CourseTable";
import CourseForm from "@/components/courses/CourseForm";

import { deleteCourse } from "@/features/courses/courseSlice";

export default function CoursesPage() {
  const dispatch = useDispatch();
  const courses = useSelector((s) => s.courses.courses);

  const [mode, setMode] = useState("list");
  const [editing, setEditing] = useState(null);

  return (
    <DashboardLayout>
      <div className="w-full space-y-6 max-w-[1400px] mx-auto p-1 animate-in fade-in duration-200">
        {mode === "list" && (
          <>
            {/* Header Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-50 pb-5 dark:border-zinc-800/50">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Courses Dashboard
                </h1>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  Manage curriculum, view active enrollments, and update details.
                </p>
              </div>

              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-100 transition-all hover:bg-indigo-500 active:scale-[0.98] dark:shadow-none"
                onClick={() => {
                  setEditing(null);
                  setMode("form");
                }}
              >
                <Plus size={16} />
                Create Course
              </button>
            </div>

            {/* Table wrapper for matching card-style consistency */}
            <CourseTable
              courses={courses}
              onEdit={(course) => {
                setEditing(course);
                setMode("form");
              }}
              onDelete={(id) => {
                dispatch(deleteCourse(id));
              }}
            />
          </>
        )}

        {mode === "form" && (
          <div className="space-y-6 max-w-3xl">
            {/* Form Top Navigation Bar */}
            <div className="flex items-center">
              <button
                onClick={() => setMode("list")}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to courses list
              </button>
            </div>

            {/* Rendered Form component inside unified container */}
            <CourseForm editing={editing} onCancel={() => setMode("list")} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}