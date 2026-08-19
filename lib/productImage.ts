import type { Product } from "@/types";

export function getProductImageSrc(product: Product, index = 0) {
  return withImageVersion(product.images[index], product.imageVersion);
}

export function getProductGalleryImages(product: Product) {
  const images = product.images
    .map((_, index) => getProductImageSrc(product, index))
    .filter((src): src is string => Boolean(src));

  return Array.from(new Set(images));
}

export function getProductImagesForColor(product: Product, color?: string) {
  const baseImages = (color && product.colorImages?.[color]) || product.images;
  const images = baseImages
    .map((src) => withImageVersion(src, product.imageVersion))
    .filter((src): src is string => Boolean(src));

  return Array.from(new Set(images));
}

export function withImageVersion(src: string | undefined, version?: number) {
  if (!src || !version || !src.startsWith("/")) return src;
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}v=${version}`;
}
