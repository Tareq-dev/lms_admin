import React from "react";
import { Calendar, Clock, Layers, Users, ListOrdered, CheckCircle2, ArrowLeft, Radio } from "lucide-react";

function QuizAuditStudio({ quiz, onBack }) {
  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-300">
      
      {/* Top Banner Block */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-zinc-900 dark:bg-zinc-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-wider font-mono font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md">
              {quiz.id}
            </span>
            <span className="text-xs font-bold text-slate-400">{quiz.course}</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{quiz.title}</h2>
        </div>
        
        <button 
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 transition shrink-0"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>
      </div>

      {/* Ultra-Posh Overview Luxury Card */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/40 p-5 dark:border-zinc-900 dark:from-zinc-900 dark:to-zinc-900/40 shadow-xs">
        <div className="p-2 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Calendar size={12} className="text-indigo-500" /> Exam Date
          </div>
          <span className="text-base font-black text-slate-800 dark:text-zinc-200">{quiz.date}</span>
        </div>

        <div className="p-2 space-y-1 border-l border-slate-100 dark:border-zinc-800/60 sm:pl-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Clock size={12} className="text-sky-500" /> Time Window
          </div>
          <span className="text-base font-black text-slate-800 dark:text-zinc-200">{quiz.duration} Mins</span>
        </div>

        <div className="p-2 space-y-1 border-l border-slate-100 dark:border-zinc-800/60 sm:pl-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Layers size={12} className="text-violet-500" /> Paper Size
          </div>
          <span className="text-base font-black text-slate-800 dark:text-zinc-200">{quiz.questionsCount} MCQs</span>
        </div>

        <div className="p-2 space-y-1 border-l border-slate-100 dark:border-zinc-800/60 sm:pl-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Users size={12} className="text-emerald-500" /> Attended Pool
          </div>
          <span className="text-base font-black text-emerald-600 dark:text-emerald-400">{quiz.totalParticipants} Students</span>
        </div>
      </div>

      {/* Blueprint Questions Loop */}
      <div className="space-y-4">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <ListOrdered size={14} className="text-indigo-500" /> Question Paper Blueprint
        </h4>

        <div className="space-y-4">
          {quiz.questions?.map((q, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-white dark:border-zinc-900 dark:bg-zinc-900/50 shadow-xs space-y-3.5">
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black text-slate-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-sm font-bold text-slate-800 dark:text-zinc-200 leading-relaxed">{q.questionText}</p>
              </div>

              <div className="grid gap-2.5 pl-8 sm:grid-cols-2">
                {q.options.map((option, optIdx) => {
                  const isCorrect = q.correctAnswer === optIdx;
                  return (
                    <div 
                      key={optIdx}
                      className={`flex items-center justify-between rounded-xl p-3 text-xs font-semibold border transition-all ${
                        isCorrect 
                          ? "border-emerald-500/40 bg-emerald-50/40 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-400 font-bold" 
                          : "bg-slate-50/40 border-slate-50 text-slate-500 dark:bg-zinc-800/20 dark:border-transparent dark:text-zinc-400"
                      }`}
                    >
                      <span>{option}</span>
                      {isCorrect && (
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-md shrink-0">
                          <CheckCircle2 size={11} /> Correct
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default QuizAuditStudio;