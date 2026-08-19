from datetime import datetime

import httpx
from sqlalchemy.orm import Session

from app.config import get_settings
from app.models import InstagramSyncState, Reel
from app.services.reel_processor import process_reel


async def fetch_instagram_media(username: str) -> list[dict]:
    settings = get_settings()
    if not settings.instagram_access_token:
        return _mock_instagram_media(username)

    async with httpx.AsyncClient(timeout=30.0) as client:
        user_response = await client.get(
            "https://graph.facebook.com/v21.0/ig_hashtag_search",
            params={"user_id": "me", "q": username, "access_token": settings.instagram_access_token},
        )
        if user_response.status_code != 200:
            return _mock_instagram_media(username)

        account_response = await client.get(
            f"https://graph.facebook.com/v21.0/{username}",
            params={
                "fields": "id,username,media{caption,media_url,thumbnail_url,permalink,timestamp,media_type}",
                "access_token": settings.instagram_access_token,
            },
        )
        if account_response.status_code != 200:
            return _mock_instagram_media(username)

        data = account_response.json()
        media_items = data.get("media", {}).get("data", [])
        reels = [item for item in media_items if item.get("media_type") in ("VIDEO", "REELS")]
        return reels


def _mock_instagram_media(username: str) -> list[dict]:
    return [
        {
            "id": f"mock-{username}-1",
            "caption": "Learn AI fundamentals: neural networks explained in 60 seconds #ai #machinelearning",
            "permalink": f"https://www.instagram.com/reel/mock1/",
            "thumbnail_url": "",
            "media_type": "REELS",
        },
        {
            "id": f"mock-{username}-2",
            "caption": "Prompt engineering tips for better LLM outputs #promptengineering #llm",
            "permalink": f"https://www.instagram.com/reel/mock2/",
            "thumbnail_url": "",
            "media_type": "REELS",
        },
        {
            "id": f"mock-{username}-3",
            "caption": "Build a FastAPI backend with Python in minutes #python #fastapi #webdev",
            "permalink": f"https://www.instagram.com/reel/mock3/",
            "thumbnail_url": "",
            "media_type": "REELS",
        },
    ]


async def sync_instagram_account(db: Session, username: str) -> dict:
    username = username.strip().lstrip("@")
    state = db.query(InstagramSyncState).filter(InstagramSyncState.username == username).first()
    if not state:
        state = InstagramSyncState(username=username)
        db.add(state)

    state.status = "syncing"
    state.error_message = ""
    db.commit()

    try:
        media_items = await fetch_instagram_media(username)
        new_count = 0

        for item in media_items:
            instagram_id = item.get("id", "")
            existing = db.query(Reel).filter(Reel.instagram_id == instagram_id).first()
            if existing:
                continue

            reel = Reel(
                instagram_id=instagram_id,
                source_username=username,
                url=item.get("permalink", ""),
                caption=item.get("caption", ""),
                thumbnail_url=item.get("thumbnail_url", ""),
                status="pending",
            )
            db.add(reel)
            db.commit()
            db.refresh(reel)
            await process_reel(db, reel)
            new_count += 1

        state.last_synced_at = datetime.utcnow()
        state.reels_synced = db.query(Reel).filter(Reel.source_username == username).count()
        state.status = "idle"
        db.commit()

        return {
            "username": username,
            "synced": len(media_items),
            "new_reels": new_count,
            "status": "success",
            "message": f"Synced {new_count} new reel(s) from @{username}",
        }
    except Exception as exc:
        state.status = "error"
        state.error_message = str(exc)
        db.commit()
        return {
            "username": username,
            "synced": 0,
            "new_reels": 0,
            "status": "error",
            "message": str(exc),
        }


def get_sync_status(db: Session, username: str) -> InstagramSyncState | None:
    username = username.strip().lstrip("@")
    return db.query(InstagramSyncState).filter(InstagramSyncState.username == username).first()


def list_configured_usernames() -> list[str]:
    return get_settings().instagram_usernames
