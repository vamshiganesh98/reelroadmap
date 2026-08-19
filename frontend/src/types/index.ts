export interface Reel {
  id: number;
  instagram_id?: string | null;
  source_username: string;
  url: string;
  caption: string;
  transcript: string;
  thumbnail_url: string;
  topics: string[];
  summary: string;
  difficulty: string;
  action_items: string[];
  analysis_mode: string;
  status: string;
  created_at: string;
  processed_at?: string | null;
}

export interface Profile {
  instagram_sources: string;
  learning_goals: string;
  skill_level: string;
  updated_at?: string | null;
}

export interface RoadmapItem {
  topic: string;
  reel_count: number;
  difficulty: string;
  latest_summary: string;
}

export interface RoadmapDashboard {
  total_reels: number;
  processed_reels: number;
  topics: RoadmapItem[];
  recent_reels: Reel[];
  skill_level: string;
  billing_mode: "free" | "openai";
}

export interface HealthStatus {
  status: string;
  billing_mode: "free" | "openai";
  whisper_enabled: boolean;
}

export interface InstagramSyncStatus {
  username: string;
  last_synced_at?: string | null;
  reels_synced: number;
  status: string;
  error_message: string;
}

export interface InstagramSyncResponse {
  username: string;
  synced: number;
  new_reels: number;
  status: string;
  message: string;
}
