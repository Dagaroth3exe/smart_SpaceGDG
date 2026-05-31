"use client";

import { useState } from "react";
import Image from "next/image";

type Property = {
  id: number;
  title: string;
  location: string;
  price: string;
  pricePerSqft: string;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  tag: string;
  tagColor: string;
  img: string;
  aiScore: number;
  trend: string;
};

const properties: Property[] = [
  {
    id: 1,
    title: "Skyline Residency 3BHK",
    location: "Bandra West, Mumbai",
    price: "₹2.4 Cr",
    pricePerSqft: "₹28,500/sqft",
    type: "Apartment",
    beds: 3,
    baths: 2,
    sqft: 1420,
    tag: "AI Top Pick",
    tagColor: "from-brand-500 to-accent-500",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    aiScore: 97,
    trend: "+12%",
  },
  {
    id: 2,
    title: "Green Valley Villa",
    location: "Whitefield, Bengaluru",
    price: "₹1.8 Cr",
    pricePerSqft: "₹12,200/sqft",
    type: "Villa",
    beds: 4,
    baths: 3,
    sqft: 2800,
    tag: "High ROI",
    tagColor: "from-accent-500 to-teal-400",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    aiScore: 94,
    trend: "+18%",
  },
  {
    id: 3,
    title: "Meridian Heights 2BHK",
    location: "Gachibowli, Hyderabad",
    price: "₹68 L",
    pricePerSqft: "₹6,800/sqft",
    type: "Apartment",
    beds: 2,
    baths: 2,
    sqft: 1050,
    tag: "Under Budget",
    tagColor: "from-yellow-500 to-orange-400",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    aiScore: 89,
    trend: "+9%",
  },
  {
    id: 4,
    title: "Coastal Breeze Studio",
    location: "Panaji, Goa",
    price: "₹42 L",
    pricePerSqft: "₹7,200/sqft",
    type: "Studio",
    beds: 1,
    baths: 1,
    sqft: 580,
    tag: "Trending",
    tagColor: "from-pink-500 to-rose-400",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    aiScore: 85,
    trend: "+22%",
  },
  {
    id: 5,
    title: "Urban Nest 3BHK",
    location: "Wakad, Pune",
    price: "₹94 L",
    pricePerSqft: "₹8,800/sqft",
    type: "Apartment",
    beds: 3,
    baths: 2,
    sqft: 1180,
    tag: "New Launch",
    tagColor: "from-violet-500 to-purple-400",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
    aiScore: 91,
    trend: "+7%",
  },
  {
    id: 6,
    title: "Prestige Towers 4BHK",
    location: "Jubilee Hills, Hyderabad",
    price: "₹3.1 Cr",
    pricePerSqft: "₹21,000/sqft",
    type: "Luxury",
    beds: 4,
    baths: 4,
    sqft: 2200,
    tag: "Luxury",
    tagColor: "from-yellow-400 to-amber-500",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    aiScore: 96,
    trend: "+15%",
  },
];

const filters = ["All", "Apartment", "Villa", "Studio", "Luxury"];

export default function PropertyListings() {
  const [active, setActive] = useState("All");
  const [saved, setSaved] = useState<number[]>([]);

  const filtered =
    active === "All" ? properties : properties.filter((p) => p.type === active);

  return (
    <section id="listings" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-3">
              AI-Curated
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Featured
              <span className="gradient-text"> Properties</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 glass p-1.5 rounded-2xl">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  active === f
                    ? "bg-brand-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              isSaved={saved.includes(p.id)}
              onSave={() =>
                setSaved((prev) =>
                  prev.includes(p.id)
                    ? prev.filter((id) => id !== p.id)
                    : [...prev, p.id]
                )
              }
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3.5 glass glass-hover rounded-2xl text-sm font-medium text-slate-300 hover:text-white transition-all">
            View all 2,400+ properties →
          </button>
        </div>
      </div>
    </section>
  );
}

function PropertyCard({
  property: p,
  isSaved,
  onSave,
}: {
  property: Property;
  isSaved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="glass rounded-3xl overflow-hidden group hover:border-brand-500/25 transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={p.img}
          alt={p.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Tag */}
        <div
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${p.tagColor}`}
        >
          {p.tag}
        </div>

        {/* Save btn */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
            isSaved
              ? "bg-red-500 text-white"
              : "bg-black/40 text-white hover:bg-black/60"
          }`}
        >
          <HeartIcon filled={isSaved} />
        </button>

        {/* AI score */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg">
          <span className="text-xs text-accent-400 font-semibold">AI {p.aiScore}%</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-white text-sm mb-0.5 group-hover:text-brand-300 transition-colors">
              {p.title}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <PinIcon />
              {p.location}
            </p>
          </div>
          <div className="text-right shrink-0 ml-3">
            <p className="font-bold text-white text-base">{p.price}</p>
            <p className="text-xs text-slate-500">{p.pricePerSqft}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/5 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <BedIcon /> {p.beds} beds
          </span>
          <span className="flex items-center gap-1">
            <BathIcon /> {p.baths} baths
          </span>
          <span className="flex items-center gap-1">
            <SqftIcon /> {p.sqft.toLocaleString()} sqft
          </span>
          <span className="ml-auto text-accent-400 font-medium">{p.trend} YoY</span>
        </div>
      </div>
    </div>
  );
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const PinIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const BedIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v6H2" /><path d="M6 8v4" />
  </svg>
);
const BathIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><line x1="10" y1="5" x2="8" y2="7" /><line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);
const SqftIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);
