"use client";

import type { HealthStatus } from "@/types";

interface CostModeBannerProps {
  health: HealthStatus | null;
}

export default function CostModeBanner({ health }: CostModeBannerProps) {
  if (!health) return null;

  const isFree = health.billing_mode === "free";

  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${
        isFree
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-amber-200 bg-amber-50 text-amber-800"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="font-semibold">
            {isFree ? "Free Mode" : "OpenAI Mode"}
          </span>
          <span className="ml-2 text-current/80">
            {isFree
              ? "Using Ollama or rule-based analysis — no API costs."
              : "Using OpenAI for analysis — API costs apply."}
          </span>
        </div>
        {health.whisper_enabled && (
          <span className="rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium">
            Whisper enabled
          </span>
        )}
      </div>
    </div>
  );
}
