"""
Core PricePulse calculation logic.
Swap mock_scrape_listings() with real scrapers once API keys / proxies are ready.
"""

from dataclasses import dataclass


@dataclass
class SourcePrice:
    source: str
    price_lakh: float
    listings_sampled: int


@dataclass
class PricePulseResult:
    asking_price: float          # in lakhs
    market_avg: float
    circle_rate: float
    last_sold_low: float
    last_sold_high: float
    fair_zone_low: float
    fair_zone_high: float
    verdict: str                 # FAIR | SLIGHTLY_HIGH | OVERPRICED | UNDERPRICED
    overpriced_by_pct: float     # negative means underpriced
    negotiation_start: float
    negotiation_tip: str
    sources: list[SourcePrice]


def calculate(
    asking_price: float,
    location: str,
    sqft: int,
    property_type: str,
) -> PricePulseResult:
    sources = mock_scrape_listings(location, sqft, property_type)
    prices = sorted([s.price_lakh for s in sources])

    # Trim top and bottom 10%
    trim = max(1, len(prices) // 10)
    trimmed = prices[trim:-trim] if len(prices) > 2 * trim else prices
    market_avg = round(sum(trimmed) / len(trimmed), 2)

    circle_rate = mock_circle_rate(location, sqft)
    last_sold_low, last_sold_high = mock_last_sold(location, sqft, property_type)

    fair_zone_low = round((market_avg + last_sold_low) / 2, 2)
    fair_zone_high = round((market_avg + last_sold_high) / 2, 2)

    overpriced_by_pct = round((asking_price - fair_zone_high) / fair_zone_high * 100, 1)

    if overpriced_by_pct <= -5:
        verdict = "UNDERPRICED"
    elif overpriced_by_pct <= 5:
        verdict = "FAIR"
    elif overpriced_by_pct <= 15:
        verdict = "SLIGHTLY_HIGH"
    else:
        verdict = "OVERPRICED"

    negotiation_start = round(fair_zone_low * 0.96, 2)
    negotiation_tip = build_tip(verdict, asking_price, fair_zone_low, fair_zone_high, negotiation_start, location)

    return PricePulseResult(
        asking_price=asking_price,
        market_avg=market_avg,
        circle_rate=circle_rate,
        last_sold_low=last_sold_low,
        last_sold_high=last_sold_high,
        fair_zone_low=fair_zone_low,
        fair_zone_high=fair_zone_high,
        verdict=verdict,
        overpriced_by_pct=overpriced_by_pct,
        negotiation_start=negotiation_start,
        negotiation_tip=negotiation_tip,
        sources=sources,
    )


def build_tip(verdict, asking, low, high, start, location):
    gap = round(asking - high, 1)
    if verdict == "OVERPRICED":
        return (
            f"This property is priced ₹{gap}L above the fair zone. "
            f"Start your offer at ₹{start}L — comparable listings in {location} "
            f"have closed between ₹{low}L–₹{high}L in the last 90 days."
        )
    if verdict == "SLIGHTLY_HIGH":
        return (
            f"Slightly above market. A counter-offer of ₹{start}L is reasonable. "
            f"Mention that similar units in {location} closed near ₹{low}L recently."
        )
    if verdict == "FAIR":
        return (
            f"This is fairly priced. You can still negotiate 2–3% down. "
            f"Ask for extras: parking, white-goods, or delayed possession penalty waiver."
        )
    return (
        f"This looks underpriced vs. the {location} market. "
        f"Act fast — similar properties are listed at ₹{high}L+."
    )


# ── Mock data (replace with real scrapers) ──────────────────────────────────

def mock_scrape_listings(location: str, sqft: int, property_type: str) -> list[SourcePrice]:
    base = sqft * 4800 / 100_000  # rough ₹4,800/sqft → lakhs
    return [
        SourcePrice("99acres",      round(base * 1.08, 1), 12),
        SourcePrice("MagicBricks",  round(base * 1.05, 1), 9),
        SourcePrice("NoBroker",     round(base * 0.97, 1), 7),
        SourcePrice("Housing.com",  round(base * 1.02, 1), 11),
        SourcePrice("OLX Realty",   round(base * 0.94, 1), 5),
    ]


def mock_circle_rate(location: str, sqft: int) -> float:
    return round(sqft * 3200 / 100_000, 1)


def mock_last_sold(location: str, sqft: int, property_type: str) -> tuple[float, float]:
    base = sqft * 4400 / 100_000
    return round(base * 0.96, 1), round(base * 1.02, 1)
