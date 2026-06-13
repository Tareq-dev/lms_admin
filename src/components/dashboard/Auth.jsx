"use client";

import React, { useState } from "react";
import { Lock, Mail, User, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";

export default function AuthPage({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Sign Up
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔐 ফ্রন্টএন্ড ভ্যালিডেশন গার্ড
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    // সিমুলেটেড API কল (আপনার ব্যাকএন্ড বা Firebase/Supabase এর সাথে এখানে কানেক্ট করবেন)
    setTimeout(() => {
      setLoading(false);
      console.log(isLogin ? "Logging in..." : "Signing up...", formData);
      
      // সফল অথেন্টিকেশন হলে প্যারেন্ট স্টেট চেঞ্জ করার জন্য ট্রিপল ফায়ার
      if (onAuthSuccess) onAuthSuccess(); 
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden p-4">
      
      {/* 🌌 ব্যাকগ্রাউন্ড লাক্সারি গ্লো ইফেক্টস */}
      <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-violet-500/10 blur-[120px]" />

      {/* 🏰 মেইন নিও-মরফিজম কার্ড চ্যাসিস */}
      <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* 🏷️ ব্র্যান্ডিং ব্র্যান্ড লোগো হেডার */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 mb-3">
            <Sparkles size={18} className="animate-pulse" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            {isLogin ? "Welcome back to EduPulse" : "Create Enterprise Account"}
          </h2>
          <p className="text-xs text-zinc-400 mt-1.5">
            {isLogin ? "Enter your admin credentials to access core system." : "Sign up to initiate your scalable LMS ecosystem."}
          </p>
        </div>

        {/* 📝 অ্যাকচুয়াল ফর্ম ম্যাট্রিক্স */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* ১. ফুল নেম ফিল্ড (শুধুমাত্র সাইন আপ মোডে দেখাবে) */}
          {!isLogin && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-3.5 text-zinc-500" />
                <input
                  name="name"
                  type="text"
                  placeholder="Alex Mercer"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5"
                />
              </div>
            </div>
          )}

          {/* ২. ইমেইল অ্যাড্রেস ফিল্ড */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-3.5 text-zinc-500" />
              <input
                name="email"
                type="email"
                placeholder="admin@edupulse.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5"
              />
            </div>
          </div>

          {/* ৩. পাসওয়ার্ড ফিল্ড */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Password</label>
              {isLogin && (
                <a href="#" className="text-[11px] font-bold text-indigo-400 hover:underline">Forgot Password?</a>
              )}
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-3.5 text-zinc-500" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 py-3 pl-11 pr-12 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-zinc-500 hover:text-zinc-300 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* ৪. কনফার্ম পাসওয়ার্ড ফিল্ড (শুধুমাত্র সাইন আপ মোডে দেখাবে) */}
          {!isLogin && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-3.5 text-zinc-500" />
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5"
                />
              </div>
            </div>
          )}

          {/* 🎬 সাবমিট ট্রিগার বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white text-zinc-950 py-3 text-xs font-black tracking-wide uppercase transition-all hover:bg-zinc-100 active:scale-[0.99] flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? "Authenticate Engine" : "Establish Credentials"}
                <ArrowRight size={14} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        {/* 🔄 মোড সুইচিং প্যানেল (Login <=> Sign Up) */}
        <div className="mt-6 pt-4 border-t border-zinc-800/60 text-center">
          <p className="text-xs text-zinc-400">
            {isLogin ? "New to the platform?" : "Already have an operator account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: "", email: "", password: "", confirmPassword: "" }); // স্টেট ক্লিন হ্যাক
              }}
              className="font-bold text-indigo-400 hover:text-indigo-300 transition hover:underline cursor-pointer"
            >
              {isLogin ? "Create an account" : "Sign in here"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}