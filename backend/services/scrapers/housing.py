"""
Housing.com scraper.
"""

import re
import json
import logging
from bs4 import BeautifulSoup
from .base import fetch, city_and_locality
from .acres99 import _parse_inr

log = logging.getLogger(__name__)


def get_prices(location: str, sqft: int, property_type: str) -> list[float]:
    city, locality = city_and_locality(location)
    url = f"https://housing.com/in/buy/{locality.replace('-', '_')}/{city.replace('-', '_')}/"

    try:
        html = fetch(url, render_js=True)
        prices = _from_next_data(html) or _from_html(html)
        log.info("Housing.com: %d prices for %s", len(prices), location)
        return prices
    except Exception as exc:
        log.warning("Housing.com scrape failed for %s: %s", location, exc)
        return []


def _from_next_data(html: str) -> list[float]:
    match = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL)
    if not match:
        return []
    prices = []
    try:
        data = json.loads(match.group(1))
        _collect(data, prices, depth=0)
    except Exception:
        pass
    return [p for p in prices if 1 < p < 100_000]


def _collect(obj, out: list, depth: int):
    if depth > 10:
        return
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k.lower() in ("price", "minprice", "maxprice", "askingprice"):
                val = _parse_inr(str(v)) if isinstance(v, str) else (
                    round(v / 1_00_000, 1) if isinstance(v, (int, float)) and v > 1000 else None
                )
                if val and 1 < val < 100_000:
                    out.append(val)
            else:
                _collect(v, out, depth + 1)
    elif isinstance(obj, list):
        for item in obj:
            _collect(item, out, depth + 1)


def _from_html(html: str) -> list[float]:
    soup = BeautifulSoup(html, "html.parser")
    prices = []
    for tag in soup.select(
        "[class*='price'], [class*='Price'], [data-price], "
        ".css-price, [class*='amount']"
    ):
        val = _parse_inr(tag.get_text(strip=True))
        if val:
            prices.append(val)
    return prices[:30]
