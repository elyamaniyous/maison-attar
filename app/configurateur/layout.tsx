import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurateur de Table en Zellige",
  description:
    "Configurez votre table en zellige marocain sur mesure : choisissez votre zellige, votre forme, vos dimensions et votre base en acier forgé. Pièce unique créée par nos maalems à Fès.",
  alternates: {
    canonical: "https://beautiful-charm-production-7244.up.railway.app/configurateur",
  },
  keywords: [
    "table zellige sur mesure",
    "configurateur zellige",
    "personnalisation zellige marocain",
    "table acier forgé sur mesure",
    "commande artisanat Fès",
  ],
  openGraph: {
    title: "Configurateur de Table en Zellige",
    description:
      "Créez votre table en zellige marocain sur mesure. Zellige, forme, dimensions, base — votre pièce unique, créée à Fès.",
    url: "https://beautiful-charm-production-7244.up.railway.app/configurateur",
  },
};

export default function ConfigurateurLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
