"use client";
import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { FileText, Plus, Search, Download, Trash2, Eye, Edit, CheckCircle, Clock } from "lucide-react";

export default function PapersPage() {
  const { papers, deletePaper, updatePaper, user } = useAppStore();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [previewPaper, setPreviewPaper] = useState<string | null>(null);

  const filtered = papers.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = p.title.toLowerCase().includes(q) || p.board.toLowerCase().includes(q) || p.subject.toLowerCase().includes(q);
    const matchStatus = filterStatus === "All" || p.status === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  const handlePrint = (paperId: string) => {
    setPreviewPaper(paperId);
    setTimeout(() => window.print(), 200);
  };

  const preview = papers.find((p) => p.id === previewPaper);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Papers</h1>
          <p className="text-gray-500 mt-1">{papers.length} question paper{papers.length !== 1 ? "s" : ""} created</p>
        </div>
        <Link href="/dashboard/create"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl transition">
          <Plus className="w-4 h-4" />
          New Paper
        </Link>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search papers..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
        </div>
        {["All", "Published", "Draft"].map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${filterStatus === s ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-200" />
            <h3 className="text-lg font-semibold text-gray-500">No papers found</h3>
            <p className="text-gray-400 mt-1 mb-4">Create your first question paper to get started.</p>
            <Link href="/dashboard/create" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              <Plus className="w-4 h-4" /> Create Paper
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Title", "Board", "Class", "Marks", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((paper) => (
                <tr key={paper.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{paper.title}</div>
                        <div className="text-xs text-gray-400">{paper.subject} · {paper.questions.length} questions</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{paper.board}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{paper.class}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{paper.totalMarks}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${paper.status === "published" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                      {paper.status === "published" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {paper.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{paper.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setPreviewPaper(paper.id)} title="Preview"
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-indigo-100 flex items-center justify-center transition">
                        <Eye className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <button onClick={() => handlePrint(paper.id)} title="Export PDF"
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-green-100 flex items-center justify-center transition">
                        <Download className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <button onClick={() => updatePaper(paper.id, { status: paper.status === "published" ? "draft" : "published" })} title="Toggle Status"
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition">
                        <Edit className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <button onClick={() => deletePaper(paper.id)} title="Delete"
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-red-100 flex items-center justify-center transition">
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Print Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 no-print" onClick={() => setPreviewPaper(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-screen overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-lg">Paper Preview</h2>
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  <Download className="w-4 h-4" /> Export PDF
                </button>
                <button onClick={() => setPreviewPaper(null)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600">Close</button>
              </div>
            </div>
            <div className="p-8">
              <div className="text-center mb-8 border-b pb-6">
                <h2 className="text-2xl font-bold text-gray-900">{user?.schoolName || preview.schoolName}</h2>
                <h3 className="text-lg font-semibold mt-2">{preview.title}</h3>
                <div className="flex justify-center gap-6 mt-3 text-sm text-gray-600">
                  <span>Board: {preview.board}</span>
                  <span>Class: {preview.class}</span>
                  <span>Subject: {preview.subject}</span>
                  <span>Time: {preview.duration} min</span>
                  <span>Max Marks: {preview.totalMarks}</span>
                </div>
              </div>
              <div className="space-y-4">
                {preview.questions.map((q, i) => (
                  <div key={q.id} className="flex gap-3">
                    <span className="font-bold text-gray-900 shrink-0">Q{i + 1}.</span>
                    <div>
                      <p className="text-gray-800">{q.text}</p>
                      {q.options && (
                        <div className="mt-2 space-y-1">
                          {q.options.map((opt, j) => (
                            <div key={j} className="text-sm text-gray-600">{String.fromCharCode(65 + j)}. {opt}</div>
                          ))}
                        </div>
                      )}
                      <div className="text-xs text-gray-400 mt-1">[{q.marks} mark{q.marks > 1 ? "s" : ""}]</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
