"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";

export default function DashboardPage() {
  const { user, videos } = useAppStore();
  const [prompt, setPrompt] = useState("");

  const trialEnd = user?.trialEndsAt ? new Date(user.trialEndsAt) : null;
  const today = new Date("2026-06-11");
  const trialDays = trialEnd ? Math.max(0, Math.ceil((trialEnd.getTime() - today.getTime()) / 86400000)) : 0;

  const recent = videos.slice(0, 6);

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name ?? "User"}</h1>
          <p className="text-gray-400 text-sm mt-1">Here&apos;s what&apos;s happening in your studio.</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user?.plan === "pro" ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "bg-purple-600/20 text-purple-300 border border-purple-500/30"}`}>
          {user?.plan?.toUpperCase()} Plan
        </span>
      </div>

      {/* Trial countdown */}
      {trialDays > 0 && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 flex items-center justify-between">
          <div>
            <p className="text-amber-300 font-semibold">Free Trial Active</p>
            <p className="text-amber-200/70 text-sm">{trialDays} days remaining in your trial</p>
          </div>
          <Link href="/dashboard/billing" className="bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-lg text-sm font-semibold transition">
            Manage Plan
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Videos Generated", value: videos.length },
          { label: "Characters Saved", value: useAppStore.getState().characters.length },
          { label: "Storage Used", value: `${(videos.length * 12.4).toFixed(0)} MB` },
          { label: "Plan Status", value: trialDays > 0 ? "Trial" : "Active" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-5">
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick create */}
      <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Quick Create</h2>
        <div className="flex gap-3">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your scene..."
            className="flex-1 bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
          />
          <Link
            href={`/dashboard/create${prompt ? `?prompt=${encodeURIComponent(prompt)}` : ""}`}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold transition whitespace-nowrap"
          >
            Generate
          </Link>
        </div>
      </div>

      {/* Recent creations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Creations</h2>
          <Link href="/dashboard/gallery" className="text-sm text-purple-400 hover:text-purple-300">View All</Link>
        </div>
        {recent.length === 0 ? (
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-10 text-center text-gray-500">
            No videos yet. Create your first one above!
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recent.map((v) => (
              <div key={v.id} className="rounded-xl border border-purple-500/20 bg-[#1A1030] overflow-hidden">
                <div className={`h-36 bg-gradient-to-br ${v.thumbnailColor} flex items-center justify-center`}>
                  <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center">
                    <span className="text-white text-xl">▶</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="font-semibold text-white text-sm truncate">{v.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{v.createdAt}</span>
                    <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded">{v.duration}s</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upgrade banner */}
      {user?.plan === "starter" && (
        <div className="rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-900/40 to-pink-900/30 p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-semibold text-white">Upgrade to Pro</p>
            <p className="text-gray-400 text-sm">Unlock 60s videos, AI voice, 5 character slots, and community access.</p>
          </div>
          <Link href="/dashboard/billing" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-semibold transition">
            Upgrade Now
          </Link>
        </div>
      )}
    </div>
  );
}
