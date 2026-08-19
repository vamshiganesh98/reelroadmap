"use client";

import type { Reel } from "@/types";

interface ReelDetailProps {
  reel: Reel | null;
  onClose: () => void;
  onDelete?: (id: number) => void;
}

export default function ReelDetail({ reel, onClose, onDelete }: ReelDetailProps) {
  if (!reel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Reel Details</h2>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm text-slate-500 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <div className="space-y-5 p-6">
          {reel.url && (
            <div>
              <h3 className="text-xs font-medium uppercase text-slate-400">URL</h3>
              <a
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm text-brand-600 hover:underline break-all"
              >
                {reel.url}
              </a>
            </div>
          )}

          {reel.caption && (
            <div>
              <h3 className="text-xs font-medium uppercase text-slate-400">Caption</h3>
              <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">{reel.caption}</p>
            </div>
          )}

          {reel.transcript && (
            <div>
              <h3 className="text-xs font-medium uppercase text-slate-400">Transcript</h3>
              <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">{reel.transcript}</p>
            </div>
          )}

          <div>
            <h3 className="text-xs font-medium uppercase text-slate-400">Summary</h3>
            <p className="mt-1 text-sm text-slate-700">{reel.summary || "No summary available."}</p>
          </div>

          {reel.topics.length > 0 && (
            <div>
              <h3 className="text-xs font-medium uppercase text-slate-400">Topics</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {reel.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {reel.action_items.length > 0 && (
            <div>
              <h3 className="text-xs font-medium uppercase text-slate-400">Action Items</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
                {reel.action_items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <span>Difficulty: {reel.difficulty}</span>
            <span>Analysis: {reel.analysis_mode}</span>
            <span>Status: {reel.status}</span>
            {reel.source_username && <span>Source: @{reel.source_username}</span>}
          </div>

          {onDelete && (
            <button
              onClick={() => onDelete(reel.id)}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete Reel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
