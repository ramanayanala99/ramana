"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Plus, FileText, Database, Clock, CheckCircle, TrendingUp, BookOpen, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { user, papers } = useAppStore();

  const publishedCount = papers.filter((p) => p.status === "published").length;
  const draftCount = papers.filter((p) => p.status === "draft").length;
  const recentPapers = papers.slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Good morning, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 mt-1">Here&apos;s your paper generation overview for {user?.schoolName}</p>
        {user?.plan === "free" && (
          <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-center justify-between">
            <div className="text-sm text-yellow-800">
              ⏱️ Your free trial ends in <strong>14 days</strong>. Upgrade to keep access.
            </div>
            <Link href="/dashboard/billing" className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-3 py-1.5 rounded-lg transition">
              Upgrade
            </Link>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Papers", value: papers.length, icon: FileText, color: "bg-indigo-500" },
          { label: "Published", value: publishedCount, icon: CheckCircle, color: "bg-green-500" },
          { label: "Drafts", value: draftCount, icon: Clock, color: "bg-orange-400" },
          { label: "Time Saved", value: `${(papers.length * 3.5).toFixed(0)}h`, icon: TrendingUp, color: "bg-purple-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Link href="/dashboard/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl p-6 flex items-center gap-4 transition card-hover">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg">Create New Paper</div>
            <div className="text-indigo-200 text-sm">AI-powered generation</div>
          </div>
        </Link>
        <Link href="/dashboard/questions"
          className="bg-white hover:bg-gray-50 rounded-2xl p-6 flex items-center gap-4 border border-gray-100 transition card-hover">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">Question Bank</div>
            <div className="text-gray-500 text-sm">Browse & manage questions</div>
          </div>
        </Link>
        <Link href="/dashboard/papers"
          className="bg-white hover:bg-gray-50 rounded-2xl p-6 flex items-center gap-4 border border-gray-100 transition card-hover">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">My Papers</div>
            <div className="text-gray-500 text-sm">View all created papers</div>
          </div>
        </Link>
      </div>

      {/* Recent Papers */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Recent Papers</h2>
          <Link href="/dashboard/papers" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentPapers.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-200" />
              <p>No papers yet. Create your first one!</p>
            </div>
          ) : (
            recentPapers.map((paper) => (
              <div key={paper.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{paper.title}</div>
                    <div className="text-xs text-gray-400">{paper.board} · Class {paper.class} · {paper.totalMarks} marks</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${paper.status === "published" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                    {paper.status}
                  </span>
                  <span className="text-xs text-gray-400">{paper.createdAt}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
