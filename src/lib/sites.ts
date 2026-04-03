// ─── Dados dos sites disponíveis para venda ─────────────────────────────────
// Cada site tem: nome, slug, categoria, preço, campos de negócio e tags visuais.
// Este array é a fonte única de verdade — usado no hub (home) e nos cards.

export type SiteCategory = "Restaurante" | "Saúde" | "E-commerce" | "Serviços" | "Confeitaria";

export interface Site {
  id: string;
  name: string;
  slug: string;
  category: SiteCategory;
  price: number;
  whatsappNumber: string;
  deliveryDays: number;
  includes: string[];
  description: string;
  tags: string[];
  thumbnail: string;
  featured?: boolean;
}

export const sites: Site[] = [
  {
    id: "pizzaria",
    name: "Pizzaria Gustoso",
    slug: "pizzaria",
    category: "Restaurante",
    price: 1200,
    whatsappNumber: "5511999999999",
    deliveryDays: 7,
    includes: [
      "Design personalizado",
      "Mobile 100%",
      "Cardápio interativo",
      "Reservas via WhatsApp",
      "SEO básico",
      "Deploy + domínio",
      "30 dias de suporte",
    ],
    description:
      "Site dark premium para pizzarias e restaurantes. Inclui sistema de reservas, cardápio interativo com categorias e galeria de fotos.",
    tags: ["Dark Premium", "Reservas", "Cardápio", "Galeria"],
    thumbnail: "/assets/thumbnails/pizzaria.jpg",
    featured: true,
  },
  {
    id: "clinica",
    name: "Clínica Vita",
    slug: "clinica",
    category: "Saúde",
    price: 1800,
    whatsappNumber: "5511999999999",
    deliveryDays: 7,
    includes: [
      "Design personalizado",
      "Mobile 100%",
      "Agendamento via WhatsApp",
      "Página da equipe",
      "SEO básico",
      "Deploy + domínio",
      "30 dias de suporte",
    ],
    description:
      "Site light e moderno para clínicas de saúde. Apresenta equipe médica, especialidades, agendamento online e depoimentos.",
    tags: ["Light", "Agendamento", "Equipe", "Depoimentos"],
    thumbnail: "/assets/thumbnails/clinica.jpg",
    featured: true,
  },
  {
    id: "ecommerce",
    name: "Urban Store",
    slug: "ecommerce",
    category: "E-commerce",
    price: 3500,
    whatsappNumber: "5511999999999",
    deliveryDays: 14,
    includes: [
      "Design personalizado",
      "Mobile 100%",
      "Catálogo de produtos",
      "Carrinho via WhatsApp",
      "SEO avançado",
      "Deploy + domínio",
      "60 dias de suporte",
    ],
    description:
      "E-commerce dark editorial para moda e lifestyle. Carrinho funcional, filtros por categoria, página de produto e checkout visual.",
    tags: ["Dark Editorial", "Carrinho", "Filtros", "Checkout"],
    thumbnail: "/assets/thumbnails/ecommerce.jpg",
    featured: true,
  },
  {
    id: "docaria",
    name: "Doçeria da Vovó",
    slug: "docaria",
    category: "Confeitaria",
    price: 1200,
    whatsappNumber: "5511999999999",
    deliveryDays: 7,
    includes: [
      "Design personalizado",
      "Mobile 100%",
      "Cardápio de produtos",
      "Pedidos via WhatsApp",
      "SEO básico",
      "Deploy + domínio",
      "30 dias de suporte",
    ],
    description:
      "Site delicado e moderno para confeiteiras que vendem de casa. Cardápio visual, galeria de produtos, depoimentos e pedido direto pelo WhatsApp.",
    tags: ["Rosa & Dourado", "Cardápio", "WhatsApp", "Galeria"],
    thumbnail: "/assets/thumbnails/docaria.jpg",
    featured: true,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Retorna um site pelo slug. Lança erro se não encontrado. */
export function getSiteBySlug(slug: string): Site {
  const site = sites.find((s) => s.slug === slug);
  if (!site) throw new Error(`Site com slug "${slug}" não encontrado.`);
  return site;
}

/** Formata preço em BRL: 1200 → "R$ 1.200" */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(price);
}
