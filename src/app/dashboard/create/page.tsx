"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

const HAIR_COLORS = [
  { label: "Black", value: "#1C1C1C" },
  { label: "Brown", value: "#6B3A2A" },
  { label: "Blonde", value: "#D4A017" },
  { label: "Red", value: "#C0392B" },
  { label: "White", value: "#F0F0F0" },
  { label: "Blue", value: "#2980B9" },
  { label: "Purple", value: "#8E44AD" },
  { label: "Pink", value: "#FF69B4" },
  { label: "Auburn", value: "#A0522D" },
  { label: "Silver", value: "#C0C0C0" },
];

const BODY_TYPES = ["Slim", "Athletic", "Curvy", "Muscular"];
const ATTIRES = ["Casual", "Formal", "Swimwear", "Lingerie", "Athletic", "Fantasy"];
const GENDERS = ["Masculine", "Feminine", "Androgynous"];
const STYLES = ["Realistic", "Artistic", "Cinematic"];
const CAMERAS = ["Front", "Side", "POV", "Aerial"];
const POSE_PRESETS = [
  "Intimate embrace", "Dancing", "Sitting together", "Walking hand in hand",
  "Cuddling on sofa", "Beach stroll", "Candlelit dinner", "Morning in bed",
  "Yoga together", "Swimming", "Reading together", "Stargazing",
  "Cooking together", "Hot tub", "Massage", "Workout partner",
  "Playful chase", "Slow dance", "Sunset watch", "Coffee morning",
];

interface CharSettings {
  name: string;
  hairColor: string;
  bodyType: string;
  attire: string;
  gender: string;
}

const defaultChar = (): CharSettings => ({ name: "", hairColor: "#1C1C1C", bodyType: "Slim", attire: "Casual", gender: "Feminine" });

export default function CreatePage() {
  const { user, isGenerating, generateVideo, addCharacter } = useAppStore();
  const isPro = user?.plan === "pro" || user?.plan === "admin";
  const maxSlots = isPro ? 5 : 2;

  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(15);
  const [style, setStyle] = useState("Realistic");
  const [camera, setCamera] = useState("Front");
  const [posePreset, setPosePreset] = useState("");
  const [narrativeArc, setNarrativeArc] = useState(false);
  const [activeChar, setActiveChar] = useState(0);
  const [chars, setChars] = useState<[CharSettings, CharSettings]>([defaultChar(), defaultChar()]);
  const [generatedVideo, setGeneratedVideo] = useState<{ title: string; thumbnailColor: string; duration: number; style: string; prompt: string } | null>(null);

  const { characters } = useAppStore();
  const usedSlots = characters.length;

  function updateChar(idx: number, patch: Partial<CharSettings>) {
    setChars((prev) => {
      const next: [CharSettings, CharSettings] = [{ ...prev[0] }, { ...prev[1] }];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });
  }

  async function handleGenerate() {
    if (!prompt.trim()) return;
    const video = await generateVideo(prompt, {
      duration,
      style,
      camera,
      posePreset,
      characters: [],
    });
    setGeneratedVideo({ title: video.title, thumbnailColor: video.thumbnailColor, duration: video.duration, style: video.style, prompt: video.prompt });
  }

  function handleSaveChar(idx: number) {
    const c = chars[idx];
    if (!c.name.trim()) return;
    addCharacter({ name: c.name, hairColor: c.hairColor, bodyType: c.bodyType, attire: c.attire, gender: c.gender });
  }

  const durations = isPro ? [5, 10, 15, 30, 60] : [5, 10, 15];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Create</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Prompt & Settings */}
        <div className="space-y-5">
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Scene Description</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the scene, emotion, action, and setting..."
              className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:border-purple-500 placeholder-gray-600 resize-none"
            />
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 space-y-4">
            <h3 className="font-semibold text-white">Video Settings</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Duration</label>
                <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-2 py-1.5 w-full text-sm">
                  {durations.map((d) => <option key={d} value={d}>{d}s</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Style</label>
                <select value={style} onChange={(e) => setStyle(e.target.value)}
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-2 py-1.5 w-full text-sm">
                  {STYLES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Camera</label>
                <select value={camera} onChange={(e) => setCamera(e.target.value)}
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-2 py-1.5 w-full text-sm">
                  {CAMERAS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            {isPro && (
              <div className="border-t border-purple-500/20 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Advanced Controls</span>
                  <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">Pro</span>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Pose Preset</label>
                  <select value={posePreset} onChange={(e) => setPosePreset(e.target.value)}
                    className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-2 py-1.5 w-full text-sm">
                    <option value="">— Select pose —</option>
                    {POSE_PRESETS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setNarrativeArc(!narrativeArc)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${narrativeArc ? "bg-purple-600" : "bg-gray-700"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${narrativeArc ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                  <span className="text-sm text-gray-300">Narrative Arc</span>
                </div>
              </div>
            )}
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg transition"
          >
            {isGenerating ? "Generating..." : "Generate Scene"}
          </button>
          {isGenerating && (
            <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-4">
              <div className="text-sm text-gray-300 mb-2">Generating your scene...</div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse w-2/3" />
              </div>
            </div>
          )}
        </div>

        {/* Right: Character Customization */}
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Character Customization</h3>
            <span className="text-xs text-gray-400">{usedSlots}/{maxSlots} slots</span>
          </div>
          <div className="flex gap-2 border-b border-purple-500/20 pb-3">
            {["Character A", "Character B"].map((label, i) => (
              <button key={i} onClick={() => setActiveChar(i)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeChar === i ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                {label}
              </button>
            ))}
          </div>
          {[0, 1].map((idx) => activeChar === idx && (
            <div key={idx} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Name</label>
                <input value={chars[idx].name} onChange={(e) => updateChar(idx, { name: e.target.value })}
                  placeholder="Character name"
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-500 placeholder-gray-600" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Hair Color</label>
                <div className="flex flex-wrap gap-2">
                  {HAIR_COLORS.map((hc) => (
                    <button key={hc.value} title={hc.label} onClick={() => updateChar(idx, { hairColor: hc.value })}
                      className={`w-7 h-7 rounded-full border-2 transition ${chars[idx].hairColor === hc.value ? "border-purple-400 scale-110" : "border-transparent hover:border-gray-500"}`}
                      style={{ backgroundColor: hc.value }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Body Type</label>
                <div className="flex flex-wrap gap-2">
                  {BODY_TYPES.map((b) => (
                    <button key={b} onClick={() => updateChar(idx, { bodyType: b })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${chars[idx].bodyType === b ? "bg-purple-600 text-white" : "bg-[#0D0920] border border-purple-500/30 text-gray-300 hover:border-purple-400"}`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Attire</label>
                <div className="grid grid-cols-3 gap-2">
                  {ATTIRES.map((a) => (
                    <button key={a} onClick={() => updateChar(idx, { attire: a })}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition ${chars[idx].attire === a ? "bg-purple-600 text-white" : "bg-[#0D0920] border border-purple-500/30 text-gray-300 hover:border-purple-400"}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Gender / Presentation</label>
                <div className="flex gap-2">
                  {GENDERS.map((g) => (
                    <button key={g} onClick={() => updateChar(idx, { gender: g })}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition ${chars[idx].gender === g ? "bg-purple-600 text-white" : "bg-[#0D0920] border border-purple-500/30 text-gray-300 hover:border-purple-400"}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => handleSaveChar(idx)} disabled={usedSlots >= maxSlots}
                className="w-full bg-[#0D0920] border border-purple-500/30 hover:border-purple-400 text-purple-300 py-2 rounded-lg text-sm font-medium transition disabled:opacity-40">
                Save as Character ({usedSlots}/{maxSlots})
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Output section */}
      {generatedVideo && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 space-y-4">
          <h3 className="font-semibold text-white">Generated Output</h3>
          <div className={`h-72 rounded-xl bg-gradient-to-br ${generatedVideo.thumbnailColor} flex items-center justify-center relative`}>
            <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/60 transition">
              <span className="text-white text-2xl ml-1">▶</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-white">{generatedVideo.title}</span>
            <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">{generatedVideo.duration}s</span>
            <span className="text-xs bg-[#0D0920] text-gray-300 px-2 py-1 rounded border border-purple-500/20">{generatedVideo.style}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition">Save to Gallery</button>
            <button className="bg-[#0D0920] border border-purple-500/30 hover:border-purple-400 text-gray-300 px-4 py-2 rounded-lg text-sm transition">Download</button>
            {isPro && <button className="bg-[#0D0920] border border-purple-500/30 hover:border-purple-400 text-gray-300 px-4 py-2 rounded-lg text-sm transition">Share to Community</button>}
            <button onClick={handleGenerate} className="bg-[#0D0920] border border-purple-500/30 hover:border-purple-400 text-gray-300 px-4 py-2 rounded-lg text-sm transition">Regenerate</button>
          </div>
          <p className="text-xs text-gray-500 italic">&ldquo;{generatedVideo.prompt}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
