"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { UserPlus, X } from "lucide-react";
import AddInstructorForm from "@/components/instructors/AddInstructorForm";
import InstructorsTable from "@/components/instructors/InstructorsTable";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: "Anisul Islam",
      email: "anisul@lms.com",
      designation: "Senior Software Engineer",
      education: "BSc in CSE",
      job: "Google",
      phone: "01712345678",
      courses: "MERN Stack, Next.js",
      status: "Active",
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    education: "",
    job: "",
    phone: "",
    courses: "",
  });

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      designation: "",
      education: "",
      job: "",
      phone: "",
      courses: "",
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setInstructors((prev) =>
        prev.map((instructor) =>
          instructor.id === editingId
            ? { ...instructor, ...formData }
            : instructor,
        ),
      );
      resetForm();
      return;
    }

    const newInstructor = {
      id: Date.now(),
      ...formData,
      status: "Active",
    };

    setInstructors((prev) => [newInstructor, ...prev]);
    resetForm();
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-100 p-6 dark:bg-zinc-950">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Instructors Management
            </h1>
            <p className="mt-1 text-slate-500">
              Manage panel members, teachers, and their credentials
            </p>
          </div>

          {!showForm ? (
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              <UserPlus size={18} />
              Add Instructor
            </button>
          ) : (
            <button
              onClick={resetForm}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              <X size={18} /> Close Form
            </button>
          )}
        </div>

        {/* Content Section */}
        <div>
          {showForm ? (
            <AddInstructorForm
              editingId={editingId}
              resetForm={resetForm}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          ) : (
            /* এখানে আপনার InstructorsTable কম্পোনেন্ট বসাতে পারেন */
            <InstructorsTable setShowForm ={setShowForm} setInstructors={setInstructors}
              instructors={instructors}
              setEditingId={setEditingId}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
