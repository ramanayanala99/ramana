"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Play, Trash2, Share2, Filter } from "lucide-react";

const STYLES = ["All", "Realistic", "Artistic", "Cinematic"];

export default function GalleryPage() {
  const { videos, deleteVideo, toggleShare } = useAppStore();
  const [filterStyle, setFilterStyle] = useState("All");

  const filtered = filterStyle === "All" ? videos : videos.filter((v) => v.style === filterStyle);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gallery</h1>
          <p className="text-gray-400 text-sm mt-1">{videos.length} videos in your collection</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-400" />
        <div className="flex gap-2">
          {STYLES.map((s) => (
            <button key={s} onClick={() => setFilterStyle(s)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterStyle === s ? "bg-purple-600 text-white" : "bg-[#1A1030] text-gray-400 hover:text-white border border-purple-900/40"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <p className="text-gray-400">No videos found. Try a different filter or create one!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {filtered.map((video) => (
            <div key={video.id} className="card-hover rounded-xl overflow-hidden bg-[#0D0820] border border-purple-900/30">
              {/* Thumbnail */}
              <div className={`h-40 bg-gradient-to-br ${video.thumbnailColor} flex items-center justify-center relative`}>
                <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                  <Play className="w-6 h-6 text-white ml-0.5" />
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white">{video.duration}s</div>
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white">{video.style}</div>
                {video.isShared && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-purple-600/80 rounded text-xs text-white">Shared</div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-white truncate mb-1">{video.title}</p>
                <p className="text-xs text-gray-500 mb-3">{video.createdAt}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleShare(video.id)}
                    className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-colors border ${video.isShared ? "border-purple-500 text-purple-400 bg-purple-900/20" : "border-gray-700 text-gray-400 hover:border-gray-500"}`}
                  >
                    <Share2 className="w-3 h-3" /> {video.isShared ? "Unshare" : "Share"}
                  </button>
                  <button
                    onClick={() => deleteVideo(video.id)}
                    className="p-1.5 rounded-lg border border-red-900/40 text-red-500 hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
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
