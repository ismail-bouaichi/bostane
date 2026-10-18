"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { itemInfo } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export type Cart = Record<string, number>;

interface CartCtx {
  cart: Cart;
  ready: boolean;
  count: number;
  add: (id: string, qty: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toast: string | null;
  notify: (msg: string) => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "bostane.cart.v1";
const r2 = (n: number) => Math.round(n * 100) / 100;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Cart;
        const clean: Cart = {};
        for (const [k, v] of Object.entries(parsed)) if (itemInfo(k, "fr") && v > 0) clean[k] = v;
        setCart(clean);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch {}
  }, [cart, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((id: string, qty: number) => setCart((c) => ({ ...c, [id]: r2((c[id] ?? 0) + qty) })), []);
  const setQty = useCallback((id: string, qty: number) => setCart((c) => {
    const n = { ...c };
    if (qty <= 0) delete n[id]; else n[id] = r2(qty);
    return n;
  }), []);
  const remove = useCallback((id: string) => setCart((c) => { const n = { ...c }; delete n[id]; return n; }), []);
  const clear = useCallback(() => setCart({}), []);

  const value = useMemo(() => ({
    cart, ready, count: Object.keys(cart).length, add, setQty, remove, clear, toast, notify: setToast,
  }), [cart, ready, add, setQty, remove, clear, toast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export function cartTotals(cart: Cart) {
  let sub = 0;
  for (const [id, q] of Object.entries(cart)) {
    const info = itemInfo(id, "fr");
    if (info) sub += info.price * q;
  }
  sub = r2(sub);
  const delivery = sub === 0 || sub >= SITE.freeDeliveryFrom ? 0 : SITE.deliveryFee;
  return { sub, delivery, total: r2(sub + delivery), belowMin: sub < SITE.minOrder };
}
