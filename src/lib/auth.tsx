import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type AccountRole = "individual" | "seller";
export type AuthUser = {
  name: string;
  email: string;
  role: AccountRole;
};

type Ctx = {
  user: AuthUser | null;
  signIn: (email: string) => void;
  signUp: (data: AuthUser) => void;
  signOut: () => void;
};

const AuthCtx = createContext<Ctx>({
  user: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
});

const KEY = "swapo-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(KEY, JSON.stringify(u));
      else localStorage.removeItem(KEY);
    } catch {}
  };

  const signIn = (email: string) => {
    // mock: use saved user if email matches, else create individual
    const name = email.split("@")[0] || "Swapper";
    persist({ name: name.charAt(0).toUpperCase() + name.slice(1), email, role: "individual" });
  };

  const signUp = (data: AuthUser) => persist(data);
  const signOut = () => persist(null);

  return <AuthCtx.Provider value={{ user, signIn, signUp, signOut }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
