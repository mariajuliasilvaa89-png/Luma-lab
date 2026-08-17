"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ProductQuickView } from "@/components/product/ProductQuickView";
import type { Product } from "@/types";

type ProductQuickViewContextValue = {
  openProductQuickView: (product: Product) => void;
  closeProductQuickView: () => void;
};

const ProductQuickViewContext = createContext<ProductQuickViewContextValue | null>(null);

export function ProductQuickViewProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <ProductQuickViewContext.Provider
      value={{
        openProductQuickView: setSelectedProduct,
        closeProductQuickView: () => setSelectedProduct(null)
      }}
    >
      {children}
      <ProductQuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </ProductQuickViewContext.Provider>
  );
}

export function useProductQuickView() {
  const context = useContext(ProductQuickViewContext);
  if (!context) throw new Error("useProductQuickView must be used within ProductQuickViewProvider");
  return context;
}
