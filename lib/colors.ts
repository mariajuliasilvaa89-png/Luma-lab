export type FilamentColor = {
  name: string;
  hex: string;
};

export const FILAMENT_COLORS: FilamentColor[] = [
  { name: "Preto", hex: "#1a1a1a" },
  { name: "Branco", hex: "#f8f8f6" },
  { name: "Marrom", hex: "#6b4226" },
  { name: "Bege", hex: "#e8dcc4" },
  { name: "Dourado", hex: "#d4af37" },
  { name: "Rosa", hex: "#f4a6c6" },
  { name: "Azul", hex: "#3b82f6" },
  { name: "Laranja", hex: "#f97316" },
  { name: "Verde Bandeira", hex: "#009c3b" },
  { name: "Amarelo", hex: "#ffd400" },
  { name: "Vermelho", hex: "#e11d2e" },
  { name: "Roxo", hex: "#8b5cf6" }
];

export const FILAMENT_COLOR_NAMES = FILAMENT_COLORS.map((color) => color.name);
