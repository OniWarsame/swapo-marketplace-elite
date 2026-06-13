import { Logo } from "./Logo";
import { Instagram, Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-sm text-muted-foreground">
            A modern marketplace for swappers everywhere. Discover, negotiate, and exchange in your local currency.
          </p>
          <div className="mt-6 flex gap-2">
            {[Instagram, Twitter, Github].map((I, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Marketplace", items: ["Browse all", "Featured", "Nearby", "New today"] },
          { title: "Sell", items: ["Post a listing", "Boost", "Seller guide", "Pricing"] },
          { title: "Company", items: ["About", "Trust & safety", "Help", "Contact"] },
        ].map((col) => (
          <div key={col.title} className="md:col-span-2">
            <div className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">{col.title}</div>
            <ul className="mt-5 space-y-3 text-sm">
              {col.items.map((i) => (
                <li key={i}><a className="text-muted-foreground transition hover:text-ink" href="#">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© 2026 Swapo Inc. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  );
}
