"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import {
  Home, Wand2, Image, Users, ListVideo, Globe, CreditCard,
  Settings, Shield, LogOut, Menu, X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/create", icon: Wand2, label: "Create" },
  { href: "/dashboard/gallery", icon: Image, label: "Gallery" },
  { href: "/dashboard/characters", icon: Users, label: "Characters" },
  { href: "/dashboard/playlists", icon: ListVideo, label: "Playlists" },
  { href: "/dashboard/community", icon: Globe, label: "Community" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAppStore();
  const [hydrated, setHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { setHydrated(true); }, []);
  useEffect(() => {
    if (hydrated && !isAuthenticated) router.push("/login");
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0A1E]">
        <div className="text-purple-400 font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }
  if (!isAuthenticated) return null;

  const adminItem = { href: "/dashboard/admin", icon: Shield, label: "Admin" };
  const navItems = user?.isAdmin ? [...NAV_ITEMS, adminItem] : NAV_ITEMS;

  return (
    <div className="min-h-screen bg-[#0F0A1E] flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0F0A1E] border-r border-purple-500/20 flex flex-col z-40 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-5 border-b border-purple-500/20 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            adult entertain
          </Link>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${active ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-purple-500/20">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 mb-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0] ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
              <div className="text-xs text-gray-400 capitalize">{user?.plan} plan</div>
            </div>
          </div>
          <button onClick={() => { logout(); router.push("/"); }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="h-14 border-b border-purple-500/20 bg-[#0F0A1E] flex items-center justify-between px-4 sticky top-0 z-20">
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:block text-sm text-gray-400">
            {navItems.find((n) => n.href === pathname)?.label ?? "Dashboard"}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0] ?? "U"}
            </div>
            <span className="hidden sm:block text-sm text-gray-300">{user?.name}</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
