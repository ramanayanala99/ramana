"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Plus, List, Play } from "lucide-react";

export default function PlaylistsPage() {
  const { playlists, videos, addPlaylist, addToPlaylist } = useAppStore();
  const [newName, setNewName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [addVideoId, setAddVideoId] = useState("");

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    addPlaylist(newName.trim());
    setNewName("");
    setShowForm(false);
  }

  function handleAddVideo(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPlaylist || !addVideoId) return;
    addToPlaylist(selectedPlaylist, addVideoId);
    setAddVideoId("");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Playlists</h1>
          <p className="text-gray-400 text-sm mt-1">{playlists.length} playlists</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium text-sm transition-colors">
          <Plus className="w-4 h-4" /> New Playlist
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="glass-card p-5 flex gap-3">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Playlist name" required
            className="flex-1 px-4 py-2 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm" />
          <button type="submit" className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium">Create</button>
          <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 bg-[#1A1030] border border-purple-900/40 rounded-lg text-gray-400 text-sm hover:text-white">Cancel</button>
        </form>
      )}

      {playlists.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <List className="w-12 h-12 text-purple-800 mx-auto mb-3" />
          <p className="text-gray-400">No playlists yet. Create one to organize your videos!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {playlists.map((playlist) => {
            const playlistVideos = playlist.videoIds
              .map((id) => videos.find((v) => v.id === id))
              .filter(Boolean) as typeof videos;

            return (
              <div key={playlist.id} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <List className="w-5 h-5 text-purple-400" />
                    <div>
                      <h3 className="font-bold text-white">{playlist.name}</h3>
                      <p className="text-xs text-gray-500">{playlistVideos.length} videos</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPlaylist(selectedPlaylist === playlist.id ? null : playlist.id)}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {selectedPlaylist === playlist.id ? "Done" : "+ Add video"}
                  </button>
                </div>

                {selectedPlaylist === playlist.id && (
                  <form onSubmit={handleAddVideo} className="flex gap-2 mb-4">
                    <select value={addVideoId} onChange={(e) => setAddVideoId(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white text-sm focus:outline-none focus:border-purple-500">
                      <option value="">Select a video</option>
                      {videos.filter((v) => !playlist.videoIds.includes(v.id)).map((v) => (
                        <option key={v.id} value={v.id}>{v.title}</option>
                      ))}
                    </select>
                    <button type="submit" disabled={!addVideoId}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg text-white text-sm font-medium">
                      Add
                    </button>
                  </form>
                )}

                {playlistVideos.length === 0 ? (
                  <p className="text-gray-500 text-sm">No videos in this playlist yet.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {playlistVideos.map((video) => (
                      <div key={video.id} className="rounded-lg overflow-hidden bg-[#1A1030] border border-purple-900/30">
                        <div className={`h-20 bg-gradient-to-br ${video.thumbnailColor} flex items-center justify-center`}>
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <div className="p-2">
                          <p className="text-xs text-white truncate">{video.title}</p>
                          <p className="text-xs text-gray-500">{video.duration}s</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
