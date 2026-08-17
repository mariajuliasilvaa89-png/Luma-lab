"use client";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartContext";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductQuickViewProvider } from "@/components/product/ProductQuickViewContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ProductQuickViewProvider>
        <Header />
        <div className="pt-[74px]">
          {children}
          <Footer />
        </div>
      </ProductQuickViewProvider>
      <CartDrawer />
    </CartProvider>
  );
}
