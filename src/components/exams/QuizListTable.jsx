import React from "react";
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
} from "lucide-react";

function QuizListTable({
  quizzes,
  setQuizzes,
  onEdit,
  onViewDetails,
  onDelete,
}) {
  const toggleLiveStatus = (id, currentStatus) => {
    setQuizzes((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          if (currentStatus === "Upcoming") return { ...q, status: "Live" };
          if (currentStatus === "Live") return { ...q, status: "Ended" };
        }
        return q;
      }),
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-zinc-900 dark:bg-zinc-900">
      <div className="p-5 border-b border-slate-50 dark:border-zinc-800/60">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Recent Quiz Examinations
        </h3>
        <p className="text-xs text-slate-400">
          Latest assessments are ordered first. Click actions to instantly
          toggle exam state.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 font-semibold text-slate-600 dark:border-zinc-800 dark:bg-zinc-800/30 dark:text-zinc-400">
              <th className="p-4 pl-6">Quiz Paper Details</th>
              <th className="p-4">Assigned Course</th>
              <th className="p-4">Exam Schedule</th>
              <th className="p-4 text-center">Questions / Attended</th>
              <th className="p-4">Current Status</th>
              <th className="p-4 pr-6 text-center">Management Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-zinc-800 dark:text-zinc-300">
            {quizzes.map((quiz) => (
              <tr
                key={quiz.id}
                className="transition-colors hover:bg-slate-50/40 dark:hover:bg-zinc-800/20"
              >
                {/* ID & Title */}
                <td className="p-4 pl-6 max-w-[250px]">
                  <span  className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded">
                      {quiz.id}
                  </span>
                  <div className="font-bold text-slate-900 dark:text-white mt-1.5 leading-snug line-clamp-1">
                    {quiz.title}
                  </div>
                </td>

                {/* Course Tag */}
                <td className="p-4 font-medium text-slate-500 dark:text-zinc-400 max-w-[180px] truncate">
                  {quiz.course}
                </td>

                {/* Exam Date & Duration */}
                <td className="p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-zinc-200">
                    <Calendar size={13} className="text-slate-400" />{" "}
                    {quiz.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={13} /> {quiz.duration} Mins
                  </div>
                </td>

                {/* QCount & Participants */}
                <td className="p-4 text-center space-y-1">
                  <div className="text-xs font-medium text-slate-800 dark:text-zinc-200 flex items-center justify-center gap-1">
                    <HelpCircle size={12} className="text-blue-500" />{" "}
                    {quiz.questionsCount} Qs
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                    <Users size={12} /> {quiz.totalParticipants} Attended
                  </div>
                </td>

                {/* Status Badge */}
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      quiz.status === "Live"
                        ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 animate-pulse"
                        : quiz.status === "Upcoming"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {quiz.status === "Live" && (
                      <Radio size={12} className="text-red-500" />
                    )}
                    {quiz.status}
                  </span>
                </td>

                {/* Core Posh Action Panel */}
                <td className="p-4 pr-6">
                  <div className="flex items-center justify-center gap-1.5">
                    {/* View/Audit State Button */}
                    <button
                      onClick={() => onViewDetails(quiz)}
                      className="cursor-pointer p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
                      title="View Full Details"
                    >
                      <Eye size={14} />
                    </button>

                    {/* Edit State Button */}
                    <button
                      onClick={() => onEdit(quiz)}
                      className="cursor-pointer p-2 rounded-xl border border-slate-200 bg-white text-blue-600 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-blue-400 dark:hover:bg-blue-500/10 transition"
                      title="Edit Quiz"
                    >
                      <Edit3 size={14} />
                    </button>

                    {/* Delete Action Button */}
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this premium quiz?",
                          )
                        )
                          onDelete(quiz.id);
                      }}
                      className="cursor-pointer p-2 rounded-xl border border-slate-200 bg-white text-rose-600 hover:bg-rose-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-rose-400 dark:hover:bg-rose-500/10 transition"
                      title="Delete Quiz"
                    >
                      <Trash2 size={14} />
                    </button>

                    {/* Live Trigger */}
                    {quiz.status !== "Ended" ? (
                      <button
                        onClick={() => toggleLiveStatus(quiz.id, quiz.status)}
                        className={`cursor-pointer text-xs font-bold ml-1 px-2.5 py-1.5 rounded-xl transition shadow-sm border ${
                          quiz.status === "Upcoming"
                            ? "bg-emerald-600 text-white border-transparent hover:bg-emerald-500"
                            : "bg-white text-rose-600 border-rose-200 hover:bg-rose-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-rose-400"
                        }`}
                      >
                        {quiz.status === "Upcoming" ? "Go Live" : "End"}
                      </button>
                    ) : (
                      <div className="text-xs font-medium text-slate-400 flex items-center justify-center gap-0.5 ml-1 px-1">
                        <CheckCircle size={12} className="text-slate-300" />{" "}
                        Archived
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
