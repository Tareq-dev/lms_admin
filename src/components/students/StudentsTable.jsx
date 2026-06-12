import {
  Search,
  Pencil,
  Trash2,
  Users,
  GraduationCap,
  BookOpen,
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

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      `${student.name} ${student.email} ${student.course}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [students, search]);

  const handleEdit = (student) => {
    if (setEditingId && setFormData) {
      setEditingId(student.id);
      setFormData({
        name: student.name,
        email: student.email,
        course: student.course,
        phone: student.phone,
        date: student.date,
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
    <div className="w-full space-y-6 p-1">
      {/* Stats Cards Section */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Students Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                Total Students
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {students.length}
              </h2>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400">
              <Users size={24} />
            </div>
          </div>
        </div>

        {/* Active Students Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                Active Students
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
                {
                  students.filter((student) => student.status === "Active")
                    .length
                }
              </h2>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 transition-colors group-hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400">
              <GraduationCap size={24} />
            </div>
          </div>
        </div>

        {/* Total Courses Sold Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                Total Courses Sold
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {students.length}
              </h2>
            </div>
            <div className="rounded-xl bg-violet-50 p-3 text-violet-600 transition-colors group-hover:bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400">
              <BookOpen size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Modern Search Bar */}
        <div className="border-b border-slate-100 p-5 dark:border-zinc-800">
          <div className="relative max-w-md">
            <Search
              className="absolute left-4 top-3.5 text-slate-400 dark:text-zinc-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, email, or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500 dark:focus:bg-zinc-900"
            />
          </div>
        </div>

        {/* Responsive Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 font-semibold text-slate-600 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
                <th className="p-4 pl-6">Name</th>
                <th className="p-4">Course</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Join Date</th>
                <th className="p-4 pr-6 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-zinc-800 dark:text-zinc-300">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-800/30"
                >
                  <td className="p-4 pl-6 font-semibold text-slate-900 dark:text-white">
                    {student.name}
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                      {student.course}
                    </span>
                  </td>

                  <td className="p-4 text-slate-500 dark:text-zinc-400">
                    {student.email}
                  </td>

                  <td className="p-4 text-slate-500 dark:text-zinc-400">
                    {student.phone}
                  </td>

                  <td className="p-4 text-slate-500 dark:text-zinc-400">
                    {student.date}
                  </td>

                  <td className="p-4 pr-6">
                    <div className="flex justify-center gap-1.5">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(student)}
                        className="rounded-lg cursor-pointer  border border-slate-200 p-2 text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                        title="Edit Student"
                      >
                        <Pencil size={15} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="rounded-lg cursor-pointer  border border-slate-200 p-2 text-slate-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-zinc-700 dark:text-zinc-500 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                        title="Delete Student"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State UI */}
          {filteredStudents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="rounded-full bg-slate-50 p-4 text-slate-400 dark:bg-zinc-800 dark:text-zinc-500">
                <Search size={32} />
              </div>
              <p className="mt-4 text-base font-medium text-slate-900 dark:text-white">
                No students found
              </p>
              <p className="mt-1 text-sm text-slate-400 dark:text-zinc-500">
                Try adjusting your keywords or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentsTable;
