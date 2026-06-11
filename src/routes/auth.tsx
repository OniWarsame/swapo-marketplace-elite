import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useAuth, type AccountRole } from "@/lib/auth";
import { ShoppingBag, Store, Mail, Lock, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in or join — Swapo" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<AccountRole>("individual");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      signIn(form.email);
    } else {
      signUp({ name: form.name || form.email.split("@")[0], email: form.email, role });
    }
    navigate({ to: "/profile" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div className="hidden lg:block">
          <span className="chip">Welcome to Swapo</span>
          <h1 className="mt-5 font-display text-5xl font-black leading-[1.05] text-ink">
            Buy, sell &<br/>swap <span className="text-primary">smarter.</span>
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Join thousands of swappers across Kenya and beyond. Whether you’re hunting for a deal or running a shop — Swapo has you.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <RoleCard active={role === "individual"} icon={<ShoppingBag className="h-5 w-5" />} title="Individual" desc="Browse and buy from sellers nearby." onClick={() => setRole("individual")} />
            <RoleCard active={role === "seller"} icon={<Store className="h-5 w-5" />} title="Seller" desc="Open your shop and reach buyers fast." onClick={() => setRole("seller")} />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-10">
          <div className="flex rounded-full bg-secondary p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${mode === m ? "bg-card shadow text-ink" : "text-muted-foreground"}`}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          {mode === "signup" && (
            <div className="mt-6">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">I want to join as</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <RoleCard active={role === "individual"} icon={<ShoppingBag className="h-4 w-4" />} title="Individual" desc="Buy things I love" onClick={() => setRole("individual")} compact />
                <RoleCard active={role === "seller"} icon={<Store className="h-4 w-4" />} title="Seller" desc="Sell my products" onClick={() => setRole("seller")} compact />
              </div>
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-3">
            {mode === "signup" && (
              <Field icon={<UserIcon className="h-4 w-4" />} placeholder="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            )}
            <Field icon={<Mail className="h-4 w-4" />} placeholder="Email address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Field icon={<Lock className="h-4 w-4" />} placeholder="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required />

            <button type="submit" className="mt-3 w-full rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:brightness-110">
              {mode === "login" ? "Log in to Swapo" : `Create ${role === "seller" ? "seller" : "individual"} account`}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              By continuing you agree to Swapo’s <Link to="/" className="underline">Terms</Link> & <Link to="/" className="underline">Privacy</Link>.
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Field({ icon, ...rest }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement> & { onChange: (v: string) => void; value: string }) {
  const { onChange, ...input } = rest as any;
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 focus-within:ring-2 focus-within:ring-primary/40">
      <span className="text-muted-foreground">{icon}</span>
      <input {...input} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
    </label>
  );
}

function RoleCard({ active, icon, title, desc, onClick, compact }: { active: boolean; icon: React.ReactNode; title: string; desc: string; onClick: () => void; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border-2 p-4 text-left transition ${active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}
    >
      <div className={`grid place-items-center rounded-xl ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-ink"} ${compact ? "h-8 w-8" : "h-10 w-10"}`}>{icon}</div>
      <div className={`mt-3 font-bold text-ink ${compact ? "text-sm" : ""}`}>{title}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </button>
  );
}
