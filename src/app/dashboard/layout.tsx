"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import {
  Home, Wand2, Image, Users, ListVideo, Globe, CreditCard, Settings, Shield, LogOut, Menu
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Create", href: "/dashboard/create", icon: Wand2 },
  { label: "Gallery", href: "/dashboard/gallery", icon: Image },
  { label: "Characters", href: "/dashboard/characters", icon: Users },
  { label: "Playlists", href: "/dashboard/playlists", icon: ListVideo },
  { label: "Community", href: "/dashboard/community", icon: Globe },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, logout } = useAppStore();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center">
        <div className="text-purple-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  const navItems = user.isAdmin
    ? [...NAV_ITEMS, { label: "Admin", href: "/dashboard/admin", icon: Shield }]
    : NAV_ITEMS;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-purple-500/20">
        <Link href="/" className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          adult entertain
        </Link>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-purple-500/10"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-purple-500/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-red-500/10 w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F0A1E] text-white flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-[#0F0A1E] border-r border-purple-500/20 fixed h-full z-30">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-56 bg-[#0D0920] border-r border-purple-500/20 flex flex-col z-50">
            {SidebarContent}
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen min-w-0 overflow-x-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-purple-500/20 bg-[#0F0A1E]/80 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-20">
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="md:hidden text-sm font-semibold text-white">
            adult entertain
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-white">{user.name}</div>
              <div className="text-xs text-purple-400 capitalize">{user.plan} plan</div>
            </div>
            <div className="w-8 h-8 bg-purple-600/50 rounded-full flex items-center justify-center text-sm font-bold">
              {user.name[0]}
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
