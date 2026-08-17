import { PortfolioGrid } from "@/components/product/PortfolioGrid";
import { portfolio } from "@/data/portfolio";

export const metadata = {
  title: "Portfólio"
};

export default function PortfolioPage() {
  return (
    <main className="container-luma py-14">
      <div className="max-w-2xl">
        <h1 className="font-display text-5xl font-semibold">Portfólio</h1>
        <p className="mt-4 leading-7 text-ink/65">Um recorte de peças, brindes e projetos personalizados que já ganharam forma com a Luma Lab.</p>
      </div>
      <PortfolioGrid items={portfolio} />
    </main>
  );
}
