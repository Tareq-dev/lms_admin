 
import StatCard from "@/components/dashboard/StatCard";
import ActivityTable from "@/components/dashboard/ActivityTable";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          <StatCard title="Total Students" value="1,245" />
          <StatCard title="Total Courses" value="32" />
          <StatCard title="Revenue" value="$24,000" />
          <StatCard title="Active Users" value="845" />
        </div>

        <ActivityTable />
      </div>
    </DashboardLayout>
  );
}
