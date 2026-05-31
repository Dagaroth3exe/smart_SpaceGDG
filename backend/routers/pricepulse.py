from fastapi import APIRouter
from pydantic import BaseModel, Field
from services.price_calculator import calculate

router = APIRouter()


class PricePulseRequest(BaseModel):
    location: str = Field(..., example="Bandra West, Mumbai")
    asking_price: float = Field(..., description="Asking price in lakhs", example=58)
    sqft: int = Field(..., example=1050)
    property_type: str = Field(default="Apartment", example="Apartment")


@router.post("/pricepulse")
def pricepulse(req: PricePulseRequest):
    result = calculate(
        asking_price=req.asking_price,
        location=req.location,
        sqft=req.sqft,
        property_type=req.property_type,
    )
    return {
        "asking_price": result.asking_price,
        "market_avg": result.market_avg,
        "circle_rate": result.circle_rate,
        "last_sold_low": result.last_sold_low,
        "last_sold_high": result.last_sold_high,
        "fair_zone_low": result.fair_zone_low,
        "fair_zone_high": result.fair_zone_high,
        "verdict": result.verdict,
        "overpriced_by_pct": result.overpriced_by_pct,
        "negotiation_start": result.negotiation_start,
        "negotiation_tip": result.negotiation_tip,
        "sources": [
            {"source": s.source, "price_lakh": s.price_lakh, "listings_sampled": s.listings_sampled}
            for s in result.sources
        ],
    }
