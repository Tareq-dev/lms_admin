const students = [
  { name: "John Doe", course: "React Mastery", status: "Active" },
  { name: "Sarah Ali", course: "Node.js Bootcamp", status: "Active" },
  { name: "Michael", course: "UI UX Design", status: "Pending" },
];

export default function ActivityTable() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border dark:border-zinc-800">

      <h3 className="text-lg font-semibold mb-4">
        Recent Students
      </h3>

      <table className="w-full text-left">
        <thead className="text-zinc-500 text-sm">
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody className="space-y-3">
          {students.map((s, i) => (
            <tr key={i} className="border-t dark:border-zinc-800">
              <td className="py-3">{s.name}</td>
              <td>{s.course}</td>
              <td className="text-green-500">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}