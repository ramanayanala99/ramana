"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { SUBJECTS, INDIAN_BOARDS, CLASSES, QUESTION_TYPES, DIFFICULTY_LEVELS, Question } from "@/lib/data";
import { Plus, Search, Edit, Trash2, Filter, Database } from "lucide-react";

export default function QuestionsPage() {
  const { questions, addQuestion, updateQuestion } = useAppStore();
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterDiff, setFilterDiff] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQ, setNewQ] = useState<Partial<Question>>({
    text: "", type: "MCQ", difficulty: "Easy", marks: 1,
    topic: "", subject: "Mathematics", board: "CBSE", class: "10",
  });

  const filtered = questions.filter((q) => {
    const qLow = search.toLowerCase();
    return (filterSubject === "All" || q.subject === filterSubject) &&
      (filterType === "All" || q.type === filterType) &&
      (filterDiff === "All" || q.difficulty === filterDiff) &&
      (q.text.toLowerCase().includes(qLow) || q.topic.toLowerCase().includes(qLow));
  });

  const handleAdd = () => {
    if (!newQ.text) return;
    addQuestion({ ...newQ, id: "q_" + Date.now() } as Question);
    setNewQ({ text: "", type: "MCQ", difficulty: "Easy", marks: 1, topic: "", subject: "Mathematics", board: "CBSE", class: "10" });
    setShowAdd(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
          <p className="text-gray-500 mt-1">{questions.length} questions across all subjects</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl transition">
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
        </div>
        {[
          { label: "Subject", val: filterSubject, set: setFilterSubject, options: ["All", ...SUBJECTS] },
          { label: "Type", val: filterType, set: setFilterType, options: ["All", ...QUESTION_TYPES] },
          { label: "Difficulty", val: filterDiff, set: setFilterDiff, options: ["All", ...DIFFICULTY_LEVELS] },
        ].map(({ label, val, set, options }) => (
          <select key={label} value={val} onChange={(e) => set(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ))}
        <div className="text-sm text-gray-500 flex items-center">{filtered.length} results</div>
      </div>

      {/* Add Question Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="font-bold text-lg mb-4">Add New Question</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Text *</label>
                <textarea value={newQ.text} onChange={(e) => setNewQ({ ...newQ, text: e.target.value })} rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="Enter the question..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Subject", key: "subject", opts: SUBJECTS },
                  { label: "Board", key: "board", opts: INDIAN_BOARDS },
                  { label: "Class", key: "class", opts: CLASSES },
                  { label: "Question Type", key: "type", opts: QUESTION_TYPES },
                  { label: "Difficulty", key: "difficulty", opts: DIFFICULTY_LEVELS },
                ].map(({ label, key, opts }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                    <select value={newQ[key as keyof typeof newQ] as string}
                      onChange={(e) => setNewQ({ ...newQ, [key]: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      {opts.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Marks</label>
                  <input type="number" min="1" max="20" value={newQ.marks}
                    onChange={(e) => setNewQ({ ...newQ, marks: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <input type="text" value={newQ.topic} onChange={(e) => setNewQ({ ...newQ, topic: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="e.g. Real Numbers" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleAdd} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition">
                Add Question
              </button>
              <button onClick={() => setShowAdd(false)} className="px-6 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Database className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p className="text-gray-400">No questions found. Adjust filters or add new questions.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((q) => (
              <div key={q.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium">{q.text}</p>
                    {q.options && (
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {q.options.map((opt, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{String.fromCharCode(65+i)}. {opt}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded">{q.subject}</span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{q.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${q.difficulty === "Easy" ? "bg-green-100 text-green-600" : q.difficulty === "Medium" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>{q.difficulty}</span>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{q.marks}M</span>
                      <span className="text-xs text-gray-400">{q.board} · Class {q.class} · {q.topic}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-indigo-100 flex items-center justify-center">
                      <Edit className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-red-100 flex items-center justify-center">
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
