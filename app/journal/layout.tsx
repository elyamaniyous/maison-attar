import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Le Journal | Maison Attar",
    template: "%s | Maison Attar Journal",
  },
  description:
    "Histoires d'atelier, de zellige et de Fès. Le journal de Maison Attar explore l'art du zellige marocain, l'artisanat des maalems de Fès, la décoration contemporaine et le patrimoine de la médina.",
  keywords: [
    "zellige marocain",
    "artisanat fes",
    "maalems",
    "decoration marocaine",
    "journal artisanat",
    "zellige blog",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Maison Attar",
  },
  alternates: {
    canonical: "https://maisonattar.com/journal",
  },
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
