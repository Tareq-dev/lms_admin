export default function RevenueChart() {

  const data = [40, 70, 55, 90, 60, 110, 95];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 p-6">

      <h2 className="text-lg font-semibold mb-6 text-zinc-800 dark:text-white">
        Weekly Revenue
      </h2>

      <div className="flex items-end gap-3 h-40">

        {data.map((d, i) => (
          <div
            key={i}
            className="flex-1 bg-indigo-500 rounded-t-lg"
            style={{ height: `${d}%` }}
          />
        ))}

      </div>

    </div>
  );
}