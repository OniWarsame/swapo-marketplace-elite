import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { categories } from "@/lib/mock-data";
import { Camera, Sparkles, X, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/sell")({
  head: () => ({ meta: [{ title: "Sell on Swapo" }, { name: "description", content: "Post a listing in under 60 seconds." }] }),
  component: Sell,
});

function Sell() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [done, setDone] = useState(false);

  const addPhoto = () => setPhotos(p => [...p, `https://picsum.photos/seed/${Math.random()}/400/400`]);
  const removePhoto = (i: number) => setPhotos(p => p.filter((_, idx) => idx !== i));

  const aiSuggest = () => {
    setDesc("Great condition, gently used. Pickup available in Brooklyn — happy to answer any questions. Comes from a smoke-free home. Selling because I'm decluttering.");
  };

  const submit = (e: React.FormEvent) => { e.preventDefault(); setDone(true); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mint"><Check className="h-10 w-10 text-ink" /></div>
          <h1 className="mt-8 font-display text-5xl font-black">Your listing is live ✨</h1>
          <p className="mt-4 text-muted-foreground">We're already showing it to nearby buyers. You'll be notified when offers come in.</p>
          <div className="mt-8 flex justify-center gap-3">
            <button onClick={() => setDone(false)} className="rounded-full border border-border bg-card px-6 py-3 font-semibold">Post another</button>
            <a href="/" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Back home</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-4xl font-black sm:text-5xl">Post a listing</h1>
        <p className="mt-2 text-muted-foreground">It takes about a minute. Buyers nearby will see it right away.</p>

        <form onSubmit={submit} className="mt-10 space-y-8">
          {/* Photos */}
          <section className="rounded-3xl border border-border bg-card p-6">
            <Label step={1}>Photos & video</Label>
            <p className="mt-1 text-sm text-muted-foreground">Up to 12 photos. First image becomes the cover.</p>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {photos.map((src, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl bg-cream">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-background">Cover</span>}
                  <button type="button" onClick={() => removePhoto(i)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-background/90"><X className="h-3.5 w-3.5" /></button>
                </div>
              ))}
              {photos.length < 12 && (
                <button type="button" onClick={addPhoto} className="grid aspect-square place-items-center rounded-2xl border-2 border-dashed border-border bg-background text-muted-foreground hover:border-primary hover:text-primary">
                  <div className="flex flex-col items-center gap-1">
                    <Camera className="h-6 w-6" />
                    <span className="text-xs font-semibold">Add photo</span>
                  </div>
                </button>
              )}
            </div>
          </section>

          {/* Title & category */}
          <section className="rounded-3xl border border-border bg-card p-6">
            <Label step={2}>What are you selling?</Label>
            <input
              required value={title} onChange={e=>setTitle(e.target.value)}
              placeholder="e.g. Vintage Polaroid Camera"
              className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-primary/40"
            />
            <div className="mt-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {categories.map(c => (
                <button key={c.slug} type="button" className="chip hover:!border-primary hover:!text-primary">{c.emoji} {c.name}</button>
              ))}
            </div>
          </section>

          {/* Description */}
          <section className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <Label step={3}>Description</Label>
              <button type="button" onClick={aiSuggest} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-background hover:opacity-90">
                <Sparkles className="h-3.5 w-3.5 text-mint" /> Write with AI
              </button>
            </div>
            <textarea
              value={desc} onChange={e=>setDesc(e.target.value)} rows={5}
              placeholder="Tell buyers about the condition, why you're selling, what's included…"
              className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40"
            />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["New", "Like new", "Good", "Fair"].map(c => (
                <button key={c} type="button" className="chip">{c}</button>
              ))}
            </div>
          </section>

          {/* Price */}
          <section className="rounded-3xl border border-border bg-card p-6">
            <Label step={4}>Price</Label>
            <div className="mt-3 flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-lg font-bold text-muted-foreground">$</span>
                <input required type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="120"
                  className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-4 font-display text-xl font-bold outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" defaultChecked className="accent-primary" /> Accept offers
              </label>
            </div>
            <div className="mt-3 rounded-xl bg-mint/40 px-4 py-3 text-xs font-semibold text-ink">
              💡 AI estimate: similar items sell for <strong>$95–$140</strong>
            </div>
          </section>

          <button className="w-full rounded-full bg-primary py-4 font-display text-lg font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110">
            Publish listing
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

function Label({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{step}</span>
      <h2 className="font-display text-2xl font-bold">{children}</h2>
    </div>
  );
}
