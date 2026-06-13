"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import AuthPage from "@/components/dashboard/Auth"; // আমাদের তৈরি করা AuthPage ইম্পোর্ট করুন

export default function DashboardLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🛡️ ইউজার লগইন না থাকলে তাকে ড্যাশবোর্ড না দেখিয়ে সরাসরি Auth (Login/Signup) পেজ দেখাবে
  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  // ✅ ইউজার ভেরিফাইড হলে ফুল প্রিমিয়াম ড্যাশবোর্ড আনলক হবে
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 antialiased selection:bg-indigo-500 selection:text-white">
      {/* 🏰 বাম পাশের এলিট সাইডবার */}
      <Sidebar />

      {/* 🏎️ ডান পাশের মেইন চ্যাসিস এবং স্ক্রোল জোন */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-zinc-950 no-scrollbar">
        {/* 🧭 টপ গ্লাস-মরফিক ন্যাভবার */}
        <Navbar />

        {/* 📊 ডাইনামিক পেজ কন্টেন্ট এরিয়া */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto animate-in fade-in-50 slide-in-from-bottom-3 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}

// "use client";

// import Sidebar from "@/components/dashboard/Sidebar";
// import Navbar from "@/components/dashboard/Navbar";

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
//       <Sidebar />

//       <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-950">
//         <Navbar />
//         <div className="p-8 max-w-7xl mx-auto">{children}</div>
//       </main>
//     </div>
//   );
// }
