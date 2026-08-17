"use client";

import Image from "next/image";
import { useProductQuickView } from "@/components/product/ProductQuickViewContext";
import { formatCurrency } from "@/lib/format";
import { getProductImageSrc } from "@/lib/productImage";
import type { Product } from "@/types";

type CatalogProductCardProps = {
  product: Product;
};

const toneMap: Record<string, string> = {
  yellow: "from-luma-yellow/75 via-white to-luma-orange/30",
  pink: "from-luma-pink/65 via-white to-luma-lilac/30",
  lilac: "from-luma-lilac/70 via-white to-luma-blue/30",
  blue: "from-luma-blue/65 via-white to-luma-yellow/30",
  orange: "from-luma-orange/70 via-white to-luma-pink/25"
};

export function CatalogProductCard({ product }: CatalogProductCardProps) {
  const { openProductQuickView } = useProductQuickView();
  const imageSrc = getProductImageSrc(product);

  return (
    <button className="focus-luma group block w-full text-left" onClick={() => openProductQuickView(product)}>
      <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-[#f7f7f7] md:rounded-[22px]">
        {imageSrc?.startsWith("/") ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 767px) calc((100vw - 44px) / 2), (max-width: 1023px) 30vw, 25vw"
            className="block object-cover object-center transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${toneMap[imageSrc ?? "yellow"] ?? toneMap.yellow}`}>
            <div className="grid h-full place-items-center text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30">
              Imagem em breve
            </div>
          </div>
        )}
      </div>

      <div className="mt-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/42 md:text-[11px]">{product.category}</p>
        <h2 className="mt-1 line-clamp-2 font-display text-[15px] font-semibold leading-tight text-graphite transition group-hover:text-ink md:text-lg">
          {product.name}
        </h2>
        {typeof product.price === "number" ? <p className="mt-1.5 text-sm font-semibold text-ink md:text-base">{formatCurrency(product.price)}</p> : null}
      </div>
    </button>
  );
}
