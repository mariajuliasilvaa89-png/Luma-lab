import { Instagram, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white/72 backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(118,200,255,0.75),rgba(181,156,255,0.75),rgba(255,117,183,0.75),rgba(255,159,90,0.75),rgba(255,212,71,0.75))]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,117,183,0.12),rgba(181,156,255,0.08)_48%,transparent_72%)] blur-3xl" aria-hidden="true" />

      <div className="container-luma relative pb-8 pt-12 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="focus-luma inline-flex h-11 w-[84px] items-center rounded-md md:h-12 md:w-[98px]" aria-label="Luma Lab">
              <Image
                src="/images/luma-logo.png"
                alt="Luma Lab"
                width={4116}
                height={2805}
                sizes="(max-width: 767px) 84px, 98px"
                className="h-full w-full object-contain"
              />
            </Link>
            <p className="mt-3 text-sm text-ink/58">Ideias ganham forma por aqui.</p>
          </div>

          <div className="flex flex-col gap-3 text-sm font-semibold text-ink/62 md:flex-row md:gap-8">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="focus-luma inline-flex items-center gap-3 py-1 transition hover:text-graphite">
              <Instagram size={17} />
              <span className="flex flex-col leading-tight">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/38">Instagram</span>
                {INSTAGRAM_HANDLE}
              </span>
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="focus-luma inline-flex items-center gap-3 py-1 transition hover:text-graphite">
              <MessageCircle size={17} />
              <span className="flex flex-col leading-tight">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/38">WhatsApp</span>
                {WHATSAPP_DISPLAY}
              </span>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-black/[0.06] pt-5 text-xs text-ink/45">
          © 2026 Luma Lab. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
