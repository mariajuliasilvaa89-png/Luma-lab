import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/app/globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { LumaBackground } from "@/components/layout/LumaBackground";

const inter = Manrope({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Luma Lab | Impressão 3D personalizada",
    template: "%s | Luma Lab"
  },
  description: "Produtos, brindes, lembranças e projetos personalizados em impressão 3D.",
  openGraph: {
    title: "Luma Lab",
    description: "Ideias ganham forma através da impressão 3D.",
    type: "website",
    locale: "pt_BR"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} relative font-sans`}>
        <LumaBackground />
        <div className="relative z-10">
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}
