import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/lib/mock-data";
import { useState, useMemo } from "react";
import { SlidersHorizontal, MapPin } from "lucide-react";
import { useCurrency } from "@/lib/currency";


type Search = { q?: string; category?: string };

export const Route = createFileRoute("/browse")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({ meta: [{ title: "Browse — Swapo" }, { name: "description", content: "Browse thousands of second-hand listings near you." }] }),
  component: Browse,
});

function Browse() {
  const { q, category } = Route.useSearch();
  const { format } = useCurrency();

  const [cat, setCat] = useState(category ?? "all");
  const [cond, setCond] = useState<string>("any");
  const [price, setPrice] = useState(1000);

  const filtered = useMemo(() => products.filter(p =>
    (cat === "all" || p.category === cat) &&
    (cond === "any" || p.condition === cond) &&
    p.price <= price &&
    (!q || p.title.toLowerCase().includes(q.toLowerCase()))
  ), [cat, cond, price, q]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-black sm:text-5xl">
              {q ? <>Results for <em className="not-italic text-primary">"{q}"</em></> : "Browse marketplace"}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> Showing items near Brooklyn, NY · {filtered.length} results
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Filters */}
          <aside className="space-y-6 rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-28 lg:h-fit">
            <div className="flex items-center gap-2 text-sm font-bold"><SlidersHorizontal className="h-4 w-4" /> Filters</div>

            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</div>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => setCat("all")} className={`chip ${cat==="all" ? "!bg-ink !text-background !border-ink" : ""}`}>All</button>
                {categories.map(c => (
                  <button key={c.slug} onClick={() => setCat(c.slug)} className={`chip ${cat===c.slug ? "!bg-ink !text-background !border-ink" : ""}`}>
                    {c.emoji} {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Condition</div>
              <div className="flex flex-wrap gap-1.5">
                {["any", "New", "Like new", "Good", "Fair"].map(c => (
                  <button key={c} onClick={() => setCond(c)} className={`chip ${cond===c ? "!bg-ink !text-background !border-ink" : ""}`}>{c === "any" ? "Any" : c}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <span>Max price</span><span className="text-ink">{format(price)}</span>
              </div>
              <input type="range" min={20} max={1000} value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full accent-primary" />
            </div>

            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Distance</div>
              <select className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
                <option>Within 5 km</option>
                <option>Within 10 km</option>
                <option>Within 25 km</option>
                <option>Any distance</option>
              </select>
            </div>
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center">
                <div className="text-5xl">🔍</div>
                <p className="mt-3 font-display text-2xl font-bold">No matches yet</p>
                <p className="mt-1 text-sm text-muted-foreground">Try widening your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {filtered.map(p => <ProductCard key={p.id} p={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
