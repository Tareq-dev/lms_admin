"use client";

import { useState } from "react";

export default function CourseForm({ initialData, onSubmit }) {

  const [form, setForm] = useState(
    initialData || {
      title: "",
      instructor: "",
      category: "",
      price: "",
      duration: "",
      students: "",
      status: "Draft",
    }
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >

      <input
        name="title"
        placeholder="Course Title"
        className="input"
        onChange={handleChange}
        value={form.title}
      />

      <input
        name="instructor"
        placeholder="Instructor"
        className="input"
        onChange={handleChange}
        value={form.instructor}
      />

      <input
        name="category"
        placeholder="Category"
        className="input"
        onChange={handleChange}
        value={form.category}
      />

      <input
        name="price"
        placeholder="Price"
        className="input"
        onChange={handleChange}
        value={form.price}
      />

      <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
        Save Course
      </button>

    </form>
  );
} 