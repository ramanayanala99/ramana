"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Play, Heart, Globe, Lock, Share2 } from "lucide-react";

export default function CommunityPage() {
  const { videos, toggleShare, user } = useAppStore();
  const [tab, setTab] = useState<"popular" | "new">("popular");
  const [optedIn, setOptedIn] = useState(false);
  const [shareModalVideo, setShareModalVideo] = useState<string | null>(null);

  const isPro = user?.plan === "pro" || user?.plan === "admin";

  const sharedVideos = videos
    .filter((v) => v.isShared)
    .sort((a, b) => {
      if (tab === "popular") return b.likes - a.likes;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Community</h1>
        <p className="text-gray-400 text-sm mt-1">Discover what other creators are sharing</p>
      </div>

      {/* Privacy Banner */}
      <div className="rounded-xl border border-blue-500/30 bg-blue-900/10 p-4 mb-6 flex items-start gap-3">
        <Lock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-medium text-blue-300 mb-1">Your Privacy is Protected</div>
          <p className="text-xs text-blue-300/70 leading-relaxed">
            All community content is anonymized. Your real name and account details are never visible to other users.
            Sharing is always opt-in — your videos are private by default.
          </p>
        </div>
      </div>

      {/* Opt-in Prompt for Pro */}
      {isPro && !optedIn && (
        <div className="rounded-xl border border-purple-500/30 bg-[#1A1030] p-5 mb-6 flex items-center justify-between">
          <div>
            <div className="font-medium text-white mb-1">Share to Community</div>
            <p className="text-sm text-gray-400">Enable community sharing to let others see your creations and earn likes.</p>
          </div>
          <button
            onClick={() => setOptedIn(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex-shrink-0 ml-4 transition-colors"
          >
            Enable Sharing
          </button>
        </div>
      )}

      {!isPro && (
        <div className="rounded-xl border border-gray-600/30 bg-[#1A1030] p-5 mb-6 flex items-center justify-between">
          <div>
            <div className="font-medium text-white mb-1">Upgrade to Share</div>
            <p className="text-sm text-gray-400">Community sharing is a Pro feature. Upgrade to share your creations.</p>
          </div>
          <a href="/dashboard/billing" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex-shrink-0 ml-4 transition-colors">
            Upgrade to Pro
          </a>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["popular", "new"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              tab === t ? "bg-purple-600 text-white" : "bg-purple-500/10 text-gray-400 hover:text-white"
            }`}
          >
            {t === "popular" ? "Popular" : "New"}
          </button>
        ))}
      </div>

      {/* Feed */}
      {sharedVideos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-purple-500/30 bg-[#1A1030] p-16 text-center">
          <Globe className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No shared videos yet.</p>
          <p className="text-gray-500 text-sm mt-1">Be the first to share your creations!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sharedVideos.map((v) => (
            <div key={v.id} className="rounded-xl overflow-hidden border border-purple-500/20 bg-[#1A1030] group">
              <div className={`h-44 bg-gradient-to-br ${v.thumbnailColor} flex items-center justify-center relative`}>
                <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                  {v.duration}s
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm font-medium text-white mb-1 truncate">{v.title}</div>
                <div className="text-xs text-gray-500 mb-3">{v.style} · {v.createdAt}</div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleShare(v.id)}
                    className="flex items-center gap-1.5 text-xs text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    {v.likes} likes
                  </button>
                  {isPro && (
                    <button
                      onClick={() => setShareModalVideo(v.id)}
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Modal */}
      {shareModalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#1A1030] border border-purple-500/30 rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-3">Share Video</h3>
            <p className="text-gray-400 text-sm mb-4">Copy the link below to share this video:</p>
            <div className="bg-[#0D0920] border border-purple-500/20 rounded-lg px-3 py-2 text-xs text-gray-300 mb-4 select-all">
              https://adultentertain.app/community/{shareModalVideo}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShareModalVideo(null)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
