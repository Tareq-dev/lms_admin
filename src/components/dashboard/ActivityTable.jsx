import React from "react";

const students = [
  { name: "John Doe", email: "john@example.com", course: "React Mastery", status: "Active", progress: 75, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
  { name: "Sarah Ali", email: "sarah@example.com", course: "Node.js Bootcamp", status: "Active", progress: 92, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { name: "Michael Vance", email: "michael@example.com", course: "UI UX Design", status: "Pending", progress: 40, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
];

export default function ActivityTable() {
  return (
    <div className="bg-white dark:bg-zinc-900/80 rounded-3xl border border-slate-200/60 dark:border-zinc-800/80 shadow-xs overflow-hidden backdrop-blur-md">
      
      {/* টেবিল এলিট হেডার */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-zinc-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Recent Enrolled Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time synchronization of student velocity and certification pathways.
          </p>
        </div>
        <button className="cursor-pointer text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 hover:bg-indigo-100/70 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 px-4 py-2 rounded-xl transition self-start sm:self-auto">
          View All Cohorts
        </button>
      </div>

      {/* রেসপন্সিভ স্ক্রোল চেসিস */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50/50 font-bold text-slate-500 dark:bg-zinc-800/20 dark:text-zinc-400 border-b border-slate-100 dark:border-zinc-800">
              <th className="py-4 px-6">Student Dossier</th>
              <th className="py-4 px-4">Active Course Syllabus</th>
              <th className="py-4 px-4">Learning Velocity</th>
              <th className="py-4 px-6 text-right sm:text-left">Operational State</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-zinc-800/60 dark:text-zinc-300">
            {students.map((s, i) => (
              <tr 
                key={i} 
                className="transition-colors hover:bg-slate-50/40 dark:hover:bg-zinc-800/10 group"
              >
                {/* প্রোফাইল ডাটা উইথ সুন্দর অবতার */}
                <td className="py-4 px-6 flex items-center gap-3">
                  <img src={s.avatar} alt="Avatar" className="h-9 w-9 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {s.name}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">{s.email}</div>
                  </div>
                </td>
                
                {/* কোর্স ট্র্যাক */}
                <td className="py-4 px-4 font-medium text-slate-600 dark:text-zinc-300">
                  {s.course}
                </td>

                {/* লিনিয়ার কার্ভড প্রোগ্রেস বার (নতুন সংযোজন!) */}
                <td className="py-4 px-4 max-w-[160px]">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${s.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500">{s.progress}%</span>
                  </div>
                </td>
                
                {/* প্রিমিয়াম ফিল্ড ডট ব্যাজ */}
                <td className="py-4 px-6 text-right sm:text-left">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      s.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                    }`}
                  >
                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                      s.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                    }`} />
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}