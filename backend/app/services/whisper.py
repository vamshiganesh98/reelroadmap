async def transcribe_audio(url: str) -> str:
    """Optional Whisper transcription. Returns empty string when unavailable."""
    try:
        import httpx

        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                "http://localhost:9000/transcribe",
                json={"url": url},
            )
            if response.status_code == 200:
                return response.json().get("text", "")
    except Exception:
        pass
    return ""
