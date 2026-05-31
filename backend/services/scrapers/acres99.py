"""
99acres scraper.
Extracts prices from the embedded __NEXT_DATA__ JSON first,
then falls back to BeautifulSoup HTML parsing.
"""

import json
import re
import logging
from bs4 import BeautifulSoup
from .base import fetch, city_and_locality

log = logging.getLogger(__name__)

# 99acres city code map (add more as needed)
CITY_CODES = {
    "mumbai": 6, "delhi": 2, "bengaluru": 9, "bangalore": 9,
    "hyderabad": 10, "pune": 7, "chennai": 5, "kolkata": 4,
    "ahmedabad": 17, "goa": 37, "noida": 19, "gurugram": 18,
}


def get_prices(location: str, sqft: int, property_type: str) -> list[float]:
    city, locality = city_and_locality(location)
    city_code = CITY_CODES.get(city, 6)

    url = (
        f"https://www.99acres.com/search/property/buy/{locality.replace(' ', '-')}"
        f"?city={city_code}&res_com=R&category=15&bedroom=-1"
    )

    try:
        html = fetch(url, render_js=True)
        prices = _extract_from_next_data(html)
        if not prices:
            prices = _extract_from_html(html)
        log.info("99acres: extracted %d prices for %s", len(prices), location)
        return prices
    except Exception as exc:
        log.warning("99acres scrape failed for %s: %s", location, exc)
        return []


def _extract_from_next_data(html: str) -> list[float]:
    """Pull prices from Next.js JSON payload embedded in the page."""
    match = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL)
    if not match:
        return []

    try:
        data = json.loads(match.group(1))
        listings = _deep_find(data, "price") or _deep_find(data, "PRICE") or []
        return _to_lakhs_list(listings)
    except (json.JSONDecodeError, Exception):
        return []


def _extract_from_html(html: str) -> list[float]:
    soup = BeautifulSoup(html, "html.parser")
    prices: list[float] = []

    # 99acres price patterns in their listing cards
    for tag in soup.select(
        "[data-price], .price, .mb-2 .fw-700, "
        "[class*='price'], [class*='Price']"
    ):
        text = tag.get_text(strip=True)
        val = _parse_inr(text)
        if val:
            prices.append(val)

    return prices[:30]


def _parse_inr(text: str) -> float | None:
    """Parse Indian currency strings → lakhs float."""
    text = text.replace(",", "").replace("₹", "").strip()
    cr = re.search(r"([\d.]+)\s*(?:Cr|crore)", text, re.I)
    if cr:
        return round(float(cr.group(1)) * 100, 1)
    lakh = re.search(r"([\d.]+)\s*(?:L|Lac|Lakh)", text, re.I)
    if lakh:
        return float(lakh.group(1))
    raw = re.search(r"(\d{5,10})", text)
    if raw:
        val = int(raw.group(1))
        if val > 10_00_000:           # > 10L in paise/rupees
            return round(val / 1_00_000, 1)
    return None


def _to_lakhs_list(raw) -> list[float]:
    results = []
    if isinstance(raw, list):
        for item in raw:
            if isinstance(item, (int, float)) and item > 0:
                # Normalise: assume values >1000 are in ₹, convert to lakhs
                results.append(round(item / 1_00_000, 1) if item > 1000 else item)
            elif isinstance(item, str):
                v = _parse_inr(item)
                if v:
                    results.append(v)
    return [p for p in results if 1 < p < 100_000]


def _deep_find(obj, key, depth=0):
    """Recursively find all values for a key in nested JSON."""
    if depth > 8:
        return None
    if isinstance(obj, dict):
        if key in obj:
            return obj[key]
        for v in obj.values():
            found = _deep_find(v, key, depth + 1)
            if found:
                return found
    elif isinstance(obj, list):
        results = []
        for item in obj:
            found = _deep_find(item, key, depth + 1)
            if found:
                if isinstance(found, list):
                    results.extend(found)
                else:
                    results.append(found)
        return results or None
    return None
