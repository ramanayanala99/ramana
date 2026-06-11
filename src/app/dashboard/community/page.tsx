"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Play, Heart, Globe } from "lucide-react";

const TABS = ["Popular", "New", "Following"];

export default function CommunityPage() {
  const { videos } = useAppStore();
  const [tab, setTab] = useState("Popular");
  const [optedIn, setOptedIn] = useState(false);

  const sharedVideos = videos.filter((v) => v.isShared);
  const sorted = tab === "Popular"
    ? [...sharedVideos].sort((a, b) => b.likes - a.likes)
    : [...sharedVideos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Community</h1>
        <p className="text-gray-400 text-sm mt-1">Discover shared synthetic creations from the community.</p>
      </div>

      {/* Opt-in banner */}
      {!optedIn && (
        <div className="p-5 rounded-xl bg-purple-900/20 border border-purple-800/40">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-white mb-1">Community is opt-in</p>
              <p className="text-sm text-gray-400 mb-3">Your content is private by default. Opt in to share videos to the community feed and discover others&apos; creations.</p>
              <button onClick={() => setOptedIn(true)}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors">
                Enable Community Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-[#1A1030] text-gray-400 hover:text-white border border-purple-900/40"}`}>
            {t}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Globe className="w-12 h-12 text-purple-800 mx-auto mb-3" />
          <p className="text-gray-400">No shared content yet. Share a video from your gallery to get started!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {sorted.map((video) => (
            <div key={video.id} className="card-hover rounded-xl overflow-hidden bg-[#0D0820] border border-purple-900/30">
              <div className={`h-44 bg-gradient-to-br ${video.thumbnailColor} flex items-center justify-center relative`}>
                <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                  <Play className="w-6 h-6 text-white ml-0.5" />
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white">{video.duration}s</div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-white truncate mb-1">{video.title}</p>
                <p className="text-xs text-gray-500 mb-3">{video.style} · {video.createdAt}</p>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-pink-400 transition-colors text-sm">
                    <Heart className="w-4 h-4" /> {video.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
