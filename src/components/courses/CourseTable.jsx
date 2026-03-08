"use client";

import { Pencil, Trash } from "lucide-react";

export default function CourseTable({
  courses,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border p-4">

      <table className="w-full text-sm">

        <thead className="text-zinc-500">
          <tr>
            <th>Title</th>
            <th>Instructor</th>
            <th>Category</th>
            <th>Price</th>
            <th>Students</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {courses.map((course) => (
            <tr key={course.id} className="border-t">

              <td>{course.title}</td>
              <td>{course.instructor}</td>
              <td>{course.category}</td>
              <td>${course.price}</td>
              <td>{course.students}</td>
              <td>{course.status}</td>

              <td className="flex gap-2">

                <button onClick={() => onEdit(course)}>
                  <Pencil size={16} />
                </button>

                <button
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