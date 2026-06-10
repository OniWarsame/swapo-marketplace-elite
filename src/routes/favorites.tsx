import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/mock-data";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "Favorites — Swapo" }] }),
  component: Favorites,
});

function Favorites() {
  const favs = products.slice(0, 5);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground"><Heart className="h-5 w-5 fill-current" /></div>
          <div>
            <h1 className="font-display text-4xl font-black">Your favorites</h1>
            <p className="text-sm text-muted-foreground">We'll alert you on price drops and when items sell.</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {favs.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}
