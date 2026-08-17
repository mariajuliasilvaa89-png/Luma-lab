"use client";

import { ArrowUpRight } from "lucide-react";
import { IdeaComposer, type IdeaSuggestion } from "@/components/ui/IdeaComposer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const SUGGESTIONS: IdeaSuggestion[] = [
  { label: "+ Evento", insert: "Quero algo personalizado para um evento." },
  { label: "+ Presente", insert: "Quero um presente personalizado." },
  { label: "+ Uma ideia diferente", insert: "Tenho uma ideia diferente que gostaria de desenvolver com vocês." }
];

const STEPS = [
  "Conte sua ideia com suas palavras.",
  "Anexe a logo da sua empresa, se tiver.",
  "Fale direto com a Luma pelo WhatsApp."
];

const DOT_COLORS = ["#76c8ff", "#b59cff", "#ff75b7", "#ff9f5a"];

function buildMessage(idea: string, hasImage?: boolean) {
  const base = idea
    ? `Olá! Vim pelo site da Luma Lab e tenho uma ideia de projeto personalizado: ${idea}`
    : "Olá! Vim pelo site da Luma Lab e gostaria de conversar sobre um projeto personalizado.";

  return hasImage ? `${base}\n\n(Segue em anexo a imagem da minha logo.)` : base;
}

export function CustomProjectStudio() {
  return (
    <section className="relative overflow-hidden py-16 md:py-28">
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(118,200,255,0.14),rgba(181,156,255,0.08)_44%,transparent_72%)] blur-[86px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-[42%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,117,183,0.1),rgba(255,159,90,0.06)_44%,transparent_72%)] blur-[90px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[-12%] left-[30%] h-[260px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(255,212,71,0.08),rgba(255,159,90,0.05)_44%,transparent_72%)] blur-[86px]" aria-hidden="true" />

      <div className="container-luma relative grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center lg:gap-16">
        <div>
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/50 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(90deg,rgb(118_200_255),rgb(255_117_183))]" aria-hidden="true" />
              Projetos sob medida
            </span>
          </ScrollReveal>
          <ScrollReveal delay={70}>
            <h1 className="mt-5 max-w-lg font-display text-[clamp(2.6rem,10vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[clamp(3rem,4vw,3.75rem)]">
              Você imagina.
              <br />
              A Luma{" "}
              <span className="bg-[linear-gradient(90deg,rgb(118_200_255),rgb(181_156_255),rgb(255_117_183),rgb(255_159_90))] bg-clip-text text-transparent">
                dá forma.
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="mt-6 max-w-md text-lg leading-8 text-ink/62">Conte pra gente o que você quer criar.</p>
          </ScrollReveal>

          <div className="mt-9 max-w-sm space-y-4">
            {STEPS.map((step, index) => (
              <ScrollReveal key={step} delay={180 + index * 70} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-ink/24">0{index + 1}</span>
                <p className="text-sm leading-6 text-ink/60">{step}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div>
          <ScrollReveal delay={100} className="mb-5 flex items-center gap-2.5">
            {DOT_COLORS.map((color, index) => (
              <span
                key={color}
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: color, opacity: 0.6 - index * 0.08 }}
                aria-hidden="true"
              />
            ))}
          </ScrollReveal>
          <ScrollReveal delay={210} direction="image" className="relative">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[34px] soft-grid opacity-[0.4]" aria-hidden="true" />
            <IdeaComposer
              placeholder="Ex: chaveiro com minha logo, lembrança para casamento..."
              buildMessage={buildMessage}
              submitLabel="Enviar minha ideia"
              icon={ArrowUpRight}
              suggestions={SUGGESTIONS}
              showCounter={false}
              requireIdea={false}
              minHeightClassName="min-h-[190px] md:min-h-[220px]"
              allowImageUpload
              imageUploadLabel="Anexar a logo da empresa"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
