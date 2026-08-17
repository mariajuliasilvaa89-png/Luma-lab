"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CatalogProductCard } from "@/components/product/CatalogProductCard";
import type { Product } from "@/types";

export function CatalogControls({ products, categories }: { products: Product[]; categories: string[] }) {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return [...products]
      .filter((product) => category === "Todos" || product.category === category)
      .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase()));
  }, [category, products, query]);

  return (
    <>
      <label className="relative block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
        <input
          className="focus-luma h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 outline-none backdrop-blur md:h-13"
          placeholder="Buscar produtos"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
        {categories.map((item) => (
          <button
            key={item}
            className={`focus-luma flex-none whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
              category === item ? "border-graphite bg-graphite text-white" : "border-line bg-white/50 hover:border-graphite"
            }`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 md:mt-8 md:grid-cols-3 md:gap-x-5 md:gap-y-9 lg:grid-cols-4 xl:gap-x-6">
        {filtered.map((product) => <CatalogProductCard key={product.id} product={product} />)}
      </div>
    </>
  );
}
