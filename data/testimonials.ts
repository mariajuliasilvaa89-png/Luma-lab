export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  rating?: number; // 1 a 5, opcional
};

// Lista vazia por enquanto — a seção de feedbacks no modal do produto já está pronta.
// É só preencher aqui quando tiver depoimentos reais de clientes (o componente
// ProductFeedbacks já sabe lidar com a lista vazia e com itens preenchidos).
//
// Exemplo de como adicionar um depoimento (descomente e ajuste):
// { id: "maria-c", name: "Maria C.", quote: "Chegou lindo e bem rapidinho!", rating: 5 }
export const testimonials: Testimonial[] = [];
