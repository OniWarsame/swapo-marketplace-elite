import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { useState } from "react";
import { useCurrency } from "@/lib/currency";

export function ProductCard({ p }: { p: Product }) {
  const [fav, setFav] = useState(false);
  const { format } = useCurrency();
  return (
    <Link
      to="/p/$id"
      params={{ id: p.id }}
      className="group relative block overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_rgba(108,99,255,0.5)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />
        {p.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg">
            ★ Featured
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setFav(!fav); }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass hover:scale-110"
          aria-label="Save"
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-coral text-coral" : "text-ink"}`} />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="line-clamp-1 text-sm font-semibold text-ink">{p.title}</div>
          <div className="mt-1.5 flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span className="price-tag text-2xl text-ink">{format(p.price)}</span>
              {p.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">{format(p.originalPrice)}</span>
              )}
            </div>
            <span className="rounded-full bg-deep/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mint">{p.condition}</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3" /> {p.location.split(",")[1] ?? p.location} · {p.distanceKm} km
          </div>
        </div>
      </div>
    </Link>
  );
}
