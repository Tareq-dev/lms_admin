"use client";

import React, { useState } from "react";
import { 
  Award, 
  Download, 
  ExternalLink, 
  Search, 
  Calendar, 
  ShieldCheck, 
  Linkedin,
  Share2,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

// 📜 মক সার্টিফিকেট ডেটা ল্যাব
const CERTIFICATES_DATA = [
  {
    id: "CERT-2026-9041",
    title: "Advanced Next.js 14 & Enterprise Architecture",
    instructor: "Alex Mercer",
    issueDate: "May 2026",
    credentialUrl: "#",
    grade: "A+ (94%)",
    type: "Professional",
    isFeatured: true
  },
  {
    id: "CERT-2026-3122",
    title: "Full-Stack Web Development Mastery (MERN)",
    instructor: "Fahim Murshed",
    issueDate: "February 2026",
    credentialUrl: "#",
    grade: "A (88%)",
    type: "Masterclass",
    isFeatured: false
  },
  {
    id: "CERT-2025-0845",
    title: "UI/UX Design Systems for Developers",
    instructor: "Sarah Jenkins",
    issueDate: "December 2025",
    credentialUrl: "#",
    grade: "Pass",
    type: "Workshop",
    isFeatured: false
  }
];

export default function Certificates() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCertificates = CERTIFICATES_DATA.filter((cert) =>
    cert.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white p-4 lg:p-8 space-y-8 antialiased relative overflow-hidden">
        
        {/* 🌟 Luxury Golden Ambient Glow */}
        <div className="absolute top-0 right-1/4 h-[350px] w-[350px] rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-10 h-[250px] w-[250px] rounded-full bg-indigo-600/5 dark:bg-indigo-500/5 blur-[90px] pointer-events-none" />

        {/* 🏷️ হেডার জোন */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-200/60 dark:border-zinc-900 pb-6 gap-4">
          <div className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
              <Sparkles size={12} /> Credentials & Badges
            </span>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl flex items-center gap-2.5">
              Verified Certificates <Award className="text-amber-500" size={24} />
            </h1>
            <p className="text-xs text-zinc-400 font-medium">Your official academic achievements and industry-recognized milestones.</p>
          </div>

          {/* 🔍 সার্চ বার */}
          <div className="relative w-full md:w-80 group">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-amber-500 transition-colors" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 backdrop-blur-md focus:outline-hidden focus:border-amber-500/50 dark:focus:border-amber-400/30 font-medium transition-all"
            />
          </div>
        </div>

        {/* 🏆 ফিচারড সার্টিফিকেট স্পটলাইট (সবচেয়ে বড় অ্যাচিভমেন্ট) */}
        {!searchQuery && CERTIFICATES_DATA.find(c => c.isFeatured) && (
          (() => {
            const featured = CERTIFICATES_DATA.find(c => c.isFeatured);
            return (
              <div className="bg-gradient-to-r from-amber-500/10 via-zinc-100/50 to-transparent dark:from-amber-500/10 dark:via-zinc-900/40 dark:to-zinc-950 border border-amber-500/30 dark:border-amber-500/20 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl max-w-5xl mx-auto">
                <div className="flex items-start gap-5">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 shrink-0">
                    <Award size={36} className="stroke-1.5" />
                  </div>
                  <div className="space-y-2">
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md">
                      Featured Credential
                    </span>
                    <h2 className="text-base md:text-xl font-black tracking-tight text-zinc-800 dark:text-zinc-100">{featured.title}</h2>
                    <p className="text-xs text-zinc-400 font-medium">Issued by Authorized Lead: <span className="text-zinc-600 dark:text-zinc-300 font-semibold">{featured.instructor}</span></p>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-400 font-medium pt-1">
                      <span className="flex items-center gap-1 font-mono"><Calendar size={12} /> {featured.issueDate}</span>
                      <span className="flex items-center gap-1 font-mono"><ShieldCheck size={12} className="text-emerald-500" /> ID: {featured.id}</span>
                    </div>
                  </div>
                </div>
                
                {/* অ্যাকশন বাটনস */}
                <div className="flex flex-row md:flex-col lg:flex-row gap-2.5 w-full md:w-auto shrink-0 justify-end">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-md">
                    <Download size={14} /> Download PDF
                  </button>
                  <button className="flex items-center justify-center p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition shadow-2xs">
                    <Linkedin size={14} className="fill-current text-blue-600 dark:text-blue-400" />
                  </button>
                </div>
              </div>
            );
          })()
        )}

        {/* 🗂️ অল সার্টিফিকেটস গ্রিড ল্যাব */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((cert) => (
              <div 
                key={cert.id} 
                className="bg-white/70 dark:bg-zinc-900/20 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-900 rounded-2xl p-5 flex flex-col justify-between gap-5 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-200 group relative shadow-2xs"
              >
                {/* কার্ড টপ সেকশন */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border dark:border-zinc-800">
                      {cert.type}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 size={10} /> Grade: {cert.grade}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-black tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:text-indigo-500 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-medium">By {cert.instructor}</p>
                  </div>
                </div>

                {/* কার্ড বটম এবং একশন জোন */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900/60 flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono font-black text-zinc-400 tracking-wider uppercase">ID: {cert.id}</span>
                    <span className="text-[10px] text-zinc-500 font-medium">{cert.issueDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* ডাউনলোড বাটন */}
                    <button 
                      title="Download Certificate"
                      className="p-2 rounded-lg border border-zinc-200/60 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition shadow-3xs"
                    >
                      <Download size={13} />
                    </button>
                    {/* শেয়ার বাটন */}
                    <button 
                      title="Verify on Platform"
                      className="p-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 transition shadow-2xs flex items-center gap-1 text-[11px] font-bold"
                    >
                      <ExternalLink size={12} /> Verify
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 text-xs font-medium">
              No verified credentials found matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* 🔒 নিচে সিকিউরিটি অ্যান্ড ভেরিফিকেশন ফুটনোট */}
        <div className="max-w-5xl mx-auto pt-6 text-center">
          <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" /> 
            All certificates generated by EduPulse LMS are secured via unique ID cryptographic verification.
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}