import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Heart, MessageCircle, User, Plus, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/browse", search: { q } as never });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 sm:py-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <span className="font-display text-lg font-black">S</span>
          </span>
          <span className="font-display text-2xl font-black tracking-tight text-ink">Swapo</span>
        </Link>

        <form onSubmit={submit} className="hidden flex-1 md:flex">
          <div className="flex w-full items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-primary/40">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search bikes, cameras, sofas, plants…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <span className="hidden text-xs text-muted-foreground lg:inline">📍 Brooklyn, NY</span>
          </div>
        </form>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <Link to="/favorites" className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/messages" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-secondary">
            <MessageCircle className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          </Link>
          <Link to="/profile" className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary">
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/sell"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-110"
          >
            <Plus className="h-4 w-4" /> Sell
          </Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="ml-auto grid h-10 w-10 place-items-center rounded-full hover:bg-secondary md:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile search */}
      <form onSubmit={submit} className="mx-auto max-w-7xl px-4 pb-3 md:hidden">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search anything…"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </form>

      {open && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="grid grid-cols-2 gap-2 p-4">
            <Link to="/browse" onClick={() => setOpen(false)} className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold">Browse</Link>
            <Link to="/sell" onClick={() => setOpen(false)} className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">+ Sell</Link>
            <Link to="/messages" onClick={() => setOpen(false)} className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold">Messages</Link>
            <Link to="/favorites" onClick={() => setOpen(false)} className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold">Favorites</Link>
            <Link to="/profile" onClick={() => setOpen(false)} className="col-span-2 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold">Profile</Link>
          </div>
        </div>
      )}
    </header>
  );
}
