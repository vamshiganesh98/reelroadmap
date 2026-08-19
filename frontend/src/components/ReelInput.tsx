"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Reel } from "@/types";

interface ReelInputProps {
  onReelAdded: (reel: Reel) => void;
}

export default function ReelInput({ onReelAdded }: ReelInputProps) {
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() && !caption.trim()) {
      setError("Provide a URL or caption.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const reel = await api.createReel({ url: url.trim(), caption: caption.trim() });
      onReelAdded(reel);
      setUrl("");
      setCaption("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add reel");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Add Reel</h2>
      <p className="mt-1 text-sm text-slate-500">
        Paste a reel URL or caption for caption-first analysis.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="url"
          placeholder="https://www.instagram.com/reel/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        <textarea
          placeholder="Or paste the reel caption here..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Analyze Reel"}
        </button>
      </form>
    </div>
  );
}
