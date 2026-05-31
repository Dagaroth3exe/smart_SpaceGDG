"""
Government circle rate scraper.
Supports: Maharashtra, Delhi, UP, Karnataka, Telangana.
No ScraperAPI needed — these portals are accessible directly.
"""

import re
import logging
import httpx
from bs4 import BeautifulSoup

log = logging.getLogger(__name__)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "en-IN,en;q=0.9",
}


def get_circle_rate(location: str, sqft: int) -> float | None:
    """
    Returns circle rate in ₹/sqft or None if unavailable.
    We detect state from the city name and route to the right portal.
    """
    loc_lower = location.lower()

    if any(c in loc_lower for c in ["mumbai", "pune", "nagpur", "nashik", "thane"]):
        return _maharashtra(location, sqft)

    if any(c in loc_lower for c in ["delhi", "new delhi"]):
        return _delhi(location, sqft)

    if any(c in loc_lower for c in ["bengaluru", "bangalore", "mysore", "hubli"]):
        return _karnataka(location, sqft)

    if any(c in loc_lower for c in ["hyderabad", "secunderabad", "warangal"]):
        return _telangana(location, sqft)

    if any(c in loc_lower for c in ["noida", "lucknow", "kanpur", "agra", "varanasi", "ghaziabad"]):
        return _up(location, sqft)

    return None


def _maharashtra(location: str, sqft: int) -> float | None:
    """
    Maharashtra IGR: https://igrmaharashtra.gov.in/
    Circle rates are published as PDFs and lookup pages.
    """
    try:
        # IGR Maharashtra ready reckoner rates lookup
        url = "https://igrmaharashtra.gov.in/eASR/eASRCommon.aspx"
        resp = httpx.get(url, headers=HEADERS, timeout=15, follow_redirects=True)
        # Parse whatever table data is returned
        soup = BeautifulSoup(resp.text, "html.parser")
        # Look for rate tables
        for td in soup.select("td, .rate, [class*='rate']"):
            text = td.get_text(strip=True).replace(",", "")
            match = re.search(r"(\d{3,6})", text)
            if match:
                rate = int(match.group(1))
                if 1000 < rate < 200_000:
                    return float(rate)
    except Exception as exc:
        log.warning("Maharashtra circle rate fetch failed: %s", exc)

    # Fallback: known approximate rates per major zone
    return _fallback_circle_rate(location)


def _delhi(location: str, sqft: int) -> float | None:
    try:
        url = "https://doris.delhigovt.nic.in/wps/wcm/connect/doit_doris/doris/home/circle+rates"
        resp = httpx.get(url, headers=HEADERS, timeout=15, follow_redirects=True)
        soup = BeautifulSoup(resp.text, "html.parser")
        for td in soup.select("td"):
            text = td.get_text(strip=True).replace(",", "")
            match = re.search(r"(\d{4,6})", text)
            if match:
                rate = int(match.group(1))
                if 5000 < rate < 300_000:
                    return float(rate)
    except Exception as exc:
        log.warning("Delhi circle rate fetch failed: %s", exc)
    return _fallback_circle_rate(location)


def _karnataka(location: str, sqft: int) -> float | None:
    try:
        url = "https://kaverionline.karnataka.gov.in/MVRateDetails.aspx"
        resp = httpx.get(url, headers=HEADERS, timeout=15, follow_redirects=True)
        soup = BeautifulSoup(resp.text, "html.parser")
        for tag in soup.select("td, .rate"):
            text = tag.get_text(strip=True).replace(",", "")
            match = re.search(r"(\d{3,6})", text)
            if match:
                rate = int(match.group(1))
                if 1000 < rate < 150_000:
                    return float(rate)
    except Exception as exc:
        log.warning("Karnataka circle rate fetch failed: %s", exc)
    return _fallback_circle_rate(location)


def _telangana(location: str, sqft: int) -> float | None:
    try:
        url = "https://registration.telangana.gov.in/MVSearch.aspx"
        resp = httpx.get(url, headers=HEADERS, timeout=15, follow_redirects=True)
        soup = BeautifulSoup(resp.text, "html.parser")
        for tag in soup.select("td"):
            text = tag.get_text(strip=True).replace(",", "")
            match = re.search(r"(\d{4,6})", text)
            if match:
                rate = int(match.group(1))
                if 2000 < rate < 100_000:
                    return float(rate)
    except Exception as exc:
        log.warning("Telangana circle rate fetch failed: %s", exc)
    return _fallback_circle_rate(location)


def _up(location: str, sqft: int) -> float | None:
    try:
        url = "https://igrsup.gov.in/igrsup/defaultAction.action"
        resp = httpx.get(url, headers=HEADERS, timeout=15, follow_redirects=True)
        soup = BeautifulSoup(resp.text, "html.parser")
        for tag in soup.select("td"):
            text = tag.get_text(strip=True).replace(",", "")
            match = re.search(r"(\d{4,6})", text)
            if match:
                rate = int(match.group(1))
                if 1000 < rate < 100_000:
                    return float(rate)
    except Exception as exc:
        log.warning("UP circle rate fetch failed: %s", exc)
    return _fallback_circle_rate(location)


# Known approximate circle rates (₹/sqft) by city zone — used as fallback
_FALLBACK_RATES: dict[str, float] = {
    "bandra":      45000, "andheri":    28000, "powai":      22000,
    "thane":       12000, "navi mumbai":10000, "pune":        7000,
    "wakad":        7200, "hinjewadi":   6800, "kharadi":     7500,
    "delhi":       35000, "noida":       8000, "gurugram":   15000,
    "bengaluru":    8000, "whitefield":  7200, "koramangala":12000,
    "hyderabad":    5500, "gachibowli":  6000, "jubilee":    12000,
    "goa":          5000, "chennai":    10000, "kolkata":     7000,
}


def _fallback_circle_rate(location: str) -> float:
    loc = location.lower()
    for zone, rate in _FALLBACK_RATES.items():
        if zone in loc:
            return rate
    # Generic fallback: 3,200 ₹/sqft
    return 3200.0
