"use client";

import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Logo } from "@/components/ui/Logo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const links = [
  ["Início", "/"],
  ["Catálogo", "/catalogo"],
  ["Personalizados", "/personalizados"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, totalQuantity } = useCart();
  const linkBaseClass =
    "focus-luma relative rounded-md py-2 transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-[linear-gradient(90deg,rgb(118_200_255),rgb(181_156_255),rgb(255_117_183),rgb(255_159_90),rgb(255_212_71))] after:transition-all after:duration-300 after:ease-out hover:text-graphite hover:after:w-full";

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] w-full border-b border-transparent bg-white/90 backdrop-blur-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="container-luma relative z-10 flex h-[74px] items-center justify-between gap-4">
        <div className="hidden lg:block">
          <Logo />
        </div>

        <div className="flex items-center lg:hidden">
          <button className="focus-luma grid h-10 w-10 place-items-center rounded-full border border-line bg-white/80 text-graphite transition hover:border-luma-lilac/60" onClick={() => setOpen((value) => !value)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <Link href="/" className="focus-luma absolute left-1/2 top-1/2 inline-flex h-11 w-20 -translate-x-1/2 -translate-y-1/2 items-center rounded-md lg:hidden" aria-label="Luma Lab">
          <Image
            src="/images/luma-logo.png"
            alt="Luma Lab"
            width={4116}
            height={2805}
            sizes="80px"
            className="h-full w-full object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] font-semibold text-ink/64 lg:flex">
          {links.map(([label, href]) => {
            const active = href === "/" ? pathname === href : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`${linkBaseClass} ${active ? "text-graphite after:w-full" : "after:w-0"}`}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={buildWhatsAppUrl("Olá, Luma Lab! Quero conversar sobre um projeto.")} target="_blank" rel="noreferrer" className="focus-luma inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-[13px] font-semibold transition duration-300 hover:border-luma-pink/60 hover:shadow-[0_10px_26px_rgba(255,117,183,0.12)]">
            <MessageCircle size={17} />
            WhatsApp
          </a>
          <button
            className={`focus-luma relative grid h-10 w-10 place-items-center rounded-full transition duration-300 ${
              totalQuantity > 0
                ? "bg-graphite text-white hover:bg-ink hover:shadow-[0_10px_28px_rgba(181,156,255,0.2)]"
                : "border border-line bg-white/80 text-graphite hover:border-luma-lilac/60"
            }`}
            onClick={openCart}
            aria-label="Abrir carrinho"
          >
            <ShoppingBag size={18} />
            {totalQuantity ? <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-luma-yellow px-1 text-xs font-bold text-graphite">{totalQuantity}</span> : null}
          </button>
        </div>

        <div className="flex items-center lg:hidden">
          <button
            className={`focus-luma relative grid h-10 w-10 place-items-center rounded-full transition duration-300 ${
              totalQuantity > 0
                ? "bg-graphite text-white hover:bg-ink hover:shadow-[0_10px_28px_rgba(181,156,255,0.2)]"
                : "border border-line bg-white/80 text-graphite hover:border-luma-lilac/60"
            }`}
            onClick={openCart}
            aria-label="Abrir carrinho"
          >
            <ShoppingBag size={18} />
            {totalQuantity ? <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-luma-yellow px-1 text-xs font-bold text-graphite">{totalQuantity}</span> : null}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[200] bg-black/20 backdrop-blur-[2px] transition-opacity duration-250 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed left-0 top-0 z-[300] h-[100dvh] w-[82vw] max-w-[340px] overflow-hidden bg-white shadow-[18px_0_60px_rgba(21,21,21,0.08)] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="pointer-events-none absolute -left-24 top-12 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(118,200,255,0.14),rgba(181,156,255,0.08)_48%,transparent_72%)] blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 top-28 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,117,183,0.12),rgba(181,156,255,0.08)_48%,transparent_72%)] blur-3xl" aria-hidden="true" />

        <div className="relative flex h-full flex-col px-5 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setOpen(false)} className="focus-luma inline-flex h-11 w-20 items-center rounded-md" aria-label="Luma Lab">
              <Image
                src="/images/luma-logo.png"
                alt="Luma Lab"
                width={4116}
                height={2805}
                sizes="80px"
                className="h-full w-full object-contain"
              />
            </Link>
            <button className="focus-luma grid h-10 w-10 place-items-center rounded-full border border-line bg-white/80 text-graphite transition hover:border-luma-lilac/60" onClick={() => setOpen(false)} aria-label="Fechar menu">
              <X size={20} />
            </button>
          </div>

          <nav className="mt-12 flex flex-col gap-2">
            {links.map(([label, href], index) => {
              const active = href === "/" ? pathname === href : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`${linkBaseClass} w-fit py-3 text-lg font-semibold ${active ? "text-graphite after:w-full" : "text-ink/70 after:w-0"} ${
                    open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  } transition-[color,opacity,transform] duration-300`}
                  style={{ transitionDelay: open ? `${70 + index * 40}ms` : "0ms" }}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-10 bg-[linear-gradient(90deg,rgba(118,200,255,0.10),rgba(181,156,255,0.10),rgba(255,117,183,0.10),rgba(255,159,90,0.08),rgba(255,212,71,0.10))] blur-xl" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-[linear-gradient(90deg,rgb(118_200_255),rgb(181_156_255),rgb(255_117_183),rgb(255_159_90),rgb(255_212_71))]" aria-hidden="true" />
    </header>
  );
}
