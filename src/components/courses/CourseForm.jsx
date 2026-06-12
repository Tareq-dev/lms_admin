"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse, updateCourse } from "@/features/courses/courseSlice";
import { Trash2, Plus, Video, Layers, X, BookOpen } from "lucide-react";

export default function CourseForm({ editing, onCancel }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState(
    editing || {
      title: "",
      instructor: "",
      category: "",
      price: "",
      duration: "",
      level: "",
      language: "",
      description: "",
      thumbnail: null,
      modules: [],
      status: "",
    },
  );

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        modules: editing.modules || [],
      });
    }
  }, [editing]);

  const [errors, setErrors] = useState({});

  // -------------------
  // INPUT CHANGE
  // -------------------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // -------------------
  // MODULE SYSTEM
  // -------------------
  const addModule = () => {
    setForm({
      ...form,
      modules: [...form.modules, { title: "", chapters: [] }],
    });
  };

  const removeModule = (index) => {
    const modules = form.modules.filter((_, i) => i !== index);
    setForm({ ...form, modules });
  };

  const updateModule = (index, value) => {
    const modules = [...form.modules];
    modules[index].title = value;
    setForm({ ...form, modules });
  };

  // -------------------
  // CHAPTER SYSTEM
  // -------------------
  const addChapter = (moduleIndex) => {
    const modules = [...form.modules];
    modules[moduleIndex].chapters.push({
      title: "",
      video: "",
    });
    setForm({ ...form, modules });
  };

  const removeChapter = (moduleIndex, chapterIndex) => {
    const modules = [...form.modules];
    modules[moduleIndex].chapters = modules[moduleIndex].chapters.filter(
      (_, i) => i !== chapterIndex,
    );
    setForm({ ...form, modules });
  };

  const updateChapter = (moduleIndex, chapterIndex, field, value) => {
    const modules = [...form.modules];
    modules[moduleIndex].chapters[chapterIndex][field] = value;
    setForm({ ...form, modules });
  };

  // -------------------
  // VALIDATION
  // -------------------
  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Course title is required";
    if (!form.instructor.trim()) err.instructor = "Instructor name required";
    if (!form.category.trim()) err.category = "Category required";
    if (!form.price) err.price = "Price required";
    if (!form.duration) err.duration = "Duration required";
    if (!form.level) err.level = "Level required";
    if (!form.description) err.description = "Description required";
    if (!form.thumbnail) err.thumbnail = "Thumbnail required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // -------------------
  // SUBMIT
  // -------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editing) {
      dispatch(updateCourse({ ...form, id: editing.id }));
    } else {
      dispatch(addCourse({ ...form, id: Date.now() }));
    }
    onCancel();
  };

  // কমন ক্লাসের জন্য ভেরিয়েবল (কোড ক্লিন রাখার জন্য)
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500 dark:focus:bg-zinc-900";
  const labelClass =
    "mb-1.5 block text-xs font-semibold text-slate-600 dark:text-zinc-400";

  return (
    <div className="h-fit w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-50 pb-4 dark:border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-xl p-2.5 ${editing ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"}`}
          >
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {editing ? "Update Course Details" : "Create New Course"}
            </h2>
            <p className="text-xs text-slate-400 dark:text-zinc-500">
              {editing
                ? "Modify the course architecture below"
                : "Fill in the details to publish a new course"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BASIC INFO */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Course Title</label>
            <input
              name="title"
              type="text"
              placeholder="e.g. Next.js Masterclass"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Instructor Name</label>
            <input
              name="instructor"
              type="text"
              placeholder="e.g. Jane Doe"
              value={form.instructor}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.instructor && (
              <p className="text-red-500 text-xs mt-1">{errors.instructor}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <input
              name="category"
              type="text"
              placeholder="e.g. Web Development"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Price ($)</label>
            <input
              name="price"
              type="number"
              placeholder="e.g. 99"
              value={form.price}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Duration</label>
            <input
              name="duration"
              type="text"
              placeholder="e.g. 12 Hours"
              value={form.duration}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Difficulty Level</label>
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className={`${inputClass} appearance-none`}
            >
              <option value="">Select Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            {errors.level && (
              <p className="text-red-500 text-xs mt-1">{errors.level}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Publication Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={`${inputClass} appearance-none`}
            >
              <option value="">Select Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>

          {/* THUMBNAIL */}
          <div className="sm:col-span-2 border border-dashed border-slate-200 dark:border-zinc-700 rounded-xl p-4 bg-slate-50/30 dark:bg-zinc-800/20">
            <label className={labelClass}>Course Thumbnail</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <input
                type="file"
                accept="image/*"
                className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-zinc-800 dark:file:text-zinc-300"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setForm({
                      ...form,
                      thumbnail: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
              {form.thumbnail && (
                <img
                  src={form.thumbnail}
                  alt="Preview"
                  className="w-32 h-20 rounded-xl border object-cover shadow-sm bg-white dark:border-zinc-700"
                />
              )}
            </div>
            {errors.thumbnail && (
              <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Course Description</label>
            <textarea
              name="description"
              placeholder="Write a comprehensive course overview..."
              value={form.description}
              onChange={handleChange}
              className={`${inputClass} h-28 resize-none`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        {/* MODULE SYSTEM */}
        <div className="border-t border-slate-100 pt-6 dark:border-zinc-800/60 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-slate-800 dark:text-zinc-200 flex items-center gap-2">
                <Layers size={18} className="text-indigo-500" />
                Course Modules
              </h3>
              <p className="text-xs text-slate-400 dark:text-zinc-500">
                Add segments and structural topics for this course
              </p>
            </div>

            <button
              type="button"
              onClick={addModule}
              className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-sm shadow-indigo-500/10 active:scale-95 cursor-pointer"
            >
              <Plus size={14} />
              Add Module
            </button>
          </div>

          <div className="space-y-4">
            {form.modules?.map((module, mIndex) => (
              <div
                key={mIndex}
                className="bg-slate-50/50 dark:bg-zinc-800/30 border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 space-y-4 transition-all"
              >
                {/* MODULE TITLE */}
                <div className="flex gap-3 items-center">
                  <div className="font-bold w-14 text-xs text-slate-400 bg-slate-200/60 dark:bg-zinc-800 px-2.5 py-1 rounded-lg">
                    M-{mIndex + 1}
                  </div>
                  <input
                    placeholder="Module title (e.g., Getting Started with React)"
                    value={module.title}
                    onChange={(e) => updateModule(mIndex, e.target.value)}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => removeModule(mIndex)}
                    className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* CHAPTERS */}
                <div className="pl-6 space-y-3 border-l-2 border-slate-200/60 dark:border-zinc-800">
                  {module.chapters.map((chapter, cIndex) => (
                    <div
                      key={cIndex}
                      className="flex flex-col sm:flex-row gap-3 items-center bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-3 rounded-xl shadow-none"
                    >
                      <input
                        placeholder="Chapter title"
                        value={chapter.title}
                        onChange={(e) =>
                          updateChapter(mIndex, cIndex, "title", e.target.value)
                        }
                        className={inputClass}
                      />
                      <input
                        placeholder="Video URL"
                        value={chapter.video}
                        onChange={(e) =>
                          updateChapter(mIndex, cIndex, "video", e.target.value)
                        }
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => removeChapter(mIndex, cIndex)}
                        className="text-slate-400 hover:text-red-500 p-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addChapter(mIndex)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 mt-2 cursor-pointer"
                  >
                    <Video size={14} />
                    Add Chapter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800/60 w-full sm:w-[50%]">
          <button
            type="submit"
            className="flex-1 rounded-xl cursor-pointer bg-slate-900 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
          >
            {editing ? "Save Changes" : "Create Course"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex items-center cursor-pointer justify-center gap-1.5 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X size={15} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
