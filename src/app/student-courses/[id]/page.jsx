"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause,
  Maximize,
  Volume2,
  VolumeX,
  ChevronDown, 
  ChevronUp,
  FileText, 
  MessageSquare, 
  Sparkles,
  Layers,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation"; // Next.js ডাইনামিক আইডি রিড করার জন্য
import DashboardLayout from "@/components/layout/DashboardLayout";

// 🗂️ ডেটাবেস/মক ডেটা ল্যাব (কোর্স আইডি অনুযায়ী মডিউল ও ভিডিও ফিল্টার হবে)
const COURSES_DATA_MAP = {
  "nextjs-14": {
    courseTitle: "Next.js 14 Ultra-Posh Development",
    modules: [
      {
        id: 1,
        moduleTitle: "Phase 01: Next.js Core Architecture",
        videos: [
          { id: "n1", title: "01. Welcome & Next.js Framework Architecture", duration: "12:45", url: "https://vjs.zencdn.net/v/oceans.mp4" },
          { id: "n2", title: "02. Server Actions vs Client Components", duration: "24:10", url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4" }, 
        ]
      },
      {
        id: 2,
        moduleTitle: "Phase 02: Advanced Streaming & PPR",
        videos: [
          { id: "n3", title: "03. Suspense & Partial Prerendering Deep Dive", duration: "18:55", url: "https://vjs.zencdn.net/v/oceans.mp4" }
        ]
      }
    ]
  },
  "tailwind-css": {
    courseTitle: "Tailwind CSS Advanced Mechanics",
    modules: [
      {
        id: 1,
        moduleTitle: "Phase 01: Design System & Config",
        videos: [
          { id: "t1", title: "01. Mastering tailwind.config.js Engine", duration: "15:20", url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4" },
          { id: "t2", title: "02. Arbitrary Variants & Complex Selectors", duration: "22:10", url: "https://vjs.zencdn.net/v/oceans.mp4" }, 
        ]
      }
    ]
  },
  "prisma-backend": {
    courseTitle: "Prisma Orchestration & PostgreSQL Masterclass",
    modules: [
      {
        id: 1,
        moduleTitle: "Phase 01: Database Modeling",
        videos: [
          { id: "p1", title: "01. Prisma Schema & PostgreSQL Hub Setup", duration: "19:40", url: "https://vjs.zencdn.net/v/oceans.mp4" },
          { id: "p2", title: "02. Advanced Relations and Fluent API", duration: "31:15", url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4" }, 
        ]
      }
    ]
  }
};

export default function WatchCourse() {
  const [hasMounted, setHasMounted] = useState(false);
  const params = useParams();
  const courseId = params?.courseId || "nextjs-14"; // URL থেকে আইডি না পেলে ডিফল্ট সেট হবে

  // বর্তমান কোর্সের ডেটা এক্সট্রাক্ট করা
  const activeCourse = COURSES_DATA_MAP[courseId] || COURSES_DATA_MAP["nextjs-14"];
  const modules = activeCourse.modules;

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  // 🎛️ ভিডিও প্লেয়ার কাস্টম স্টেট
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);

  // 🎛️ প্রথম ভিডিওটি অটোমেটিক কারেন্ট ভিডিও হিসেবে ইনিশিয়ালাইজ করা
  const [currentVideo, setCurrentVideo] = useState({
    title: modules[0]?.videos[0]?.title || "",
    url: modules[0]?.videos[0]?.url || "",
  });
  
  const [activeBottomTab, setActiveBottomTab] = useState("discussion");
  const [expandedModule, setExpandedModule] = useState(1);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 🔄 কোর্স বা ভিডিওর URL চেঞ্জ হলে নতুন করে ভিডিও লোড করা
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideo.url]);

  // কন্ট্রোলস হাইড টাইমার
  useEffect(() => {
    let timeout;
    if (isPlaying && showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const seekTime = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSpeedChange = (rate) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  // 🎯 প্লেলিস্ট থেকে ক্লিক হ্যান্ডেল করার ফাংশন
  const handleVideoSelect = (vid) => {
    setCurrentVideo({ title: vid.title, url: vid.url });
    
    const isNextVideoYouTube = vid.url.includes("youtube.com") || vid.url.includes("youtu.be");
    if (!isNextVideoYouTube) {
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch((err) => {
            console.log("Autoplay blocked:", err);
            setIsPlaying(false);
          });
        }
      }, 50);
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const isYouTube = currentVideo.url.includes("youtube.com") || currentVideo.url.includes("youtu.be");

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white flex flex-col lg:flex-row antialiased relative">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/4 h-[350px] w-[350px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px] pointer-events-none" />

        {/* 🎥 বাম পাশ: মেইন প্লেয়ার এবং ট্যাব */}
        <div className="flex-1 p-4 lg:p-8 space-y-5 overflow-y-auto">
          
          {/* ⬅️ নতুন যুক্ত করা স্লিম ব্যাক বাটন */}
          <div className="flex items-center justify-between pb-2">
            <Link 
              href="/student-courses" // আপনার কোর্স ক্যাটালগের মেইন রুটটি এখানে দিন
              className="group flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-fit"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Course Vault</span>
            </Link>
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-md border dark:border-zinc-800">
              Cohort: {courseId}
            </span>
          </div>
          
          {/* 📱 MX Player ইন্সপায়ার্ড স্লিম কন্টেইনার */}
          <div 
            ref={containerRef}
            onMouseMove={() => setShowControls(true)}
            className="w-full aspect-video bg-black rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl relative overflow-hidden group select-none transition-all duration-300"
          >
            {hasMounted && (
              isYouTube ? (
                <iframe
                  key={currentVideo.url}
                  src={`${currentVideo.url}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                  title={currentVideo.title}
                  className="w-full h-full border-0 rounded-3xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full relative flex items-center justify-center">
                  <video
                    key={currentVideo.url}
                    ref={videoRef}
                    src={currentVideo.url}
                    playsInline
                    onClick={togglePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    className="w-full h-full object-cover rounded-3xl cursor-pointer"
                  />

                  {/* 🎞️ MX Player ওভারলে */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex flex-col justify-between p-4 transition-opacity duration-300 rounded-3xl ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    
                    <div className="flex justify-between items-center text-white/80">
                      <span className="text-[10px] font-medium tracking-wide bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/5 line-clamp-1 max-w-[80%]">
                        {currentVideo.title}
                      </span>
                    </div>

                    {!isPlaying && (
                      <button 
                        onClick={togglePlay}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white p-4 rounded-full shadow-xl transform hover:scale-105 transition duration-250 cursor-pointer"
                      >
                        <Play size={18} className="fill-current ml-0.5" />
                      </button>
                    )}

                    {/* 🛠️ কন্ট্রোল ডক */}
                    <div className="w-full space-y-2 px-1">
                      <div className="relative group/track w-full flex items-center">
                        <input
                          type="range"
                          min="0"
                          max={duration || 0}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full accent-indigo-500 h-[3px] hover:h-[5px] rounded-lg appearance-none bg-white/20 cursor-pointer transition-all duration-150"
                        />
                      </div>

                      <div className="flex justify-between items-center text-zinc-300 text-xs font-medium">
                        <div className="flex items-center gap-3.5">
                          <button onClick={togglePlay} className="hover:text-white transition cursor-pointer">
                            {isPlaying ? <Pause size={13} className="fill-current" /> : <Play size={13} className="fill-current" />}
                          </button>
                          <button onClick={toggleMute} className="hover:text-white transition cursor-pointer">
                            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                          </button>
                          <div className="text-[11px] font-mono tracking-tight text-zinc-400">
                            <span className="text-white">{formatTime(currentTime)}</span>
                            <span className="mx-1">/</span>
                            <span>{formatTime(duration)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3.5">
                          <div className="flex bg-white/5 backdrop-blur-md rounded-md p-0.5 border border-white/10 text-[9px] font-black">
                            {[1, 1.5, 2].map((rate) => (
                              <button
                                key={rate}
                                onClick={() => handleSpeedChange(rate)}
                                className={`px-1.5 py-0.5 rounded-sm transition cursor-pointer ${playbackRate === rate ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"}`}
                              >
                                {rate}x
                              </button>
                            ))}
                          </div>
                          <button onClick={toggleFullscreen} className="hover:text-white transition cursor-pointer">
                            <Maximize size={13} />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )
            )}
          </div>

          {/* মেটা টেক্সট জোন */}
          <div className="flex justify-between items-start border-b border-zinc-200/60 dark:border-zinc-900 pb-4">
            <div className="space-y-1">
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                <Sparkles size={10} className="animate-pulse" /> {activeCourse.courseTitle}
              </span>
              <h1 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
                {currentVideo.title}
              </h1>
            </div>
          </div>

          {/* বটম ট্যাব ল্যাব */}
          <div className="space-y-4">
            <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900/60 w-fit rounded-xl border dark:border-zinc-800">
              <button
                onClick={() => setActiveBottomTab("discussion")}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${activeBottomTab === "discussion" ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs" : "text-zinc-400"}`}
              >
                <MessageSquare size={12} /> Live Forum
              </button>
              <button
                onClick={() => setActiveBottomTab("notes")}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${activeBottomTab === "notes" ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs" : "text-zinc-400"}`}
              >
                <FileText size={12} /> Instructor Notes
              </button>
            </div>

            <div className="p-5 border border-zinc-200/50 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/10 rounded-2xl min-h-36">
              {activeBottomTab === "discussion" ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex gap-3">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Naimur" alt="User" className="h-7 w-7 rounded-lg bg-zinc-100" />
                    <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-2xl flex-1">
                      <p className="text-[11px] font-bold text-indigo-500">Naimur Rahman • <span className="text-zinc-400 font-normal">2 mins ago</span></p>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-0.5">ভাইয়া, পোস্টগ্রিস ডকার কন্টেইনার রান করার সময় পোর্ট ৫০৫০ ব্লক দেখাচ্ছে। সリューション কী?</p>
                    </div>
                  </div>
                  <input type="text" placeholder="Drop your query inside this cohort..." className="w-full px-4 py-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-hidden" />
                </div>
              ) : (
                <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2 animate-in fade-in duration-200 leading-relaxed font-medium">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">📌 মডিউল মেমো ও সোর্স লিংক:</p>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    <li>প্রজেক্টের সোর্স গিটহাব লিংক জেনারেট করা হয়েছে।</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 📑 ডান পাশ: সাইডবার একর্ডিয়ন */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1">
              <Layers size={12} className="text-indigo-500" /> Course Playdeck
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">{modules.length} Core Phases Available</p>
          </div>

          <div className="space-y-3">
            {modules.map((mod) => (
              <div key={mod.id} className="border border-zinc-100 dark:border-zinc-900 rounded-2xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/20">
                <button
                  onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                  className="w-full p-4 flex justify-between items-center bg-zinc-100/60 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition cursor-pointer"
                >
                  <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 tracking-tight text-left line-clamp-1">{mod.moduleTitle}</span>
                  {expandedModule === mod.id ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
                </button>

                {expandedModule === mod.id && (
                  <div className="p-2 space-y-1 border-t dark:border-zinc-900 divide-y divide-zinc-100/50 dark:divide-zinc-900/30 animate-in slide-in-from-top-2 duration-200">
                    {mod.videos.map((vid) => (
                      <div
                        key={vid.id}
                        onClick={() => handleVideoSelect(vid)}
                        className={`w-full p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition pt-3 ${vid.title === currentVideo.title ? "border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-3xs" : "bg-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-900/20"}`}
                      >
                        <div className="flex items-center gap-3">
                          <Play size={10} className={vid.title === currentVideo.title ? "text-indigo-500 fill-current" : "text-zinc-400"} />
                          <span className={`text-xs font-bold text-left line-clamp-1 ${vid.title === currentVideo.title ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-700 dark:text-zinc-300"}`}>{vid.title}</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-400 bg-white dark:bg-zinc-900 border px-1.5 py-0.5 rounded-md shrink-0">{vid.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}