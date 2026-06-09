"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { TEMPLATES, QUESTION_TYPES, PaperTemplate, TemplateRow } from "@/lib/data";
import { Plus, Edit, Trash2, Copy, BookOpen, Clock, Target, ChevronDown, ChevronUp, Check } from "lucide-react";

const EMPTY_ROW: TemplateRow = { type: "MCQ", count: 5, marksEach: 1 };

function calcTotal(rows: TemplateRow[]) {
  return rows.reduce((s, r) => s + r.count * r.marksEach, 0);
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
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700">Question Distribution</label>
          <div className="text-xs text-gray-400">Total: <span className="font-bold text-indigo-600">{totalMarks} marks</span></div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-400 px-1">
            <span className="col-span-5">Question Type</span>
            <span className="col-span-3 text-center">No. of Qs</span>
            <span className="col-span-3 text-center">Marks Each</span>
            <span className="col-span-1" />
          </div>

          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center bg-gray-50 rounded-xl p-2">
              <div className="col-span-5">
                <select
                  value={row.type} onChange={(e) => updateRow(i, "type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {QUESTION_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="col-span-3">
                <input
                  type="number" min="1" max="50" value={row.count}
                  onChange={(e) => updateRow(i, "count", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number" min="1" max="20" value={row.marksEach}
                  onChange={(e) => updateRow(i, "marksEach", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <button onClick={() => removeRow(i)} disabled={rows.length === 1}
                  className="w-7 h-7 rounded-lg hover:bg-red-100 flex items-center justify-center disabled:opacity-30 transition">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={addRow}
          className="mt-2 flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition">
          <Plus className="w-4 h-4" /> Add question section
        </button>
      </div>

      {/* Summary */}
      <div className="bg-indigo-50 rounded-xl p-3 mb-5 flex flex-wrap gap-4 text-sm">
        <span className="flex items-center gap-1.5 text-indigo-700">
          <Target className="w-4 h-4" /><strong>{totalMarks}</strong> total marks
        </span>
        <span className="flex items-center gap-1.5 text-indigo-700">
          <Clock className="w-4 h-4" /><strong>{duration}</strong> minutes
        </span>
        <span className="flex items-center gap-1.5 text-indigo-700">
          <BookOpen className="w-4 h-4" /><strong>{rows.reduce((s, r) => s + r.count, 0)}</strong> questions
        </span>
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

  return (
    <div className={`bg-white rounded-2xl border-2 ${template.isCustom ? "border-indigo-200" : "border-gray-100"} shadow-sm`}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900">{template.name}</h3>
              {template.isCustom && (
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">Custom</span>
              )}
            </div>
            {template.board && <div className="text-xs text-indigo-600 mb-2">{template.board}</div>}
            <div className="flex gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{template.duration} min</span>
              <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5" />{template.totalMarks} marks</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{totalQs} questions</span>
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
          <div className="mt-3 space-y-1.5">
            {template.distribution.map((row, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-36 text-gray-600 truncate">{row.type}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className="bg-indigo-400 h-1.5 rounded-full"
                    style={{ width: `${Math.min(100, (row.count * row.marksEach / template.totalMarks) * 100)}%` }} />
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {row.count}× · {row.marksEach}M = {row.count * row.marksEach}M
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const { customTemplates, addCustomTemplate, updateCustomTemplate, deleteCustomTemplate, user } = useAppStore();
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const duplicate = (t: PaperTemplate) => {
    addCustomTemplate({
      ...t,
      id: "ct_" + Date.now(),
      name: t.name + " (Copy)",
      isCustom: true,
    });
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
        <button onClick={() => { setCreating(true); setEditingId(null); }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl transition shrink-0">
          <Plus className="w-4 h-4" /> New Template
        </button>
      </div>

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
