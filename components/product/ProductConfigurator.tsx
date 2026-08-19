"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types";

type ProductConfiguratorProps = {
  product: Product;
  color: string;
};

export function ProductConfigurator({ product, color }: ProductConfiguratorProps) {
  const [quantity, setQuantity] = useState(1);
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const { addItem } = useCart();

  return (
    <div className="lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">{product.category}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-normal md:text-5xl">{product.name}</h1>
      {typeof product.price === "number" ? <p className="mt-4 text-2xl font-semibold">{formatCurrency(product.price)}</p> : null}
      <p className="mt-5 leading-7 text-ink/68">{product.description}</p>

      {product.customFields?.length ? (
        <div className="mt-7 space-y-4">
          {product.customFields.map((field) => (
            <label key={field.id} className="block">
              <span className="mb-2 block text-sm font-semibold">{field.label}{field.required ? " *" : ""}</span>
              {field.type === "textarea" ? (
                <textarea className="focus-luma min-h-28 w-full rounded-2xl border border-line px-4 py-3 text-sm outline-none" placeholder={field.placeholder} onChange={(event) => setCustomValues((values) => ({ ...values, [field.label]: event.target.value }))} />
              ) : field.type === "select" ? (
                <select className="focus-luma h-12 w-full rounded-full border border-line px-4 text-sm outline-none" onChange={(event) => setCustomValues((values) => ({ ...values, [field.label]: event.target.value }))}>
                  <option value="">Selecione</option>
                  {field.options?.map((option) => <option key={option}>{option}</option>)}
                </select>
              ) : (
                <input type={field.type === "number" ? "number" : "text"} className="focus-luma h-12 w-full rounded-full border border-line px-4 text-sm outline-none" placeholder={field.placeholder} onChange={(event) => setCustomValues((values) => ({ ...values, [field.label]: event.target.value }))} />
              )}
            </label>
          ))}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex h-12 w-36 items-center justify-between rounded-full border border-line px-2">
          <button className="focus-luma grid h-9 w-9 place-items-center rounded-full hover:bg-mist" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Diminuir quantidade"><Minus size={16} /></button>
          <span className="font-semibold">{quantity}</span>
          <button className="focus-luma grid h-9 w-9 place-items-center rounded-full hover:bg-mist" onClick={() => setQuantity((value) => value + 1)} aria-label="Aumentar quantidade"><Plus size={16} /></button>
        </div>
        <button className="focus-luma min-h-12 flex-1 rounded-full bg-graphite px-6 text-sm font-semibold text-white transition hover:bg-ink" onClick={() => addItem({ product, quantity, color, customValues })}>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
