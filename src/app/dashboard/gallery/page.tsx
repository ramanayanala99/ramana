"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

export default function GalleryPage() {
  const { videos, playlists, deleteVideo, toggleShare, addPlaylist, addToPlaylist } = useAppStore();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest" | "likes">("newest");
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);

  let filtered = videos.filter((v) => v.title.toLowerCase().includes(search.toLowerCase()));
  if (sort === "newest") filtered = [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (sort === "oldest") filtered = [...filtered].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  if (sort === "likes") filtered = [...filtered].sort((a, b) => b.likes - a.likes);

  function handleAddToPlaylist(playlistId: string, videoId: string) {
    addToPlaylist(playlistId, videoId);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">My Gallery</h1>
          <p className="text-gray-400 text-sm">{videos.length} video{videos.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex gap-3 mb-5 flex-wrap">
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search videos..."
              className="flex-1 min-w-48 bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 placeholder-gray-600"
            />
            <select value={sort} onChange={(e) => setSort(e.target.value as "newest" | "oldest" | "likes")}
              className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 text-sm">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-12 text-center">
              <div className="text-4xl mb-3">🎬</div>
              <p className="text-gray-400">No videos found. Create your first one!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((v) => (
                <div key={v.id} className="group rounded-xl border border-purple-500/20 bg-[#1A1030] overflow-hidden relative">
                  <div className={`h-40 bg-gradient-to-br ${v.thumbnailColor} flex items-center justify-center relative`}>
                    <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center">
                      <span className="text-white text-xl ml-1">▶</span>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                      <button title="Download" className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg text-xs transition">⬇</button>
                      {playlists.length > 0 && (
                        <button title="Add to first playlist" onClick={() => handleAddToPlaylist(playlists[0].id, v.id)} className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg text-xs transition">+</button>
                      )}
                      <button onClick={() => toggleShare(v.id)} title="Toggle share" className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg text-xs transition">
                        {v.isShared ? "🔗" : "📤"}
                      </button>
                      <button onClick={() => deleteVideo(v.id)} title="Delete" className="bg-red-500/40 hover:bg-red-500/60 text-white p-2 rounded-lg text-xs transition">🗑</button>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="font-semibold text-white text-sm truncate">{v.title}</div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <span>{v.createdAt}</span>
                      <span className="bg-purple-600/20 text-purple-300 px-1.5 py-0.5 rounded">{v.duration}s</span>
                      {v.isShared && <span className="text-pink-400">♥ {v.likes}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Playlist sidebar */}
        <div className="w-56 shrink-0 hidden lg:block">
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white text-sm">Playlists</h3>
              <button onClick={() => setShowNewPlaylist(!showNewPlaylist)} className="text-purple-400 hover:text-purple-300 text-lg leading-none">+</button>
            </div>
            {showNewPlaylist && (
              <div className="mb-3">
                <input value={newPlaylistName} onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="Playlist name"
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-2 py-1.5 w-full text-xs mb-2 focus:outline-none"
                />
                <button onClick={() => { addPlaylist(newPlaylistName); setNewPlaylistName(""); setShowNewPlaylist(false); }}
                  className="w-full bg-purple-600 text-white py-1.5 rounded-lg text-xs font-medium">Create</button>
              </div>
            )}
            <div className="space-y-1">
              {playlists.map((pl) => (
                <div key={pl.id} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/5 text-sm text-gray-300">
                  <span className="truncate">{pl.name}</span>
                  <span className="text-xs text-gray-500 ml-2">{pl.videoIds.length}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
