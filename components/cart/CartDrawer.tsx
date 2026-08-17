"use client";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { formatCurrency } from "@/lib/format";
import { buildCartMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, updateQuantity, removeItem } = useCart();
  const checkoutUrl = buildWhatsAppUrl(buildCartMessage(items));
  const hasPricedItems = items.some((item) => typeof item.price === "number");

  return (
    <div className={`fixed inset-0 z-[300] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <button className={`absolute inset-0 bg-graphite/20 transition ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={closeCart} aria-label="Fechar carrinho" />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-soft transition duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-line p-5">
          <div className="flex items-center gap-2 font-display text-lg font-semibold">
            <ShoppingBag size={20} />
            Carrinho
          </div>
          <button className="focus-luma rounded-full p-2 hover:bg-mist" onClick={closeCart} aria-label="Fechar carrinho">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="font-display text-xl font-semibold">Seu carrinho está vazio.</p>
                <p className="mt-2 text-sm text-ink/65">Adicione produtos ou envie uma ideia personalizada.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.lineId} className="grid grid-cols-[84px_1fr] gap-3 border-b border-line pb-4">
                  <ProductVisual tone={item.image} className="min-h-0 h-24 rounded-2xl" />
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-ink/55">{item.category}</p>
                      </div>
                      <button className="focus-luma rounded-full p-1.5 text-ink/50 hover:bg-mist hover:text-graphite" onClick={() => removeItem(item.lineId)} aria-label="Remover item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {item.color ? <p className="mt-2 text-xs text-ink/65">Cor: {item.color}</p> : null}
                    {Object.entries(item.customValues ?? {}).map(([key, value]) =>
                      value ? <p key={key} className="text-xs text-ink/65">{key}: {value}</p> : null
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-line">
                        <button className="focus-luma p-1.5" onClick={() => updateQuantity(item.lineId, item.quantity - 1)} aria-label="Diminuir quantidade"><Minus size={14} /></button>
                        <span className="w-7 text-center text-sm">{item.quantity}</span>
                        <button className="focus-luma p-1.5" onClick={() => updateQuantity(item.lineId, item.quantity + 1)} aria-label="Aumentar quantidade"><Plus size={14} /></button>
                      </div>
                      {typeof item.price === "number" ? (
                        <span className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-line p-5">
          {hasPricedItems ? (
            <div className="mb-4 flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          ) : null}
          <a href={checkoutUrl} target="_blank" rel="noreferrer" className={`focus-luma flex min-h-12 items-center justify-center rounded-full bg-graphite px-5 text-sm font-semibold text-white transition hover:bg-ink ${items.length === 0 ? "pointer-events-none opacity-40" : ""}`}>
            Finalizar pelo WhatsApp
          </a>
          <Link href="/carrinho" onClick={closeCart} className="focus-luma mt-3 flex min-h-11 items-center justify-center rounded-full border border-line text-sm font-semibold hover:border-graphite">
            Ver página do carrinho
          </Link>
        </div>
      </aside>
    </div>
  );
}
