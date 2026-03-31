import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";
import GeoMeta from "@/components/GeoMeta";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const BASE_URL = "https://beautiful-charm-production-7244.up.railway.app";

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Maison Attar | Zellige & Acier Artisanal de Fès",
    template: "%s | Maison Attar",
  },
  description:
    "Maison Attar crée des pièces de décoration en zellige marocain et acier forgé, nées de la rencontre entre l'héritage artisanal de Fès et une sensibilité contemporaine. Chaque zellige est coupé à la main par nos maalems, chaque acier forgé avec soin.",
  keywords: [
    "zellige",
    "zellige marocain",
    "table zellige",
    "acier forgé artisanal",
    "décoration marocaine",
    "mobilier artisanal",
    "maalem Fès",
    "artisanat Fès",
    "luxe",
    "pièce unique",
    "table basse zellige",
    "art islamique géométrique",
    "Maison Attar",
  ],
  authors: [{ name: "Maison Attar", url: BASE_URL }],
  creator: "Maison Attar",
  publisher: "Maison Attar",
  alternates: {
    canonical: BASE_URL,
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Maison Attar",
    title: "Maison Attar | Zellige & Acier Artisanal de Fès",
    description:
      "Des pièces de décoration nées de la rencontre entre le zellige de Fès et l'acier forgé à la main. Héritage artisanal transmis de génération en génération.",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Attar | Zellige & Acier Artisanal de Fès",
    description:
      "Des pièces de décoration nées de la rencontre entre le zellige de Fès et l'acier forgé à la main.",
    creator: "@maisonattar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "luxury furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} h-full antialiased`}
    >
      <head>
        <GeoMeta />
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <WishlistProvider>
          <CartProvider>
            <Header />
            <main className="flex-1 pt-[80px]" id="main-content">
              {children}
            </main>
            <Footer />
            <ChatAssistant />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
