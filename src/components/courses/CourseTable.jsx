"use client";

import { Pencil, Trash2, GraduationCap, DollarSign } from "lucide-react";

export default function CourseTable({ courses = [], onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 font-semibold text-slate-600 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
              <th className="p-4 pl-6 w-16">SL</th>
              <th className="p-4 min-w-[200px]">Course Title</th>
              <th className="p-4">Instructor</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Enrolled Students</th>
              <th className="p-4">Status</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-zinc-800 dark:text-zinc-300">
            {courses.map((course, idx) => (
              <tr 
                key={course.id} 
                className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-800/30"
              >
                {/* Serial Number */}
                <td className="p-4 pl-6 font-medium text-slate-400 dark:text-zinc-500">
                  {String(idx + 1).padStart(2, '0')}
                </td>

                {/* Course Title */}
                <td className="p-4 font-semibold text-slate-900 dark:text-white">
                  {course.title}
                </td>

                {/* Instructor */}
                <td className="p-4 text-slate-600 dark:text-zinc-400">
                  {course.instructor}
                </td>

                {/* Category */}
                <td className="p-4">
                  <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {course.category}
                  </span>
                </td>

                {/* Price */}
                <td className="p-4 font-semibold text-slate-900 dark:text-white">
                  <span className="inline-flex items-center gap-0.5">
                    <DollarSign size={14} className="text-slate-400" />
                    {course.price}
                  </span>
                </td>

                {/* Enrolled Students */}
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400">
                    <GraduationCap size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-zinc-300">{course.students || 0}</span>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="p-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                    course.status === "Published" || course.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                      : "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                  }`}>
                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                      course.status === "Published" || course.status === "Active" ? "bg-emerald-500" : "bg-amber-500"
                    }`} />
                    {course.status || "Draft"}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="p-4 pr-6">
                  <div className="flex justify-end gap-1.5">
                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit(course)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 cursor-pointer"
                      title="Edit Course"
                    >
                      <Pencil size={14} />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => onDelete(course.id)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-zinc-700 dark:text-zinc-500 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400 cursor-pointer"
                      title="Delete Course"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State UI */}
        {courses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="rounded-full bg-slate-50 p-4 text-slate-400 dark:bg-zinc-800 dark:text-zinc-500">
              <GraduationCap size={32} />
            </div>
            <p className="mt-4 text-base font-medium text-slate-900 dark:text-white">No courses available</p>
            <p className="mt-1 text-sm text-slate-400 dark:text-zinc-500">Click on 'Create Course' to add your first curriculum.</p>
          </div>
        )}
      </div>
    </div>
  );
}