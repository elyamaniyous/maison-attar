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

// ─── Admin Configurator Types ─────────────────────────────────────────────────

export interface ConfiguratorCategory {
  id: string;
  label: string;
  description: string;
  options: ConfiguratorOption[];
}

export interface ConfiguratorOption {
  id: string;
  label: string;
  description?: string;
  image?: string;
  costPrice: number;    // prix de revient
  sellingPrice: number; // prix de vente (markup over base)
  available: boolean;
  isSurMesure?: boolean; // flag for custom/bespoke sizing option
  dimensions?: {         // specific dimension data for size options
    width?: number;
    depth?: number;
    diameter?: number;
    label?: string;
  };
}

export interface TableConfigurator {
  sizes: ConfiguratorCategory;
  shapes: ConfiguratorCategory;        // forme: rectangulaire, ronde, ovale, carree
  legStyles: ConfiguratorCategory;     // pieds: cylindre, compas, forge, cube
  colors: ConfiguratorCategory;        // couleur base: noir, blanc, laiton, bronze
  zelligePatterns: ConfiguratorCategory; // motif/forme du zellige
  legColors: ConfiguratorCategory;     // couleur des pieds
}

export interface ConfiguredTable {
  size: string;
  shape: string;
  legStyle: string;
  color: string;
  zelligePattern: string;
  legColor: string;
  totalCostPrice: number;
  totalSellingPrice: number;
}

// ─── AI Assistant Types ───────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ─── WhatsApp Automation Types ────────────────────────────────────────────────

export interface WhatsAppGroup {
  orderId: string;
  groupName: string;
  members: string[];
  createdAt: Date;
  messages: WhatsAppMessage[];
}

export interface WhatsAppMessage {
  sender: string;
  content: string;
  image?: string;
  timestamp: Date;
  type: 'text' | 'image' | 'status_update';
}

// ─── Legal Pages ──────────────────────────────────────────────────────────────

export interface LegalPage {
  title: string;
  slug: string;
  content: string;
  lastUpdated: string;
}
