import { students } from "@/data/dashboardData";

export default function RecentStudents() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 p-6">

      <h2 className="text-lg font-semibold mb-6 text-zinc-800 dark:text-white">
        Recent Students
      </h2>

      <table className="w-full text-sm">

        <thead className="text-zinc-500">
          <tr>
            <th className="text-left pb-4">Student</th>
            <th className="text-left pb-4">Course</th>
            <th className="text-left pb-4">Status</th>
          </tr>
        </thead>

        <tbody>

          {students.map((s, i) => (
            <tr key={i} className="border-t dark:border-zinc-800">

              <td className="py-4">
                <p className="font-medium text-zinc-800 dark:text-white">
                  {s.name}
                </p>

                <p className="text-xs text-zinc-500">
                  {s.email}
                </p>
              </td>

              <td>{s.course}</td>

              <td>
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
                  {s.status}
                </span>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}