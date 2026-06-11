import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  plan: "starter" | "pro" | "admin";
  trialEndsAt: string;
  avatarUrl?: string;
  isAdmin: boolean;
}

interface Character {
  id: string;
  name: string;
  hairColor: string;
  bodyType: string;
  attire: string;
  gender: string;
  createdAt: string;
}

interface GeneratedVideo {
  id: string;
  prompt: string;
  duration: number;
  style: string;
  thumbnailColor: string;
  characters: string[];
  createdAt: string;
  isShared: boolean;
  likes: number;
  title: string;
}

interface Playlist {
  id: string;
  name: string;
  videoIds: string[];
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  characters: Character[];
  videos: GeneratedVideo[];
  playlists: Playlist[];
  isGenerating: boolean;
  ageVerified: boolean;

  login: (email: string, password: string) => boolean;
  logout: () => void;
  verifyAge: () => void;
  addCharacter: (c: Omit<Character, "id" | "createdAt">) => void;
  deleteCharacter: (id: string) => void;
  generateVideo: (prompt: string, settings: Record<string, unknown>) => Promise<GeneratedVideo>;
  deleteVideo: (id: string) => void;
  toggleShare: (id: string) => void;
  addPlaylist: (name: string) => void;
  addToPlaylist: (playlistId: string, videoId: string) => void;
}

const MOCK_USERS: User[] = [
  { id: "u1", name: "Alex Morgan", email: "demo@example.com", plan: "pro", trialEndsAt: "2026-06-25", isAdmin: false },
  { id: "u2", name: "Sam Lee", email: "starter@example.com", plan: "starter", trialEndsAt: "2026-06-25", isAdmin: false },
  { id: "u3", name: "Admin User", email: "admin@example.com", plan: "admin", trialEndsAt: "2099-01-01", isAdmin: true },
];

const PASSWORDS: Record<string, string> = {
  "demo@example.com": "demo",
  "starter@example.com": "starter",
  "admin@example.com": "admin",
};

const THUMBNAIL_COLORS = [
  "from-purple-600 to-pink-500",
  "from-blue-600 to-purple-500",
  "from-pink-500 to-red-500",
  "from-indigo-600 to-cyan-400",
];

const INITIAL_CHARACTERS: Character[] = [
  { id: "c1", name: "Aurora", hairColor: "#D4A017", bodyType: "Slim", attire: "Lingerie", gender: "Female", createdAt: "2026-06-01" },
  { id: "c2", name: "Blade", hairColor: "#1C1C1C", bodyType: "Muscular", attire: "Casual", gender: "Male", createdAt: "2026-06-02" },
  { id: "c3", name: "Celeste", hairColor: "#C0392B", bodyType: "Curvy", attire: "Elegant", gender: "Female", createdAt: "2026-06-03" },
];

const INITIAL_VIDEOS: GeneratedVideo[] = [
  { id: "v1", prompt: "Romantic sunset beach scene", duration: 30, style: "Cinematic", thumbnailColor: "from-purple-600 to-pink-500", characters: ["c1", "c2"], createdAt: "2026-06-05", isShared: true, likes: 142, title: "Sunset Romance" },
  { id: "v2", prompt: "Candlelit dinner for two", duration: 20, style: "Realistic", thumbnailColor: "from-blue-600 to-purple-500", characters: ["c2", "c3"], createdAt: "2026-06-06", isShared: false, likes: 0, title: "Candlelit Evening" },
  { id: "v3", prompt: "Morning coffee and kisses", duration: 15, style: "Artistic", thumbnailColor: "from-pink-500 to-red-500", characters: ["c1", "c3"], createdAt: "2026-06-07", isShared: true, likes: 87, title: "Morning Bliss" },
  { id: "v4", prompt: "Dancing in the rain", duration: 45, style: "Cinematic", thumbnailColor: "from-indigo-600 to-cyan-400", characters: ["c1", "c2"], createdAt: "2026-06-08", isShared: false, likes: 0, title: "Rain Dance" },
  { id: "v5", prompt: "Poolside relaxation", duration: 25, style: "Realistic", thumbnailColor: "from-purple-600 to-pink-500", characters: ["c2", "c3"], createdAt: "2026-06-09", isShared: true, likes: 203, title: "Poolside Dreams" },
];

const INITIAL_PLAYLISTS: Playlist[] = [
  { id: "pl1", name: "Favorites", videoIds: ["v1", "v3"] },
  { id: "pl2", name: "Watch Later", videoIds: ["v4", "v5"] },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      characters: INITIAL_CHARACTERS,
      videos: INITIAL_VIDEOS,
      playlists: INITIAL_PLAYLISTS,
      isGenerating: false,
      ageVerified: false,

      login: (email, password) => {
        const user = MOCK_USERS.find((u) => u.email === email);
        if (user && PASSWORDS[email] === password) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      verifyAge: () => set({ ageVerified: true }),

      addCharacter: (c) =>
        set((s) => ({
          characters: [
            ...s.characters,
            { ...c, id: `c${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] },
          ],
        })),

      deleteCharacter: (id) =>
        set((s) => ({ characters: s.characters.filter((c) => c.id !== id) })),

      generateVideo: (prompt, settings) => {
        return new Promise((resolve) => {
          set({ isGenerating: true });
          setTimeout(() => {
            const color = THUMBNAIL_COLORS[Math.floor(Math.random() * THUMBNAIL_COLORS.length)];
            const video: GeneratedVideo = {
              id: `v${Date.now()}`,
              prompt,
              duration: (settings.duration as number) || 15,
              style: (settings.style as string) || "Realistic",
              thumbnailColor: color,
              characters: (settings.characters as string[]) || [],
              createdAt: new Date().toISOString().split("T")[0],
              isShared: false,
              likes: 0,
              title: prompt.length > 40 ? prompt.slice(0, 37) + "..." : prompt,
            };
            set((s) => ({ videos: [video, ...s.videos], isGenerating: false }));
            resolve(video);
          }, 3000);
        });
      },

      deleteVideo: (id) =>
        set((s) => ({ videos: s.videos.filter((v) => v.id !== id) })),

      toggleShare: (id) =>
        set((s) => ({
          videos: s.videos.map((v) => (v.id === id ? { ...v, isShared: !v.isShared } : v)),
        })),

      addPlaylist: (name) =>
        set((s) => ({
          playlists: [...s.playlists, { id: `pl${Date.now()}`, name, videoIds: [] }],
        })),

      addToPlaylist: (playlistId, videoId) =>
        set((s) => ({
          playlists: s.playlists.map((p) =>
            p.id === playlistId && !p.videoIds.includes(videoId)
              ? { ...p, videoIds: [...p.videoIds, videoId] }
              : p
          ),
        })),
    }),
    { name: "adult-entertain-store" }
  )
);
