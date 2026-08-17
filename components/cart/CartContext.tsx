"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { getProductImageSrc } from "@/lib/productImage";
import type { CartItem, Product } from "@/types";

type AddInput = {
  product: Product;
  quantity: number;
  color?: string;
  customValues?: Record<string, string>;
  openCart?: boolean;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  totalQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddInput) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  function addItem({ product, quantity, color, customValues, openCart = true }: AddInput) {
    setItems((current) => [
      ...current,
      {
        lineId: `${product.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        price: product.price,
        image: getProductImageSrc(product) ?? product.images[0],
        quantity,
        color,
        customValues
      }
    ]);
    if (openCart) setIsOpen(true);
  }

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      subtotal,
      totalQuantity,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem: (lineId) => setItems((current) => current.filter((item) => item.lineId !== lineId)),
      updateQuantity: (lineId, quantity) =>
        setItems((current) => current.map((item) => (item.lineId === lineId ? { ...item, quantity: Math.max(1, quantity) } : item)))
    }),
    [items, isOpen, subtotal, totalQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
