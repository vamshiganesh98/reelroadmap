from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    billing_mode: Literal["free", "openai"] = "free"
    instagram_sync_usernames: str = "jam.with.ai"
    instagram_access_token: str = ""
    openai_api_key: str = ""
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.2"
    database_url: str = "sqlite:///./reelroadmap.db"
    whisper_enabled: bool = False

    @property
    def instagram_usernames(self) -> list[str]:
        return [u.strip().lstrip("@") for u in self.instagram_sync_usernames.split(",") if u.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
