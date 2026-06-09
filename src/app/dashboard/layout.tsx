"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { BookOpen, LayoutDashboard, FileText, Database, Settings, Users, LogOut, Plus, BarChart3, CreditCard } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/create", icon: Plus, label: "Create Paper" },
  { href: "/dashboard/papers", icon: FileText, label: "My Papers" },
  { href: "/dashboard/questions", icon: Database, label: "Question Bank" },
  { href: "/dashboard/admin", icon: Users, label: "Admin" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAppStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-40 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-indigo-700">
            <div className="bg-indigo-600 text-white rounded-lg p-1.5"><BookOpen className="w-4 h-4" /></div>
            AT Tool
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className={`sidebar-link ${pathname === href ? "active" : ""}`}>
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0] || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">{user?.name}</div>
              <div className="text-xs text-gray-400 truncate">{user?.plan?.toUpperCase()} plan</div>
            </div>
          </div>
          <button onClick={() => { logout(); router.push("/"); }}
            className="sidebar-link w-full text-red-500 hover:bg-red-50">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="ml-64 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
