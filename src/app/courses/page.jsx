"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import DashboardLayout from "@/components/layout/DashboardLayout";
import CourseTable from "@/components/courses/CourseTable";
import GlobalModal from "@/components/modal/GlobalModal";
import CourseForm from "@/components/courses/CourseForm";

import {
  addCourse,
  updateCourse,
  deleteCourse,
} from "@/features/courses/courseSlice";

export default function CoursesPage() {
  const courses = useSelector((s) => s.courses.courses);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleCreate = (data) => {
    dispatch(addCourse({ ...data, id: Date.now() }));
    setOpen(false);
  };

  const handleUpdate = (data) => {
    dispatch(updateCourse({ ...data, id: editing.id }));
    setEditing(null);
    setOpen(false);
  };

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <div className="flex justify-between">

          <h1 className="text-2xl font-bold">
            Courses
          </h1>

          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setOpen(true)}
          >
            Create Course
          </button>

        </div>

        <CourseTable
          courses={courses}
          onEdit={(course) => {
            setEditing(course);
            setOpen(true);
          }}
          onDelete={(id) => dispatch(deleteCourse(id))}
        />

        <GlobalModal
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
          title={editing ? "Edit Course" : "Create Course"}
        >
          <CourseForm
            initialData={editing}
            onSubmit={editing ? handleUpdate : handleCreate}
          />
        </GlobalModal>

      </div>

    </DashboardLayout>
  );
}