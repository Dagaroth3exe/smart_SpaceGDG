"use client";

import { useState } from "react";
import Image from "next/image";

const PROPS = [
  { id:1, title:"Skyline Residency 3BHK", location:"Bandra West, Mumbai",     price:"₹2.4 Cr", type:"Apartment", beds:3, sqft:1420, img:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=75", score:97 },
  { id:2, title:"Green Valley Villa",      location:"Whitefield, Bengaluru",   price:"₹1.8 Cr", type:"Villa",     beds:4, sqft:2800, img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=75", score:94 },
  { id:3, title:"Meridian Heights 2BHK",   location:"Gachibowli, Hyderabad",   price:"₹68 L",   type:"Apartment", beds:2, sqft:1050, img:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=75", score:89 },
  { id:4, title:"Coastal Breeze Studio",   location:"Panaji, Goa",             price:"₹42 L",   type:"Studio",    beds:1, sqft:580,  img:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=75", score:85 },
  { id:5, title:"Urban Nest 3BHK",         location:"Wakad, Pune",             price:"₹94 L",   type:"Apartment", beds:3, sqft:1180, img:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=75", score:91 },
  { id:6, title:"Prestige Towers 4BHK",    location:"Jubilee Hills, Hyderabad",price:"₹3.1 Cr", type:"Luxury",    beds:4, sqft:2200, img:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=75", score:96 },
];

const FILTERS = ["All", "Apartment", "Villa", "Studio", "Luxury"];

export default function PropertyListings() {
  const [active, setActive] = useState("All");
  const [saved, setSaved] = useState<number[]>([]);

  const list = active === "All" ? PROPS : PROPS.filter((p) => p.type === active);

  return (
    <section id="listings" className="py-24 px-6 border-t border-white/6">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs text-[#555] uppercase tracking-widest mb-3">Listings</p>
            <h2 className="text-3xl font-semibold text-white">Featured properties</h2>
          </div>
          <div className="flex gap-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                  active === f ? "bg-white/10 text-white" : "text-[#666] hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((p) => (
            <div key={p.id} className="border border-white/6 rounded-xl overflow-hidden hover:border-white/14 transition-colors group">
              <div className="relative h-44 bg-white/4">
                <Image src={p.img} alt={p.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" />
                <button
                  onClick={() => setSaved((s) => s.includes(p.id) ? s.filter((x) => x !== p.id) : [...s, p.id])}
                  className="absolute top-3 right-3 w-7 h-7 rounded-md bg-black/50 backdrop-blur-sm flex items-center justify-center text-[#888] hover:text-white transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={saved.includes(p.id) ? "white" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-white leading-snug">{p.title}</p>
                  <p className="text-sm font-semibold text-white shrink-0">{p.price}</p>
                </div>
                <p className="text-xs text-[#555] mb-3">{p.location}</p>
                <div className="flex items-center gap-3 text-xs text-[#555]">
                  <span>{p.beds} beds</span>
                  <span>·</span>
                  <span>{p.sqft.toLocaleString()} sqft</span>
                  <span className="ml-auto text-[#888]">AI {p.score}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="text-sm text-[#555] hover:text-white transition-colors">
            View all properties →
          </button>
        </div>

      </div>
    </section>
  );
}
