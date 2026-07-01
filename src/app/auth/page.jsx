"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/authSlice";
import { useRouter } from "next/navigation";
import { User, Lock, Mail, UserPlus, LogIn } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password !== "1234") {
      alert("Password must be 1234");
      return;
    }

    let role = "";
    if (email === "admin@nex.com") role = "admin";
    else if (email === "user@nex.com") role = "user";
    else if (email === "student@nex.com") role = "student";
    else { alert("Email not found"); return; }

    dispatch(setAuth({ user: { email }, role }));
    router.push(role === "admin" ? "/admin" : "/student-dashboard");
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#050505] transition-colors duration-500">
      <div className="hidden lg:flex w-1/2 bg-[#9FA1FF] items-center justify-center p-12 text-white">
        <h1 className="text-6xl font-black italic">NEX-LMS</h1>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-black mb-8">{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="email" type="email" placeholder="Email" className="w-full bg-gray-100 dark:bg-white/5 p-4 rounded-2xl border-none" required />
            <input name="password" type="password" placeholder="Password (1234)" className="w-full bg-gray-100 dark:bg-white/5 p-4 rounded-2xl border-none" required />
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">{isLogin ? "Sign In" : "Sign Up"}</button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-500 font-bold">{isLogin ? "No account? Sign Up" : "Already have account? Sign In"}</button>
        </div>
      </div>
    </div>
  );
}