import { Suspense } from "react";
import { CatalogControls } from "@/components/product/CatalogControls";
import { categories, products } from "@/data/products";

export const metadata = {
  title: "Catálogo"
};

export default function CatalogPage() {
  return (
    <main className="container-luma pt-6 pb-10 md:pt-9 md:pb-14">
      <Suspense fallback={<div className="h-12 rounded-full bg-mist" />}>
        <CatalogControls products={products} categories={[...categories]} />
      </Suspense>
    </main>
  );
}
