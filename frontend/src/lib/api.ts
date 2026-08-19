import type {
  HealthStatus,
  InstagramSyncResponse,
  InstagramSyncStatus,
  Profile,
  Reel,
  RoadmapDashboard,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }
  return response.json();
}

export const api = {
  health: () => request<HealthStatus>("/health"),
  getProfile: () => request<Profile>("/profile"),
  updateProfile: (data: Partial<Profile>) =>
    request<Profile>("/profile", { method: "PUT", body: JSON.stringify(data) }),
  listReels: () => request<{ reels: Reel[]; total: number }>("/reels"),
  getReel: (id: number) => request<Reel>(`/reels/${id}`),
  createReel: (data: { url?: string; caption?: string; source_username?: string }) =>
    request<Reel>("/reels", { method: "POST", body: JSON.stringify(data) }),
  deleteReel: (id: number) => request<{ deleted: boolean }>(`/reels/${id}`, { method: "DELETE" }),
  getDashboard: () => request<RoadmapDashboard>("/roadmap/dashboard"),
  getInstagramSyncStatus: (username: string) =>
    request<InstagramSyncStatus>(`/instagram/sync/${encodeURIComponent(username)}`),
  syncInstagram: (username: string) =>
    request<InstagramSyncResponse>("/instagram/sync", {
      method: "POST",
      body: JSON.stringify({ username }),
    }),
  getInstagramUsernames: () => request<{ usernames: string[] }>("/instagram/usernames"),
};
