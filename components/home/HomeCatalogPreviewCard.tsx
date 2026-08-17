"use client";

import Image from "next/image";
import { useProductQuickView } from "@/components/product/ProductQuickViewContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getProductImageSrc } from "@/lib/productImage";
import type { Product } from "@/types";

type HomeCatalogPreviewCardProps = {
  product: Product;
  index: number;
};

export function HomeCatalogPreviewCard({ product, index }: HomeCatalogPreviewCardProps) {
  const { openProductQuickView } = useProductQuickView();
  const imageSrc = getProductImageSrc(product);

  return (
    <ScrollReveal
      className={`${index === 3 ? "max-md:hidden" : ""} min-w-[82%] max-w-[82%] flex-none snap-start overflow-hidden md:min-w-0 md:max-w-none`}
      delay={index * 70}
      direction="image"
    >
      <button className="focus-luma group block w-full text-left" onClick={() => openProductQuickView(product)}>
        <div className="relative aspect-square w-full overflow-hidden rounded-[22px] bg-[#f7f7f7] transition duration-500 group-hover:scale-[1.015]">
          {imageSrc?.startsWith("/") ? (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 767px) 82vw, 25vw"
              className="block object-cover object-center"
            />
          ) : (
            <div className="grid h-full place-items-center text-xs font-semibold uppercase tracking-[0.16em] text-ink/34">
              Imagem em breve
            </div>
          )}
        </div>
        <div className="mt-4 min-w-0">
          <p className="font-semibold leading-snug text-graphite">{product.name}</p>
          <p className="mt-2 text-xs font-medium text-ink/42">{product.category}</p>
        </div>
      </button>
    </ScrollReveal>
  );
}
