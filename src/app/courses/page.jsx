"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import DashboardLayout from "@/components/layout/DashboardLayout";
import CourseTable from "@/components/courses/CourseTable";
import CourseForm from "@/components/courses/CourseForm";

export default function CoursesPage() {
  const courses = useSelector((s) => s.courses.courses);

  const [mode, setMode] = useState("list");
  const [editing, setEditing] = useState(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {mode === "list" && (
          <>
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Courses</h1>

              <button
                className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg"
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
            />
          </>
        )}

        {mode === "form" && (
          <CourseForm editing={editing} onCancel={() => setMode("list")} />
        )}
      </div>
    </DashboardLayout>
  );
}
