import Image from "next/image";

type ProductVisualProps = {
  tone?: string;
  className?: string;
  label?: string;
};

const toneMap: Record<string, string> = {
  yellow: "from-luma-yellow/80 via-white to-luma-orange/35",
  pink: "from-luma-pink/70 via-white to-luma-lilac/35",
  lilac: "from-luma-lilac/75 via-white to-luma-blue/35",
  blue: "from-luma-blue/70 via-white to-luma-yellow/35",
  orange: "from-luma-orange/75 via-white to-luma-pink/30"
};

export function ProductVisual({ tone = "yellow", className = "", label }: ProductVisualProps) {
  const isImagePath = tone.startsWith("/");

  if (isImagePath) {
    return (
      <div className={`relative min-h-[220px] overflow-hidden rounded-[22px] border border-line bg-[#f7f7f7] ${className}`}>
        <Image
          src={tone}
          alt=""
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
          className="object-cover object-center"
        />
        {label ? <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-ink">{label}</span> : null}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-[22px] border border-line bg-gradient-to-br ${toneMap[tone] ?? toneMap.yellow} ${className}`}>
      <div className="absolute inset-0 soft-grid opacity-70" />
      <div className="absolute left-5 top-5 h-12 w-12 rounded-full border border-graphite/10 bg-white/70" />
      <div className="absolute bottom-5 right-5 h-16 w-16 rounded-[18px] border border-graphite/10 bg-white/65 layer-lines" />
      <div className="absolute inset-x-8 bottom-8 h-5 rounded-full bg-graphite/10 blur-md" />
      <div className="relative grid h-full min-h-[220px] place-items-center p-8">
        <div className="h-32 w-32 rounded-[34px] border border-white/90 bg-white/80 shadow-soft layer-lines" />
      </div>
      {label ? <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-ink">{label}</span> : null}
    </div>
  );
}
