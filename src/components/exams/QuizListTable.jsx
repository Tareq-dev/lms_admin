import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Radio,
  HelpCircle,
  Users,
  CheckCircle,
  Eye,
  Edit3,
  Trash2,
  Hourglass,
} from "lucide-react";

// 🕒 ১০০% ফিক্সড রিয়েল-টাইম কাউন্টডাউন সাব-কম্পোনেন্ট
function LiveCountdown({ quiz, onTimeEnd }) {
  const [timeLeft, setTimeLeft] = useState("Calculating...");

  useEffect(() => {
    if (!quiz?.liveStartedAt) {
      setTimeLeft("No start time");
      return;
    }

    const calculateTime = () => {
      const startedAt = new Date(quiz.liveStartedAt).getTime();
      // স্ট্রিং বা নাম্বার যা-ই আসুক, সেফলি পার্স করার জন্য
      const durationHours = parseFloat(quiz.liveDurationHours || 2);
      
      if (isNaN(startedAt) || isNaN(durationHours)) {
        setTimeLeft("Invalid Time");
        return;
      }

      const durationMs = durationHours * 60 * 60 * 1000;
      const endTime = startedAt + durationMs;
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft("00h 00m 00s");
        clearInterval(timer);
        onTimeEnd(quiz.id);
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`
      );
    };

    calculateTime(); // মাউন্ট হওয়ার সাথে সাথে রান হবে
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [quiz.liveStartedAt, quiz.liveDurationHours, quiz.id]);

  return (
    <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-lg border border-rose-100 dark:border-rose-500/20 shadow-xs">
      <Hourglass size={11} className="animate-spin duration-1000" />
      <span suppressHydrationWarning>{timeLeft}</span>
    </div>
  );
}

function QuizListTable({
  quizzes,
  setQuizzes,
  onEdit,
  onViewDetails,
  onDelete,
}) {
  
  // লাইভ করার বাটন ট্রিগার
  const toggleLiveStatus = (id, currentStatus) => {
    setQuizzes((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          if (currentStatus === "Upcoming") {
            return { 
              ...q, 
              status: "Live",
              liveStartedAt: new Date().toISOString() 
            };
          }
          if (currentStatus === "Live") return { ...q, status: "Ended" };
        }
        return q;
      })
    );
  };

  // কাউন্টডাউন শেষ হলে অটোমেটিক "Ended" করার হ্যান্ডেলার
  const handleAutoEnd = (id) => {
    setQuizzes((prev) =>
      prev.map((q) => (q.id === id && q.status === "Live" ? { ...q, status: "Ended" } : q))
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-zinc-900 dark:bg-zinc-900">
      <div className="p-5 border-b border-slate-50 dark:border-zinc-800/60">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Recent Quiz Examinations
        </h3>
        <p className="text-xs text-slate-400">
          Latest assessments are ordered first. Click actions to instantly toggle state.
        </p>
      </div>

      {/* 📱 রেসপন্সিভ কন্টেইনার: মোবাইল স্ক্রিনে কার্ড ভিউ, বড় স্ক্রিনে প্রফেশনাল টেবিল ভিউ */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm block sm:table">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 font-semibold text-slate-600 dark:border-zinc-800 dark:bg-zinc-800/30 dark:text-zinc-400 hidden sm:table-row">
              <th className="p-4 pl-6">Quiz Paper Details</th>
              <th className="p-4">Assigned Course</th>
              <th className="p-4">Exam Schedule / Settings</th>
              <th className="p-4 text-center">Questions / Attended</th>
              <th className="p-4">Current Status / Time Left</th>
              <th className="p-4 pr-6 text-center">Management Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-zinc-800 dark:text-zinc-300 block sm:divide-y sm:table-row-group">
            {quizzes.map((quiz) => (
              <tr
                key={quiz.id}
                className="transition-colors hover:bg-slate-50/40 dark:hover:bg-zinc-800/20 block sm:table-row p-4 sm:p-0 space-y-3 sm:space-y-0"
              >
                {/* ID & Title */}
                <td className="p-0 sm:p-4 sm:pl-6 block sm:table-cell">
                  <div className="flex items-center gap-2 sm:block">
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded shrink-0">
                      {quiz.id}
                    </span>
                    <span className="sm:hidden text-xs text-slate-400 font-medium">— Details</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white mt-1 sm:mt-1.5 leading-snug line-clamp-2 max-w-[320px]">
                    {quiz.title}
                  </div>
                </td>

                {/* Course Tag */}
                <td className="p-0 sm:p-4 font-medium text-slate-500 dark:text-zinc-400 block sm:table-cell max-w-[200px] truncate">
                  <span className="sm:hidden text-xs text-slate-400 font-medium block mb-0.5">Course:</span>
                  {quiz.course}
                </td>

                {/* Exam Date & Duration Info */}
                <td className="p-0 sm:p-4 block sm:table-cell">
                  <span className="sm:hidden text-xs text-slate-400 font-medium block mb-1">Schedule:</span>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-zinc-200">
                      <Calendar size={13} className="text-slate-400" /> {quiz.date}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock size={13} /> {quiz.duration} Mins</span>
                      <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
                        ⏳ {quiz.liveDurationHours || "2"} Hrs
                      </span>
                    </div>
                  </div>
                </td>

                {/* QCount & Participants */}
                <td className="p-0 sm:p-4 text-left sm:text-center block sm:table-cell">
                  <span className="sm:hidden text-xs text-slate-400 font-medium block mb-1">Metrics:</span>
                  <div className="flex flex-wrap sm:flex-col items-center sm:justify-center gap-3 sm:gap-1">
                    <div className="text-xs font-medium text-slate-800 dark:text-zinc-200 flex items-center justify-center gap-1">
                      <HelpCircle size={12} className="text-blue-500" /> {quiz.questionsCount} Qs
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                      <Users size={12} /> {quiz.totalParticipants || 0} Attended
                    </div>
                  </div>
                </td>

                {/* Status Badge + Live Countdown Match */}
                <td className="p-0 sm:p-4 block sm:table-cell">
                  <span className="sm:hidden text-xs text-slate-400 font-medium block mb-1">Status / Timer:</span>
                  <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        quiz.status === "Live"
                          ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 animate-pulse"
                          : quiz.status === "Upcoming"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                            : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {quiz.status === "Live" && <Radio size={12} className="text-red-500" />}
                      {quiz.status}
                    </span>
                    
                    {quiz.status === "Live" && (
                      <LiveCountdown quiz={quiz} onTimeEnd={handleAutoEnd} />
                    )}
                  </div>
                </td>

                {/* Management Action Buttons */}
                <td className="p-0 pt-2 sm:p-4 sm:pr-6 block sm:table-cell border-b border-dashed border-slate-100 dark:border-zinc-800/80 pb-4 sm:pb-0 sm:border-none">
                  <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2">
                    <button
                      onClick={() => onViewDetails(quiz)}
                      className="cursor-pointer p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
                      title="View Full Details"
                    >
                      <Eye size={14} />
                    </button>

                    <button
                      onClick={() => onEdit(quiz)}
                      className="cursor-pointer p-2 rounded-xl border border-slate-200 bg-white text-blue-600 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-blue-400 dark:hover:bg-blue-500/10 transition"
                      title="Edit Quiz"
                    >
                      <Edit3 size={14} />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this premium quiz?"))
                          onDelete(quiz.id);
                      }}
                      className="cursor-pointer p-2 rounded-xl border border-slate-200 bg-white text-rose-600 hover:bg-rose-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-rose-400 dark:hover:bg-rose-500/10 transition"
                      title="Delete Quiz"
                    >
                      <Trash2 size={14} />
                    </button>

                    {quiz.status !== "Ended" ? (
                      <button
                        onClick={() => toggleLiveStatus(quiz.id, quiz.status)}
                        className={`cursor-pointer text-xs font-bold px-3 py-2 rounded-xl transition shadow-sm border ${
                          quiz.status === "Upcoming"
                            ? "bg-emerald-600 text-white border-transparent hover:bg-emerald-500"
                            : "bg-white text-rose-600 border-rose-200 hover:bg-rose-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-rose-400"
                        }`}
                      >
                        {quiz.status === "Upcoming" ? "Go Live" : "End"}
                      </button>
                    ) : (
                      <div className="text-xs font-medium text-slate-400 flex items-center justify-center gap-0.5 px-1">
                        <CheckCircle size={12} className="text-slate-300" /> Archived
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuizListTable;