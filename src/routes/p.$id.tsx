import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct, products } from "@/lib/mock-data";
import { useCurrency } from "@/lib/currency";
import { Heart, MapPin, Shield, Share2, Flag, Star, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/p/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.title} — Swapo` },
      { name: "description", content: loaderData.description },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.description },
      { property: "og:image", content: loaderData.image },
    ] : [],
  }),
  notFoundComponent: () => <div className="p-20 text-center">Listing not found.</div>,
  component: Detail,
});

function Detail() {
  const p = Route.useLoaderData();
  const { format } = useCurrency();
  const similar = products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link> · <Link to="/browse" className="hover:underline">Browse</Link> · {p.title}
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Gallery */}
          <div>
            <div className="overflow-hidden rounded-3xl bg-cream">
              <img src={p.image} alt={p.title} className="aspect-square w-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[p.image, ...products.slice(0,3).map(x=>x.image)].map((src, i) => (
                <button key={i} className={`overflow-hidden rounded-2xl border-2 ${i===0 ? "border-primary" : "border-transparent"}`}>
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="chip">{p.condition}</span>
              {p.negotiable && <span className="chip !bg-mint">💬 Negotiable in chat</span>}
              {p.featured && <span className="chip !bg-sun">★ Featured</span>}
            </div>
            <h1 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl">{p.title}</h1>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="price-tag text-5xl text-primary">{format(p.price)}</span>
              {p.originalPrice && <span className="text-lg text-muted-foreground line-through">{format(p.originalPrice)}</span>}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {p.location} · {p.distanceKm} km</span>
              <span>Posted 2h ago</span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
              <Link to="/messages" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:brightness-110">
                <MessageCircle className="h-4 w-4" /> Chat with {p.seller.name.split(" ")[0]} {p.negotiable && "& negotiate"}
              </Link>
              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 font-semibold hover:bg-secondary">
                <Heart className="h-4 w-4" /> Save
              </button>
            </div>

            {p.negotiable && (
              <div className="mt-3 rounded-2xl border border-dashed border-border bg-card/60 p-4 text-sm text-muted-foreground">
                💡 This seller is open to offers. Start a chat to propose a price and agree on the details directly.
              </div>
            )}

            {/* Seller card */}
            <div className="mt-4 flex items-center justify-between rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <img src={p.seller.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-ink">{p.seller.name}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-sun text-sun" /> {p.seller.rating} · {p.seller.sales} sales
                    <Shield className="h-3 w-3 text-mint" /> Verified
                  </div>
                </div>
              </div>
              <Link to="/profile" className="text-sm font-semibold text-primary hover:underline">View store</Link>
            </div>

            <div className="mt-6">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</div>
              <p className="mt-2 leading-relaxed text-ink">{p.description}</p>
            </div>

            <div className="mt-6 flex gap-4 text-xs text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-ink"><Share2 className="h-3.5 w-3.5" /> Share</button>
              <button className="flex items-center gap-1 hover:text-ink"><Flag className="h-3.5 w-3.5" /> Report</button>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl font-black">More like this</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {similar.map(s => <ProductCard key={s.id} p={s} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
