"use client";

import { useState } from "react";
import Link from "next/link";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  ShoppingCart,
  BarChart3,
  FileText,
  Ticket,
  Bell,
  Settings,
  Menu,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Courses", icon: BookOpen, path: "/courses" },
  { name: "Students", icon: Users, path: "/students" },
  { name: "Instructors", icon: GraduationCap, path: "/instructors" },
  { name: "Orders", icon: ShoppingCart, path: "/orders" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "Exams", icon: FileText, path: "/exams" },
  { name: "Coupons", icon: Ticket, path: "/coupons" },
  { name: "Notifications", icon: Bell, path: "/notifications" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded shadow"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Overlay */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <div
        className={`fixed lg:static z-50 h-screen bg-white dark:bg-gray-900 shadow transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "left-0" : "-left-64 lg:left-0"}
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between px-4 h-16 border-b dark:border-gray-700">
          {!collapsed && (
            <h1 className="font-bold text-lg text-gray-800 dark:text-white">
              SaaS Admin
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:block"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Menu */}

        <nav className="p-3 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                href={item.path}
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Icon size={20} />

                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
