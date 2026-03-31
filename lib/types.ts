// ─── Product ────────────────────────────────────────────────────────────────

export type ProductCategory =
  | "table-basse"
  | "table-a-manger"
  | "table-d-appoint"
  | "console";

export interface ProductDimensions {
  width: number;   // cm
  height: number;  // cm
  depth: number;   // cm
  weight: number;  // kg
}

export interface ProductMaterials {
  zellige: string;
  base: string;
}

export interface ProductMaalem {
  id: string;
  name: string;
  image: string;
  bio: string;
}

export interface ProductConfigurations {
  zelliges: string[];
  sizes: string[];
  bases: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  category: ProductCategory;
  dimensions: ProductDimensions;
  materials: ProductMaterials;
  maalem: ProductMaalem;
  fabricationHours: number;
  availableConfigurations: ProductConfigurations;
  inStock: boolean;
  featured: boolean;
}

// ─── Maalem ─────────────────────────────────────────────────────────────────

export interface Maalem {
  id: string;
  name: string;
  slug: string;
  image: string;
  portrait: string;
  bio: string;
  specialty: string;
  yearsExperience: number;
  piecesCreated: number;
  quote: string;
}

// ─── Cart ────────────────────────────────────────────────────────────────────

export interface CartItemConfiguration {
  zellige: string;
  size: string;
  base: string;
}

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  configuration: CartItemConfiguration;
}

// ─── Wishlist ────────────────────────────────────────────────────────────────

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
}

// ─── Order & Tracking ────────────────────────────────────────────────────────

export type OrderStatus =
  | "confirmed"
  | "in_fabrication"
  | "zellige_pose"
  | "expedition"
  | "delivered";

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  description: string;
  date: string | null;
  image?: string;
  completed: boolean;
}

export interface Order {
  id: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  maalemName: string;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
}

// ─── Fabrication Update ──────────────────────────────────────────────────────

export interface FabricationUpdate {
  orderId: string;
  step: string;
  photo: string;
  message: string;
  date: string;
}
