import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { avatars, products } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { Shield, Star, Users, Package, TrendingUp, Store, ShoppingBag, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My profile — Swapo" }] }),
  component: Profile,
});

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"selling" | "sold" | "reviews">("selling");

  useEffect(() => {
    if (!user) navigate({ to: "/auth" });
  }, [user, navigate]);

  if (!user) return null;

  const isSeller = user.role === "seller";
  const mine = isSeller ? products.filter(p => p.seller.name === "Maya Chen") : [];
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Banner */}
      <div className="grain-bg border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
          <div className="grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br from-primary to-rose-500 font-display text-5xl font-black text-primary-foreground shadow-xl ring-4 ring-background">
            {initial}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-4xl font-black sm:text-5xl">{user.name}</h1>
              <span className="chip !bg-mint"><Shield className="h-3 w-3" /> Verified</span>
              <span className="chip">
                {isSeller ? <><Store className="h-3 w-3" /> Seller account</> : <><ShoppingBag className="h-3 w-3" /> Individual</>}
              </span>
            </div>
            <p className="mt-2 text-muted-foreground">{user.email} · Member since 2026</p>
            {isSeller && (
              <div className="mt-4 flex flex-wrap gap-6 text-sm">
                <Stat icon={<Star className="h-4 w-4 fill-sun text-sun" />} label="Rating" value="4.9" />
                <Stat icon={<Package className="h-4 w-4" />} label="Sales" value="47" />
                <Stat icon={<Users className="h-4 w-4" />} label="Followers" value="312" />
                <Stat icon={<TrendingUp className="h-4 w-4" />} label="Views (30d)" value="2.1k" />
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {isSeller ? (
              <Link to="/sell" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110">
                <Plus className="h-4 w-4" /> New listing
              </Link>
            ) : (
              <Link to="/browse" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Start shopping</Link>
            )}
            <Link to="/favorites" className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold">Saved</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {isSeller ? (
          <>
            <div className="flex gap-1 border-b border-border">
              {([
                ["selling", `Selling (${mine.length})`],
                ["sold", "Sold (47)"],
                ["reviews", "Reviews (38)"],
              ] as const).map(([k, label]) => (
                <button
                  key={k} onClick={() => setTab(k)}
                  className={`relative px-4 py-3 text-sm font-semibold transition ${tab===k ? "text-ink" : "text-muted-foreground"}`}
                >
                  {label}
                  {tab===k && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>

            <div className="mt-8">
              {tab === "selling" && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {mine.map(p => <ProductCard key={p.id} p={p} />)}
                </div>
              )}
              {tab === "sold" && (
                <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center text-muted-foreground">
                  📦 47 items sold in total — your sold listings will appear here.
                </div>
              )}
              {tab === "reviews" && (
                <div className="space-y-4">
                  {[
                    { n: "Alex R.", a: avatars.a3, t: "Smooth swap! Item exactly as described, super friendly meetup.", s: 5 },
                    { n: "Jenny K.", a: avatars.a1, t: "Excellent communication and packaging. Would buy again.", s: 5 },
                    { n: "Marco T.", a: avatars.a2, t: "Quick to respond and totally fair on price. Five stars.", s: 5 },
                  ].map((r, i) => (
                    <div key={i} className="rounded-3xl border border-border bg-card p-5">
                      <div className="flex items-center gap-3">
                        <img src={r.a} alt="" className="h-10 w-10 rounded-full object-cover" />
                        <div>
                          <div className="font-semibold text-ink">{r.n}</div>
                          <div className="flex">{Array.from({length: r.s}).map((_,j) => <Star key={j} className="h-3.5 w-3.5 fill-sun text-sun" />)}</div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm">{r.t}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-6">
              <Package className="h-5 w-5 text-primary" />
              <div className="mt-3 font-display text-2xl font-black">0</div>
              <div className="text-sm text-muted-foreground">Items purchased</div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <Star className="h-5 w-5 fill-sun text-sun" />
              <div className="mt-3 font-display text-2xl font-black">0</div>
              <div className="text-sm text-muted-foreground">Reviews left</div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <Users className="h-5 w-5 text-mint" />
              <div className="mt-3 font-display text-2xl font-black">0</div>
              <div className="text-sm text-muted-foreground">Sellers followed</div>
            </div>
            <div className="md:col-span-3 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
              <h3 className="font-display text-2xl font-bold">Want to start selling too?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Upgrade to a seller account anytime to list your first item.</p>
              <Link to="/auth" className="mt-4 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Become a seller</Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-card border border-border">{icon}</div>
      <div>
        <div className="font-display text-lg font-bold leading-none">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
