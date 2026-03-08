export default function StatsCard({ title, value, change }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border dark:border-zinc-800 hover:shadow-lg transition">
      <p className="text-sm text-zinc-500">{title}</p>

      <div className="flex justify-between items-end mt-2">
        <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">
          {value}
        </h2>

        <span className="text-green-500 text-sm font-medium">{change}</span>
      </div>
    </div>
  );
}
