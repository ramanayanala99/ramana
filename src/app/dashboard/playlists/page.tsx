"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { ListVideo, Plus, Play, Trash2 } from "lucide-react";

export default function PlaylistsPage() {
  const { playlists, videos, addPlaylist, deleteVideo } = useAppStore();
  const [newName, setNewName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(
    playlists.length > 0 ? playlists[0].id : null
  );

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    addPlaylist(newName.trim());
    setNewName("");
  }

  const currentPlaylist = playlists.find((p) => p.id === selectedPlaylist);
  const playlistVideos = currentPlaylist
    ? videos.filter((v) => currentPlaylist.videoIds.includes(v.id))
    : [];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Playlists</h1>
        <p className="text-gray-400 text-sm mt-1">Organize your videos into collections</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0 space-y-3">
          <form onSubmit={handleCreate} className="flex gap-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New playlist..."
              className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-1.5 flex-1 text-sm focus:outline-none focus:border-purple-400 placeholder-gray-600"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-1.5 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-1">
            {playlists.length === 0 ? (
              <p className="text-gray-500 text-xs px-2">No playlists yet</p>
            ) : (
              playlists.map((pl) => (
                <button
                  key={pl.id}
                  onClick={() => setSelectedPlaylist(pl.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                    selectedPlaylist === pl.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-purple-500/10"
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <ListVideo className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{pl.name}</span>
                  </span>
                  <span className="text-xs ml-1 flex-shrink-0">{pl.videoIds.length}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Playlist Content */}
        <div className="flex-1">
          {!currentPlaylist ? (
            <div className="rounded-xl border border-dashed border-purple-500/30 bg-[#1A1030] p-16 text-center">
              <ListVideo className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Select or create a playlist</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">{currentPlaylist.name}</h2>
                <span className="text-sm text-gray-400">{playlistVideos.length} videos</span>
              </div>

              {playlistVideos.length === 0 ? (
                <div className="rounded-xl border border-dashed border-purple-500/30 bg-[#1A1030] p-12 text-center">
                  <p className="text-gray-400 text-sm">No videos in this playlist.</p>
                  <p className="text-gray-500 text-xs mt-1">Add videos from your gallery.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {playlistVideos.map((v, idx) => (
                    <div key={v.id} className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-4 flex items-center gap-4 group">
                      <div className="text-gray-600 text-sm w-5 text-center">{idx + 1}</div>
                      <div className={`w-16 h-10 bg-gradient-to-br ${v.thumbnailColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Play className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{v.title}</div>
                        <div className="text-xs text-gray-500">{v.style} · {v.duration}s · {v.createdAt}</div>
                      </div>
                      <button
                        onClick={() => deleteVideo(v.id)}
                        className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
