"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { HealthStatus, Profile, Reel, RoadmapDashboard } from "@/types";
import CostModeBanner from "@/components/CostModeBanner";
import DashboardView from "@/components/DashboardView";
import InstagramSyncPanel from "@/components/InstagramSyncPanel";
import ProfilePanel from "@/components/ProfilePanel";
import ReelDetail from "@/components/ReelDetail";
import ReelInput from "@/components/ReelInput";

export default function Dashboard() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [dashboard, setDashboard] = useState<RoadmapDashboard | null>(null);
  const [reels, setReels] = useState<Reel[]>([]);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [healthData, profileData, dashboardData, reelsData] = await Promise.all([
        api.health(),
        api.getProfile(),
        api.getDashboard(),
        api.listReels(),
      ]);
      setHealth(healthData);
      setProfile(profileData);
      setDashboard(dashboardData);
      setReels(reelsData.reels);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function handleReelAdded(reel: Reel) {
    setReels((prev) => [reel, ...prev]);
    refresh();
  }

  async function handleDeleteReel(id: number) {
    try {
      await api.deleteReel(id);
      setSelectedReel(null);
      refresh();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading ReelRoadmap...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <h1 className="text-2xl font-bold text-slate-900">ReelRoadmap</h1>
          <p className="mt-1 text-sm text-slate-500">
            Turn Instagram reels into a personalized AI learning roadmap
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <CostModeBanner health={health} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <ReelInput onReelAdded={handleReelAdded} />
            <InstagramSyncPanel defaultUsername="jam.with.ai" onSyncComplete={refresh} />
            <ProfilePanel profile={profile} onProfileUpdated={setProfile} />
          </div>

          <div className="lg:col-span-2">
            <DashboardView
              dashboard={dashboard}
              reels={reels}
              onSelectReel={setSelectedReel}
            />
          </div>
        </div>
      </main>

      <ReelDetail
        reel={selectedReel}
        onClose={() => setSelectedReel(null)}
        onDelete={handleDeleteReel}
      />
    </div>
  );
}
