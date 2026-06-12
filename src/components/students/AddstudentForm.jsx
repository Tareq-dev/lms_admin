import React from "react";
import { UserPlus, UserCheck, X } from "lucide-react";

function AddstudentForm({
  editingId,
  resetForm,
  handleSubmit,
  formData,
  handleChange,
}) {
  return (
    <div className="h-fit w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-50 pb-4 dark:border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-xl p-2.5 ${editingId ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"}`}
          >
            {editingId ? <UserCheck size={20} /> : <UserPlus size={20} />}
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {editingId ? "Update Student Profile" : "Register New Student"}
            </h2>
            <p className="text-xs text-slate-400 dark:text-zinc-500">
              {editingId
                ? "Modify the student credentials below"
                : "Fill in the details to onboard a student"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Student Name */}
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-zinc-400">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500 dark:focus:bg-zinc-900"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-zinc-400">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500 dark:focus:bg-zinc-900"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-zinc-400">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500 dark:focus:bg-zinc-900"
            />
          </div>

          {/* Purchased Course */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-zinc-400">
              Enrolled Course
            </label>
            <input
              name="course"
              type="text"
              placeholder="e.g. Full-Stack Web Dev"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500 dark:focus:bg-zinc-900"
            />
          </div>

          {/* Enrolled Date */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-zinc-400">
              Enrollment Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-zinc-900"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 w-[50%]">
          <button
            type="submit"
            className="flex-1 rounded-xl cursor-pointer  bg-slate-900 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
          >
            {editingId ? "Save Changes" : "Register Student"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="flex items-center cursor-pointer  justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X size={15} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddstudentForm;
