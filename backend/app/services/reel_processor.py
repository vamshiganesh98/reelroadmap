from datetime import datetime

from sqlalchemy.orm import Session

from app.config import get_settings
from app.models import Reel
from app.services.ai_analysis import analyze_reel
from app.services.whisper import transcribe_audio


async def process_reel(db: Session, reel: Reel) -> Reel:
    settings = get_settings()
    reel.status = "processing"
    db.commit()

    transcript = reel.transcript
    if settings.whisper_enabled and reel.url and not transcript:
        transcript = await transcribe_audio(reel.url)
        reel.transcript = transcript

    analysis = await analyze_reel(reel.caption, transcript)
    reel.topics = ",".join(analysis.get("topics", []))
    reel.summary = analysis.get("summary", "")
    reel.difficulty = analysis.get("difficulty", "beginner")
    reel.action_items = "\n".join(analysis.get("action_items", []))
    reel.analysis_mode = analysis.get("analysis_mode", "rules")
    reel.status = "processed"
    reel.processed_at = datetime.utcnow()
    db.commit()
    db.refresh(reel)
    return reel


def reel_to_dict(reel: Reel) -> dict:
    return {
        "id": reel.id,
        "instagram_id": reel.instagram_id,
        "source_username": reel.source_username,
        "url": reel.url,
        "caption": reel.caption,
        "transcript": reel.transcript,
        "thumbnail_url": reel.thumbnail_url,
        "topics": [t for t in reel.topics.split(",") if t] if reel.topics else [],
        "summary": reel.summary,
        "difficulty": reel.difficulty,
        "action_items": [a for a in reel.action_items.split("\n") if a] if reel.action_items else [],
        "analysis_mode": reel.analysis_mode,
        "status": reel.status,
        "created_at": reel.created_at,
        "processed_at": reel.processed_at,
    }
