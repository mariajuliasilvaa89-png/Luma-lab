import { notFound } from "next/navigation";
import { ProductConfigurator } from "@/components/product/ProductConfigurator";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { getProductBySlug, products } from "@/data/products";
import { getProductGalleryImages } from "@/lib/productImage";

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
  const galleryImages = getProductGalleryImages(product);
  const [primaryImage, ...secondaryImages] = galleryImages;

  return (
    <main className="container-luma py-14">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className={galleryImages.length > 1 ? "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 touch-pan-x [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:touch-auto [&::-webkit-scrollbar]:hidden" : "grid gap-4 sm:grid-cols-2"}>
            <ProductVisual tone={primaryImage} className="aspect-square max-sm:min-w-full max-sm:flex-none max-sm:snap-start sm:col-span-2 sm:aspect-[4/3] lg:min-h-[420px]" label={product.badge} />
            {secondaryImages.map((tone, index) => <ProductVisual key={`${tone}-${index}`} tone={tone} className="aspect-square max-sm:min-w-full max-sm:flex-none max-sm:snap-start" />)}
          </div>
          {galleryImages.length > 1 ? (
            <div className="mt-3 flex justify-center gap-2 sm:hidden" aria-hidden="true">
              {galleryImages.map((image) => (
                <span key={image} className="h-1.5 w-1.5 rounded-full bg-ink/20" />
              ))}
            </div>
          ) : null}
        </div>
        <ProductConfigurator product={product} />
      </div>

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
