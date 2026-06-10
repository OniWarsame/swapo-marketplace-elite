import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/lib/mock-data";
import { ArrowRight, Sparkles, ShieldCheck, Zap, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swapo — Sell anything. Find anything." },
      { name: "description", content: "Buy and sell second-hand in your neighborhood. Cameras, bikes, furniture, fashion — discover thousands of nearby listings on Swapo." },
      { property: "og:title", content: "Swapo — Sell anything. Find anything." },
      { property: "og:description", content: "The friendly second-hand marketplace for your neighborhood." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.featured);
  const latest = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="grain-bg relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <span className="chip"><Sparkles className="h-3.5 w-3.5 text-primary" /> 48,210 listings nearby</span>
            <h1 className="mt-5 font-display text-5xl font-black leading-[0.95] text-ink sm:text-6xl md:text-7xl lg:text-8xl">
              Sell <em className="not-italic text-primary">anything.</em><br/>
              Find <span className="relative inline-block">
                <span className="relative z-10">anything.</span>
                <span className="absolute inset-x-0 bottom-1 h-3 -rotate-1 bg-sun/70" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Swapo is the friendliest way to buy and sell second-hand in your neighborhood. Snap a photo, set a price, swap with people you trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/sell" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110">
                Start selling <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/browse" className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-7 py-4 text-base font-semibold text-ink hover:bg-secondary">
                Browse marketplace
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {products.slice(0,4).map(p => (
                  <img key={p.id} src={p.seller.avatar} alt="" className="h-10 w-10 rounded-full border-2 border-background object-cover" />
                ))}
              </div>
              <div className="text-sm">
                <div className="font-semibold text-ink">★ 4.9 from 12k+ swappers</div>
                <div className="text-muted-foreground">Loved across 240+ cities</div>
              </div>
            </div>
          </div>

          {/* Hero collage */}
          <div className="relative md:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src={products[0].image} alt="" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl" />
                <img src={products[3].image} alt="" className="aspect-square w-full rounded-3xl object-cover shadow-xl" />
              </div>
              <div className="space-y-4 pt-10">
                <img src={products[1].image} alt="" className="aspect-square w-full rounded-3xl object-cover shadow-xl" />
                <img src={products[7].image} alt="" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl" />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rotate-[-6deg] rounded-2xl bg-card p-3 shadow-2xl sm:block">
              <div className="flex items-center gap-3 px-2">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-mint"><MessageCircle className="h-4 w-4 text-ink" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">New offer</div>
                  <div className="text-sm font-bold text-ink">$180 for the camera</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-2 top-4 hidden rotate-[5deg] rounded-2xl bg-primary px-3 py-2 text-primary-foreground shadow-2xl sm:block">
              <div className="text-[10px] uppercase tracking-wider opacity-80">SOLD in</div>
              <div className="font-display text-lg font-black">2h 14m</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-black sm:text-4xl">Shop by category</h2>
            <p className="mt-1 text-sm text-muted-foreground">Thousands of items, refreshed every minute.</p>
          </div>
          <Link to="/browse" className="hidden text-sm font-semibold text-primary hover:underline sm:block">View all →</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/browse"
              search={{ category: c.slug } as never}
              className="group flex flex-col items-center gap-2 rounded-3xl border border-border bg-card p-5 text-center transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <span className="text-3xl transition group-hover:scale-110">{c.emoji}</span>
              <span className="text-sm font-semibold text-ink">{c.name}</span>
              <span className="text-[10px] text-muted-foreground">{c.count.toLocaleString()} items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-end justify-between">
          <div>
            <span className="chip"><Sparkles className="h-3.5 w-3.5 text-primary" /> Editor's picks</span>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Featured today</h2>
          </div>
          <Link to="/browse" className="text-sm font-semibold text-primary hover:underline">See all →</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto mt-10 max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-background sm:px-14">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">
                Sell in <span className="text-mint">60 seconds.</span>
              </h2>
              <p className="mt-4 max-w-md text-background/70">
                Snap, price, post. Then chat directly with buyers nearby and swap when it works for you.
              </p>
              <Link to="/sell" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground hover:brightness-110">
                Post your first listing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { i: <Zap className="h-5 w-5" />, t: "Snap", d: "Add up to 12 photos and a short video." },
                { i: <Sparkles className="h-5 w-5" />, t: "Price", d: "AI suggests a fair price based on similar items." },
                { i: <MessageCircle className="h-5 w-5" />, t: "Chat", d: "Negotiate, share offers, agree to meet." },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl bg-background/5 p-5 ring-1 ring-background/10">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-ink">{s.i}</div>
                  <div className="mt-4 font-display text-xl font-bold">{s.t}</div>
                  <div className="mt-1 text-sm text-background/70">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LATEST */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-black sm:text-4xl">Fresh listings near you</h2>
          <Link to="/browse" className="text-sm font-semibold text-primary hover:underline">Browse all →</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {latest.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { i: ShieldCheck, t: "Verified profiles", d: "Email, phone, and ID checks for safer swaps." },
            { i: MessageCircle, t: "Built-in chat", d: "Negotiate, share offers, send voice notes." },
            { i: Sparkles, t: "Smart AI tools", d: "Auto-descriptions, price hints, scam detection." },
          ].map((b, i) => (
            <div key={i} className="rounded-3xl border border-border bg-card p-7">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-ink"><b.i className="h-5 w-5" /></div>
              <div className="mt-5 font-display text-xl font-bold">{b.t}</div>
              <div className="mt-2 text-sm text-muted-foreground">{b.d}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
