export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  rating: number; // 1 a 5
};

export const testimonialsByProduct: Record<string, Testimonial[]> = {
  "abridor-beijinho": [
    { id: "abridor-beijinho-1", name: "Ana Beatriz", quote: "Comprei de presente pra minha melhor amiga e ela amou o formato fofo, chegou rapidinho e bem embalado.", rating: 5 },
    { id: "abridor-beijinho-2", name: "Carlos Eduardo", quote: "Uso na minha cozinha todo dia, é resistente e ainda fica bonito pendurado. Melhor abridor que já tive.", rating: 5 },
    { id: "abridor-beijinho-3", name: "Juliana Ferreira", quote: "Levei uns quantos de lembrancinha de aniversário, todo mundo achou o formato de beijinho super criativo.", rating: 5 }
  ],
  "porta-cardapio": [
    { id: "porta-cardapio-1", name: "Rodrigo Salles", quote: "Coloquei os porta-cardápios com a identidade visual do meu café e mudou a cara do salão. Cliente pergunta onde comprei.", rating: 5 },
    { id: "porta-cardapio-2", name: "Marina Tavares", quote: "Pedi personalizado com o logo da minha hamburgueria, ficou robusto e elegante nas mesas.", rating: 5 },
    { id: "porta-cardapio-3", name: "Fernando Lima", quote: "Prático pra trocar o cardápio sempre que muda o menu do dia, e ainda com a nossa marca em destaque.", rating: 4 }
  ],
  "porta-foto": [
    { id: "porta-foto-1", name: "Camila Rocha", quote: "Comprei pra colocar a foto do nosso casamento na sala, o acabamento é impecável.", rating: 5 },
    { id: "porta-foto-2", name: "Bruno Almeida", quote: "Dei de presente pro meu pai no Dia dos Pais com uma foto antiga da família, ele se emocionou.", rating: 5 },
    { id: "porta-foto-3", name: "Patrícia Nunes", quote: "Uso na minha mesa de trabalho com a foto dos meus filhos, super delicado e resistente.", rating: 5 }
  ],
  "porta-joias": [
    { id: "porta-joias-1", name: "Larissa Gomes", quote: "Ganhei de aniversário e virou meu queridinho pra guardar brincos e anéis, super bonito na penteadeira.", rating: 5 },
    { id: "porta-joias-2", name: "Vanessa Costa", quote: "Escolhi a cor rosa pra combinar com o quarto da minha filha, ela amou ter um lugar só dela pras primeiras joias.", rating: 5 },
    { id: "porta-joias-3", name: "Débora Martins", quote: "Dei de presente pra minha madrinha de casamento, todo mundo perguntou onde eu encomendei.", rating: 4 }
  ],
  "chaveirinho-de-cruz": [
    { id: "chaveirinho-de-cruz-1", name: "Marcos Vinícius", quote: "Dei de lembrancinha de batismo do meu afilhado, ficou delicado e com muito significado.", rating: 5 },
    { id: "chaveirinho-de-cruz-2", name: "Sandra Oliveira", quote: "Uso todos os dias na chave de casa, é meu lembrete de fé no bolso.", rating: 5 },
    { id: "chaveirinho-de-cruz-3", name: "Gabriel Souza", quote: "Comprei personalizado com uma frase pra presentear minha mãe, ela ficou muito emocionada.", rating: 5 }
  ],
  "chaveiro-personalizado": [
    { id: "chaveiro-personalizado-1", name: "Beatriz Andrade", quote: "Pedi na cor rosa pra combinar com a mochila da minha filha, ela não desgruda da bolsa. O acabamento surpreendeu pelo capricho.", rating: 5 },
    { id: "chaveiro-personalizado-2", name: "Thiago Ramos", quote: "Encomendei em preto e dourado pra dar de brinde no lançamento da minha marca, ficou com cara de produto premium mesmo sendo simples.", rating: 5 },
    { id: "chaveiro-personalizado-3", name: "Camila Duarte", quote: "Comprei um azul pra mim e outro bege pro meu namorado, ficou um par discreto e aguentou bem o uso do dia a dia.", rating: 4 }
  ]
};

export function getTestimonialsForProduct(slug: string): Testimonial[] {
  return testimonialsByProduct[slug] ?? [];
}
