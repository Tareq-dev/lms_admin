"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
      <div className="space-y-6">

        {mode === "list" && (
          <>
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">
                Courses
              </h1>

              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  setEditing(null);
                  setMode("form");
                }}
              >
                Create Course
              </button>
            </div>

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
          <CourseForm
            editing={editing}
            onCancel={() => setMode("list")}
          />
        )}

      </div>
    </DashboardLayout>
  );
}