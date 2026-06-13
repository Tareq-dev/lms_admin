import React, { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, ArrowRight, Save, HelpCircle, Calendar, Hourglass } from "lucide-react";

function QuizCreatorStudio({ onPublish, editData }) {
  const [quizMeta, setQuizMeta] = useState({
    title: "",
    course: "",
    duration: "15",
    date: "",
    liveDurationHours: "2", // 👈 ডিফল্ট ২ ঘণ্টা সেট থাকবে
  });

  const [questions, setQuestions] = useState([
    { id: 1, questionText: "", options: ["", "", "", ""], correctAnswer: 0 }
  ]);

  useEffect(() => {
    if (editData) {
      let formattedDate = editData.date;
      if (editData.date && editData.date.includes(",")) {
        try {
          const parsedDate = new Date(editData.date);
          if (!isNaN(parsedDate)) {
            formattedDate = parsedDate.toISOString().split('T')[0];
          }
        } catch (e) {
          formattedDate = "";
        }
      }

      setQuizMeta({
        title: editData.title,
        course: editData.course,
        duration: editData.duration,
        date: formattedDate || "",
        liveDurationHours: editData.liveDurationHours || "2", // 👈 এডিট ডাটা লোড
      });
      if (editData.questions) {
        setQuestions(editData.questions);
      }
    }
  }, [editData]);

  const formatPoshDate = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes(",")) return dateString; // অলরেডি ফরম্যাটেড থাকলে
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), questionText: "", options: ["", "", "", ""], correctAnswer: 0 }
    ]);
  };

  const handleDeleteQuestion = (id) => {
    if (questions.length === 1) return alert("At least one question is required!");
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleQuestionTextChange = (id, text) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, questionText: text } : q));
  };

  const handleOptionChange = (qId, optIdx, text) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions[optIdx] = text;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleSelectCorrectAnswer = (qId, optIdx) => {
    setQuestions(questions.map(q => q.id === qId ? { ...q, correctAnswer: optIdx } : q));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quizMeta.title || !quizMeta.course || !quizMeta.date || !quizMeta.liveDurationHours) {
      return alert("Please fill up all baseline exam configurations!");
    }
    
    onPublish({
      title: quizMeta.title,
      course: quizMeta.course,
      duration: quizMeta.duration,
      date: formatPoshDate(quizMeta.date),
      liveDurationHours: quizMeta.liveDurationHours, // 👈 ড্যাশবোর্ডে পাস হচ্ছে
      questions: questions,
      liveStartedAt: editData?.liveStartedAt || null // আগের টাইমিং টিক রাখতে
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-300">
      
      {/* 1. Quiz Meta Setup Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-zinc-900 dark:bg-zinc-900/50 space-y-4">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <HelpCircle size={14} className="text-blue-500" /> Custom Examination Configurations
        </h4>
        
        {/* ৫ টি কলমের সুপার-স্মুথ গ্রিড লেআউট */}
        <div className="grid gap-4 sm:grid-cols-5">
          <div className="space-y-1.5 sm:col-span-1">
            <label className="text-xs font-bold text-slate-600 dark:text-zinc-400">Quiz Title</label>
            <input 
              type="text" 
              placeholder="e.g., NextJS Hooks Core"
              value={quizMeta.title}
              onChange={(e) => setQuizMeta({ ...quizMeta, title: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs font-semibold text-slate-800 outline-hidden focus:border-blue-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 dark:text-zinc-400">Assigned Course</label>
            <input 
              type="text" 
              placeholder="e.g., MERN Advanced"
              value={quizMeta.course}
              onChange={(e) => setQuizMeta({ ...quizMeta, course: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs font-semibold text-slate-800 outline-hidden focus:border-blue-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 dark:text-zinc-400 flex items-center gap-1">
              <Calendar size={12} className="text-indigo-500" /> Pick Exam Date
            </label>
            <input 
              type="date" 
              value={quizMeta.date}
              onChange={(e) => setQuizMeta({ ...quizMeta, date: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs font-semibold text-slate-800 outline-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 dark:text-zinc-400">Solve Time (Mins)</label>
            <input 
              type="number" 
              placeholder="15"
              value={quizMeta.duration}
              onChange={(e) => setQuizMeta({ ...quizMeta, duration: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs font-semibold text-slate-800 outline-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            />
          </div>

          {/* ⏳ নতুন লাইভ আওয়ারস ইনপুট ফিল্ড */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 dark:text-zinc-400 flex items-center gap-1">
              <Hourglass size={12} className="text-rose-500" /> Live Window (Hours)
            </label>
            <input 
              type="number" 
              step="0.5" // আধা ঘণ্টা কারেকশনের জন্য (যেমন ১.৫ ঘণ্টা)
              placeholder="2"
              value={quizMeta.liveDurationHours}
              onChange={(e) => setQuizMeta({ ...quizMeta, liveDurationHours: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs font-semibold text-slate-800 outline-hidden focus:border-rose-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 focus:ring-1 focus:ring-rose-500/20"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Question Workspace */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Questionnaires Pool ({questions.length})
          </h4>
          <button
            type="button"
            onClick={handleAddQuestion}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-dashed border-blue-300 bg-blue-50/50 px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-blue-400"
          >
            <Plus size={14} /> Add New Question Card
          </button>
        </div>

        {/* Dynamic Cards Map */}
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-900 dark:bg-zinc-900/50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-800/60 pb-3">
                <span className="flex h-6 w-12 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black text-slate-500 dark:bg-zinc-800 dark:text-zinc-400">
                  MCQ {String(idx + 1).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="cursor-pointer text-slate-400 hover:text-rose-500 p-1.5 rounded-lg transition"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Question Statement</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your premium question text here..."
                  value={q.questionText}
                  onChange={(e) => handleQuestionTextChange(q.id, e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-hidden focus:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase block">Options Blueprint</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {q.options.map((option, optIdx) => {
                    const isCorrect = q.correctAnswer === optIdx;
                    return (
                      <div 
                        key={optIdx}
                        className={`flex items-center gap-2 rounded-xl border p-2 transition ${
                          isCorrect 
                            ? "border-emerald-500 bg-emerald-50/30 dark:border-emerald-500/50 dark:bg-emerald-500/5" 
                            : "border-slate-100 bg-slate-50/50 dark:border-zinc-800 dark:bg-zinc-900/30"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectCorrectAnswer(q.id, optIdx)}
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition ${
                            isCorrect ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white dark:border-zinc-700 dark:bg-zinc-800"
                          }`}
                        >
                          {isCorrect && <CheckCircle2 size={12} />}
                        </button>
                        <input
                          type="text"
                          required
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                          value={option}
                          onChange={(e) => handleOptionChange(q.id, optIdx, e.target.value)}
                          className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-hidden dark:text-zinc-300"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-zinc-900">
        <button
          type="submit"
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 text-white px-6 py-3.5 text-xs font-black hover:bg-slate-800 transition dark:bg-white dark:text-black dark:hover:bg-slate-100 shadow-md"
        >
          <Save size={14} /> {editData ? "Save & Update Blueprint" : "Publish Examination Blueprint"} <ArrowRight size={14} />
        </button>
      </div>

    </form>
  );
}

export default QuizCreatorStudio;