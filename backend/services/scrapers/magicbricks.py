"""
MagicBricks scraper.
"""

import re
import json
import logging
from bs4 import BeautifulSoup
from .base import fetch, city_and_locality
from .acres99 import _parse_inr

log = logging.getLogger(__name__)

PROP_TYPE_MAP = {
    "Apartment": "Multistorey-Apartment,Builder-Floor-Apartment,Studio-Apartment",
    "Villa":     "Villa",
    "Plot":      "Residential-Plot",
    "Studio":    "Studio-Apartment",
    "Commercial":"Office-Space,Commercial-Shop",
}


def get_prices(location: str, sqft: int, property_type: str) -> list[float]:
    city, locality = city_and_locality(location)
    ptype = PROP_TYPE_MAP.get(property_type, PROP_TYPE_MAP["Apartment"])

    city_fmt   = city.replace("-", " ").title()
    local_fmt  = "-".join(w.title() for w in locality.split("-"))

    url = (
        "https://www.magicbricks.com/property-for-sale/residential-real-estate"
        f"?proptype={ptype}&cityName={city_fmt}&localityName={local_fmt}"
    )

    try:
        html = fetch(url, render_js=True)
        prices = _from_json_ld(html) or _from_html(html)
        log.info("MagicBricks: %d prices for %s", len(prices), location)
        return prices
    except Exception as exc:
        log.warning("MagicBricks scrape failed for %s: %s", location, exc)
        return []


def _from_json_ld(html: str) -> list[float]:
    prices = []
    for script in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL):
        try:
            obj = json.loads(script)
            _collect_prices(obj, prices)
        except Exception:
            pass
    return prices


def _collect_prices(obj, out: list):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k.lower() in ("price", "lowprice", "highprice"):
                val = _parse_inr(str(v))
                if val:
                    out.append(val)
            else:
                _collect_prices(v, out)
    elif isinstance(obj, list):
        for item in obj:
            _collect_prices(item, out)


def _from_html(html: str) -> list[float]:
    soup = BeautifulSoup(html, "html.parser")
    prices = []
    for tag in soup.select(
        ".mb-srp__card--price, [class*='price'], [class*='Price'], "
        "[data-price], .price__value"
    ):
        val = _parse_inr(tag.get_text(strip=True))
        if val:
            prices.append(val)
    return prices[:30]
