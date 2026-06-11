"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Video, Users, HardDrive, Zap, ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  const { user, videos, characters } = useAppStore();
  const router = useRouter();
  const [quickPrompt, setQuickPrompt] = useState("");

  if (!user) return null;

  const trialDays = Math.max(0, Math.ceil(
    (new Date(user.trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  ));

  const recentVideos = videos.slice(0, 6);

  const stats = [
    { label: "Videos Generated", value: videos.length, icon: Video, color: "text-purple-400" },
    { label: "Characters Saved", value: characters.length, icon: Users, color: "text-pink-400" },
    { label: "Storage Used", value: "1.2 GB", icon: HardDrive, color: "text-blue-400" },
    { label: "Plan Status", value: user.plan === "starter" ? "Starter" : user.plan === "pro" ? "Pro" : "Admin", icon: Zap, color: "text-yellow-400" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, {user.name}</h1>
          <p className="text-gray-400 text-sm mt-1">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-2 ${
              user.plan === "pro" ? "bg-purple-600/30 text-purple-300 border border-purple-500/30" :
              user.plan === "admin" ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30" :
              "bg-gray-700/50 text-gray-300 border border-gray-600/30"
            }`}>
              {user.plan.toUpperCase()} Plan
            </span>
            {trialDays > 0 && (
              <span className="text-yellow-400">{trialDays} trial days remaining</span>
            )}
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Create Video
        </Link>
      </div>

      {/* Trial Banner */}
      {trialDays <= 7 && trialDays > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 rounded-xl px-5 py-4 text-sm flex items-center justify-between">
          <span>Your trial ends in <strong>{trialDays} days</strong>. Upgrade to keep access.</span>
          <Link href="/dashboard/billing" className="underline hover:text-yellow-200">Upgrade now</Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-5">
            <div className={`${s.color} mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Create */}
      <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
        <h2 className="text-lg font-semibold mb-3">Quick Create</h2>
        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          <input
            value={quickPrompt}
            onChange={(e) => setQuickPrompt(e.target.value)}
            placeholder="Describe your scene..."
            className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:border-purple-400 placeholder-gray-600 text-sm"
          />
          <button
            onClick={() => {
              if (quickPrompt.trim()) {
                router.push(`/dashboard/create?prompt=${encodeURIComponent(quickPrompt)}`);
              }
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex-shrink-0 transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recent Creations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Creations</h2>
          <Link href="/dashboard/gallery" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {recentVideos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-purple-500/30 bg-[#1A1030] p-12 text-center">
            <Video className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No videos yet. Create your first one!</p>
            <Link href="/dashboard/create" className="inline-block mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
              Create Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recentVideos.map((v) => (
              <div key={v.id} className="rounded-xl overflow-hidden border border-purple-500/20 bg-[#1A1030] group cursor-pointer">
                <div className={`h-36 bg-gradient-to-br ${v.thumbnailColor} flex items-center justify-center relative`}>
                  <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                    {v.duration}s
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium text-white truncate">{v.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{v.style} · {v.createdAt}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upgrade Banner */}
      {user.plan === "starter" && (
        <div className="rounded-xl border border-purple-400/30 bg-gradient-to-r from-purple-900/30 to-pink-900/20 p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">Upgrade to Pro</h3>
            <p className="text-gray-300 text-sm mt-1">Get unlimited videos, 60s duration, advanced controls, and community access.</p>
          </div>
          <Link
            href="/dashboard/billing"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex-shrink-0 ml-4 transition-colors"
          >
            Upgrade $50/mo
          </Link>
        </div>
      )}
    </div>
  );
}
