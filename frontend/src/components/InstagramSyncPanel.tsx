"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { InstagramSyncStatus } from "@/types";

interface InstagramSyncPanelProps {
  defaultUsername?: string;
  onSyncComplete?: () => void;
}

export default function InstagramSyncPanel({
  defaultUsername = "jam.with.ai",
  onSyncComplete,
}: InstagramSyncPanelProps) {
  const [username, setUsername] = useState(defaultUsername);
  const [status, setStatus] = useState<InstagramSyncStatus | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadStatus();
  }, [username]);

  async function loadStatus() {
    try {
      const data = await api.getInstagramSyncStatus(username);
      setStatus(data);
    } catch {
      setStatus(null);
    }
  }

  async function handleSync() {
    setSyncing(true);
    setMessage("");
    try {
      const result = await api.syncInstagram(username);
      setMessage(result.message);
      await loadStatus();
      onSyncComplete?.();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Instagram Sync</h2>
      <p className="mt-1 text-sm text-slate-500">
        Sync reels from Instagram Graph API (default: @jam.with.ai).
      </p>

      <div className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">@</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/^@/, ""))}
            className="w-full rounded-lg border border-slate-300 py-2 pl-7 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {syncing ? "Syncing..." : "Sync"}
        </button>
      </div>

      {status && (
        <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <p>
            Status: <span className="font-medium">{status.status}</span>
            {status.reels_synced > 0 && (
              <span className="ml-2">· {status.reels_synced} reel(s) synced</span>
            )}
          </p>
          {status.last_synced_at && (
            <p className="mt-1 text-xs text-slate-400">
              Last synced: {new Date(status.last_synced_at).toLocaleString()}
            </p>
          )}
          {status.error_message && (
            <p className="mt-1 text-xs text-red-600">{status.error_message}</p>
          )}
        </div>
      )}

      {message && (
        <p className="mt-2 text-sm text-brand-700">{message}</p>
      )}
    </div>
  );
}
