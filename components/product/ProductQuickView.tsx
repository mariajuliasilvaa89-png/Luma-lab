"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { ColorSwatchPicker } from "@/components/product/ColorSwatchPicker";
import { ProductFeedbacks } from "@/components/product/ProductFeedbacks";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { formatCurrency } from "@/lib/format";
import { getProductImagesForColor } from "@/lib/productImage";
import type { Product } from "@/types";

type ProductQuickViewProps = {
  product: Product | null;
  onClose: () => void;
};

function GalleryImage({ src, name, priority = false }: { src: string; name: string; priority?: boolean }) {
  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={name}
        fill
        priority={priority}
        sizes={priority ? "(max-width: 767px) calc(100vw - 40px), 56vw" : "120px"}
        className="object-cover object-center"
      />
    );
  }

  return <ProductVisual tone={src} className="h-full min-h-0 rounded-none border-0" />;
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  if (!product) return null;

  return <ProductQuickViewContent key={product.id} product={product} onClose={onClose} />;
}

function ProductQuickViewContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(product.colors?.[0] ?? "");
  const galleryImages = useMemo(() => getProductImagesForColor(product, color).slice(0, 5), [product, color]);
  const [selectedImage, setSelectedImage] = useState(() => galleryImages[0] ?? "");
  const [previousGalleryImages, setPreviousGalleryImages] = useState(galleryImages);
  const [quantity, setQuantity] = useState(1);
  const [customValues, setCustomValues] = useState<Record<string, string>>({});

  if (galleryImages !== previousGalleryImages) {
    setPreviousGalleryImages(galleryImages);
    setSelectedImage(galleryImages[0] ?? "");
  }

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 40);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, product]);

  if (!galleryImages.length || !selectedImage) return null;

  function handleAddToCart() {
    addItem({ product, quantity, color, customValues, openCart: false });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[300] grid place-items-center p-2 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
      <button
        className="absolute inset-0 bg-graphite/35 backdrop-blur-[8px] animate-[quickViewOverlay_320ms_ease-out_both]"
        aria-label="Fechar visualização do produto"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="relative max-h-[calc(100dvh_-_16px)] w-[calc(100%_-_16px)] max-w-[1200px] overflow-hidden rounded-[24px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.18)] animate-[quickViewModal_420ms_cubic-bezier(0.22,1,0.36,1)_both] md:max-h-[88vh] md:w-[85vw] md:rounded-[30px]"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,117,183,0.16),rgba(181,156,255,0.10)_46%,transparent_72%)] blur-3xl" aria-hidden="true" />
        <button
          ref={closeButtonRef}
          className="focus-luma absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-black/[0.06] bg-white/90 text-graphite backdrop-blur transition hover:bg-mist"
          onClick={onClose}
          aria-label="Fechar produto"
        >
          <X size={18} />
        </button>

        <div className="grid max-h-[calc(100dvh_-_16px)] overflow-y-auto md:max-h-[88vh] md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="p-4 pt-14 md:p-6 md:pt-6">
            <div className="grid gap-3 md:grid-cols-[1fr_104px] lg:grid-cols-[1fr_118px]">
              <div key={selectedImage} className="relative aspect-[4/3] max-h-[42dvh] overflow-hidden rounded-[22px] bg-[#f7f7f7] animate-[quickViewImage_340ms_cubic-bezier(0.22,1,0.36,1)_both] md:aspect-[4/5] md:max-h-none">
                <GalleryImage src={selectedImage} name={product.name} priority />
              </div>

              {galleryImages.length > 1 ? (
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
                  {galleryImages.map((image, index) => (
                    <button
                      key={image}
                      className={`focus-luma relative h-20 w-20 flex-none overflow-hidden rounded-2xl border bg-[#f7f7f7] transition duration-300 hover:scale-[1.02] hover:opacity-100 ${
                        image === selectedImage ? "border-2 border-graphite opacity-100" : "border-black/[0.08] opacity-75"
                      }`}
                      onClick={() => setSelectedImage(image)}
                      aria-label={`${image === selectedImage ? "Imagem selecionada" : "Ver imagem"} ${index + 1} de ${product.name}`}
                    >
                      <GalleryImage src={image} name={product.name} />
                    </button>
                  ))}
                </div>
              ) : null}

              {galleryImages.length > 1 ? (
                <div className="hidden gap-3 md:grid md:max-h-full md:overflow-visible" style={{ gridTemplateRows: `repeat(${galleryImages.length}, minmax(0, 1fr))` }}>
                  {galleryImages.map((image, index) => (
                    <button
                      key={image}
                      className={`focus-luma relative h-20 w-20 flex-none overflow-hidden rounded-2xl border bg-[#f7f7f7] transition duration-300 hover:scale-[1.02] hover:border-graphite/35 hover:opacity-100 md:h-full md:w-full ${
                        image === selectedImage ? "border-2 border-graphite opacity-100" : "border-black/[0.08] opacity-75"
                      }`}
                      onClick={() => setSelectedImage(image)}
                      aria-label={`${image === selectedImage ? "Imagem selecionada" : "Ver imagem"} ${index + 1} de ${product.name}`}
                    >
                      <GalleryImage src={image} name={product.name} />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {product.colors?.length ? (
              <div className="mt-5">
                <p className="mb-3 text-sm font-semibold">Cor</p>
                <ColorSwatchPicker colors={product.colors} selected={color} onSelect={setColor} />
              </div>
            ) : null}
          </div>

          <div className="relative flex flex-col p-5 pt-2 md:border-l md:border-line md:p-8 md:pt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">{product.category}</p>
            <h2 id="quick-view-title" className="mt-3 font-display text-3xl font-semibold leading-tight text-graphite md:text-5xl">
              {product.name}
            </h2>
            {typeof product.price === "number" ? <p className="mt-4 text-2xl font-semibold">{formatCurrency(product.price)}</p> : null}

            <div className="mt-6 border-t border-line pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Sobre o produto</p>
              <p className="mt-3 leading-7 text-ink/68 md:max-w-[46ch]">{product.description}</p>
            </div>

            {product.customFields?.length ? (
              <div className="mt-7 border-t border-line pt-6">
                <div className="space-y-4">
                  {product.customFields.map((field) => (
                    <label key={field.id} className="block">
                      <span className="mb-2 block text-sm font-semibold">{field.label}{field.required ? " *" : ""}</span>
                      {field.type === "textarea" ? (
                        <textarea className="focus-luma min-h-24 w-full rounded-2xl border border-line px-4 py-3 text-sm outline-none" placeholder={field.placeholder} onChange={(event) => setCustomValues((values) => ({ ...values, [field.label]: event.target.value }))} />
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
              </div>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-auto md:pt-8">
              <div className="flex h-12 w-36 items-center justify-between rounded-full border border-line px-2">
                <button className="focus-luma grid h-9 w-9 place-items-center rounded-full hover:bg-mist" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Diminuir quantidade"><Minus size={16} /></button>
                <span className="font-semibold">{quantity}</span>
                <button className="focus-luma grid h-9 w-9 place-items-center rounded-full hover:bg-mist" onClick={() => setQuantity((value) => value + 1)} aria-label="Aumentar quantidade"><Plus size={16} /></button>
              </div>
              <button className="focus-luma min-h-12 flex-1 rounded-full bg-graphite px-6 text-sm font-semibold text-white transition hover:bg-ink" onClick={handleAddToCart}>
                Adicionar ao carrinho
              </button>
            </div>
          </div>

          <div className="mt-2 min-w-0 p-5 pt-0 md:col-span-2 md:p-8 md:pt-0">
            <ProductFeedbacks productSlug={product.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
