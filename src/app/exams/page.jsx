"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Plus, ArrowLeft, Layers, HelpCircle, Users } from "lucide-react";
import QuizListTable from "@/components/exams/QuizListTable";
import QuizCreatorStudio from "@/components/exams/QuizAuditStudio";
import QuizAuditStudio from "@/components/exams/QuizAuditStudio"; // নতুন ডিটেইলস স্ক্রিন

export default function QuizDashboard() {
  const [view, setView] = useState("list"); // list | create | audit
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  // ❌ আগের কোড (যা হাইড্রেশন এরর দিচ্ছিল):
  // id: `QZ-${Date.now().toString().slice(-3)}`

  //  সরাসরি ফিক্সড আইডি দিন ডামি ডাটাতে:
  const [quizzes, setQuizzes] = useState([
    {
      id: "QZ-904",
      title: "Advanced React Context & Redux Toolkit",
      course: "Next.js Premium Course",
      date: "18 June, 2026",
      duration: "15",
      questionsCount: 1,
      totalParticipants: 240,
      status: "Upcoming",
      questions: [
        {
          id: 1,
          questionText: "What is Redux Toolkit?",
          options: ["Library", "Framework", "Language", "Database"],
          correctAnswer: 0,
        },
      ],
    },
    {
      id: "QZ-903",
      title: "JavaScript Engine & Event Loop",
      course: "MERN Stack Web Development",
      date: "14 June, 2026",
      duration: "10",
      questionsCount: 1,
      totalParticipants: 412,
      status: "Live",
      questions: [
        {
          id: 1,
          questionText: "V8 Engine compiles JS into?",
          options: ["Bytecode", "Machine Code", "C++", "Python"],
          correctAnswer: 1,
        },
      ],
    },
  ]);

  // কুইজ ক্রিয়েট অথবা এডিট সেভ করার হ্যান্ডেলার
  const handlePublishQuiz = (quizData) => {
    if (selectedQuiz) {
      // এডিট মোড সেভ করা
      setQuizzes(
        quizzes.map((q) =>
          q.id === selectedQuiz.id
            ? { ...q, ...quizData, questionsCount: quizData.questions.length }
            : q,
        ),
      );
    } else {
      // নতুন কুইজ অ্যাড করা (সবার আগে দেখাবে)
      const formattedQuiz = {
        id: `QZ-${Date.now().toString().slice(-3)}`,
        title: quizData.title,
        course: quizData.course,
        date: "Today",
        duration: quizData.duration,
        questionsCount: quizData.questions.length,
        totalParticipants: 0,
        status: "Upcoming",
        questions: quizData.questions,
      };
      setQuizzes([formattedQuiz, ...quizzes]);
    }
    setSelectedQuiz(null);
    setView("list");
  };

  // এডিট বাটন ট্রিগার
  const handleEditTrigger = (quiz) => {
    setSelectedQuiz(quiz);
    setView("create");
  };

  // ডিটেইলস/অডিট বাটন ট্রিগার
  const handleAuditTrigger = (quiz) => {
    setSelectedQuiz(quiz);
    setView("audit");
  };

  // ডিলিট হ্যান্ডেলার
  const handleDeleteQuiz = (id) => {
    setQuizzes(quizzes.filter((q) => q.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 p-6 dark:bg-zinc-950 transition-colors duration-300">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              {view !== "list" && (
                <button
                  onClick={() => {
                    setView("list");
                    setSelectedQuiz(null);
                  }}
                  className="mr-2 cursor-pointer p-2 rounded-xl border bg-white text-slate-600 hover:bg-slate-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 transition"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              {view === "list" && "Quiz & Assessments"}
              {view === "create" &&
                (selectedQuiz ? "Edit Premium Quiz" : "Create Premium Quiz")}
              {view === "audit" && "Examination Audit Review"}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              {view === "list" &&
                "Manage real-time examinations, change live status, and monitor participants."}
              {view === "create" &&
                "Modify question cards, answers blueprints, and target criteria."}
              {view === "audit" &&
                "In-depth review of exam metrics, schedule dates, and questionnaire structure."}
            </p>
          </div>

          {view === "list" && (
            <button
              onClick={() => {
                setSelectedQuiz(null);
                setView("create");
              }}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/10 transition hover:opacity-95"
            >
              <Plus size={18} /> Create Premium Quiz
            </button>
          )}
        </div>

        {/* Dynamic State Engine */}
        {view === "list" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Stat Bar */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-zinc-900 dark:bg-zinc-900/50 flex items-center gap-4">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Layers size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">
                    Total Quizzes
                  </p>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    {quizzes.length}
                  </h3>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-zinc-900 dark:bg-zinc-900/50 flex items-center gap-4">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">
                    Live Running
                  </p>
                  <h3 className="text-xl font-bold text-emerald-600">
                    {quizzes.filter((q) => q.status === "Live").length}
                  </h3>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-zinc-900 dark:bg-zinc-900/50 flex items-center gap-4">
                <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">
                    Total Participations
                  </p>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    {quizzes.reduce((s, c) => s + c.totalParticipants, 0)}
                  </h3>
                </div>
              </div>
            </div>

            <QuizListTable
              quizzes={quizzes}
              setQuizzes={setQuizzes}
              onEdit={handleEditTrigger}
              onViewDetails={handleAuditTrigger}
              onDelete={handleDeleteQuiz}
            />
          </div>
        )}

        {view === "create" && (
          <QuizCreatorStudio
            onPublish={handlePublishQuiz}
            editData={selectedQuiz}
          />
        )}

        {view === "audit" && (
          <QuizAuditStudio quiz={selectedQuiz} onBack={() => setView("list")} />
        )}
      </div>
    </DashboardLayout>
  );
}
