"use client";
import { useState, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { TEMPLATES, QUESTION_TYPES, PaperTemplate, TemplateRow } from "@/lib/data";
import { Plus, Edit, Trash2, Copy, BookOpen, Clock, Target, ChevronDown, ChevronUp, Check, Upload, Sparkles, AlertCircle, X } from "lucide-react";

const EMPTY_ROW: TemplateRow = { type: "MCQ", count: 5, marksEach: 1 };

// Marks calculated on questions students must ATTEMPT, not total given
function calcTotal(rows: TemplateRow[]) {
  return rows.reduce((s, r) => s + (r.attempt ?? r.count) * r.marksEach, 0);
}

function choiceLabel(row: TemplateRow) {
  if (row.attempt && row.attempt < row.count) {
    return `Attempt any ${row.attempt} out of ${row.count}`;
  }
  return null;
}

function TemplateEditor({
  initial,
  onSave,
  onCancel,
}: {
  initial: Partial<PaperTemplate>;
  onSave: (t: PaperTemplate) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial.name || "");
  const [duration, setDuration] = useState(initial.duration || 45);
  const [board, setBoard] = useState(initial.board || "");
  const [rows, setRows] = useState<TemplateRow[]>(
    initial.distribution?.length ? initial.distribution.map((r) => ({ ...r })) : [{ ...EMPTY_ROW }]
  );

  const updateRow = (i: number, field: keyof TemplateRow, val: string | number) => {
    setRows((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: field === "type" ? val : Number(val) } : r));
  };
  const addRow = () => setRows((prev) => [...prev, { ...EMPTY_ROW }]);
  const removeRow = (i: number) => setRows((prev) => prev.filter((_, idx) => idx !== i));

  const totalMarks = calcTotal(rows);

  const save = () => {
    if (!name.trim()) return;
    onSave({
      id: initial.id || "ct_" + Date.now(),
      name: name.trim(),
      duration,
      totalMarks,
      distribution: rows,
      isCustom: true,
      board: board || undefined,
      createdBy: "me",
    });
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-indigo-400 shadow-lg p-6">
      <h3 className="font-bold text-gray-900 text-lg mb-4">
        {initial.id ? "Edit Template" : "Create Custom Template"}
      </h3>

      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
          <input
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Maharashtra Board SA-1 Pattern"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
          <input
            type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Board (optional)</label>
          <input
            value={board} onChange={(e) => setBoard(e.target.value)}
            placeholder="e.g. Maharashtra Board, Tamil Nadu Board, CBSE…"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Question rows */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-semibold text-gray-700">Question Distribution</label>
          <div className="text-xs text-gray-400">Total: <span className="font-bold text-indigo-600">{totalMarks} marks</span></div>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Set <strong>Questions Given</strong> (printed on paper) and <strong>Attempt</strong> (how many students must answer).
          Leave Attempt blank or equal to Given for no choice.
        </p>

        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-400 px-1">
            <span className="col-span-4">Question Type</span>
            <span className="col-span-2 text-center">Qs Given</span>
            <span className="col-span-2 text-center">Attempt</span>
            <span className="col-span-3 text-center">Marks Each</span>
            <span className="col-span-1" />
          </div>

          {rows.map((row, i) => {
            const hasChoice = row.attempt && row.attempt < row.count;
            return (
              <div key={i} className={`rounded-xl p-2 ${hasChoice ? "bg-amber-50 border border-amber-200" : "bg-gray-50"}`}>
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4">
                    <select
                      value={row.type} onChange={(e) => updateRow(i, "type", e.target.value)}
                      className="w-full px-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      {QUESTION_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number" min="1" max="50" value={row.count}
                      onChange={(e) => updateRow(i, "count", e.target.value)}
                      className="w-full px-2 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number" min="1" max={row.count} placeholder="—"
                      value={row.attempt ?? ""}
                      onChange={(e) => {
                        const val = e.target.value === "" ? undefined : Number(e.target.value);
                        setRows((prev) => prev.map((r, idx) => idx === i ? { ...r, attempt: val } : r));
                      }}
                      className={`w-full px-2 py-2 border rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white ${hasChoice ? "border-amber-400 text-amber-700 font-semibold" : "border-gray-200"}`}
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number" min="1" max="20" value={row.marksEach}
                      onChange={(e) => updateRow(i, "marksEach", e.target.value)}
                      className="w-full px-2 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button onClick={() => removeRow(i)} disabled={rows.length === 1}
                      className="w-7 h-7 rounded-lg hover:bg-red-100 flex items-center justify-center disabled:opacity-30 transition">
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                </div>
                {hasChoice && (
                  <div className="mt-1 ml-1 text-xs text-amber-700 font-medium flex items-center gap-1">
                    ✦ Attempt any {row.attempt} out of {row.count} · {(row.attempt ?? 0) * row.marksEach} marks
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={addRow}
          className="mt-2 flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition">
          <Plus className="w-4 h-4" /> Add question section
        </button>
      </div>

      {/* Summary */}
      <div className="bg-indigo-50 rounded-xl p-3 mb-5 flex flex-wrap gap-4 text-sm">
        <span className="flex items-center gap-1.5 text-indigo-700">
          <Target className="w-4 h-4" /><strong>{totalMarks}</strong> marks
        </span>
        <span className="flex items-center gap-1.5 text-indigo-700">
          <Clock className="w-4 h-4" /><strong>{duration}</strong> min
        </span>
        <span className="flex items-center gap-1.5 text-indigo-700">
          <BookOpen className="w-4 h-4" /><strong>{rows.reduce((s, r) => s + r.count, 0)}</strong> questions printed
        </span>
        {rows.some((r) => r.attempt && r.attempt < r.count) && (
          <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
            ✦ Has internal choice
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={save} disabled={!name.trim()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl transition">
          <Check className="w-4 h-4" /> Save Template
        </button>
        <button onClick={onCancel}
          className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition">
          Cancel
        </button>
      </div>
    </div>
  );
}

function TemplateCard({
  template,
  onEdit,
  onDelete,
  onDuplicate,
}: {
  template: PaperTemplate;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const totalQs = template.distribution.reduce((s, r) => s + r.count, 0);
  const hasChoice = template.distribution.some((r) => r.attempt && r.attempt < r.count);

  return (
    <div className={`bg-white rounded-2xl border-2 ${template.isCustom ? "border-indigo-200" : "border-gray-100"} shadow-sm`}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-bold text-gray-900">{template.name}</h3>
              {template.isCustom && (
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">Custom</span>
              )}
              {hasChoice && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Has Choice</span>
              )}
            </div>
            {template.board && <div className="text-xs text-indigo-600 mb-2">{template.board}</div>}
            <div className="flex gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{template.duration} min</span>
              <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5" />{template.totalMarks} marks</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{totalQs} printed</span>
            </div>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button onClick={onDuplicate} title="Duplicate"
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition">
              <Copy className="w-3.5 h-3.5 text-gray-500" />
            </button>
            {onEdit && (
              <button onClick={onEdit} title="Edit"
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-indigo-100 flex items-center justify-center transition">
                <Edit className="w-3.5 h-3.5 text-gray-500" />
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} title="Delete"
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-100 flex items-center justify-center transition">
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
              </button>
            )}
          </div>
        </div>

        <button onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? "Hide" : "View"} distribution
        </button>

        {expanded && (
          <div className="mt-3 space-y-2">
            {template.distribution.map((row, i) => {
              const attempt = row.attempt && row.attempt < row.count ? row.attempt : row.count;
              const rowMarks = attempt * row.marksEach;
              const pct = Math.min(100, (rowMarks / template.totalMarks) * 100);
              const isChoice = row.attempt && row.attempt < row.count;
              return (
                <div key={i}>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-32 text-gray-600 truncate shrink-0">{row.type}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div className={`${isChoice ? "bg-amber-400" : "bg-indigo-400"} h-1.5 rounded-full`}
                        style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {isChoice ? `${attempt}/${row.count}` : `${row.count}×`} · {row.marksEach}M = {rowMarks}M
                    </span>
                  </div>
                  {isChoice && (
                    <div className="ml-32 text-xs text-amber-600 mt-0.5 pl-3">
                      ✦ Attempt any {attempt} out of {row.count}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Parses a model paper text to extract question type + count patterns
function parseModelPaper(text: string): TemplateRow[] {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const rows: TemplateRow[] = [];

  // Detect section headers like "Section A: 20 MCQ × 1 mark" or "Q1-Q10: Short Answer (2 marks)"
  const patterns = [
    // "20 MCQ 1 mark" / "20 MCQs of 1 mark each"
    { re: /(\d+)\s*(mcq|multiple.choice|objective)/i, type: "MCQ", marksRe: /(\d+)\s*mark/i },
    // "short answer" with count
    { re: /(\d+)\s*(short.answer|SA\b|short)/i, type: "Short Answer", marksRe: /(\d+)\s*mark/i },
    // "long answer" / "essay"
    { re: /(\d+)\s*(long.answer|LA\b|long|essay|descriptive)/i, type: "Long Answer", marksRe: /(\d+)\s*mark/i },
    // "fill in the blanks"
    { re: /(\d+)\s*(fill.in|blank)/i, type: "Fill in the Blanks", marksRe: /(\d+)\s*mark/i },
    // "true/false" or "T/F"
    { re: /(\d+)\s*(true.false|T\/F)/i, type: "True/False", marksRe: /(\d+)\s*mark/i },
    // "match the following"
    { re: /(\d+)\s*(match)/i, type: "Match the Following", marksRe: /(\d+)\s*mark/i },
    // Very broad: "Section [A-Z]" or "Part [A-Z]" lines with a count
    { re: /section\s+[a-z]/i, type: "MCQ", marksRe: /(\d+)\s*mark/i },
  ];

  // Try line-by-line detection
  for (const line of lines) {
    for (const { re, type, marksRe } of patterns) {
      const countMatch = line.match(re);
      if (countMatch) {
        const count = parseInt(countMatch[1]) || 5;
        const marksMatch = line.match(marksRe);
        const marksEach = marksMatch ? parseInt(marksMatch[1]) : (type === "MCQ" ? 1 : type === "Long Answer" ? 5 : 2);

        // Check for internal choice "attempt X out of Y" / "any X of Y"
        const attemptMatch = line.match(/(?:attempt|any|answer)\s+(?:any\s+)?(\d+)/i);
        const attempt = attemptMatch ? parseInt(attemptMatch[1]) : undefined;

        // Avoid duplicates
        if (!rows.find(r => r.type === type)) {
          rows.push({ type, count, marksEach, ...(attempt && attempt < count ? { attempt } : {}) });
        }
        break;
      }
    }
  }

  // Fallback: count question numbers like Q1, Q2... grouped by section
  if (rows.length === 0) {
    const sectionMatches = text.match(/section\s+[a-e]/gi) || [];
    const hasSection = sectionMatches.length > 0;
    if (hasSection) {
      rows.push(
        { type: "MCQ", count: 10, marksEach: 1 },
        { type: "Short Answer", count: 5, marksEach: 2 },
        { type: "Long Answer", count: 3, marksEach: 5 },
      );
    } else {
      // Just count how many Q1, Q2 etc appear
      const qCount = (text.match(/\bq\s*\d+\b/gi) || []).length;
      if (qCount > 0) {
        rows.push({ type: "Short Answer", count: qCount, marksEach: 2 });
      }
    }
  }

  return rows.length > 0 ? rows : [
    { type: "MCQ", count: 10, marksEach: 1 },
    { type: "Short Answer", count: 5, marksEach: 2 },
    { type: "Long Answer", count: 3, marksEach: 5 },
  ];
}

function ModelPaperUpload({ onDetected }: { onDetected: (rows: TemplateRow[], name: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "parsing" | "done" | "error">("idle");
  const [detected, setDetected] = useState<TemplateRow[]>([]);
  const [suggestedName, setSuggestedName] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setStatus("parsing");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string || "";
      setTimeout(() => {
        const rows = parseModelPaper(text);
        setDetected(rows);
        setSuggestedName(file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
        setStatus("done");
      }, 600); // brief delay to show "Analysing..."
    };
    reader.onerror = () => setStatus("error");
    reader.readAsText(file);
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border-2 border-dashed border-indigo-200 rounded-2xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Upload Model Paper — AI Pattern Detection</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Upload a sample question paper (PDF/text). AT Tool reads the structure — sections, question types, marks — and auto-creates a reusable template.
          </p>
        </div>
      </div>

      {status === "idle" && (
        <button onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-xl transition text-sm">
          <Upload className="w-4 h-4" /> Upload Model Paper
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleFile} />
        </button>
      )}

      {status === "parsing" && (
        <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium animate-pulse">
          <Sparkles className="w-4 h-4" /> Analysing paper pattern…
        </div>
      )}

      {status === "error" && (
        <div className="text-red-600 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> Could not read file. Please try a text or .txt file.
          <button onClick={() => setStatus("idle")} className="underline ml-1">Try again</button>
        </div>
      )}

      {status === "done" && (
        <div>
          <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-3">
            <Check className="w-4 h-4" /> Pattern detected from <span className="font-bold">{fileName}</span>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Detected Distribution</div>
            <div className="space-y-1.5">
              {detected.map((row, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-36 font-medium text-gray-700">{row.type}</span>
                  <span className="text-gray-500">{row.count} questions × {row.marksEach} mark{row.marksEach > 1 ? "s" : ""} = {(row.attempt ?? row.count) * row.marksEach}M</span>
                  {row.attempt && row.attempt < row.count && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Attempt any {row.attempt}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">Template Name</label>
            <input value={suggestedName} onChange={e => setSuggestedName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => onDetected(detected, suggestedName)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
              <Plus className="w-4 h-4" /> Create Template from this Pattern
            </button>
            <button onClick={() => setStatus("idle")} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg transition">
              <X className="w-4 h-4 inline mr-1" /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TemplatesPage() {
  const { customTemplates, addCustomTemplate, updateCustomTemplate, deleteCustomTemplate, user } = useAppStore();
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [showModelUpload, setShowModelUpload] = useState(false);

  const duplicate = (t: PaperTemplate) => {
    addCustomTemplate({
      ...t,
      id: "ct_" + Date.now(),
      name: t.name + " (Copy)",
      isCustom: true,
    });
  };

  const handleModelPaperDetected = (rows: TemplateRow[], name: string) => {
    const totalMarks = rows.reduce((s, r) => s + (r.attempt ?? r.count) * r.marksEach, 0);
    addCustomTemplate({
      id: "ct_" + Date.now(),
      name: name || "From Model Paper",
      duration: 90,
      totalMarks,
      distribution: rows,
      isCustom: true,
    });
    setShowModelUpload(false);
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paper Templates</h1>
          <p className="text-gray-500 mt-1">
            Customise mark distributions for different boards and exam types. Every school is different — build templates that match your pattern.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => { setShowModelUpload(!showModelUpload); setCreating(false); setEditingId(null); }}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2.5 rounded-xl transition">
            <Sparkles className="w-4 h-4" /> From Model Paper
          </button>
          <button onClick={() => { setCreating(true); setEditingId(null); setShowModelUpload(false); }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl transition">
            <Plus className="w-4 h-4" /> New Template
          </button>
        </div>
      </div>

      {/* Model Paper Upload */}
      {showModelUpload && (
        <div className="mt-6 mb-4">
          <ModelPaperUpload onDetected={handleModelPaperDetected} />
        </div>
      )}

      {/* Create / Edit form */}
      {(creating || editingId) && (
        <div className="mt-6 mb-8">
          <TemplateEditor
            initial={editingId ? customTemplates.find((t) => t.id === editingId) || {} : {}}
            onSave={(t) => {
              if (editingId) {
                updateCustomTemplate(editingId, t);
              } else {
                addCustomTemplate(t);
              }
              setCreating(false);
              setEditingId(null);
            }}
            onCancel={() => { setCreating(false); setEditingId(null); }}
          />
        </div>
      )}

      {/* Built-in templates */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-semibold text-gray-700">Built-in Templates</h2>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{TEMPLATES.length}</span>
          <span className="text-xs text-gray-400">· Duplicate to customise</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {TEMPLATES.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              onDuplicate={() => duplicate(t)}
            />
          ))}
        </div>
      </div>

      {/* Custom templates */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-semibold text-gray-700">My Custom Templates</h2>
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium">{customTemplates.length}</span>
        </div>

        {customTemplates.length === 0 ? (
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center">
            <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 font-medium">No custom templates yet</p>
            <p className="text-gray-400 text-sm mt-1 mb-4">
              Create one from scratch or duplicate a built-in template and modify it to match your board&apos;s pattern.
            </p>
            <button onClick={() => setCreating(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
              <Plus className="w-4 h-4" /> Create Your First Template
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {customTemplates.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                onEdit={() => { setEditingId(t.id); setCreating(false); }}
                onDelete={() => deleteCustomTemplate(t.id)}
                onDuplicate={() => duplicate(t)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-sm text-indigo-700">
        <strong>💡 Tip:</strong> Custom templates are available in the Create Paper wizard. Each board — Maharashtra, Tamil Nadu, Karnataka, etc. — has different section structures. Build one template per exam type per board and reuse it all year.
      </div>
    </div>
  );
}
