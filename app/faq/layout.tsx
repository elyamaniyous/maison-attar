import type { Metadata } from "next";
import { FAQSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "FAQ — Questions Fréquentes",
  description:
    "Réponses à toutes vos questions sur Maison Attar : commandes, fabrication artisanale, livraison, paiement sécurisé, retours et entretien du zellige marocain.",
  alternates: {
    canonical: "https://beautiful-charm-production-7244.up.railway.app/faq",
  },
  keywords: [
    "FAQ Maison Attar",
    "questions zellige",
    "livraison table zellige",
    "entretien zellige",
    "commande artisanat Fès",
    "retour table zellige",
  ],
  openGraph: {
    title: "FAQ — Questions Fréquentes | Maison Attar",
    description:
      "Réponses à toutes vos questions sur nos tables en zellige artisanal : commandes, fabrication, livraison, paiement et entretien.",
    url: "https://beautiful-charm-production-7244.up.railway.app/faq",
  },
};

// All FAQ Q&As for structured data — mirrors the data in page.tsx
const FAQ_ITEMS = [
  // Commandes
  { question: "Comment passer une commande sur maisonattar.com ?", answer: "Rendez-vous sur la page de la pièce qui vous intéresse, configurez votre zellige, taille et type de pieds, puis ajoutez au panier. Le paiement est sécurisé par Stripe. Vous recevez immédiatement un email de confirmation avec votre numéro de commande." },
  { question: "Puis-je modifier ou annuler ma commande après validation ?", answer: "Vous avez 24 heures après la commande pour la modifier ou l'annuler sans frais. Au-delà, si la fabrication a commencé, l'annulation n'est plus possible pour les pièces sur mesure. Pour les pièces catalogue, le droit de rétractation de 14 jours s'applique dès la réception." },
  { question: "Comment suivre l'avancement de ma commande ?", answer: "Chaque commande dispose d'un espace de suivi sur maisonattar.com/suivi. Vous y voyez l'avancement étape par étape, les photos prises par votre maalem, et les dates estimées. Vous recevez aussi des emails à chaque changement de statut." },
  { question: "Puis-je commander plusieurs pièces dans une même commande ?", answer: "Oui. Vous pouvez ajouter plusieurs pièces au panier. Elles seront fabriquées conjointement quand c'est possible, ce qui peut légèrement ajuster les délais. La livraison sera groupée en une seule expédition." },
  { question: "Acceptez-vous les commandes professionnelles (architectes, hôtels) ?", answer: "Absolument. Nous travaillons avec des architectes d'intérieur, des hôtels et des décorateurs pour des projets de plusieurs pièces. Contactez-nous pour un devis professionnel avec des conditions adaptées." },
  // Fabrication
  { question: "Combien de temps prend la fabrication d'une pièce ?", answer: "La fabrication prend généralement 6 à 8 semaines pour les pièces catalogue. Les pièces sur mesure nécessitent 10 à 12 semaines selon leur complexité. Le délai commence à courir dès la confirmation de la commande." },
  { question: "Qui fabrique mes pièces exactement ?", answer: "Chaque pièce est fabriquée par un maalem — un maître artisan zelligeur formé à Fès selon les techniques traditionnelles. Son nom vous est communiqué à la commande, et il vous enverra des photos tout au long de la fabrication." },
  { question: "Mes pièces sont-elles vraiment uniques ?", answer: "Oui. Le zellige est une matière naturelle coupée à la main, une tesselle à la fois. Chaque pièce présente de légères variations de teinte, de texture et de disposition qui en font un objet unique. Ces imperfections sont constitutives de la beauté artisanale." },
  { question: "Puis-je faire une demande de fabrication complètement sur mesure ?", answer: "Oui. Nous acceptons les commandes avec dimensions spéciales, combinaisons de zellige hors catalogue, ou formes personnalisées. Contactez-nous via le formulaire avec vos souhaits pour recevoir un devis et un délai précis." },
  { question: "Peut-on visiter l'atelier à Fès ?", answer: "Dans certains cas exceptionnels, et sur invitation préalable, il est possible de visiter l'atelier. Contactez-nous si vous êtes de passage à Fès et que vous souhaitez voir nos maalems au travail." },
  // Livraison
  { question: "Dans quels pays livrez-vous ?", answer: "Nous livrons en France métropolitaine (livraison offerte), dans toute l'Union Européenne (50–150 €), au Royaume-Uni (80–200 €), et à l'international sur devis. Pour les destinations hors UE, contactez-nous avant de commander." },
  { question: "Comment mes pièces sont-elles emballées ?", answer: "Chaque pièce est emballée dans une caisse en bois sur mesure avec mousse haute densité, calages anti-choc et protection textile. C'est la même méthode utilisée pour les œuvres d'art. Chaque expédition est assurée à 100% de sa valeur." },
  { question: "Puis-je choisir ma date de livraison ?", answer: "Oui. Une fois votre pièce expédiée, le transporteur vous contacte pour convenir d'un rendez-vous adapté à vos disponibilibilités. Nous collaborons avec des transporteurs spécialisés qui font de la livraison avec prise de rendez-vous." },
  { question: "Que faire si ma livraison est endommagée ?", answer: "Prenez des photos de l'emballage ET de la pièce avant de signer le bon de livraison, puis notez les réserves sur le bon. Contactez-nous dans les 48h à contact@maisonattar.com. Nous gérons l'assurance et organisons le remplacement." },
  { question: "Est-il possible de récupérer ma commande à l'atelier ?", answer: "Oui, si vous êtes à Fès ou si vous organisez un transport personnel, il est possible de récupérer votre pièce à l'atelier. Aucune réduction n'est appliquée sur les frais de livraison dans ce cas, mais vous économisez sur le transport." },
  // Paiement
  { question: "Quels moyens de paiement acceptez-vous ?", answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express) via Stripe, et le paiement en 3 ou 4 fois sans frais via Alma pour les commandes supérieures à 300 €. Les virements bancaires sont également acceptés pour les commandes professionnelles." },
  { question: "Le paiement en plusieurs fois est-il possible ?", answer: "Oui, via notre partenaire Alma. Pour les commandes entre 300 € et 2000 €, vous pouvez payer en 3 fois sans frais. Pour les commandes supérieures, le paiement en 4 fois est disponible. Alma vérifie l'éligibilité en quelques secondes." },
  { question: "Mes données bancaires sont-elles sécurisées ?", answer: "Absolument. Nous ne stockons jamais vos numéros de carte bancaire. Tous les paiements sont traités directement par Stripe, certifié PCI DSS Niveau 1 (le niveau le plus élevé de sécurité des paiements). Nous voyons uniquement les 4 derniers chiffres." },
  { question: "Quand suis-je débité ?", answer: "Pour les pièces catalogue, vous êtes débité intégralement à la commande. Pour les pièces sur mesure, un acompte de 50% est prélevé à la commande et le solde avant expédition. Vous recevez une facture à chaque étape." },
  { question: "Puis-je recevoir une facture pour ma comptabilité ?", answer: "Oui, une facture est automatiquement générée et envoyée par email après chaque paiement. Vous pouvez aussi télécharger vos factures depuis votre espace client." },
  // Retours
  { question: "Puis-je retourner ma commande ?", answer: "Oui, vous disposez de 14 jours après réception pour exercer votre droit de rétractation, sans avoir à justifier de motifs. La pièce doit être retournée en parfait état et dans son emballage d'origine. Les frais de retour sont à votre charge." },
  { question: "Le droit de rétractation s'applique-t-il aux pièces sur mesure ?", answer: "Non. Conformément à l'article L221-28 du Code de la consommation, les pièces fabriquées selon vos spécifications personnalisées (sur mesure ou configurations hors catalogue) sont exclues du droit de rétractation." },
  { question: "Comment organiser un retour ?", answer: "Contactez-nous à contact@maisonattar.com avec votre numéro de commande et la raison du retour. Nous vous guiderons sur la procédure. Nous recommandons de réutiliser la caisse bois d'origine et de faire assurer le retour." },
  { question: "Quand suis-je remboursé après un retour ?", answer: "Nous procédons au remboursement dans les 14 jours suivant la réception de la pièce retournée et la vérification de son état. Le remboursement est effectué sur le moyen de paiement utilisé lors de la commande." },
  { question: "Ma pièce est défectueuse — que faire ?", answer: "Contactez-nous immédiatement avec des photos du défaut. Toutes nos pièces sont couvertes par une garantie de 2 ans contre les défauts de fabrication. Nous organiserons soit une réparation, soit un remplacement, à notre charge." },
  // Entretien
  { question: "Comment nettoyer mon zellige au quotidien ?", answer: "Un simple essuyage avec un chiffon humide et de l'eau tiède suffit. Pour un nettoyage plus poussé, utilisez du savon doux (ph neutre) et une éponge non abrasive. Séchez toujours après nettoyage pour éviter les traces calcaires." },
  { question: "Puis-je poser un verre chaud sur le zellige ?", answer: "Déconseillé. Utilisez toujours un dessous-de-plat ou un sous-verre. Les chocs thermiques répétés peuvent fragiliser les joints et, à terme, décoller les tesselles. Une simple précaution suffit à préserver votre pièce pour des décennies." },
  { question: "Faut-il traiter le zellige avec un produit spécial ?", answer: "Une fois par mois, vous pouvez appliquer de l'huile de lin pure avec un chiffon microfibre pour nourrir le zellige et raviver ses couleurs. N'utilisez jamais de produits acides (vinaigre, citron) ou de nettoyants abrasifs." },
  { question: "Comment entretenir la structure en acier ?", answer: "L'acier thermolaqué s'entretient avec un chiffon humide. Pour l'acier patiné ou le laiton, une cire naturelle (cire d'abeille) appliquée 2 fois par an protège et embellit. La patine naturelle qui se développe avec le temps est une qualité, pas un défaut." },
  { question: "Une tesselle s'est décollée — que faire ?", answer: "Conservez la tesselle. Contactez-nous à contact@maisonattar.com avec une photo. Selon votre localisation, nous pouvons vous envoyer le mortier adapté et les instructions pour une petite réparation, ou vous mettre en contact avec un artisan proche de chez vous." },
];

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FAQSchema items={FAQ_ITEMS} />
      {children}
    </>
  );
}
