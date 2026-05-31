"""
NoBroker scraper — uses their search API endpoint which returns JSON.
"""

import re
import logging
import httpx
from .base import fetch, city_and_locality
from .acres99 import _parse_inr

log = logging.getLogger(__name__)

CITY_IDS = {
    "mumbai": "1", "delhi": "2", "bengaluru": "3", "bangalore": "3",
    "pune": "5", "hyderabad": "4", "chennai": "6",
}


def get_prices(location: str, sqft: int, property_type: str) -> list[float]:
    city, locality = city_and_locality(location)

    # NoBroker has a cleaner URL structure
    city_fmt    = city.replace("-", "")
    local_fmt   = "-".join(w.capitalize() for w in locality.split("-"))
    url = f"https://www.nobroker.in/property/sale/{city_fmt}/{local_fmt}/"

    try:
        html = fetch(url, render_js=True)
        prices = _from_html(html)
        log.info("NoBroker: %d prices for %s", len(prices), location)
        return prices
    except Exception as exc:
        log.warning("NoBroker scrape failed for %s: %s", location, exc)
        return []


def _from_html(html: str) -> list[float]:
    prices = []

    # NoBroker embeds price data in window.__data or similar
    match = re.search(r'"totalPrice"\s*:\s*(\d+)', html)
    if match:
        prices.append(round(int(match.group(1)) / 1_00_000, 1))

    for m in re.finditer(r'"price"\s*:\s*(\d+)', html):
        val = round(int(m.group(1)) / 1_00_000, 1)
        if 1 < val < 100_000:
            prices.append(val)

    # Fallback: HTML price elements
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup.select("[class*='price'], [class*='Price'], [data-price]"):
        val = _parse_inr(tag.get_text(strip=True))
        if val:
            prices.append(val)

    return list(set(prices))[:30]
