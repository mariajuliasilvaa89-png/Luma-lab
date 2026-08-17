"use client";

import { Plus } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useProductQuickView } from "@/components/product/ProductQuickViewContext";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { formatCurrency } from "@/lib/format";
import { getProductImageSrc } from "@/lib/productImage";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { openProductQuickView } = useProductQuickView();
  const imageSrc = getProductImageSrc(product);

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-[22px]">
        <button className="focus-luma block w-full rounded-[22px] text-left" onClick={() => openProductQuickView(product)}>
          <ProductVisual tone={imageSrc} className="transition duration-500 group-hover:scale-[1.03]" label={product.badge} />
        </button>
        <button
          className="focus-luma absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-graphite text-white opacity-0 shadow-soft transition group-hover:translate-y-0 group-hover:opacity-100"
          aria-label="Adicionar ao carrinho"
          onClick={() => addItem({ product, quantity: 1, color: product.colors?.[0] })}
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink/45">{product.category}</p>
          <button className="focus-luma mt-1 block text-left font-display text-lg font-semibold hover:underline" onClick={() => openProductQuickView(product)}>{product.name}</button>
        </div>
        {typeof product.price === "number" ? <p className="whitespace-nowrap text-sm font-semibold">{formatCurrency(product.price)}</p> : null}
      </div>
    </article>
  );
}
