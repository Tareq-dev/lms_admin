import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>

      <div className="p-6">

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to the SaaS Dashboard
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Your admin panel is ready.
        </p>

      </div>

    </DashboardLayout>
  );
}