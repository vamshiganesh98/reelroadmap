from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import InstagramSyncRequest, InstagramSyncResponse, InstagramSyncStatus
from app.services.instagram import get_sync_status, list_configured_usernames, sync_instagram_account

router = APIRouter()


@router.get("/instagram/usernames")
def get_usernames() -> dict:
    return {"usernames": list_configured_usernames()}


@router.get("/instagram/sync/{username}", response_model=InstagramSyncStatus)
def sync_status(username: str, db: Session = Depends(get_db)) -> InstagramSyncStatus:
    username = username.strip().lstrip("@")
    state = get_sync_status(db, username)
    if not state:
        return InstagramSyncStatus(
            username=username,
            last_synced_at=None,
            reels_synced=0,
            status="never_synced",
            error_message="",
        )
    return InstagramSyncStatus(
        username=state.username,
        last_synced_at=state.last_synced_at,
        reels_synced=state.reels_synced,
        status=state.status,
        error_message=state.error_message,
    )


@router.post("/instagram/sync", response_model=InstagramSyncResponse)
async def sync_instagram(payload: InstagramSyncRequest, db: Session = Depends(get_db)) -> InstagramSyncResponse:
    result = await sync_instagram_account(db, payload.username)
    return InstagramSyncResponse(**result)
