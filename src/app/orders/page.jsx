"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import OrdersTable from "@/components/orders/OrdersTable";

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-9832",
      studentName: "Rakibul Hasan",
      studentEmail: "rakib@gmail.com",
      courseName: "MERN Stack Web Development",
      amount: "৳৪,৫০০",
      paymentMethod: "Bkash",
      trxId: "BKX7H29D81",
      date: "12 June, 2026",
      status: "Pending", // Pending, Approved, Cancelled
    },
    {
      id: "ORD-9831",
      studentName: "Sumaiya Akter",
      studentEmail: "sumaiya@yahoo.com",
      courseName: "Next.js Premium Course",
      amount: "৳৫,০০০",
      paymentMethod: "Nagad",
      trxId: "NGD3M91L05",
      date: "11 June, 2026",
      status: "Approved",
    },
  ]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-100 p-6 dark:bg-zinc-950">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Course Orders
          </h1>
          <p className="mt-1 text-slate-500 dark:text-zinc-400">
            Review course purchases, verify transaction IDs, and approve access.
          </p>
        </div>

        {/* Orders Table Component */}
        <div>
          <OrdersTable orders={orders} setOrders={setOrders} />
        </div>
      </div>
    </DashboardLayout>
  );
}
