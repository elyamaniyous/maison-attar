import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Maison Attar | Zellige & Acier Artisanal",
  description:
    "Maison Attar crée des pièces de décoration en zellige marocain et acier forgé, nées de la rencontre entre l'héritage artisanal de Fès et une sensibilité contemporaine. Chaque zellige est coupé à la main par nos maalems, chaque acier plié et soudé avec soin. Des objets conçus pour durer, pour être transmis.",
  keywords: ["zellige", "acier artisanal", "décoration marocaine", "maison", "Fès", "artisanat", "luxe"],
  authors: [{ name: "Maison Attar" }],
  creator: "Maison Attar",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Maison Attar",
    title: "Maison Attar | Zellige & Acier Artisanal",
    description:
      "Des pièces de décoration nées de la rencontre entre le zellige de Fès et l'acier forgé à la main. Héritage artisanal transmis de génération en génération.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Attar | Zellige & Acier Artisanal",
    description:
      "Des pièces de décoration nées de la rencontre entre le zellige de Fès et l'acier forgé à la main.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <WishlistProvider>
          <CartProvider>
            <Header />
            <main className="flex-1 pt-[80px]" id="main-content">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
