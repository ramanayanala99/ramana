"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

export default function CommunityPage() {
  const { videos, toggleShare } = useAppStore();
  const [optedIn, setOptedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"popular" | "new" | "following">("popular");

  const sharedVideos = videos.filter((v) => v.isShared);

  // Mock community feed
  const communityFeed = [
    { id: "cf1", title: "Sunset Romance", gradient: "from-purple-600 to-pink-500", user: "anonymous", likes: 142, comments: 8 },
    { id: "cf2", title: "Morning Bliss", gradient: "from-pink-500 to-red-500", user: "user_4821", likes: 87, comments: 3 },
    { id: "cf3", title: "Poolside Dreams", gradient: "from-indigo-600 to-cyan-400", user: "anonymous", likes: 203, comments: 15 },
    { id: "cf4", title: "Rain Dance", gradient: "from-blue-600 to-purple-500", user: "creative_99", likes: 56, comments: 2 },
    { id: "cf5", title: "Candlelit Moment", gradient: "from-amber-500 to-orange-500", user: "anonymous", likes: 99, comments: 7 },
    { id: "cf6", title: "Night Sky", gradient: "from-purple-800 to-blue-600", user: "user_2271", likes: 34, comments: 1 },
  ];

  const sorted = activeTab === "popular"
    ? [...communityFeed].sort((a, b) => b.likes - a.likes)
    : activeTab === "new"
    ? [...communityFeed].reverse()
    : communityFeed.slice(0, 3);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Community</h1>

      {/* Privacy banner */}
      <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 flex items-start gap-3">
        <span className="text-xl mt-0.5">🔒</span>
        <p className="text-amber-200 text-sm">
          <strong className="text-amber-300">Community sharing is 100% opt-in.</strong> Your private content is never shared without your explicit permission. You control everything you post.
        </p>
      </div>

      {/* Opt-in prompt */}
      {!optedIn && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 text-center">
          <div className="text-4xl mb-3">🌐</div>
          <h2 className="text-lg font-semibold text-white mb-2">Join the Community</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Opt in to browse and share community content. Discover creations from others, get likes, and showcase your best AI videos. Always anonymous, always optional.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-6">
            {["Browse community creations", "Share your videos", "Earn likes", "Stay anonymous"].map((b) => (
              <span key={b} className="flex items-center gap-1.5"><span className="text-purple-400">✓</span>{b}</span>
            ))}
          </div>
          <button onClick={() => setOptedIn(true)} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition">
            Enable Community Access
          </button>
        </div>
      )}

      {optedIn && (
        <>
          {/* Share your content */}
          {sharedVideos.length > 0 && (
            <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-4">
              <p className="text-sm text-gray-300 mb-2 font-medium">Your shared content: {sharedVideos.length} video{sharedVideos.length !== 1 ? "s" : ""}</p>
              <div className="flex flex-wrap gap-2">
                {sharedVideos.map((v) => (
                  <div key={v.id} className="flex items-center gap-2 bg-[#0D0920] border border-purple-500/30 rounded-lg px-3 py-1.5 text-xs text-gray-300">
                    <span>{v.title}</span>
                    <button onClick={() => toggleShare(v.id)} className="text-red-400 hover:text-red-300">✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 border-b border-purple-500/20 pb-0">
            {(["popular", "new", "following"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition -mb-px ${activeTab === tab ? "border-purple-500 text-purple-300" : "border-transparent text-gray-400 hover:text-white"}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Feed */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sorted.map((item) => (
              <div key={item.id} className="rounded-xl border border-purple-500/20 bg-[#1A1030] overflow-hidden">
                <div className={`h-44 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                  <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center cursor-pointer">
                    <span className="text-white text-xl ml-1">▶</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="font-semibold text-white text-sm truncate mb-1">{item.title}</div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>by {item.user}</span>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 hover:text-pink-400 transition">♥ {item.likes}</button>
                      <span>💬 {item.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
