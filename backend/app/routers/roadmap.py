from collections import defaultdict

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import get_db
from app.models import Reel, UserProfile
from app.schemas import RoadmapDashboard, RoadmapItem, ReelResponse
from app.services.reel_processor import reel_to_dict

router = APIRouter()


@router.get("/roadmap/dashboard", response_model=RoadmapDashboard)
def roadmap_dashboard(db: Session = Depends(get_db)) -> RoadmapDashboard:
    settings = get_settings()
    reels = db.query(Reel).order_by(Reel.created_at.desc()).all()
    processed = [r for r in reels if r.status == "processed"]

    topic_map: dict[str, dict] = defaultdict(lambda: {"count": 0, "difficulty": "beginner", "latest_summary": ""})
    for reel in processed:
        topics = [t.strip() for t in reel.topics.split(",") if t.strip()] if reel.topics else ["General Tech"]
        for topic in topics:
            entry = topic_map[topic]
            entry["count"] += 1
            entry["difficulty"] = reel.difficulty
            if not entry["latest_summary"]:
                entry["latest_summary"] = reel.summary

    topics = [
        RoadmapItem(
            topic=topic,
            reel_count=data["count"],
            difficulty=data["difficulty"],
            latest_summary=data["latest_summary"],
        )
        for topic, data in sorted(topic_map.items(), key=lambda x: x[1]["count"], reverse=True)
    ]

    profile = db.query(UserProfile).first()
    skill_level = profile.skill_level if profile else "beginner"
    primary_source = profile.instagram_sources.split(",")[0].strip() if profile else "jam.with.ai"

    hands_on: list[str] = []
    seen_tasks: set[str] = set()
    for reel in processed:
        for item in [a for a in reel.action_items.split("\n") if a.strip()]:
            if item not in seen_tasks:
                seen_tasks.add(item)
                hands_on.append(item)
        if len(hands_on) >= 8:
            break

    return RoadmapDashboard(
        total_reels=len(reels),
        processed_reels=len(processed),
        topics=topics,
        hands_on_tasks=hands_on[:8],
        recent_reels=[ReelResponse(**reel_to_dict(r)) for r in reels[:5]],
        skill_level=skill_level,
        billing_mode=settings.billing_mode,
        primary_source=primary_source,
    )
