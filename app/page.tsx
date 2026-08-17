import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CatalogPreviewScroller } from "@/components/home/CatalogPreviewScroller";
import { HomeCatalogPreviewCard } from "@/components/home/HomeCatalogPreviewCard";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { IdeaBox } from "@/components/home/IdeaBox";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { products } from "@/data/products";

export default function Home() {
  const catalogPreview = products.filter((product) => product.featured).slice(0, 4);
  const values = [
    { label: "Criatividade", color: "bg-luma-pink" },
    { label: "Cuidado", color: "bg-luma-blue" },
    { label: "Qualidade", color: "bg-luma-yellow" },
    { label: "Personalização", color: "bg-luma-lilac" },
    { label: "Proximidade", color: "bg-luma-pink" },
    { label: "Inovação", color: "bg-luma-blue" }
  ];

  return (
    <main className="ambient-page relative overflow-hidden">
      <HeroCarousel />

      <section className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="pointer-events-none absolute left-[-20%] top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(118,200,255,0.14),rgba(181,156,255,0.08)_44%,transparent_72%)] blur-[82px]" aria-hidden="true" />
        <div className="pointer-events-none absolute right-[-18%] bottom-[-8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,117,183,0.12),rgba(255,212,71,0.08)_48%,transparent_72%)] blur-[86px]" aria-hidden="true" />

        <div className="container-luma relative">
          <ScrollReveal className="mb-10 flex items-end justify-between gap-5">
            <>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">Catálogo Luma</p>
                <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] md:text-5xl">Algumas coisas que você encontra por aqui.</h2>
              </div>
              <Link href="/catalogo" className="group hidden items-center gap-2 text-sm font-semibold text-ink/56 transition hover:text-graphite sm:inline-flex">
                Ver catálogo
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
            </>
          </ScrollReveal>

          <div className="w-full overflow-hidden">
            <CatalogPreviewScroller>
              {catalogPreview.map((product, index) => (
                <HomeCatalogPreviewCard key={product.id} product={product} index={index} priority={index < 2} />
              ))}
            </CatalogPreviewScroller>
          </div>

          <Link href="/catalogo" className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink/56 transition hover:text-graphite sm:hidden">
            Ver catálogo
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <IdeaBox />

      <section className="relative overflow-hidden py-10 md:py-16">
        <div className="pointer-events-none absolute left-[-48%] top-[2%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(118,200,255,0.16),rgba(181,156,255,0.08)_44%,transparent_72%)] blur-[56px] md:left-[-18%] md:top-[8%] md:h-[460px] md:w-[460px] md:blur-[70px]" aria-hidden="true" />
        <div className="pointer-events-none absolute right-[-42%] top-[20%] h-[390px] w-[390px] rounded-full bg-[radial-gradient(circle,rgba(255,117,183,0.18),rgba(181,156,255,0.12)_44%,transparent_72%)] blur-[64px] md:right-[-14%] md:top-[2%] md:h-[520px] md:w-[520px] md:blur-[76px]" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-[10%] left-[14%] h-[220px] w-[330px] rounded-full bg-[radial-gradient(circle,rgba(255,212,71,0.18),rgba(255,159,90,0.09)_42%,transparent_72%)] blur-[66px] md:bottom-[-22%] md:left-[38%] md:h-[340px] md:w-[520px] md:blur-[80px]" aria-hidden="true" />

        <div className="container-luma relative grid items-center gap-8 md:min-h-[76vh] md:gap-12 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <ScrollReveal delay={0}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/46">Luma Lab · Impressão 3D</p>
            </ScrollReveal>
            <ScrollReveal delay={70}>
              <h1 className="mt-5 max-w-[780px] font-display text-[clamp(2.6rem,11vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] md:text-[clamp(3rem,5vw,5.5rem)] md:leading-[1.01] md:tracking-normal">
                Criamos coisas que antes eram só <span className="bg-gradient-to-r from-luma-pink via-luma-lilac to-luma-blue bg-clip-text text-transparent">ideias.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="mt-6 text-lg leading-8 text-ink/58">Da primeira ideia ao objeto pronto.</p>
            </ScrollReveal>
            <ScrollReveal delay={210}>
              <div className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/48 md:mt-14">
                <span className="h-px w-8 rounded-full bg-gradient-to-r from-luma-yellow via-luma-pink to-luma-blue" aria-hidden="true" />
                Descubra
                <ArrowDown size={15} className="animate-[lumaScrollCue_2s_ease-in-out_infinite]" />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" className="relative md:min-h-[520px]">
            <div className="pointer-events-none absolute left-[7%] top-[18%] hidden w-56 space-y-2 md:block" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((line) => (
                <span
                  key={line}
                  className="block h-px rounded-full bg-gradient-to-r from-luma-pink via-luma-lilac to-luma-blue"
                  style={{
                    width: `${72 + line * 13}%`,
                    opacity: 0.18 - line * 0.014
                  }}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute -right-1 -top-4 z-20 w-24 space-y-1.5 md:hidden" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((line) => (
                <span
                  key={line}
                  className="block h-px rounded-full bg-gradient-to-r from-luma-yellow via-luma-pink to-luma-blue"
                  style={{
                    marginLeft: `${line * 7}px`,
                    width: `${70 - line * 4}px`,
                    opacity: 0.22 - line * 0.025
                  }}
                />
              ))}
            </div>
            <span className="pointer-events-none absolute right-[8%] top-[7%] hidden h-40 w-40 rounded-full border border-luma-pink/25 border-b-transparent border-l-transparent md:block md:h-56 md:w-56" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-[18%] left-[14%] hidden h-2.5 w-2.5 rounded-full bg-luma-yellow/70 shadow-[0_0_24px_rgba(255,212,71,0.35)] md:block" aria-hidden="true" />

            <div className="relative mx-auto aspect-[4/3] w-full max-w-[640px] overflow-hidden rounded-[22px] shadow-[0_20px_60px_rgba(40,20,80,0.10)] md:aspect-auto md:h-[520px] md:overflow-visible md:rounded-none md:shadow-none">
              <div className="absolute -inset-x-8 -inset-y-10 bg-[radial-gradient(circle,rgba(235,100,190,0.2),rgba(140,130,255,0.13)_42%,rgba(118,200,255,0.1)_56%,transparent_70%)] blur-[50px] md:hidden" aria-hidden="true" />
              <div className="absolute inset-x-[10%] bottom-5 hidden h-12 rounded-full bg-graphite/10 blur-2xl md:block" aria-hidden="true" />
              <div className="relative h-full animate-[lumaProductFloat_6.5s_ease-in-out_infinite] max-md:animate-none">
                <Image
                  src="/images/img.png"
                  alt="Objeto 3D sendo impresso pela Luma Lab"
                  fill
                  sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 32px), 560px"
                  className="object-cover object-center md:object-contain md:drop-shadow-[0_30px_55px_rgba(21,21,21,0.16)]"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="sobre" className="relative overflow-hidden py-18 md:py-32">
        <div className="pointer-events-none absolute right-[-18%] top-6 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,117,183,0.18),rgba(181,156,255,0.12)_42%,transparent_72%)] blur-[76px]" aria-hidden="true" />
        <div className="pointer-events-none absolute left-[-22%] top-[34%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(118,200,255,0.14),rgba(181,156,255,0.08)_44%,transparent_72%)] blur-[82px]" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-[-14%] left-[22%] h-[300px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,212,71,0.13),rgba(255,159,90,0.08)_42%,transparent_72%)] blur-[88px]" aria-hidden="true" />

        <div className="container-luma relative grid gap-12 lg:grid-cols-[0.9fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ScrollReveal>
              <div className="flex flex-col gap-4">
                <div className="h-1 w-[70px] rounded-full bg-[linear-gradient(90deg,rgb(255_212_71),rgb(255_117_183),rgb(181_156_255),rgb(118_200_255))]" />
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/45">Nosso jeito de criar</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2.5rem,10vw,3.4rem)] font-semibold leading-[1] tracking-[-0.03em] md:text-6xl md:leading-[1.03] md:tracking-normal">
                Criamos com <span className="bg-gradient-to-r from-luma-pink via-luma-lilac to-luma-blue bg-clip-text text-transparent">propósito.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="mt-6 max-w-lg text-[17px] leading-7 text-ink/62 md:text-lg md:leading-8">Tecnologia é o começo. Criatividade e cuidado fazem o resto.</p>
            </ScrollReveal>
          </div>

          <div className="space-y-10 md:space-y-12">
            <ScrollReveal delay={80}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-ink/24">01</span>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/50">Missão</p>
                </div>
                <p className="mt-5 max-w-2xl text-[16px] leading-7 text-ink/72 md:text-[17px]">Transformar ideias em produtos únicos, unindo criatividade, tecnologia e cuidado em cada detalhe.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-ink/24">02</span>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/50">Visão</p>
                </div>
                <p className="mt-5 max-w-2xl text-[16px] leading-7 text-ink/72 md:text-[17px]">Tornar a personalização cada vez mais criativa, próxima e cheia de possibilidades.</p>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal delay={220}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-ink/24">03</span>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/50">Valores</p>
                </div>
              </ScrollReveal>
              <div className="mt-5 flex flex-wrap gap-2.5 md:gap-3">
                {values.map((value, index) => (
                  <ScrollReveal key={value.label} delay={index * 70}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/65 px-4 py-2.5 text-sm font-semibold text-ink/72 backdrop-blur">
                      <span className={`h-1.5 w-1.5 rounded-full ${value.color}`} aria-hidden="true" />
                      {value.label}
                    </span>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
