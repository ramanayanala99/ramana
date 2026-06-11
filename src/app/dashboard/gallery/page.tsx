"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Play, Trash2, Share2, Search, SlidersHorizontal, ListVideo, Plus } from "lucide-react";

export default function GalleryPage() {
  const { videos, deleteVideo, toggleShare, playlists, addPlaylist, addToPlaylist } = useAppStore();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest" | "likes">("newest");
  const [styleFilter, setStyleFilter] = useState("All");
  const [showPlaylistSidebar, setShowPlaylistSidebar] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [addingVideoId, setAddingVideoId] = useState<string | null>(null);

  const filtered = videos
    .filter((v) => {
      const matchSearch =
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.prompt.toLowerCase().includes(search.toLowerCase());
      const matchStyle = styleFilter === "All" || v.style === styleFilter;
      return matchSearch && matchStyle;
    })
    .sort((a, b) => {
      if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return b.likes - a.likes;
    });

  const styles = ["All", ...Array.from(new Set(videos.map((v) => v.style)))];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">My Gallery</h1>
          <p className="text-gray-400 text-sm mt-1">{videos.length} videos</p>
        </div>
        <button
          onClick={() => setShowPlaylistSidebar(!showPlaylistSidebar)}
          className="flex items-center gap-2 border border-purple-500/30 hover:bg-purple-500/10 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <ListVideo className="w-4 h-4" />
          Playlists
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos..."
            className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg pl-9 pr-3 py-2 w-full text-sm focus:outline-none focus:border-purple-400 placeholder-gray-600"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="likes">Most Liked</option>
        </select>
        <select
          value={styleFilter}
          onChange={(e) => setStyleFilter(e.target.value)}
          className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
        >
          {styles.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-purple-500/30 bg-[#1A1030] p-16 text-center">
              <SlidersHorizontal className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No videos found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((v) => (
                <div key={v.id} className="rounded-xl overflow-hidden border border-purple-500/20 bg-[#1A1030] group">
                  <div className={`h-40 bg-gradient-to-br ${v.thumbnailColor} flex items-center justify-center relative`}>
                    <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                      {v.duration}s
                    </div>
                    {v.isShared && (
                      <div className="absolute top-2 left-2 bg-purple-600/80 text-white text-xs px-1.5 py-0.5 rounded">
                        Shared
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleShare(v.id)}
                        className="w-7 h-7 bg-black/60 hover:bg-purple-600 rounded flex items-center justify-center transition-colors"
                        title="Toggle share"
                      >
                        <Share2 className="w-3 h-3 text-white" />
                      </button>
                      <button
                        onClick={() => { setAddingVideoId(v.id); setShowPlaylistSidebar(true); }}
                        className="w-7 h-7 bg-black/60 hover:bg-blue-600 rounded flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </button>
                      <button
                        onClick={() => deleteVideo(v.id)}
                        className="w-7 h-7 bg-black/60 hover:bg-red-600 rounded flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-medium text-white truncate">{v.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5 flex items-center justify-between">
                      <span>{v.style} · {v.createdAt}</span>
                      {v.isShared && <span className="text-pink-400">{v.likes} likes</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showPlaylistSidebar && (
          <div className="w-64 flex-shrink-0">
            <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <ListVideo className="w-4 h-4 text-purple-400" />
                Playlists
              </h3>
              {addingVideoId && (
                <div className="mb-3 bg-purple-900/20 border border-purple-500/20 rounded-lg p-2 text-xs text-purple-300">
                  Click a playlist to add the selected video
                </div>
              )}
              <div className="space-y-2 mb-3">
                {playlists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => {
                      if (addingVideoId) {
                        addToPlaylist(pl.id, addingVideoId);
                        setAddingVideoId(null);
                      }
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#0D0920] hover:bg-purple-500/10 transition-colors text-left"
                  >
                    <span className="text-sm text-white truncate">{pl.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{pl.videoIds.length}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="New playlist..."
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-2 py-1.5 flex-1 text-xs focus:outline-none focus:border-purple-400 placeholder-gray-600"
                />
                <button
                  onClick={() => {
                    if (newPlaylistName.trim()) {
                      addPlaylist(newPlaylistName.trim());
                      setNewPlaylistName("");
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1.5 rounded-lg text-xs transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
