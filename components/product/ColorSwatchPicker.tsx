"use client";

import { Check } from "lucide-react";
import { FILAMENT_COLORS } from "@/lib/colors";

type ColorSwatchPickerProps = {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
};

export function ColorSwatchPicker({ colors, selected, onSelect }: ColorSwatchPickerProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {colors.map((name, index) => {
        const swatch = FILAMENT_COLORS.find((color) => color.name === name);
        const isSelected = selected === name;

        return (
          <button
            key={name}
            type="button"
            title={name}
            aria-label={name}
            aria-pressed={isSelected}
            onClick={() => onSelect(name)}
            className={`focus-luma relative grid h-10 w-10 flex-none place-items-center rounded-full border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 animate-[colorSwatchIn_420ms_cubic-bezier(0.22,1,0.36,1)_both] ${
              isSelected ? "scale-110 border-graphite shadow-[0_6px_16px_rgba(0,0,0,0.18)]" : "border-black/10 hover:border-graphite/40"
            }`}
            style={{
              background: swatch
                ? `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.65), transparent 45%), ${swatch.hex}`
                : "#e5e5e5",
              animationDelay: `${index * 45}ms`
            }}
          >
            {isSelected ? (
              <span className="grid h-4 w-4 place-items-center rounded-full bg-white/90 shadow-sm">
                <Check size={11} className="text-graphite" strokeWidth={3} />
              </span>
            ) : null}
          </button>
        );
      })}
      <span className="text-sm font-medium text-ink/70">{selected}</span>
    </div>
  );
}
