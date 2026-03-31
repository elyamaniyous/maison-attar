import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Parlez-nous de votre projet",
  description:
    "Contactez l'équipe Maison Attar pour vos questions sur commandes, projets sur mesure, livraison ou partenariats. Réponse garantie sous 24h ouvrées.",
  alternates: {
    canonical: "https://beautiful-charm-production-7244.up.railway.app/contact",
  },
  keywords: [
    "contact Maison Attar",
    "commande zellige sur mesure",
    "projet architecture intérieure",
    "zellige marocain contact",
  ],
  openGraph: {
    title: "Contact | Maison Attar",
    description:
      "Parlez-nous de votre projet. Nous répondons sous 24h ouvrées.",
    url: "https://beautiful-charm-production-7244.up.railway.app/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
