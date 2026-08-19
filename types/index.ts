export type ProductCategory =
  | "Chaveiros"
  | "Abridores"
  | "Brindes"
  | "Festas"
  | "Decoração"
  | "Empresas"
  | "Personalizados"
  | "Presentes";

export type CustomField = {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "number";
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price?: number;
  images: string[];
  imageVersion?: number;
  featured?: boolean;
  badge?: string;
  colors?: string[];
  colorImages?: Record<string, string[]>;
  customizable?: boolean;
  customFields?: CustomField[];
};

export type CartItem = {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price?: number;
  image: string;
  quantity: number;
  color?: string;
  customValues?: Record<string, string>;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: "Personalizados" | "Festas" | "Empresas" | "Presentes" | "Brindes";
  description: string;
  image: string;
  shape: "tall" | "wide" | "square";
};
