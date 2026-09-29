import httpx

from app.config import OLLAMA_BASE_URL, OLLAMA_MODEL, OLLAMA_TIMEOUT_SECONDS
from app.prompts import SYSTEM_PROMPT


def chat_with_ollama(user_message: str) -> str:
    """Send the system prompt and user message to Ollama and return the reply."""
    url = f"{OLLAMA_BASE_URL.rstrip('/')}/api/chat"
    payload = {
        "model": OLLAMA_MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        "stream": False,
    }

    with httpx.Client(timeout=OLLAMA_TIMEOUT_SECONDS) as client:
        response = client.post(url, json=payload)
        response.raise_for_status()
        data = response.json()

    return data["message"]["content"]
