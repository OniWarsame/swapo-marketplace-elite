import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { conversations } from "@/lib/mock-data";
import { Send, Image as ImageIcon, Mic, Tag, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/messages")({
  head: () => ({ meta: [{ title: "Messages — Swapo" }] }),
  component: Messages,
});

function Messages() {
  const [active, setActive] = useState(conversations[0].id);
  const [draft, setDraft] = useState("");
  const [showList, setShowList] = useState(true);
  const conv = conversations.find(c => c.id === active)!;

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 overflow-hidden md:grid-cols-[340px_minmax(0,1fr)]">
        {/* List */}
        <aside className={`${showList ? "block" : "hidden"} border-r border-border bg-card md:block`}>
          <div className="px-5 py-4">
            <h2 className="font-display text-2xl font-black">Inbox</h2>
            <p className="text-xs text-muted-foreground">{conversations.reduce((s,c)=>s+c.unread,0)} unread</p>
          </div>
          <div className="divide-y divide-border">
            {conversations.map(c => (
              <button
                key={c.id}
                onClick={() => { setActive(c.id); setShowList(false); }}
                className={`flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-secondary ${active===c.id ? "bg-secondary" : ""}`}
              >
                <div className="relative">
                  <img src={c.with.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                  <img src={c.product.image} alt="" className="absolute -bottom-1 -right-1 h-6 w-6 rounded-lg border-2 border-card object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate font-semibold text-ink">{c.with.name}</span>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{c.lastMessage}</div>
                </div>
                {c.unread > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{c.unread}</span>}
              </button>
            ))}
          </div>
        </aside>

        {/* Thread */}
        <section className={`${showList ? "hidden md:flex" : "flex"} flex-col`}>
          <div className="flex items-center gap-3 border-b border-border bg-card px-5 py-3">
            <button onClick={() => setShowList(true)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary md:hidden">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <img src={conv.with.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-ink">{conv.with.name}</div>
              <div className="text-xs text-muted-foreground">Active now</div>
            </div>
          </div>

          {/* Product pin */}
          <div className="mx-5 mt-4 flex items-center gap-3 rounded-2xl border border-border bg-cream p-3">
            <img src={conv.product.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Discussing</div>
              <div className="text-sm font-bold text-ink">{conv.product.title}</div>
            </div>
            <div className="price-tag text-lg text-primary">${conv.product.price}</div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-6">
            {conv.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from==="me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-3xl px-4 py-2.5 ${m.from==="me" ? "bg-primary text-primary-foreground" : "bg-secondary text-ink"}`}>
                  {"offer" in m && m.offer ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest opacity-80"><Tag className="h-3 w-3" /> Offer</div>
                      <div className="font-display text-2xl font-black">${m.offer}</div>
                      <div className="text-xs opacity-80">{m.text}</div>
                    </div>
                  ) : <div className="text-sm">{m.text}</div>}
                  <div className="mt-1 text-[10px] opacity-70">{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setDraft(""); }} className="border-t border-border bg-card p-4">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
              <button type="button" className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"><ImageIcon className="h-4 w-4" /></button>
              <button type="button" className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"><Mic className="h-4 w-4" /></button>
              <input
                value={draft} onChange={e=>setDraft(e.target.value)}
                placeholder="Write a message…"
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground hover:brightness-110"><Send className="h-4 w-4" /></button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
