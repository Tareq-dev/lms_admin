"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  CheckCircle,
  Star,
  Users,
  Globe,
  ArrowRight,
  Award,
  Zap,
  ShieldCheck,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

// --- Dummy Data ---
const BRANDS = ["Google", "Microsoft", "Meta", "Amazon", "Netflix", "Adobe"];

const COURSES = [
  {
    id: 1,
    title: "Full Stack Web Mastery",
    price: "$99",
    rating: 4.9,
    students: "12k+",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    tag: "Development",
  },
  {
    id: 2,
    title: "UI/UX Advanced Design",
    price: "$79",
    rating: 4.8,
    students: "8k+",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
    tag: "Design",
  },
  {
    id: 3,
    title: "Digital Marketing Strategy",
    price: "$59",
    rating: 4.7,
    students: "15k+",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    tag: "Marketing",
  },
];

const MENTORS = [
  {
    name: "Alex Stanton",
    role: "Ex-Google Engineer",
    img: "https://i.pravatar.cc/150?u=1",
  },
  {
    name: "Sarah Jenkins",
    role: "Senior UX Lead",
    img: "https://i.pravatar.cc/150?u=2",
  },
  {
    name: "David Miller",
    role: "Marketing Guru",
    img: "https://i.pravatar.cc/150?u=3",
  },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[#050505] text-white selection:bg-blue-500 selection:text-white">
      {/* --- Floating Navbar --- */}
      <nav className="fixed w-full z-[100] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full">
          <div className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent italic">
            NEX-LMS
          </div>

          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400 uppercase tracking-widest">
            <a href="#courses" className="hover:text-blue-400 transition">
              Courses
            </a>
            <a href="#why-us" className="hover:text-blue-400 transition">
              Why Us
            </a>
            <a href="#mentors" className="hover:text-blue-400 transition">
              Mentors
            </a>
            <a href="/admin" className="hover:text-blue-400 transition">
              Admin Dashboard
            </a>
          </div>

          <Link href="/auth" className="hidden md:block bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-bold transition shadow-lg shadow-blue-500/20">
             Sign In
          </Link>

          <div className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a,transparent_50%)]" />
        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-1 border border-blue-500/30 rounded-full text-xs font-bold text-blue-400 uppercase tracking-[0.3em] bg-blue-500/5 mb-6 inline-block"
          >
            The Future of Learning is Here
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black leading-[1.1] mb-8 tracking-tighter"
          >
            BECOME A{" "}
            <span className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">
              DIGITAL
              <br />
              MAESTRO
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Professional certifications in Web, Design, and Marketing curated by
            the top 1% experts of the industry.
          </motion.p>
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <button className="bg-white text-black px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all duration-500">
              Start Learning — $0 Upfront
            </button>
            <button className="flex items-center justify-center gap-2 border border-white/10 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-white/5 hover:bg-white/10 transition">
              <Play size={18} fill="white" /> Watch Intro
            </button>
          </div>
        </div>
      </section>

      {/* --- Sponsorship / Brands --- */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">
            Trusted by industry giants
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition duration-700">
            {BRANDS.map((b) => (
              <span key={b} className="text-2xl font-black">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- Video Intro Section --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
              alt="Intro"
              className="w-full h-[500px] object-cover opacity-60 group-hover:scale-105 transition duration-1000"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:scale-110 transition duration-500">
                <Play fill="white" size={32} />
              </div>
            </div>
            <div className="absolute bottom-10 left-10">
              <h2 className="text-3xl font-bold">How NEX-LMS Works?</h2>
              <p className="text-gray-300">
                A quick 2-minute walkthrough of our premium platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Why Buy / Benefits --- */}
      <section id="why-us" className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">
                Unmatched Quality
              </span>
              <h2 className="text-5xl font-black mt-4 mb-8 tracking-tight">
                Why we are the <br />
                <span className="text-gray-500">Gold Standard.</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    t: "Live Mentorship",
                    d: "Weekly 1-on-1 calls with seniors from FAANG companies.",
                    icon: <Users className="text-blue-400" />,
                  },
                  {
                    t: "Verified Certificates",
                    d: "Get industry-standard certificates recognized globally.",
                    icon: <ShieldCheck className="text-green-400" />,
                  },
                  {
                    t: "Lifetime Access",
                    d: "Pay once, access updated content forever.",
                    icon: <Zap className="text-yellow-400" />,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{item.t}</h4>
                      <p className="text-gray-400">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-600 p-10 rounded-[2.5rem] flex flex-col justify-end h-[300px] shadow-2xl shadow-blue-600/20">
                <h3 className="text-4xl font-black">98%</h3>
                <p className="text-blue-100 font-bold uppercase text-[10px] tracking-widest">
                  Hiring Rate
                </p>
              </div>
              <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 flex flex-col justify-end h-[300px] mt-10">
                <h3 className="text-4xl font-black">200k+</h3>
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                  Alumni
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Courses Section --- */}
      <section id="courses" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-black tracking-tight">
                Signature <span className="text-gray-500">Courses</span>
              </h2>
              <p className="text-gray-400 mt-4 italic">
                Crafted for perfectionists.
              </p>
            </div>
            <button className="text-sm font-bold border-b border-blue-500 pb-1 hover:text-blue-400 transition">
              View All Courses
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {COURSES.map((c) => (
              <div
                key={c.id}
                className="group relative bg-[#0F0F0F] rounded-[2rem] p-4 border border-white/5 hover:border-blue-500/30 transition duration-500"
              >
                <div className="relative h-64 rounded-[1.5rem] overflow-hidden mb-6">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    {c.tag}
                  </div>
                </div>
                <div className="px-2 pb-4">
                  <div className="flex justify-between items-center mb-2 text-xs text-gray-500 font-bold">
                    <span className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="text-yellow-500"
                        fill="currentColor"
                      />{" "}
                      {c.rating}
                    </span>
                    <span>{c.students} Students</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 group-hover:text-blue-400 transition">
                    {c.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black">{c.price}</span>
                    <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-xs uppercase hover:bg-blue-600 hover:text-white transition">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- How to Start (Process) --- */}
      <section className="py-32 px-6 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-black mb-20 tracking-tight text-white">
            Your Path to <span className="text-blue-200 italic">Success.</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-10">
            {[
              {
                s: "01",
                t: "Browse Courses",
                d: "Select a path that fits your career goal.",
              },
              {
                s: "02",
                t: "Get Enrolled",
                d: "Instant access to all high-res video modules.",
              },
              {
                s: "03",
                t: "Skill Up",
                d: "Complete real-world projects and assignments.",
              },
              {
                s: "04",
                t: "Get Hired",
                d: "Access our exclusive job portal and get placed.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="text-6xl font-black text-white/20 mb-4 group-hover:text-white transition duration-500">
                  {step.s}
                </div>
                <h4 className="text-xl font-bold mb-2 text-white">{step.t}</h4>
                <p className="text-blue-100 text-sm">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Mentors Section --- */}
      <section id="mentors" className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-20 tracking-tight">
            Learn from <span className="text-gray-500">World Leaders.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {MENTORS.map((m, i) => (
              <div key={i} className="group">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition duration-500" />
                  <img
                    src={m.img}
                    alt={m.name}
                    className="relative w-48 h-48 rounded-full border-4 border-white/10 object-cover grayscale group-hover:grayscale-0 transition duration-500"
                  />
                </div>
                <h4 className="text-2xl font-bold">{m.name}</h4>
                <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mt-1">
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#050505] pt-32 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <h2 className="text-3xl font-black mb-6 tracking-tighter italic">
                NEX-LMS
              </h2>
              <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                The world's most elite learning platform for digital creatives
                and engineers. Join the revolution.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-blue-600 transition cursor-pointer"
                  >
                    <Icon size={18} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-gray-400">
                Quick Links
              </h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li className="hover:text-white cursor-pointer transition">
                  All Courses
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Mentor Program
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Corporate Training
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Scholarships
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-gray-400">
                Newsletter
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                Get the latest updates on new drops.
              </p>
              <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="bg-transparent border-none focus:ring-0 text-xs px-4 w-full"
                />
                <button className="bg-white text-black p-2 rounded-full hover:bg-blue-500 transition">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center pt-10 border-t border-white/5 text-[10px] font-bold text-gray-600 uppercase tracking-[0.5em]">
            © 2026 NEX-LMS Premium Education. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
