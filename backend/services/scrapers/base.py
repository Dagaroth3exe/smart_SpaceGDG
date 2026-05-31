"""
ScraperAPI client — single entry point for all HTTP fetches.
Handles Cloudflare, CAPTCHAs, and JS rendering transparently.
"""

import os
import httpx
from urllib.parse import urlencode

SCRAPER_API_KEY = os.getenv("SCRAPER_API_KEY", "")
_BASE = "https://api.scraperapi.com/"


def fetch(url: str, render_js: bool = False, timeout: int = 30) -> str:
    """Fetch a URL through ScraperAPI. Raises on HTTP error."""
    params = {
        "api_key": SCRAPER_API_KEY,
        "url": url,
        "render": "true" if render_js else "false",
        "country_code": "in",         # use Indian IP for accurate pricing
        "keep_headers": "true",
    }
    resp = httpx.get(_BASE, params=params, timeout=timeout)
    resp.raise_for_status()
    return resp.text


async def fetch_async(client: httpx.AsyncClient, url: str, render_js: bool = False) -> str:
    params = {
        "api_key": SCRAPER_API_KEY,
        "url": url,
        "render": "true" if render_js else "false",
        "country_code": "in",
    }
    resp = await client.get(_BASE, params=params, timeout=30)
    resp.raise_for_status()
    return resp.text


def slug(text: str) -> str:
    """'Bandra West, Mumbai' → 'bandra-west-mumbai'"""
    return (
        text.lower()
        .replace(",", "")
        .replace("  ", " ")
        .strip()
        .replace(" ", "-")
    )


def city_and_locality(location: str) -> tuple[str, str]:
    """'Bandra West, Mumbai' → ('mumbai', 'bandra-west')"""
    parts = [p.strip() for p in location.split(",")]
    if len(parts) >= 2:
        city = parts[-1].strip()
        locality = ", ".join(parts[:-1]).strip()
    else:
        city = parts[0]
        locality = parts[0]
    return city.lower().replace(" ", "-"), locality.lower().replace(" ", "-")
