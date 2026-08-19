import json
import re
from typing import Any

import httpx

from app.config import get_settings

AI_KEYWORDS = {
    "machine learning": "Machine Learning",
    "deep learning": "Deep Learning",
    "neural network": "Neural Networks",
    "llm": "Large Language Models",
    "gpt": "Large Language Models",
    "prompt": "Prompt Engineering",
    "python": "Python",
    "javascript": "JavaScript",
    "react": "React",
    "next.js": "Next.js",
    "fastapi": "FastAPI",
    "docker": "Docker",
    "kubernetes": "Kubernetes",
    "data science": "Data Science",
    "ai": "Artificial Intelligence",
    "whisper": "Speech Recognition",
    "ollama": "Local LLMs",
    "openai": "OpenAI APIs",
}


def _extract_topics(text: str) -> list[str]:
    lowered = text.lower()
    found: list[str] = []
    for keyword, label in AI_KEYWORDS.items():
        if keyword in lowered and label not in found:
            found.append(label)
    if not found:
        found.append("General Tech")
    return found[:5]


def _extract_action_items(text: str) -> list[str]:
    lines = [line.strip(" -•\t") for line in text.splitlines() if line.strip()]
    numbered = [re.sub(r"^\d+[\).\]]\s*", "", line) for line in lines if re.match(r"^\d+[\).\]]", line)]
    if numbered:
        return numbered[:5]
    sentences = [s.strip() for s in re.split(r"[.!?]+", text) if len(s.strip()) > 20]
    return sentences[:3] if sentences else ["Review the reel and take notes on key concepts."]


def analyze_with_rules(caption: str, transcript: str) -> dict[str, Any]:
    combined = f"{caption}\n{transcript}".strip()
    topics = _extract_topics(combined)
    word_count = len(combined.split())
    difficulty = "beginner" if word_count < 80 else "intermediate" if word_count < 200 else "advanced"
    summary = combined[:280] + ("..." if len(combined) > 280 else "") if combined else "No content available."
    return {
        "topics": topics,
        "summary": summary,
        "difficulty": difficulty,
        "action_items": _extract_action_items(combined),
        "analysis_mode": "rules",
    }


async def analyze_with_ollama(caption: str, transcript: str) -> dict[str, Any]:
    settings = get_settings()
    prompt = (
        "Analyze this Instagram reel for a learning roadmap. "
        "Return JSON with keys: topics (array of strings), summary (string), "
        "difficulty (beginner|intermediate|advanced), action_items (array of strings).\n\n"
        f"Caption: {caption}\nTranscript: {transcript}"
    )
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{settings.ollama_base_url}/api/generate",
                json={"model": settings.ollama_model, "prompt": prompt, "stream": False, "format": "json"},
            )
            response.raise_for_status()
            payload = response.json()
            data = json.loads(payload.get("response", "{}"))
            return {
                "topics": data.get("topics", ["General Tech"]),
                "summary": data.get("summary", caption[:200]),
                "difficulty": data.get("difficulty", "beginner"),
                "action_items": data.get("action_items", []),
                "analysis_mode": "ollama",
            }
    except Exception:
        result = analyze_with_rules(caption, transcript)
        result["analysis_mode"] = "rules_fallback"
        return result


async def analyze_with_openai(caption: str, transcript: str) -> dict[str, Any]:
    settings = get_settings()
    if not settings.openai_api_key:
        result = analyze_with_rules(caption, transcript)
        result["analysis_mode"] = "rules_fallback"
        return result

    from openai import AsyncOpenAI

    client = AsyncOpenAI(api_key=settings.openai_api_key)
    prompt = (
        "Analyze this Instagram reel for a learning roadmap. "
        "Return JSON with keys: topics (array of strings), summary (string), "
        "difficulty (beginner|intermediate|advanced), action_items (array of strings).\n\n"
        f"Caption: {caption}\nTranscript: {transcript}"
    )
    try:
        completion = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
        )
        data = json.loads(completion.choices[0].message.content or "{}")
        return {
            "topics": data.get("topics", ["General Tech"]),
            "summary": data.get("summary", caption[:200]),
            "difficulty": data.get("difficulty", "beginner"),
            "action_items": data.get("action_items", []),
            "analysis_mode": "openai",
        }
    except Exception:
        result = analyze_with_rules(caption, transcript)
        result["analysis_mode"] = "rules_fallback"
        return result


async def analyze_reel(caption: str, transcript: str) -> dict[str, Any]:
    settings = get_settings()
    if settings.billing_mode == "openai":
        return await analyze_with_openai(caption, transcript)
    return await analyze_with_ollama(caption, transcript)
