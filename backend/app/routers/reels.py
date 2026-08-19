from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Reel
from app.schemas import ReelCreate, ReelListResponse, ReelResponse
from app.services.reel_processor import process_reel, reel_to_dict

router = APIRouter()


@router.get("/reels", response_model=ReelListResponse)
def list_reels(db: Session = Depends(get_db)) -> ReelListResponse:
    reels = db.query(Reel).order_by(Reel.created_at.desc()).all()
    return ReelListResponse(
        reels=[ReelResponse(**reel_to_dict(r)) for r in reels],
        total=len(reels),
    )


@router.get("/reels/{reel_id}", response_model=ReelResponse)
def get_reel(reel_id: int, db: Session = Depends(get_db)) -> ReelResponse:
    reel = db.query(Reel).filter(Reel.id == reel_id).first()
    if not reel:
        raise HTTPException(status_code=404, detail="Reel not found")
    return ReelResponse(**reel_to_dict(reel))


@router.post("/reels", response_model=ReelResponse)
async def create_reel(payload: ReelCreate, db: Session = Depends(get_db)) -> ReelResponse:
    reel = Reel(
        url=payload.url,
        caption=payload.caption,
        source_username=payload.source_username or "manual",
        status="pending",
    )
    db.add(reel)
    db.commit()
    db.refresh(reel)
    reel = await process_reel(db, reel)
    return ReelResponse(**reel_to_dict(reel))


@router.delete("/reels/{reel_id}")
def delete_reel(reel_id: int, db: Session = Depends(get_db)) -> dict:
    reel = db.query(Reel).filter(Reel.id == reel_id).first()
    if not reel:
        raise HTTPException(status_code=404, detail="Reel not found")
    db.delete(reel)
    db.commit()
    return {"deleted": True, "id": reel_id}
