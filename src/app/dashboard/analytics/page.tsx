"use client";
import { useAppStore } from "@/lib/store";
import { BarChart3, TrendingUp, FileText, Clock, Users, Zap } from "lucide-react";

export default function AnalyticsPage() {
  const { papers, questions } = useAppStore();

  const subjectDist = papers.reduce((acc, p) => { acc[p.subject] = (acc[p.subject] || 0) + 1; return acc; }, {} as Record<string, number>);
  const typeDist = questions.reduce((acc, q) => { acc[q.type] = (acc[q.type] || 0) + 1; return acc; }, {} as Record<string, number>);
  const diffDist = questions.reduce((acc, q) => { acc[q.difficulty] = (acc[q.difficulty] || 0) + 1; return acc; }, {} as Record<string, number>);

  const colors: Record<string, string> = { Easy: "bg-green-500", Medium: "bg-yellow-500", Hard: "bg-red-500" };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Insights into your question paper generation activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Papers", value: papers.length, icon: FileText, color: "bg-indigo-500" },
          { label: "Total Questions", value: questions.length, icon: BarChart3, color: "bg-purple-500" },
          { label: "Hours Saved", value: `${(papers.length * 3.5).toFixed(0)}h`, icon: Clock, color: "bg-green-500" },
          { label: "Boards Covered", value: [...new Set(papers.map((p) => p.board))].length, icon: Zap, color: "bg-orange-500" },
          { label: "Subjects Active", value: [...new Set(papers.map((p) => p.subject))].length, icon: TrendingUp, color: "bg-blue-500" },
          { label: "Published Papers", value: papers.filter((p) => p.status === "published").length, icon: Users, color: "bg-pink-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Papers by Subject</h3>
          <div className="space-y-3">
            {Object.entries(subjectDist).map(([s, c]) => (
              <div key={s} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 flex-1 truncate">{s}</span>
                <div className="w-24 bg-gray-100 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${(c / papers.length) * 100}%` }} />
                </div>
                <span className="text-sm text-gray-500 w-5 text-right">{c}</span>
              </div>
            ))}
            {Object.keys(subjectDist).length === 0 && <p className="text-gray-400 text-sm">No data yet.</p>}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Question Types in Bank</h3>
          <div className="space-y-3">
            {Object.entries(typeDist).map(([t, c]) => (
              <div key={t} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 flex-1 truncate">{t}</span>
                <div className="w-24 bg-gray-100 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(c / questions.length) * 100}%` }} />
                </div>
                <span className="text-sm text-gray-500 w-5 text-right">{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Difficulty Distribution</h3>
          <div className="space-y-3">
            {Object.entries(diffDist).map(([d, c]) => (
              <div key={d} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-16">{d}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div className={`${colors[d] || "bg-gray-500"} h-3 rounded-full`} style={{ width: `${(c / questions.length) * 100}%` }} />
                </div>
                <span className="text-sm text-gray-500 w-8 text-right">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
