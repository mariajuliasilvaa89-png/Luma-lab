import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { getProductBySlug, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product?.name ?? "Produto" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).concat(products.filter((item) => item.slug !== product.slug)).slice(0, 4);

  return (
    <main className="container-luma py-14">
      <ProductDetailView product={product} />

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-display text-3xl font-semibold">Detalhes do produto</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-[20px] border border-line p-5"><p className="font-semibold">Produção</p><p className="mt-2 text-sm leading-6 text-ink/65">Impresso em 3D com acabamento artesanal e conferência individual.</p></div>
          <div className="rounded-[20px] border border-line p-5"><p className="font-semibold">Personalização</p><p className="mt-2 text-sm leading-6 text-ink/65">Campos e cores podem variar conforme o modelo escolhido.</p></div>
          <div className="rounded-[20px] border border-line p-5"><p className="font-semibold">Pedido</p><p className="mt-2 text-sm leading-6 text-ink/65">A finalização acontece pelo WhatsApp para confirmar prazo e detalhes.</p></div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-semibold">Você também pode gostar</h2>
        <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </main>
  );
}
