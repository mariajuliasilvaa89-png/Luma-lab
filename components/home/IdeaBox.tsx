"use client";

import { IdeaComposer } from "@/components/ui/IdeaComposer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

async function submitIdea(idea: string) {
  try {
    const response = await fetch("/api/idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea })
    });
    const data = await response.json();
    return { ok: Boolean(data.ok) };
  } catch {
    return { ok: false };
  }
}

export function IdeaBox() {
  return (
    <section className="relative overflow-hidden py-16 md:py-28">
      <div className="pointer-events-none absolute -right-40 top-8 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,117,183,0.2),rgba(181,156,255,0.13)_42%,transparent_72%)] blur-[82px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-44 top-32 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(118,200,255,0.16),rgba(181,156,255,0.08)_44%,transparent_72%)] blur-[90px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[-18%] left-[34%] h-[300px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,212,71,0.14),rgba(255,159,90,0.08)_44%,transparent_72%)] blur-[86px]" aria-hidden="true" />

      <div className="container-luma relative grid gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-center lg:gap-16">
        <ScrollReveal>
          <div>
            <div className="mb-5 h-0.5 w-16 rounded-full bg-[linear-gradient(90deg,rgb(255_212_71),rgb(255_117_183),rgb(181_156_255),rgb(118_200_255))]" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/45">Ideias para a gente</p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2.7rem,11vw,4rem)] font-semibold leading-[0.98] tracking-[-0.035em] md:text-6xl md:leading-[1.02] md:tracking-normal">
              Dê{" "}
              <span className="bg-gradient-to-r from-luma-blue via-luma-lilac to-luma-pink bg-clip-text text-transparent">
                ideias
              </span>{" "}
              pra gente.
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-7 text-ink/62 md:text-lg md:leading-8">
              Sugestões, ideias soltas ou aquele produto que você queria ver por aqui — é só mandar.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="image">
          <IdeaComposer
            placeholder="Ex: vocês deveriam fazer um porta-retrato temático..."
            onSubmitIdea={submitIdea}
            submitLabel="Enviar ideia"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
