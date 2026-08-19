from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str
    billing_mode: Literal["free", "openai"]
    whisper_enabled: bool


class ProfileResponse(BaseModel):
    instagram_sources: str
    learning_goals: str
    skill_level: str
    updated_at: datetime | None = None


class ProfileUpdate(BaseModel):
    instagram_sources: str | None = None
    learning_goals: str | None = None
    skill_level: str | None = None


class ReelCreate(BaseModel):
    url: str = ""
    caption: str = ""
    source_username: str = ""


class ReelResponse(BaseModel):
    id: int
    instagram_id: str | None = None
    source_username: str
    url: str
    caption: str
    transcript: str
    thumbnail_url: str
    topics: list[str]
    summary: str
    difficulty: str
    action_items: list[str]
    analysis_mode: str
    status: str
    created_at: datetime
    processed_at: datetime | None = None

    model_config = {"from_attributes": True}


class ReelListResponse(BaseModel):
    reels: list[ReelResponse]
    total: int


class RoadmapItem(BaseModel):
    topic: str
    reel_count: int
    difficulty: str
    latest_summary: str


class RoadmapDashboard(BaseModel):
    total_reels: int
    processed_reels: int
    topics: list[RoadmapItem]
    hands_on_tasks: list[str]
    recent_reels: list[ReelResponse]
    skill_level: str
    billing_mode: Literal["free", "openai"]
    primary_source: str = "jam.with.ai"


class InstagramSyncRequest(BaseModel):
    username: str = Field(default="jam.with.ai")


class InstagramSyncStatus(BaseModel):
    username: str
    last_synced_at: datetime | None = None
    reels_synced: int
    status: str
    error_message: str


class InstagramSyncResponse(BaseModel):
    username: str
    synced: int
    new_reels: int
    status: str
    message: str
