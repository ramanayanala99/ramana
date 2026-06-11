"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Sparkles, Play, Download, Save, Share2, RefreshCw } from "lucide-react";

const HAIR_COLORS = [
  { name: "Black", hex: "#1C1C1C" },
  { name: "Brown", hex: "#7B3F00" },
  { name: "Blonde", hex: "#F5DEB3" },
  { name: "Red", hex: "#C0392B" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Blue", hex: "#4169E1" },
  { name: "Purple", hex: "#9B59B6" },
  { name: "Pink", hex: "#FFB6C1" },
  { name: "Auburn", hex: "#A52A2A" },
  { name: "Silver", hex: "#C0C0C0" },
];

const BODY_TYPES = ["Slim", "Athletic", "Curvy", "Muscular", "Petite", "Plus Size"];
const ATTIRE_PRESETS = ["Casual", "Formal", "Swimwear", "Lingerie", "Athletic", "Fantasy"];
const GENDERS = ["Female", "Male", "Non-binary"];
const STYLES = ["Realistic", "Artistic", "Cinematic"];
const PRO_STYLES = ["Realistic", "Artistic", "Cinematic", "Anime", "Oil Painting"];
const CAMERAS = ["Front", "Side", "POV", "Aerial"];
const POSE_PRESETS = ["Natural", "Romantic", "Playful", "Intimate", "Dynamic", "Elegant"];

interface CharConfig {
  name: string;
  hairColor: string;
  bodyType: string;
  attire: string;
  gender: string;
}

const defaultChar = (): CharConfig => ({
  name: "",
  hairColor: "#1C1C1C",
  bodyType: "Slim",
  attire: "Casual",
  gender: "Female",
});

interface VideoResult {
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

export default function CreatePage() {
  const { user, isGenerating, generateVideo, addCharacter } = useAppStore();
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(15);
  const [style, setStyle] = useState("Realistic");
  const [camera, setCamera] = useState("Front");
  const [pose, setPose] = useState("Natural");
  const [narrativeArc, setNarrativeArc] = useState(false);
  const [activeChar, setActiveChar] = useState<0 | 1>(0);
  const [charA, setCharA] = useState<CharConfig>(defaultChar());
  const [charB, setCharB] = useState<CharConfig>({ ...defaultChar(), gender: "Male" });
  const [progress, setProgress] = useState(0);
  const [lastVideo, setLastVideo] = useState<VideoResult | null>(null);

  const isPro = user?.plan === "pro" || user?.plan === "admin";

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isGenerating) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((p) => Math.min(p + 3, 95));
      }, 90);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const currentChar = activeChar === 0 ? charA : charB;

  function updateChar(field: keyof CharConfig, value: string) {
    if (activeChar === 0) {
      setCharA((c) => ({ ...c, [field]: value }));
    } else {
      setCharB((c) => ({ ...c, [field]: value }));
    }
  }

  async function handleGenerate() {
    if (!prompt.trim()) return;
    const video = await generateVideo(prompt, {
      duration,
      style,
      camera,
      pose,
      narrativeArc,
      characters: [charA.name || "Character A", charB.name || "Character B"],
    });
    setLastVideo(video);
    setProgress(100);
  }

  function handleSaveCharacter() {
    const char = activeChar === 0 ? charA : charB;
    addCharacter({
      name: char.name || `Character ${activeChar + 1}`,
      hairColor: char.hairColor,
      bodyType: char.bodyType,
      attire: char.attire,
      gender: char.gender,
    });
    alert("Character saved!");
  }

  const durationOptions = isPro ? [5, 10, 15, 30, 60] : [5, 10, 15];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Create Video</h1>
        <p className="text-gray-400 text-sm mt-1">Design your scene and generate a synthetic AI video</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="space-y-5">
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">Scene Description</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your scene in detail..."
              rows={4}
              className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:border-purple-400 placeholder-gray-600 text-sm resize-none"
            />
          </div>

          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white">Video Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none"
                >
                  {durationOptions.map((d) => (
                    <option key={d} value={d}>{d} seconds</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none"
                >
                  {(isPro ? PRO_STYLES : STYLES).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Camera Angle</label>
                <select
                  value={camera}
                  onChange={(e) => setCamera(e.target.value)}
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none"
                >
                  {CAMERAS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {isPro && (
              <div className="border-t border-purple-500/20 pt-4 space-y-3">
                <div className="text-xs text-purple-400 font-medium">Pro Advanced Controls</div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Pose Preset</label>
                  <select
                    value={pose}
                    onChange={(e) => setPose(e.target.value)}
                    className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none"
                  >
                    {POSE_PRESETS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={narrativeArc}
                    onChange={(e) => setNarrativeArc(e.target.checked)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-sm text-gray-300">Enable Narrative Arc</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-5">
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-5">
            <div className="flex gap-2 mb-4">
              {["Character A", "Character B"].map((label, idx) => (
                <button
                  key={label}
                  onClick={() => setActiveChar(idx as 0 | 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeChar === idx
                      ? "bg-purple-600 text-white"
                      : "bg-purple-500/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Name</label>
                <input
                  value={currentChar.name}
                  onChange={(e) => updateChar("name", e.target.value)}
                  placeholder="Character name"
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-400 placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2">Gender</label>
                <div className="flex gap-2 flex-wrap">
                  {GENDERS.map((g) => (
                    <button
                      key={g}
                      onClick={() => updateChar("gender", g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        currentChar.gender === g
                          ? "bg-purple-600 text-white"
                          : "bg-purple-500/10 text-gray-400 hover:text-white border border-purple-500/20"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2">Hair Color</label>
                <div className="flex gap-2 flex-wrap">
                  {HAIR_COLORS.map((h) => (
                    <button
                      key={h.hex}
                      onClick={() => updateChar("hairColor", h.hex)}
                      title={h.name}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        currentChar.hairColor === h.hex
                          ? "border-white scale-110"
                          : "border-transparent hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: h.hex }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2">Body Type</label>
                <div className="flex gap-2 flex-wrap">
                  {BODY_TYPES.map((b) => (
                    <button
                      key={b}
                      onClick={() => updateChar("bodyType", b)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        currentChar.bodyType === b
                          ? "bg-purple-600 text-white"
                          : "bg-purple-500/10 text-gray-400 hover:text-white border border-purple-500/20"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2">Attire</label>
                <div className="flex gap-2 flex-wrap">
                  {ATTIRE_PRESETS.map((a) => (
                    <button
                      key={a}
                      onClick={() => updateChar("attire", a)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        currentChar.attire === a
                          ? "bg-pink-600 text-white"
                          : "bg-pink-500/10 text-gray-400 hover:text-white border border-pink-500/20"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSaveCharacter}
                className="w-full border border-purple-500/40 hover:bg-purple-500/10 text-purple-300 px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save as Character
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="mt-6">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center gap-3"
        >
          <Sparkles className="w-5 h-5" />
          {isGenerating ? "Generating..." : "Generate Video"}
        </button>

        {isGenerating && (
          <div className="mt-3">
            <div className="h-2 bg-purple-900/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-200 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">Rendering your scene... {progress}%</p>
          </div>
        )}
      </div>

      {/* Output */}
      {lastVideo && !isGenerating && (
        <div className="mt-6 rounded-xl border border-purple-500/20 bg-[#1A1030] p-5">
          <h3 className="text-lg font-semibold mb-4">Generated Video</h3>
          <div className={`w-full max-w-lg h-64 bg-gradient-to-br ${lastVideo.thumbnailColor} rounded-xl flex items-center justify-center relative mb-4`}>
            <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {lastVideo.duration}s · {lastVideo.style}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-medium text-white">{lastVideo.title}</div>
            <div className="text-sm text-gray-400 mt-1">{lastVideo.prompt}</div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              <Save className="w-4 h-4" />Save
            </button>
            <button className="flex items-center gap-2 border border-purple-500/30 hover:bg-purple-500/10 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
              <Download className="w-4 h-4" />Download
            </button>
            {isPro && (
              <button className="flex items-center gap-2 border border-purple-500/30 hover:bg-purple-500/10 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
                <Share2 className="w-4 h-4" />Share to Community
              </button>
            )}
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 border border-purple-500/30 hover:bg-purple-500/10 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
