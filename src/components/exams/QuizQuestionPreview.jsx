import React from "react";
import { Clock, HelpCircle, CheckCircle2 } from "lucide-react";

function QuizQuestionPreview({ quizMeta, questions }) {
  return (
    <div className="w-full rounded-2xl border border-slate-200/60 bg-slate-900 p-6 text-white shadow-xl dark:border-zinc-800">
      
      {/* Mini App UI Header Wrapper */}
      <div className="mb-6 flex items-start justify-between border-b border-zinc-800 pb-4">
        <div>
          <span className="inline-block rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-blue-400 uppercase">
            {quizMeta.course || "Course Title"}
          </span>
          <h3 className="mt-1 text-base font-bold text-white line-clamp-1">
            {quizMeta.title || "Untitled Quiz"}
          </h3>
        </div>
        
        {/* Timer Box */}
        <div className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-amber-400">
          <Clock size={13} />
          <span>{quizMeta.duration || "0"}:00</span>
        </div>
      </div>

      {/* Questions Preview Flow */}
      <div className="space-y-6 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
        {questions.map((q, index) => (
          <div key={q.id} className="space-y-3">
            
            {/* Question Text */}
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[11px] font-bold text-zinc-400">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-zinc-200">
                {q.questionText || <span className="text-zinc-600 italic">Untitled Question Text...</span>}
              </p>
            </div>

            {/* Options List */}
            <div className="grid gap-2 pl-7">
              {q.options.map((option, optIdx) => {
                const isCorrect = q.correctAnswer === optIdx;
                return (
                  <div
                    key={optIdx}
                    className={`flex items-center justify-between rounded-xl p-3 text-xs font-medium transition-all ${
                      isCorrect
                        ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                        : "bg-zinc-800/60 text-zinc-400 border border-transparent"
                    }`}
                  >
                    <span>
                      {option || <span className="text-zinc-600 italic">Empty Option {optIdx + 1}</span>}
                    </span>
                    
                    {/* রাইট বাটন আইকন শুধু কারেক্ট উত্তরের জন্য */}
                    {isCorrect && (
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {/* Preview Bottom Info */}
      <div className="mt-6 border-t border-zinc-800 pt-4 text-center text-[11px] text-zinc-500">
        End of Live Preview • Interactive Dashboard Mode
      </div>

    </div>
  );
}

export default QuizQuestionPreview;