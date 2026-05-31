from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import pricepulse

app = FastAPI(title="SmartSpace API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://smartspace.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pricepulse.router, prefix="/api")


@app.get("/health")
def health():
    return {"status": "ok"}
