"use client";

import { MessageCircle, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { formatCurrency } from "@/lib/format";
import { buildCartMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function CartPageClient() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const checkoutUrl = buildWhatsAppUrl(buildCartMessage(items));
  const hasPricedItems = items.some((item) => typeof item.price === "number");

  if (!items.length) {
    return (
      <main className="container-luma grid min-h-[58vh] place-items-center py-20 text-center">
        <div>
          <h1 className="font-display text-4xl font-semibold">Seu carrinho está vazio.</h1>
          <p className="mt-3 text-ink/65">Explore o catálogo ou envie uma ideia sob medida para a Luma Lab.</p>
          <Link href="/catalogo" className="focus-luma mt-8 inline-flex min-h-11 items-center rounded-full bg-graphite px-5 text-sm font-semibold text-white">Explorar produtos</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container-luma py-14">
      <h1 className="font-display text-4xl font-semibold">Carrinho</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.lineId} className="grid gap-4 rounded-[22px] border border-line p-4 sm:grid-cols-[140px_1fr_auto]">
              <ProductVisual tone={item.image} className="!h-36 !min-h-0 w-full" />
              <div>
                <p className="font-display text-xl font-semibold">{item.name}</p>
                <p className="mt-1 text-sm text-ink/55">{item.category}</p>
                {item.color ? <p className="mt-3 text-sm text-ink/65">Cor: {item.color}</p> : null}
                {Object.entries(item.customValues ?? {}).map(([key, value]) => value ? <p key={key} className="text-sm text-ink/65">{key}: {value}</p> : null)}
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <button className="focus-luma rounded-full p-2 text-ink/55 hover:bg-mist" onClick={() => removeItem(item.lineId)} aria-label="Remover"><Trash2 size={18} /></button>
                <div className="flex items-center rounded-full border border-line">
                  <button className="focus-luma p-2" onClick={() => updateQuantity(item.lineId, item.quantity - 1)} aria-label="Diminuir"><Minus size={15} /></button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button className="focus-luma p-2" onClick={() => updateQuantity(item.lineId, item.quantity + 1)} aria-label="Aumentar"><Plus size={15} /></button>
                </div>
                {typeof item.price === "number" ? (
                  <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <aside className="h-fit rounded-[22px] border border-line p-5">
          {hasPricedItems ? (
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          ) : null}
          <a href={checkoutUrl} target="_blank" rel="noreferrer" className="focus-luma mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-graphite px-5 text-sm font-semibold text-white">
            <MessageCircle size={18} />
            Finalizar pelo WhatsApp
          </a>
        </aside>
      </div>
    </main>
  );
}
