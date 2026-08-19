"use client";

import type { Reel, RoadmapDashboard } from "@/types";

interface DashboardViewProps {
  dashboard: RoadmapDashboard | null;
  reels: Reel[];
  onSelectReel: (reel: Reel) => void;
}

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};

export default function DashboardView({ dashboard, reels, onSelectReel }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      {dashboard && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Reels" value={dashboard.total_reels} />
          <StatCard label="Processed" value={dashboard.processed_reels} />
          <StatCard label="Skill Level" value={dashboard.skill_level} capitalize />
        </div>
      )}

      {dashboard && dashboard.topics.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Learning Roadmap</h2>
          <div className="mt-4 space-y-3">
            {dashboard.topics.map((item) => (
              <div
                key={item.topic}
                className="flex items-start justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-900">{item.topic}</p>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">{item.latest_summary}</p>
                </div>
                <div className="ml-4 flex flex-col items-end gap-1">
                  <span className="text-sm font-medium text-brand-600">{item.reel_count} reel(s)</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      difficultyColors[item.difficulty] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">All Reels</h2>
        {reels.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            No reels yet. Add one manually or sync from Instagram.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-slate-100">
            {reels.map((reel) => (
              <button
                key={reel.id}
                onClick={() => onSelectReel(reel)}
                className="flex w-full items-start gap-3 py-3 text-left hover:bg-slate-50"
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {reel.caption || reel.url || `Reel #${reel.id}`}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {reel.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    reel.status === "processed"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {reel.status}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string | number;
  capitalize?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold text-slate-900 ${capitalize ? "capitalize" : ""}`}>
        {value}
      </p>
    </div>
  );
}
