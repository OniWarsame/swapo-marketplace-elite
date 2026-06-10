import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { useState } from "react";

export function ProductCard({ p }: { p: Product }) {
  const [fav, setFav] = useState(false);
  return (
    <Link
      to="/p/$id"
      params={{ id: p.id }}
      className="group block overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {p.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
            ★ Featured
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setFav(!fav); }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur hover:bg-background"
          aria-label="Save"
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="price-tag text-xl text-ink">${p.price}</span>
          {p.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">${p.originalPrice}</span>
          )}
        </div>
        <div className="mt-1 line-clamp-1 text-sm font-semibold text-ink">{p.title}</div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.distanceKm} km</span>
          <span className="chip !py-0.5 !px-2 !text-[10px]">{p.condition}</span>
        </div>
      </div>
    </Link>
  );
}
