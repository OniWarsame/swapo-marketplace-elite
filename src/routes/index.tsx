import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/lib/mock-data";
import { useCurrency } from "@/lib/currency";
import { ArrowRight, Sparkles, ShieldCheck, Zap, MessageCircle, ChevronRight } from "lucide-react";
import { useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swapo — Buy, sell & swap smarter" },
      { name: "description", content: "Swapo is the friendly marketplace for buying and selling second-hand. Discover thousands of nearby listings across electronics, fashion, home, and more." },
      { property: "og:title", content: "Swapo — Buy, sell & swap smarter" },
      { property: "og:description", content: "The friendly second-hand marketplace for your neighborhood." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.featured);
  const latest = products.slice(0, 8);
  const { format } = useCurrency();
  const catScroll = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Trendyol-style category strip */}
      <section className="border-b border-border bg-card/60">
        <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div ref={catScroll} className="flex gap-5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-7 sm:justify-center">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/browse"
                search={{ category: c.slug } as never}
                className="group flex shrink-0 flex-col items-center gap-2"
              >
                <div className={`relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br ${c.color} p-[2px] shadow-md transition group-hover:scale-105 sm:h-20 sm:w-20`}>
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-background">
                    <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute bottom-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-white/95 text-[10px] shadow">
                      {c.emoji}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-ink group-hover:text-primary">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="grain-bg relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <span className="chip"><Sparkles className="h-3.5 w-3.5 text-primary" /> 48,210 listings nearby</span>
            <h1 className="mt-5 font-display text-5xl font-black leading-[0.95] text-ink sm:text-6xl md:text-7xl lg:text-8xl">
              Buy <em className="not-italic text-primary">anything.</em><br/>
              Sell <span className="relative inline-block">
                <span className="relative z-10">anything.</span>
                <span className="absolute inset-x-0 bottom-1 h-3 -rotate-1 bg-sun/70" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Swapo is the friendliest way to buy and sell second-hand. Discover great finds nearby, chat directly with sellers, and pay in USD or KSh.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/browse" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110">
                Explore marketplace <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/auth" className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-7 py-4 text-base font-semibold text-ink hover:bg-secondary">
                Join Swapo
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
                  <div className="text-xs text-muted-foreground">New message</div>
                  <div className="text-sm font-bold text-ink">{format(180)} — let's negotiate?</div>
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

      {/* CATEGORIES — sample picks per category */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-black sm:text-4xl">Shop by category</h2>
            <p className="mt-1 text-sm text-muted-foreground">A taste of what's hot in every category right now.</p>
          </div>
          <Link to="/browse" className="hidden text-sm font-semibold text-primary hover:underline sm:block">View all →</Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {categories.map((c) => {
            const sample = products.find(p => p.category === c.slug);
            if (!sample) return null;
            return (
              <Link
                key={c.slug}
                to="/browse"
                search={{ category: c.slug } as never}
                className="group flex overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className={`relative aspect-square w-32 shrink-0 bg-gradient-to-br ${c.color} sm:w-40`}>
                  <img src={sample.image} alt="" className="h-full w-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-black text-ink">{c.emoji} {c.name}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{sample.title}</p>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="price-tag text-xl text-primary">{format(sample.price)}</span>
                    <span className="text-xs text-muted-foreground">{c.count.toLocaleString()} listings</span>
                  </div>
                </div>
              </Link>
            );
          })}
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
            { i: ShieldCheck, t: "Verified profiles", d: "Email, phone and ID checks for safer swaps." },
            { i: MessageCircle, t: "Built-in chat", d: "Message sellers directly and negotiate in real time." },
            { i: Zap, t: "USD & KSh ready", d: "Browse and pay in your local currency, instantly." },
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
