"use client";

import { ArrowRight, ImagePlus, X, type LucideIcon } from "lucide-react";
import { ChangeEvent, type CSSProperties, FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type IdeaSuggestion = {
  label: string;
  insert: string;
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

type IdeaComposerProps = {
  placeholder: string;
  buildMessage?: (idea: string, hasImage?: boolean) => string;
  onSubmitIdea?: (idea: string) => Promise<{ ok: boolean }>;
  submitLabel?: ReactNode;
  icon?: LucideIcon;
  suggestions?: IdeaSuggestion[];
  showCounter?: boolean;
  requireIdea?: boolean;
  maxLength?: number;
  minHeightClassName?: string;
  allowImageUpload?: boolean;
  imageUploadLabel?: string;
};

function CheckDraw({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 13l4 4L19 7"
        stroke="#151515"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={reducedMotion ? 0 : 1}
        className={reducedMotion ? undefined : "animate-[ideaCheckDraw_550ms_ease-out_1_forwards]"}
      />
    </svg>
  );
}

type ConfettiPiece = {
  left: string;
  tx: number;
  ty: number;
  rotate: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  shape: "circle" | "square";
};

const CONFETTI_PIECES: ConfettiPiece[] = [
  { left: "4%", tx: -36, ty: 87, rotate: -75, delay: 26, duration: 933, color: "#76c8ff", size: 10, shape: "circle" },
  { left: "8%", tx: 46, ty: 82, rotate: -63, delay: 55, duration: 819, color: "#b59cff", size: 9, shape: "square" },
  { left: "12%", tx: -63, ty: 103, rotate: 96, delay: 114, duration: 910, color: "#ff75b7", size: 7, shape: "circle" },
  { left: "16%", tx: 20, ty: 112, rotate: 127, delay: 71, duration: 799, color: "#ff9f5a", size: 6, shape: "square" },
  { left: "20%", tx: 67, ty: 48, rotate: -131, delay: 88, duration: 914, color: "#ffd447", size: 7, shape: "circle" },
  { left: "24%", tx: 30, ty: 145, rotate: 60, delay: 75, duration: 972, color: "#76c8ff", size: 10, shape: "square" },
  { left: "28%", tx: -67, ty: 120, rotate: -51, delay: 58, duration: 957, color: "#b59cff", size: 7, shape: "circle" },
  { left: "32%", tx: 91, ty: 53, rotate: 111, delay: 116, duration: 922, color: "#ff75b7", size: 7, shape: "square" },
  { left: "36%", tx: 37, ty: 120, rotate: -195, delay: 43, duration: 896, color: "#ff9f5a", size: 10, shape: "circle" },
  { left: "40%", tx: 2, ty: 130, rotate: -123, delay: 14, duration: 818, color: "#ffd447", size: 5, shape: "square" },
  { left: "44%", tx: 24, ty: 116, rotate: 94, delay: 127, duration: 861, color: "#76c8ff", size: 10, shape: "circle" },
  { left: "48%", tx: -64, ty: 50, rotate: 189, delay: 109, duration: 909, color: "#b59cff", size: 8, shape: "square" },
  { left: "52%", tx: -63, ty: 126, rotate: 63, delay: 12, duration: 980, color: "#ff75b7", size: 5, shape: "circle" },
  { left: "56%", tx: 36, ty: 107, rotate: -138, delay: 97, duration: 912, color: "#ff9f5a", size: 8, shape: "square" },
  { left: "60%", tx: -95, ty: 66, rotate: -69, delay: 68, duration: 956, color: "#ffd447", size: 10, shape: "circle" },
  { left: "64%", tx: -36, ty: 103, rotate: -107, delay: 128, duration: 955, color: "#76c8ff", size: 6, shape: "square" },
  { left: "68%", tx: -60, ty: 40, rotate: -79, delay: 95, duration: 955, color: "#b59cff", size: 6, shape: "circle" },
  { left: "72%", tx: -85, ty: 63, rotate: -193, delay: 82, duration: 885, color: "#ff75b7", size: 5, shape: "square" },
  { left: "76%", tx: 54, ty: 108, rotate: 101, delay: 14, duration: 821, color: "#ff9f5a", size: 9, shape: "circle" },
  { left: "80%", tx: 56, ty: 59, rotate: -176, delay: 32, duration: 792, color: "#ffd447", size: 10, shape: "square" },
  { left: "84%", tx: -78, ty: 43, rotate: 94, delay: 51, duration: 942, color: "#76c8ff", size: 7, shape: "circle" },
  { left: "88%", tx: -67, ty: 98, rotate: 70, delay: 63, duration: 817, color: "#b59cff", size: 5, shape: "square" },
  { left: "92%", tx: -42, ty: 120, rotate: -41, delay: 18, duration: 941, color: "#ff75b7", size: 10, shape: "circle" },
  { left: "96%", tx: 54, ty: 50, rotate: 58, delay: 60, duration: 831, color: "#ff9f5a", size: 10, shape: "square" }
];

function IdeaSuccessState({ reducedMotion, onReset }: { reducedMotion: boolean; onReset: () => void }) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-4 py-6 text-center">
      <div className="relative grid h-14 w-14 place-items-center rounded-full bg-graphite/[0.05]">
        <CheckDraw reducedMotion={reducedMotion} />

        {!reducedMotion ? (
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {CONFETTI_PIECES.map((piece, index) => (
              <span
                key={index}
                className={`absolute left-1/2 top-1/2 animate-[ideaConfettiBurst_var(--dur)_ease-out_1_forwards] ${
                  piece.shape === "circle" ? "rounded-full" : "rounded-[2px]"
                }`}
                style={
                  {
                    left: piece.left,
                    width: piece.size,
                    height: piece.size,
                    backgroundColor: piece.color,
                    animationDelay: `${piece.delay}ms`,
                    "--tx": `${piece.tx}px`,
                    "--ty": `${piece.ty}px`,
                    "--tr": `${piece.rotate}deg`,
                    "--dur": `${piece.duration}ms`
                  } as CSSProperties
                }
              />
            ))}
          </div>
        ) : null}
      </div>

      <p className="text-base font-semibold text-ink">Ideia recebida. Obrigado!</p>

      <button
        type="button"
        onClick={onReset}
        className="focus-luma text-sm font-medium text-ink/50 underline decoration-ink/20 underline-offset-4 transition hover:text-ink"
      >
        Enviar outra ideia
      </button>
    </div>
  );
}

export function IdeaComposer({
  placeholder,
  buildMessage,
  onSubmitIdea,
  submitLabel = "Vamos criar isso",
  icon: Icon = ArrowRight,
  suggestions,
  showCounter = true,
  requireIdea = true,
  maxLength = 500,
  minHeightClassName = "min-h-[250px] md:min-h-[360px]",
  allowImageUpload = false,
  imageUploadLabel = "Anexar sua logo"
}: IdeaComposerProps) {
  const [idea, setIdea] = useState("");
  const [focused, setFocused] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [canShareFiles] = useState(
    () => typeof navigator !== "undefined" && typeof navigator.share === "function" && typeof navigator.canShare === "function"
  );
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const hasIdea = idea.trim().length > 0;
  const isSending = status === "sending";
  const isSuccess = status === "success";
  const awake = focused || hasIdea || Boolean(logoFile) || isSuccess;
  const isDisabled = (requireIdea && !hasIdea) || isSending;

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleRemoveLogo = () => {
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReset = () => {
    setIdea("");
    setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) return;

    if (onSubmitIdea) {
      if (honeypotRef.current?.value) {
        setStatus("success");
        return;
      }

      setStatus("sending");
      const result = await onSubmitIdea(idea.trim());
      setStatus(result.ok ? "success" : "error");
      return;
    }

    if (!buildMessage) return;
    const message = buildMessage(idea.trim(), Boolean(logoFile));

    if (logoFile && canShareFiles && navigator.canShare?.({ files: [logoFile] })) {
      try {
        await navigator.share({
          title: "Ideia personalizada — Luma Lab",
          text: message,
          files: [logoFile]
        });
        return;
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
      }
    }

    window.open(buildWhatsAppUrl(message), "_blank", "noreferrer");
  };

  const handleSuggestion = (insert: string) => {
    setIdea((current) => {
      if (!current.trim()) return insert;
      if (current.includes(insert)) return current;
      return `${current.trim()} ${insert}`;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative overflow-hidden rounded-[28px] p-px transition duration-300 ${
        awake
          ? "-translate-y-0.5 bg-[linear-gradient(120deg,rgba(118,200,255,0.75),rgba(181,156,255,0.6),rgba(255,117,183,0.58),rgba(255,212,71,0.5))] shadow-[0_22px_70px_rgba(181,156,255,0.16)]"
          : "bg-black/[0.07]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-8 -bottom-16 h-28 rounded-full bg-[radial-gradient(circle,rgba(255,117,183,0.22),rgba(181,156,255,0.14),transparent_70%)] blur-3xl transition duration-300 ${
          awake ? "opacity-100" : "opacity-45"
        }`}
        aria-hidden="true"
      />
      <div className={`relative flex ${minHeightClassName} flex-col overflow-hidden rounded-[27px] bg-white/78 p-5 backdrop-blur-[18px] md:p-7`}>
        {isSuccess ? (
          <IdeaSuccessState reducedMotion={reducedMotion} onReset={handleReset} />
        ) : (
          <>
            <label htmlFor="idea-composer" className="sr-only">Descreva sua ideia</label>
            <textarea
              id="idea-composer"
              value={idea}
              maxLength={maxLength}
              onChange={(event) => setIdea(event.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholder}
              className="min-h-0 flex-1 resize-none bg-transparent text-base leading-7 text-ink outline-none placeholder:text-ink/34 md:text-lg md:leading-8"
            />

            {onSubmitIdea ? (
              <input
                ref={honeypotRef}
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
            ) : null}

            {suggestions?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.label}
                    type="button"
                    onClick={() => handleSuggestion(suggestion.insert)}
                    className="focus-luma rounded-full border border-black/[0.08] bg-white/60 px-3 py-1.5 text-xs font-medium text-ink/60 transition hover:border-graphite/30 hover:text-ink"
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            ) : null}

            {allowImageUpload ? (
              <div className="mt-4">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                {logoFile && logoPreview ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-black/[0.08] bg-white/60 p-2 pr-3">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local blob: preview, next/image doesn't support blob URLs */}
                    <img src={logoPreview} alt="" className="h-11 w-11 flex-none rounded-xl object-cover" />
                    <span className="min-w-0 flex-1 truncate text-xs font-medium text-ink/60">{logoFile.name}</span>
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="focus-luma grid h-7 w-7 flex-none place-items-center rounded-full text-ink/45 transition hover:bg-mist hover:text-graphite"
                      aria-label="Remover imagem"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="focus-luma inline-flex items-center gap-2 rounded-full border border-dashed border-black/[0.14] bg-white/40 px-3.5 py-2 text-xs font-semibold text-ink/55 transition hover:border-graphite/35 hover:text-ink"
                  >
                    <ImagePlus size={15} />
                    {imageUploadLabel}
                  </button>
                )}
              </div>
            ) : null}

            <div className="mt-5 flex items-end justify-between gap-4">
              {showCounter ? (
                <span className="text-xs font-medium text-ink/38">{idea.length} / {maxLength}</span>
              ) : logoFile ? (
                <span className="text-xs leading-snug text-ink/40">
                  {canShareFiles ? "Ao enviar, escolha o WhatsApp no menu de compartilhamento." : "O WhatsApp vai abrir com o texto pronto — anexe a imagem na conversa."}
                </span>
              ) : (
                <span aria-hidden="true" />
              )}
              <button
                type="submit"
                disabled={isDisabled}
                className={`focus-luma group inline-flex min-h-11 flex-none items-center gap-2 rounded-full px-4 text-sm font-semibold transition duration-300 ${
                  isDisabled
                    ? "cursor-not-allowed bg-ink/[0.06] text-ink/34"
                    : "bg-graphite text-white hover:shadow-[0_12px_30px_rgba(181,156,255,0.2)]"
                }`}
              >
                {isSending ? "Enviando..." : submitLabel}
                {!isSending ? <Icon size={16} className={`transition ${isDisabled ? "" : "group-hover:translate-x-1"}`} /> : null}
              </button>
            </div>

            {status === "error" ? (
              <p className="mt-3 text-xs text-ink/50">Não deu pra enviar agora. Tenta de novo?</p>
            ) : null}
          </>
        )}
      </div>
    </form>
  );
}
