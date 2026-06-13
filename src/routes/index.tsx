import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/lib/mock-data";
import { useCurrency } from "@/lib/currency";
import { ArrowRight, ArrowUpRight, Sparkles, ShieldCheck, MessageCircle, Wallet, Star, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swapo — The marketplace for what's next" },
      { name: "description", content: "A modern, editorial marketplace for buying and selling second-hand. Curated listings near you in USD or KSh." },
      { property: "og:title", content: "Swapo — The marketplace for what's next" },
      { property: "og:description", content: "A modern, editorial marketplace for swappers everywhere." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.featured);
  const editorial = products[0];
  const latest = products.slice(1, 9);
  const { format } = useCurrency();

  return (
    <div className="min-h-screen bg-background text-ink">
      <Header />

      {/* MAGAZINE HERO */}
      <section className="relative overflow-hidden">
        <div className="aurora-bg absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-16 md:pt-16 md:pb-24">
          {/* Issue header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span>Issue №26 · June 2026</span>
            <span className="hidden sm:inline">The Second-hand Quarterly</span>
            <span className="flex items-center gap-1.5 text-mint"><Sparkles className="h-3 w-3" /> 48,210 listings live</span>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-mint" /> Cover Story</span>
              <h1 className="headline-xl mt-6 text-[14vw] sm:text-[10vw] md:text-[8.5rem] lg:text-[10rem]">
                Buy <em className="not-italic italic text-primary">smart.</em><br/>
                Sell <span className="text-mint">bold.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
                Swapo is the curated marketplace for the next generation of swappers — discover one-of-a-kind finds, chat directly with sellers, and pay in your local currency.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link to="/browse" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[0_10px_40px_-10px_rgba(108,99,255,0.7)] transition hover:brightness-110">
                  Explore the issue <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <Link to="/auth" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-sm font-bold uppercase tracking-wider text-ink hover:border-primary">
                  Join Swapo
                </Link>
              </div>

              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
                {[
                  { k: "48k", v: "Listings" },
                  { k: "240+", v: "Cities" },
                  { k: "4.9★", v: "Buyer rating" },
                ].map((s) => (
                  <div key={s.v}>
                    <dt className="font-display text-3xl font-extrabold text-ink">{s.k}</dt>
                    <dd className="text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Editorial cover image */}
            <div className="relative md:col-span-5">
              <div className="relative overflow-hidden rounded-[2rem] border border-border">
                <img src={editorial.image} alt={editorial.title} className="aspect-[4/5] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-deep/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-mint backdrop-blur">
                  Editor's pick
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{editorial.category}</div>
                  <div className="mt-1 font-display text-2xl font-extrabold">{editorial.title}</div>
                  <div className="mt-3 flex items-end justify-between">
                    <span className="price-tag text-3xl text-mint">{format(editorial.price)}</span>
                    <Link to="/p/$id" params={{ id: editorial.id }} className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                      View <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute -left-4 -bottom-6 hidden rotate-[-4deg] glass rounded-2xl p-3 shadow-2xl sm:flex sm:items-center sm:gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-mint text-deep"><MessageCircle className="h-4 w-4" /></div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Live offer</div>
                  <div className="font-display text-sm font-bold">{format(180)} — let's negotiate?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE category strip */}
      <section className="border-y border-border bg-card/40">
        <div className="marquee-mask mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center gap-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => (
              <Link key={c.slug} to="/browse" search={{ category: c.slug } as never} className="group flex shrink-0 items-center gap-2.5 text-sm font-semibold text-muted-foreground transition hover:text-ink">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-base">{c.emoji}</span>
                <span className="uppercase tracking-wider">{c.name}</span>
                <span className="text-xs text-primary">·{c.count.toLocaleString()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO CATEGORIES — magazine spread */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between border-b border-border pb-5">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-mint">§ 01 — The Sections</div>
            <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Shop by department</h2>
          </div>
          <Link to="/browse" className="hidden text-xs font-bold uppercase tracking-widest text-primary hover:underline sm:block">All →</Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          {categories.slice(0, 8).map((c, i) => {
            const sample = products.find(p => p.category === c.slug);
            const big = i === 0 || i === 5;
            return (
              <Link
                key={c.slug}
                to="/browse"
                search={{ category: c.slug } as never}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary/40 ${big ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <div className={`relative ${big ? "aspect-square md:aspect-auto md:h-full" : "aspect-[5/4]"}`}>
                  {sample && <img src={sample.image} alt={c.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />}
                  <div className="absolute inset-0 bg-gradient-to-tr from-deep via-deep/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                      <span className="text-3xl">{c.emoji}</span>
                      <ArrowUpRight className="h-5 w-5 text-ink/70 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                    </div>
                    <div>
                      <div className="font-display text-2xl font-extrabold md:text-3xl">{c.name}</div>
                      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{c.count.toLocaleString()} listings</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED EDITORIAL */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between border-b border-border pb-5">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-mint">§ 02 — Featured</div>
            <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">This week's must-haves</h2>
          </div>
          <Link to="/browse" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">See all →</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
          {featured.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* QUOTE PULL — editorial break */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <figure className="border-y border-border py-12 text-center">
          <blockquote className="mx-auto max-w-4xl font-display text-3xl font-extrabold leading-tight text-ink sm:text-5xl md:text-6xl">
            "<span className="text-primary">Less new</span>, more next. Every swap is a small act of <span className="text-mint">rebellion</span> against waste."
          </blockquote>
          <figcaption className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">— The Swapo manifesto</figcaption>
        </figure>
      </section>

      {/* LATEST GRID */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between border-b border-border pb-5">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-mint">§ 03 — Fresh</div>
            <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Just listed near you</h2>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> Showing Nairobi area</p>
          </div>
          <Link to="/browse" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">Browse →</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
          {latest.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* TRUST — full-width band */}
      <section className="relative mt-20 overflow-hidden border-y border-border bg-card/40">
        <div className="aurora-bg absolute inset-0 opacity-50" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-3">
          {[
            { i: ShieldCheck, t: "Verified profiles", d: "ID & phone verification on every seller, so you swap with confidence." },
            { i: MessageCircle, t: "Built-in negotiation", d: "Chat directly with sellers and agree on a fair price — no middleman." },
            { i: Wallet, t: "USD & KSh ready", d: "Toggle currencies on the fly, browse and pay in what fits you." },
          ].map((b, i) => (
            <div key={i} className="group">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <b.i className="h-6 w-6" />
              </div>
              <div className="mt-6 font-display text-2xl font-extrabold">{b.t}</div>
              <div className="mt-3 text-sm text-muted-foreground">{b.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL strip */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { name: "Maya C.", t: "Sold my film camera in a day. The chat-based negotiation just works.", r: 5 },
            { name: "Diego P.", t: "Finally a marketplace that doesn't look like a spreadsheet.", r: 5 },
            { name: "Sam R.", t: "Found a mid-century chair for half the retail. Swapo > everything.", r: 5 },
          ].map((q) => (
            <figure key={q.name} className="rounded-3xl border border-border bg-card p-7">
              <div className="flex gap-0.5 text-sun">{Array.from({length: q.r}).map((_, i) => <Star key={i} className="h-4 w-4 fill-sun" />)}</div>
              <blockquote className="mt-4 font-display text-xl font-bold leading-snug">"{q.t}"</blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">— {q.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-iris via-primary to-mint p-10 text-center md:p-16">
          <div className="aurora-bg absolute inset-0 opacity-30" />
          <div className="relative">
            <h3 className="headline-xl text-4xl text-white sm:text-6xl md:text-7xl">Your next great find is one swap away.</h3>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/browse" className="rounded-full bg-deep px-7 py-4 text-sm font-bold uppercase tracking-wider text-ink hover:brightness-110">Start browsing</Link>
              <Link to="/auth" className="rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-wider text-deep hover:bg-white/90">Create account</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
