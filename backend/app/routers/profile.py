from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import UserProfile
from app.schemas import ProfileResponse, ProfileUpdate

router = APIRouter()


def _get_or_create_profile(db: Session) -> UserProfile:
    profile = db.query(UserProfile).first()
    if not profile:
        profile = UserProfile(
            instagram_sources="jam.with.ai",
            skill_level="intermediate",
            learning_goals=(
                "Grow as a hands-on AI engineer. Turn @jam.with.ai reels into projects, "
                "not just theory. Some Python background."
            ),
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile


@router.get("/profile", response_model=ProfileResponse)
def get_profile(db: Session = Depends(get_db)) -> ProfileResponse:
    profile = _get_or_create_profile(db)
    return ProfileResponse(
        instagram_sources=profile.instagram_sources,
        learning_goals=profile.learning_goals,
        skill_level=profile.skill_level,
        updated_at=profile.updated_at,
    )


@router.put("/profile", response_model=ProfileResponse)
def update_profile(payload: ProfileUpdate, db: Session = Depends(get_db)) -> ProfileResponse:
    profile = _get_or_create_profile(db)
    if payload.instagram_sources is not None:
        profile.instagram_sources = payload.instagram_sources
    if payload.learning_goals is not None:
        profile.learning_goals = payload.learning_goals
    if payload.skill_level is not None:
        profile.skill_level = payload.skill_level
    profile.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(profile)
    return ProfileResponse(
        instagram_sources=profile.instagram_sources,
        learning_goals=profile.learning_goals,
        skill_level=profile.skill_level,
        updated_at=profile.updated_at,
    )
