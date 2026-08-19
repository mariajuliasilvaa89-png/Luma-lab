"use client";

import { useMemo, useState } from "react";
import { ColorSwatchPicker } from "@/components/product/ColorSwatchPicker";
import { ProductConfigurator } from "@/components/product/ProductConfigurator";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { getProductImagesForColor } from "@/lib/productImage";
import type { Product } from "@/types";

export function ProductDetailView({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors?.[0] ?? "");
  const galleryImages = useMemo(() => getProductImagesForColor(product, color), [product, color]);
  const [primaryImage, ...secondaryImages] = galleryImages;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <div className={galleryImages.length > 1 ? "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 touch-pan-x [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:touch-auto [&::-webkit-scrollbar]:hidden" : "grid gap-4 sm:grid-cols-2"}>
          <ProductVisual tone={primaryImage} className="aspect-square max-sm:min-w-full max-sm:flex-none max-sm:snap-start sm:col-span-2 sm:aspect-[4/3] lg:min-h-[420px]" label={product.badge} />
          {secondaryImages.map((tone, index) => <ProductVisual key={`${tone}-${index}`} tone={tone} className="aspect-square max-sm:min-w-full max-sm:flex-none max-sm:snap-start" />)}
        </div>
        {galleryImages.length > 1 ? (
          <div className="mt-3 flex justify-center gap-2 sm:hidden" aria-hidden="true">
            {galleryImages.map((image) => (
              <span key={image} className="h-1.5 w-1.5 rounded-full bg-ink/20" />
            ))}
          </div>
        ) : null}

        {product.colors?.length ? (
          <div className="mt-5">
            <p className="mb-3 text-sm font-semibold">Cor</p>
            <ColorSwatchPicker colors={product.colors} selected={color} onSelect={setColor} />
          </div>
        ) : null}
      </div>
      <ProductConfigurator product={product} color={color} />
    </div>
  );
}
