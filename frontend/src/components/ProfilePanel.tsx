"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Profile } from "@/types";

interface ProfilePanelProps {
  profile: Profile | null;
  onProfileUpdated: (profile: Profile) => void;
}

export default function ProfilePanel({ profile, onProfileUpdated }: ProfilePanelProps) {
  const [instagramSources, setInstagramSources] = useState(profile?.instagram_sources ?? "jam.with.ai");
  const [learningGoals, setLearningGoals] = useState(profile?.learning_goals ?? "");
  const [skillLevel, setSkillLevel] = useState(profile?.skill_level ?? "beginner");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const updated = await api.updateProfile({
        instagram_sources: instagramSources,
        learning_goals: learningGoals,
        skill_level: skillLevel,
      });
      onProfileUpdated(updated);
      setMessage("Profile saved.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Learning Profile</h2>
      <p className="mt-1 text-sm text-slate-500">Configure your sources and goals.</p>

      <form onSubmit={handleSave} className="mt-4 space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-600">Instagram Sources</label>
          <input
            type="text"
            value={instagramSources}
            onChange={(e) => setInstagramSources(e.target.value)}
            placeholder="jam.with.ai"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600">Skill Level</label>
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600">Learning Goals</label>
          <textarea
            value={learningGoals}
            onChange={(e) => setLearningGoals(e.target.value)}
            rows={3}
            placeholder="What do you want to learn from reels?"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
        {message && <p className="text-sm text-brand-700">{message}</p>}
      </form>
    </div>
  );
}
