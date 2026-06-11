import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Currency = "USD" | "KES";
const RATE = 130; // 1 USD ≈ 130 KES

type Ctx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (usd: number) => string;
  symbol: string;
  toCurrent: (usd: number) => number;
};

const CurrencyCtx = createContext<Ctx>({
  currency: "USD",
  setCurrency: () => {},
  format: (n) => `$${n}`,
  symbol: "$",
  toCurrent: (n) => n,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("swapo-currency") : null;
    if (saved === "USD" || saved === "KES") setCurrencyState(saved);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try { localStorage.setItem("swapo-currency", c); } catch {}
  };

  const toCurrent = (usd: number) => currency === "USD" ? usd : Math.round(usd * RATE);
  const format = (usd: number) =>
    currency === "USD"
      ? `$${usd.toLocaleString()}`
      : `KSh ${Math.round(usd * RATE).toLocaleString()}`;

  return (
    <CurrencyCtx.Provider value={{ currency, setCurrency, format, symbol: currency === "USD" ? "$" : "KSh", toCurrent }}>
      {children}
    </CurrencyCtx.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyCtx);
