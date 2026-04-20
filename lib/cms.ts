import { products as initialProducts, maalems as initialMaalems } from "./data";
import { blogArticles as initialBlogArticles, type BlogArticle } from "./blog-data";
import type { Product, Maalem } from "./types";

// ─── Content Types ────────────────────────────────────────────────────────────

export type ContentType = "products" | "maalems" | "pages" | "blog" | "settings";

// ─── Page Content ─────────────────────────────────────────────────────────────

export interface PageSection {
  id: string;
  type: "hero" | "text" | "quote" | "image" | "cta" | "stats" | "timeline";
  title?: string;
  content?: string; // main text content (markdown)
  subtitle?: string;
  image?: string;   // image path
  ctaText?: string;
  ctaLink?: string;
  items?: PageSectionItem[]; // for lists, stats, timeline items
}

export interface PageSectionItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  value?: string;
  image?: string;
}

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  sections: PageSection[];
  lastModified: string;
  modifiedBy: string;
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  instagram: string;
  pinterest: string;
  address: string;
  currency: string;
  freeShippingThreshold: number;
  fabricationWeeks: string;
}

// ─── Admin User ───────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
  passwordHash: string;
  createdAt: string;
  lastLogin?: string;
}

// ─── Simple Hash (demo only, not cryptographically secure) ───────────────────

export function simpleHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}

// ─── In-Memory Store ──────────────────────────────────────────────────────────

// Mutable copies of the imported data so updates survive across requests within
// the same server process lifetime.
let productsStore: Product[] = [...initialProducts];
let maalemsStore: Maalem[] = [...initialMaalems];
let blogStore: BlogArticle[] = [...initialBlogArticles];

const defaultSettings: SiteSettings = {
  siteName: "Maison Attar",
  tagline: "L'art du zellige marocain en pièces de mobilier d'exception",
  description:
    "Maison Attar crée des tables en zellige artisanal directement avec les maalems de Fès. Chaque pièce est unique, fabriquée à la main selon des techniques ancestrales transmises de génération en génération.",
  contactEmail: "contact@maisonattar.com",
  contactPhone: "+33 1 23 45 67 89",
  instagram: "https://instagram.com/maisonattar",
  pinterest: "https://pinterest.com/maisonattar",
  address: "12 rue de la Paix, 75001 Paris, France",
  currency: "EUR",
  freeShippingThreshold: 2000,
  fabricationWeeks: "6 à 10 semaines",
};

let settingsStore: SiteSettings = { ...defaultSettings };

const defaultAdminUser: AdminUser = {
  id: "user-01",
  email: "admin@maisonattar.com",
  name: "Administrateur",
  role: "admin",
  passwordHash: simpleHash("attar2024"),
  createdAt: "2024-01-01T00:00:00.000Z",
};

let usersStore: AdminUser[] = [defaultAdminUser];

const defaultPages: PageContent[] = [
  {
    id: "page-accueil",
    slug: "accueil",
    title: "Accueil",
    lastModified: "2024-01-01T00:00:00.000Z",
    modifiedBy: "admin@maisonattar.com",
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "L'art du zellige marocain en pièces de mobilier d'exception",
        subtitle:
          "Chaque table Maison Attar est créée à la main par un maalem de Fès. Une pièce unique. Un savoir-faire millénaire.",
        ctaText: "Découvrir la collection",
        ctaLink: "/collection",
        image: "/images/hero.jpg",
      },
      {
        id: "brand-promise",
        type: "text",
        title: "Notre promesse",
        content:
          "Maison Attar collabore directement avec les maalems — les maîtres artisans — de la médina de Fès pour créer des pièces de mobilier qui incarnent la richesse du patrimoine marocain. Chaque table est une œuvre unique, signée par l'artisan qui l'a créée.",
      },
      {
        id: "stats",
        type: "stats",
        items: [
          {
            id: "stat-1",
            title: "Maalems partenaires",
            value: "4",
            description: "Artisans maîtres sélectionnés à Fès",
          },
          {
            id: "stat-2",
            title: "Heures de fabrication",
            value: "48–120h",
            description: "Par pièce, entièrement à la main",
          },
          {
            id: "stat-3",
            title: "Pièces créées",
            value: "2 500+",
            description: "Par nos maalems au fil de leur carrière",
          },
          {
            id: "stat-4",
            title: "Livraison",
            value: "6–10 sem.",
            description: "Délai de fabrication et expédition",
          },
        ],
      },
      {
        id: "cta-atelier",
        type: "cta",
        title: "Visitez l'atelier virtuel",
        content:
          "Découvrez comment nos maalems créent chaque pièce, du premier carreau de zellige à la livraison chez vous.",
        ctaText: "Notre histoire",
        ctaLink: "/notre-histoire",
      },
    ],
  },
  {
    id: "page-notre-histoire",
    slug: "notre-histoire",
    title: "Notre Histoire",
    lastModified: "2024-01-01T00:00:00.000Z",
    modifiedBy: "admin@maisonattar.com",
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Un pont entre Fès et votre salon",
        subtitle:
          "Maison Attar est née d'une conviction : le zellige mérite de quitter les médinas pour habiter les intérieurs contemporains du monde entier.",
        image: "/images/notre-histoire/hero.jpg",
      },
      {
        id: "origin-story",
        type: "text",
        title: "L'origine",
        content:
          "Tout a commencé dans la médina de Fès, lors d'une rencontre avec Hassan Bensouda, maalem depuis 34 ans. En le regardant tailler le zellige à la main, nous avons compris que cet art allait disparaître si personne ne créait le pont entre ces artisans et le marché international. Maison Attar est ce pont.",
      },
      {
        id: "our-maalems",
        type: "text",
        title: "Nos maalems",
        content:
          "Nous travaillons exclusivement avec quatre maalems sélectionnés pour leur maîtrise technique, leur intégrité artistique et leur engagement dans la transmission de leur savoir. Chaque artisan est rémunéré équitablement et crédité sur chaque pièce qu'il crée.",
      },
      {
        id: "timeline",
        type: "timeline",
        title: "Notre parcours",
        items: [
          {
            id: "t-1",
            title: "2019",
            description:
              "Première rencontre avec Hassan Bensouda dans la médina de Fès. Naissance de l'idée.",
          },
          {
            id: "t-2",
            title: "2020",
            description:
              "Premiers prototypes. Tests de résistance et de finition sur les tables basses.",
          },
          {
            id: "t-3",
            title: "2021",
            description:
              "Lancement de Maison Attar. Trois maalems partenaires, six modèles au catalogue.",
          },
          {
            id: "t-4",
            title: "2023",
            description:
              "Expansion vers les tables à manger et les consoles. Quatrième maalem intégré.",
          },
          {
            id: "t-5",
            title: "2024",
            description:
              "Lancement du configurateur en ligne. Chaque client peut désormais personnaliser sa pièce.",
          },
        ],
      },
      {
        id: "values-quote",
        type: "quote",
        content:
          "Nous ne vendons pas des meubles. Nous transmettons un savoir-faire qui a traversé mille ans d'histoire, et nous le faisons en rémunérant dignement les artisans qui en sont les gardiens.",
      },
    ],
  },
];

let pagesStore: PageContent[] = [...defaultPages];

// ─── Products ─────────────────────────────────────────────────────────────────

export function getContent(type: ContentType): any[] {
  switch (type) {
    case "products":
      return productsStore;
    case "maalems":
      return maalemsStore;
    case "blog":
      return blogStore;
    case "pages":
      return pagesStore;
    default:
      return [];
  }
}

export function getContentById(type: ContentType, id: string): any {
  const items = getContent(type);
  return items.find((item: any) => item.id === id || item.slug === id) ?? null;
}

export function updateContent(type: ContentType, id: string, data: any): void {
  switch (type) {
    case "products": {
      const idx = productsStore.findIndex((p) => p.id === id);
      if (idx !== -1) productsStore[idx] = { ...productsStore[idx], ...data };
      break;
    }
    case "maalems": {
      const idx = maalemsStore.findIndex((m) => m.id === id);
      if (idx !== -1) maalemsStore[idx] = { ...maalemsStore[idx], ...data };
      break;
    }
    case "blog": {
      const idx = blogStore.findIndex((a) => a.id === id);
      if (idx !== -1) blogStore[idx] = { ...blogStore[idx], ...data };
      break;
    }
    default:
      break;
  }
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export function getSiteSettings(): SiteSettings {
  return { ...settingsStore };
}

export function updateSiteSettings(settings: Partial<SiteSettings>): void {
  settingsStore = { ...settingsStore, ...settings };
}

// ─── Page Content ─────────────────────────────────────────────────────────────

export function getPageContent(slug: string): PageContent | null {
  return pagesStore.find((p) => p.slug === slug) ?? null;
}

export function updatePageContent(slug: string, content: PageContent): void {
  const idx = pagesStore.findIndex((p) => p.slug === slug);
  const updated: PageContent = {
    ...content,
    lastModified: new Date().toISOString(),
  };
  if (idx !== -1) {
    pagesStore[idx] = updated;
  } else {
    pagesStore.push(updated);
  }
}

// ─── Users ────────────────────────────────────────────────────────────────────

export function getUsers(): AdminUser[] {
  return usersStore.map((u) => ({ ...u, passwordHash: "[redacted]" }));
}

export function createUser(
  user: Omit<AdminUser, "id" | "createdAt">
): AdminUser {
  const newUser: AdminUser = {
    ...user,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  usersStore.push(newUser);
  return { ...newUser, passwordHash: "[redacted]" };
}

export function authenticateUser(
  email: string,
  password: string
): AdminUser | null {
  const hash = simpleHash(password);
  const user = usersStore.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === hash
  );
  if (!user) return null;

  // Update last login
  user.lastLogin = new Date().toISOString();
  return { ...user, passwordHash: "[redacted]" };
}
