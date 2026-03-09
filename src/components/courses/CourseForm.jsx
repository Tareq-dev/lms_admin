"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse, updateCourse } from "@/features/courses/courseSlice";

import { Trash2, Plus, Video, Layers } from "lucide-react";

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
    },
  );

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
    if (!form.description.trim()) err.description = "Description required";
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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 border rounded-xl p-8 space-y-8"
    >
      <h2 className="text-xl font-semibold">
        {editing ? "Update Course" : "Create Course"}
      </h2>

      {/* BASIC INFO */}

      <div className="grid grid-cols-2 gap-5">
        <div>
          <input
            name="title"
            placeholder="Course Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2.5 rounded-lg w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <input
            name="instructor"
            placeholder="Instructor"
            value={form.instructor}
            onChange={handleChange}
            className="border p-2.5 rounded-lg w-full"
          />
          {errors.instructor && (
            <p className="text-red-500 text-sm">{errors.instructor}</p>
          )}
        </div>

        <div>
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border p-2.5 rounded-lg w-full"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        <div>
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2.5 rounded-lg w-full"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>
        <div>
          <input
            name="duration"
            placeholder="Duration"
            value={form.duration}
            onChange={handleChange}
            className="border w-full p-2.5 rounded-lg"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration}</p>
          )}
        </div>

        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="border dark:bg-zinc-800 h-11.5 p-2.5 rounded-lg"
        >
          <option value="">Select Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      {/* DESCRIPTION */}

      <div>
        <textarea
          name="description"
          placeholder="Course Description"
          className="border p-3 rounded-lg w-full h-28"
          value={form.description}
          onChange={handleChange}
        />

        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      {/* THUMBNAIL */}

      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          className="border p-2 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              thumbnail: URL.createObjectURL(e.target.files[0]),
            })
          }
        />

        {form.thumbnail && (
          <img
            src={form.thumbnail}
            className="w-28 h-16 rounded object-cover"
          />
        )}
      </div>
      {errors.thumbnail && (
        <p className="text-red-500 text-sm">{errors.thumbnail}</p>
      )}
      {/* MODULE SYSTEM */}

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold flex items-center gap-2">
            <Layers size={18} />
            Course Modules
          </h3>

          <button
            type="button"
            onClick={addModule}
            className="flex items-center gap-2 text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg"
          >
            <Plus size={16} />
            Add Module
          </button>
        </div>

        {form.modules.map((module, mIndex) => (
          <div key={mIndex} className="border rounded-lg p-4 space-y-4">
            {/* MODULE TITLE */}

            <div className="flex gap-3 items-center">
              <input
                placeholder="Module title"
                value={module.title}
                onChange={(e) => updateModule(mIndex, e.target.value)}
                className="border p-2 rounded-lg flex-1"
              />

              <button
                type="button"
                onClick={() => removeModule(mIndex)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* CHAPTERS */}

            {module.chapters.map((chapter, cIndex) => (
              <div key={cIndex} className="grid grid-cols-2 gap-3 items-center">
                <input
                  placeholder="Chapter title"
                  value={chapter.title}
                  onChange={(e) =>
                    updateChapter(mIndex, cIndex, "title", e.target.value)
                  }
                  className="border p-2 rounded-lg"
                />

                <div className="flex gap-2">
                  <input
                    placeholder="Video URL"
                    value={chapter.video}
                    onChange={(e) =>
                      updateChapter(mIndex, cIndex, "video", e.target.value)
                    }
                    className="border p-2 rounded-lg flex-1"
                  />

                  <button
                    type="button"
                    onClick={() => removeChapter(mIndex, cIndex)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addChapter(mIndex)}
              className="flex items-center gap-2 text-sm text-indigo-600"
            >
              <Video size={16} />
              Add Chapter
            </button>
          </div>
        ))}
      </div>

      {/* ACTIONS */}

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Save Course
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="border px-6 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
