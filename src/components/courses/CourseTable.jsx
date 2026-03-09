"use client";

import { Pencil, Trash } from "lucide-react";

export default function CourseTable({ courses, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-zinc-900  p-4">
      <table className="w-full text-sm">
        <thead className="text-zinc-500">
          <tr className="">
            <th className="text-start">SL</th>
            <th className="text-start">Title</th>
            <th className="text-start">Instructor</th>
            <th className="text-start">Category</th>
            <th className="text-start">Price</th>
            <th className="text-start">Students</th>
            <th className="text-start">Status</th>
            <th className="text-start"></th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course, idx) => (
            <tr key={course.id} className="border-t h-10">
              <td>{idx + 1}</td>
              <td>{course.title}</td>
              <td>{course.instructor}</td>
              <td>{course.category}</td>
              <td>${course.price}</td>
              <td>{course.students}</td>
              <td>{course.status}</td>

              <td className="flex gap-8  justify-center mt-3">
                <button
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => onEdit(course)}
                >
                  <Pencil size={16} />
                </button>

                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => onDelete(course.id)}
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
