export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <span className="font-display text-lg font-black">S</span>
            </span>
            <span className="font-display text-2xl font-black">Swapo</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Sell anything, find anything. The friendly marketplace for your neighborhood.
          </p>
        </div>
        {[
          { title: "Marketplace", items: ["Browse all", "Featured", "Nearby", "New today"] },
          { title: "Sell", items: ["Post a listing", "Boost", "Premium seller", "Seller guide"] },
          { title: "Company", items: ["About", "Trust & safety", "Help center", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{col.title}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {col.items.map((i) => (
                <li key={i}><a className="hover:text-primary" href="#">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© 2026 Swapo. Made with care for swappers everywhere.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  );
}
