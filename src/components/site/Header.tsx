import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Heart, MessageCircle, User, Menu, X, LogOut, Store } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { Logo, LogoMark } from "./Logo";
import { useCurrency } from "@/lib/currency";
import { useAuth } from "@/lib/auth";
import { products } from "@/lib/mock-data";

export function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [showSug, setShowSug] = useState(false);
  const { currency, setCurrency, format } = useCurrency();
  const { user, signOut } = useAuth();
  const [userMenu, setUserMenu] = useState(false);
  const sugRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.toLowerCase();
    return products.filter(p => p.title.toLowerCase().includes(needle) || p.category.includes(needle)).slice(0, 6);
  }, [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (sugRef.current && !sugRef.current.contains(e.target as Node)) setShowSug(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSug(false);
    navigate({ to: "/browse", search: { q } as never });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 sm:py-4">
        <Link to="/" className="flex shrink-0 items-center"><Logo /></Link>

        <div ref={sugRef} className="relative hidden flex-1 md:block">
          <form onSubmit={submit}>
            <div className="flex w-full items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-primary/40">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setShowSug(true); }}
                onFocus={() => setShowSug(true)}
                placeholder="Search bikes, cameras, sofas, plants…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </form>

          {showSug && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              {suggestions.map(p => (
                <Link
                  key={p.id}
                  to="/p/$id"
                  params={{ id: p.id }}
                  onClick={() => { setShowSug(false); setQ(""); }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary"
                >
                  <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-ink">{p.title}</div>
                    <div className="text-xs text-muted-foreground capitalize">{p.category}</div>
                  </div>
                  <div className="price-tag text-sm text-primary">{format(p.price)}</div>
                </Link>
              ))}
              <button
                onClick={submit}
                className="block w-full border-t border-border px-4 py-2.5 text-left text-xs font-semibold text-primary hover:bg-secondary"
              >
                See all results for "{q}" →
              </button>
            </div>
          )}
        </div>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {/* Currency switch */}
          <div className="mr-1 flex items-center rounded-full bg-secondary p-1 text-xs font-semibold">
            {(["USD", "KES"] as const).map(c => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`rounded-full px-3 py-1 transition ${currency === c ? "bg-card text-ink shadow" : "text-muted-foreground"}`}
              >{c}</button>
            ))}
          </div>

          <Link to="/favorites" className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary" aria-label="Favorites">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/messages" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-secondary" aria-label="Messages">
            <MessageCircle className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          </Link>

          {user ? (
            <div className="relative">
              <button onClick={() => setUserMenu(!userMenu)} className="ml-1 flex items-center gap-2 rounded-full bg-secondary px-2 py-1.5 hover:bg-card">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="pr-2 text-sm font-semibold text-ink">{user.name.split(" ")[0]}</span>
              </button>
              {userMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                  <div className="border-b border-border px-4 py-3">
                    <div className="text-sm font-bold text-ink">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                    <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {user.role === "seller" ? <><Store className="h-3 w-3" /> Seller</> : <><User className="h-3 w-3" /> Individual</>}
                    </div>
                  </div>
                  <Link to="/profile" onClick={() => setUserMenu(false)} className="block px-4 py-2.5 text-sm hover:bg-secondary">My profile</Link>
                  {user.role === "seller" && <Link to="/sell" onClick={() => setUserMenu(false)} className="block px-4 py-2.5 text-sm hover:bg-secondary">Post a listing</Link>}
                  <Link to="/favorites" onClick={() => setUserMenu(false)} className="block px-4 py-2.5 text-sm hover:bg-secondary">Saved items</Link>
                  <button onClick={() => { signOut(); setUserMenu(false); navigate({ to: "/" }); }} className="flex w-full items-center gap-2 border-t border-border px-4 py-2.5 text-sm text-destructive hover:bg-secondary">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth" className="ml-1 rounded-full px-4 py-2 text-sm font-semibold text-ink hover:bg-secondary">Log in</Link>
              <Link to="/auth" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:brightness-110">Sign up</Link>
            </>
          )}
        </nav>

        <button onClick={() => setOpen(!open)} className="ml-auto grid h-10 w-10 place-items-center rounded-full hover:bg-secondary md:hidden" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile search */}
      <div ref={sugRef} className="relative mx-auto max-w-7xl px-4 pb-3 md:hidden">
        <form onSubmit={submit}>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setShowSug(true); }}
              onFocus={() => setShowSug(true)}
              placeholder="Search anything…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </form>
        {showSug && suggestions.length > 0 && (
          <div className="absolute left-4 right-4 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            {suggestions.map(p => (
              <Link
                key={p.id}
                to="/p/$id"
                params={{ id: p.id }}
                onClick={() => { setShowSug(false); setQ(""); }}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary"
              >
                <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-ink">{p.title}</div>
                  <div className="text-xs text-muted-foreground capitalize">{p.category}</div>
                </div>
                <div className="price-tag text-sm text-primary">{format(p.price)}</div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="grid grid-cols-2 gap-2 p-4">
            <div className="col-span-2 flex items-center justify-between rounded-2xl bg-secondary px-4 py-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Currency</span>
              <div className="flex items-center gap-1">
                {(["USD", "KES"] as const).map(c => (
                  <button key={c} onClick={() => setCurrency(c)} className={`rounded-full px-3 py-1 text-xs font-semibold ${currency === c ? "bg-card text-ink shadow" : "text-muted-foreground"}`}>{c}</button>
                ))}
              </div>
            </div>
            <Link to="/browse" onClick={() => setOpen(false)} className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold">Browse</Link>
            <Link to="/messages" onClick={() => setOpen(false)} className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold">Messages</Link>
            <Link to="/favorites" onClick={() => setOpen(false)} className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold">Favorites</Link>
            {user ? (
              <>
                <Link to="/profile" onClick={() => setOpen(false)} className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold">Profile</Link>
                <button onClick={() => { signOut(); setOpen(false); navigate({ to: "/" }); }} className="col-span-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-destructive">Sign out</button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="col-span-2 rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">Log in / Sign up</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// Re-export so other components can grab logo mark
export { LogoMark };
