import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "abridor-beijinho",
    slug: "abridor-beijinho",
    name: "Abridor Beijinho",
    category: "Abridores",
    description: "Um abridor de latinhas em formato de beijinho, produzido em impressão 3D. Compacto, leve e diferente, é perfeito para levar com você ou dar de presente.",
    images: [
      "/images/abridor-beijinho/beijinho-02",
      "/images/abridor-beijinho/img-01",
      "/images/abridor-beijinho/img-02",
      "/images/abridor-beijinho/img-03"
    ],
    featured: true
  },
  {
    id: "porta-cardapio",
    slug: "porta-cardapio",
    name: "Porta Cardápio",
    category: "Personalizados",
    description: "Porta-cardápio impresso em 3D e feito sob medida pra combinar com a identidade do seu negócio. Praticidade na mesa do cliente, com a sua cara.",
    images: [
      "/images/porta-cardapio/img-01.png",
      "/images/porta-cardapio/img-02.png",
      "/images/porta-cardapio/img-03.png",
      "/images/porta-cardapio/img-04.png"
    ],
    featured: true
  },
  {
    id: "porta-foto",
    slug: "porta-foto",
    name: "Porta Foto",
    category: "Decoração",
    description: "Porta-retrato impresso em 3D pra guardar os momentos que você mais quer lembrar. Personalizado no formato e na cor do seu jeito.",
    images: [
      "/images/porta-foto/img-01.png",
      "/images/porta-foto/img-02.png",
      "/images/porta-foto/img-03.png",
      "/images/porta-foto/img-04.png"
    ],
    featured: true
  },
  {
    id: "porta-joias",
    slug: "porta-joias",
    name: "Porta-Joias",
    category: "Presentes",
    description: "Porta-joias impresso em 3D, pensado pra guardar (ou presentear) o que tem valor. Design e cores personalizados pra ficar do jeitinho de quem vai usar.",
    images: [
      "/images/porta-joias/img-01.png",
      "/images/porta-joias/img-02.png",
      "/images/porta-joias/img-03.png",
      "/images/porta-joias/img-04.png"
    ],
    featured: true
  },
  {
    id: "chaveirinho-de-cruz",
    slug: "chaveirinho-de-cruz",
    name: "Chaveirinho de Cruz",
    category: "Chaveiros",
    description: "Chaveiro em formato de cruz, impresso em 3D e personalizado com o nome ou frase que você escolher. Pequeno, significativo e sempre por perto.",
    images: [
      "/images/chaveiro-cruz/img-01.png",
      "/images/chaveiro-cruz/img-02.png",
      "/images/chaveiro-cruz/img-03.png",
      "/images/chaveiro-cruz/img-04.png"
    ],
    featured: true
  }
];

export const categories = ["Todos", "Chaveiros", "Abridores", "Personalizados", "Presentes", "Decoração"] as const;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
