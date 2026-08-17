"use client";

import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductVisual } from "@/components/ui/ProductVisual";
import type { PortfolioItem } from "@/types";

const filters = ["Todos", "Empresas", "Festas", "Presentes", "Personalizados", "Brindes"];

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState("Todos");
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const visible = useMemo(() => items.filter((item) => filter === "Todos" || item.category === filter), [filter, items]);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button key={item} className={`focus-luma rounded-full border px-4 py-2 text-sm font-semibold transition ${filter === item ? "border-graphite bg-graphite text-white" : "border-line hover:border-graphite"}`} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-10 grid auto-rows-[180px] gap-5 md:grid-cols-4">
        {visible.map((item) => (
          <button key={item.id} className={`focus-luma group relative overflow-hidden rounded-[22px] text-left ${item.shape === "wide" ? "md:col-span-2" : ""} ${item.shape === "tall" ? "md:row-span-2" : ""}`} onClick={() => setActive(item)}>
            <ProductVisual tone={item.image} className="h-full min-h-0 transition duration-500 group-hover:scale-[1.03]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite/72 to-transparent p-5 text-white">
              <p className="text-xs">{item.category}</p>
              <p className="font-semibold">{item.title}</p>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-graphite/25 p-4">
          <div className="relative grid max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[26px] bg-white p-4 shadow-soft md:grid-cols-[1.1fr_0.9fr] md:p-6">
            <button className="focus-luma absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-soft" onClick={() => setActive(null)} aria-label="Fechar modal"><X size={20} /></button>
            <ProductVisual tone={active.image} className="min-h-[420px]" />
            <div className="p-4 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink/45">{active.category}</p>
              <h2 className="mt-4 font-display text-4xl font-semibold">{active.title}</h2>
              <p className="mt-5 leading-7 text-ink/65">{active.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
