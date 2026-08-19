from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_db
from app.routers import health, instagram, profile, reels, roadmap


@asynccontextmanager
async def lifespan(_app: FastAPI):
    init_db()
    yield


app = FastAPI(title="ReelRoadmap API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(profile.router, prefix="/api", tags=["profile"])
app.include_router(reels.router, prefix="/api", tags=["reels"])
app.include_router(roadmap.router, prefix="/api", tags=["roadmap"])
app.include_router(instagram.router, prefix="/api", tags=["instagram"])
