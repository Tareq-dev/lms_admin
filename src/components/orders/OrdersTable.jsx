import { Search, Eye, CheckCircle, XCircle, Clock, CreditCard, Calendar } from "lucide-react";
import React, { useMemo, useState } from "react";

function OrdersTable({ orders, setOrders }) {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null); // মডাল ওপেন করার জন্য

  // সার্চ ফিল্টার: নাম, ইমেইল, TrxID বা কোর্স নাম
  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      `${order.studentName} ${order.studentEmail} ${order.trxId} ${order.courseName}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [orders, search]);

  // স্ট্যাটাস আপডেট ফাংশন (Approve/Cancel)
  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
    // মডালের ডাটাও আপডেট করা
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="w-full space-y-6 p-1">
      
      {/* Stats Cards Section */}
      <div className="grid gap-5 sm:grid-cols-3">
        {/* Pending Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">Pending Approvals</p>
              <h2 className="text-3xl font-extrabold text-amber-500">
                {orders.filter((o) => o.status === "Pending").length}
              </h2>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-amber-500 dark:bg-amber-500/10">
              <Clock size={24} />
            </div>
          </div>
        </div>

        {/* Approved Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">Total Enrolled</p>
              <h2 className="text-3xl font-extrabold text-emerald-500">
                {orders.filter((o) => o.status === "Approved").length}
              </h2>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-500 dark:bg-emerald-500/10">
              <CheckCircle size={24} />
            </div>
          </div>
        </div>

        {/* Total Revenue Simplified */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">Total Orders</p>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {orders.length}
              </h2>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-500/10">
              <CreditCard size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Table Box */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        
        {/* Search Input */}
        <div className="border-b border-slate-100 p-5 dark:border-zinc-800">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-3.5 text-slate-400 dark:text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="Search by student, TrxID or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500 dark:focus:bg-zinc-900"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 font-semibold text-slate-600 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
                <th className="p-4 pl-6">Order ID & Student</th>
                <th className="p-4">Course</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Transaction ID (TrxID)</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-zinc-800 dark:text-zinc-300">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                  
                  {/* ID & Student Details */}
                  <td className="p-4 pl-6">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-0.5">{order.id}</span>
                    <div className="font-semibold text-slate-900 dark:text-white">{order.studentName}</div>
                    <div className="text-xs text-slate-400 dark:text-zinc-500">{order.studentEmail}</div>
                  </td>

                  {/* Course Name */}
                  <td className="p-4 font-medium text-slate-800 dark:text-zinc-200">
                    {order.courseName}
                  </td>

                  {/* Amount & Method */}
                  <td className="p-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{order.amount}</div>
                    <div className="text-xs text-slate-500 dark:text-zinc-400">{order.paymentMethod}</div>
                  </td>

                  {/* Transaction ID */}
                  <td className="p-4 font-mono text-xs tracking-wider text-slate-600 dark:text-zinc-400">
                    {order.trxId}
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      order.status === "Approved" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" :
                      order.status === "Pending" ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" :
                      "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                    }`}>
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 pr-6 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                    >
                      <Eye size={14} /> View Details
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="py-12 text-center text-slate-400 dark:text-zinc-500">No orders found.</div>
        )}
      </div>

      {/* --- Details Modal --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 border dark:border-zinc-800">
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Order Details</h3>
            
            <div className="space-y-4 text-sm">
              <div className="border-b dark:border-zinc-800 pb-3">
                <span className="text-xs text-slate-400 block">Student Info</span>
                <p className="font-semibold text-slate-900 dark:text-white">{selectedOrder.studentName}</p>
                <p className="text-xs text-slate-500">{selectedOrder.studentEmail}</p>
              </div>

              <div className="border-b dark:border-zinc-800 pb-3">
                <span className="text-xs text-slate-400 block">Requested Course</span>
                <p className="font-medium text-slate-900 dark:text-white">{selectedOrder.courseName}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b dark:border-zinc-800 pb-3">
                <div>
                  <span className="text-xs text-slate-400 block">Payment Method & Amount</span>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedOrder.paymentMethod} ({selectedOrder.amount})</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Transaction ID (TrxID)</span>
                  <p className="font-mono font-bold text-blue-600 dark:text-blue-400">{selectedOrder.trxId}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Calendar size={14} /> Ordered on: {selectedOrder.date}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex gap-3">
              {selectedOrder.status === "Pending" ? (
                <>
                  <button
                    onClick={() => updateStatus(selectedOrder.id, "Approved")}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition"
                  >
                    <CheckCircle size={14} /> Approve Order
                  </button>
                  <button
                    onClick={() => updateStatus(selectedOrder.id, "Cancelled")}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white hover:bg-rose-500 transition"
                  >
                    <XCircle size={14} /> Cancel Order
                  </button>
                </>
              ) : (
                <div className="w-full text-center py-2 bg-slate-50 dark:bg-zinc-800 text-xs font-semibold rounded-xl">
                  This order is already <span className="underline">{selectedOrder.status}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-3 cursor-pointer rounded-xl border border-slate-200 dark:border-zinc-700 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default OrdersTable;