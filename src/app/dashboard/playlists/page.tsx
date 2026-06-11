"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

export default function PlaylistsPage() {
  const { playlists, videos, addPlaylist } = useAppStore();
  const [newName, setNewName] = useState("");
  const [selected, setSelected] = useState<string | null>(playlists[0]?.id ?? null);

  const selectedPlaylist = playlists.find((p) => p.id === selected);
  const playlistVideos = selectedPlaylist
    ? videos.filter((v) => selectedPlaylist.videoIds.includes(v.id))
    : [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Playlists</h1>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 shrink-0">
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-4 space-y-2">
            <div className="text-sm font-medium text-gray-400 mb-1">Your Playlists</div>
            {playlists.map((pl) => (
              <button key={pl.id} onClick={() => setSelected(pl.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${selected === pl.id ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                <div className="font-medium">{pl.name}</div>
                <div className="text-xs opacity-70">{pl.videoIds.length} video{pl.videoIds.length !== 1 ? "s" : ""}</div>
              </button>
            ))}
            <div className="pt-2 border-t border-purple-500/20">
              <div className="flex gap-1">
                <input value={newName} onChange={(e) => setNewName(e.target.value)}
                  placeholder="New playlist..."
                  className="flex-1 bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-2 py-1.5 text-xs focus:outline-none placeholder-gray-600" />
                <button onClick={() => { if (newName.trim()) { addPlaylist(newName); setNewName(""); } }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1.5 rounded-lg text-xs transition">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {selectedPlaylist ? (
            <>
              <h2 className="text-lg font-semibold text-white mb-4">{selectedPlaylist.name}</h2>
              {playlistVideos.length === 0 ? (
                <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-10 text-center text-gray-500">
                  No videos in this playlist yet. Add some from your gallery.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {playlistVideos.map((v) => (
                    <div key={v.id} className="rounded-xl border border-purple-500/20 bg-[#1A1030] overflow-hidden">
                      <div className={`h-36 bg-gradient-to-br ${v.thumbnailColor} flex items-center justify-center`}>
                        <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center">
                          <span className="text-white">▶</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="text-sm font-semibold text-white truncate">{v.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{v.duration}s • {v.style}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-10 text-center text-gray-500">
              Select a playlist to view its videos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
