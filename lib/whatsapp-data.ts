import type { WhatsAppGroup } from "@/lib/types";

// ─── Mock WhatsApp Groups ────────────────────────────────────────────────────

export const mockWhatsAppGroups: WhatsAppGroup[] = [
  {
    orderId: "MA-2024-00847",
    groupName: "MA-2024-00847 · Ecaille Blanche Standard",
    members: ["Bot Maison Attar", "Maalem Hassan Benali", "Youssef Attar"],
    createdAt: new Date("2024-11-04T09:12:00Z"),
    messages: [
      {
        sender: "Bot Maison Attar",
        content:
          "🤖 *Nouvelle commande créée* — MA-2024-00847\n\n" +
          "Bienvenue dans le groupe de suivi de fabrication.\n\n" +
          "📦 *Produit:* Table Basse Écaille Blanche\n" +
          "🎨 *Configuration:* Zellige Écaille Blanc Mat · Taille Standard 90×50 · Pieds Compas Noir\n" +
          "👤 *Client:* Sophie Martin · sophie.martin@email.com\n" +
          "📅 *Livraison estimée:* 20 décembre 2024\n" +
          "💰 *Total commande:* 1 890 €",
        timestamp: new Date("2024-11-04T09:12:30Z"),
        type: "status_update",
      },
      {
        sender: "Bot Maison Attar",
        content:
          "📋 *Fiche technique*\n\n" +
          "• Dimensions: 90 × 50 × 38 cm\n" +
          "• Poids estimé: 28 kg\n" +
          "• Zellige: Écaille Blanc Mat (Fès, lot ZM-2024-11)\n" +
          "• Structure: Acier 10mm, sablé, thermolaqué noir mat\n" +
          "• Emballage: Caisse bois sur mesure + mousse haute densité\n\n" +
          "🔔 Ce groupe recevra automatiquement les mises à jour de statut.",
        timestamp: new Date("2024-11-04T09:13:00Z"),
        type: "text",
      },
      {
        sender: "Maalem Hassan Benali",
        content: "Bien reçu. Je commence la découpe du zellige demain matin. Le lot est déjà prêt.",
        timestamp: new Date("2024-11-04T10:45:00Z"),
        type: "text",
      },
      {
        sender: "Youssef Attar",
        content: "Parfait Hassan. N'oublie pas les photos à chaque étape importante — le client adore voir l'avancement.",
        timestamp: new Date("2024-11-04T11:02:00Z"),
        type: "text",
      },
      {
        sender: "Bot Maison Attar",
        content: "🔄 *Statut mis à jour:* Commande confirmée → En fabrication\n\nLe client a été notifié par email.",
        timestamp: new Date("2024-11-05T08:00:00Z"),
        type: "status_update",
      },
      {
        sender: "Maalem Hassan Benali",
        content: "Première session de découpe terminée. Voici les pièces de zellige taillées à la main.",
        timestamp: new Date("2024-11-07T16:30:00Z"),
        type: "image",
        image: "/images/fabrication/zellige-coupe.jpg",
      },
      {
        sender: "Maalem Hassan Benali",
        content: "La pose commence aujourd'hui. Le motif écaille nécessite une précision particulière — chaque pièce est orientée à la main.",
        timestamp: new Date("2024-11-12T09:15:00Z"),
        type: "text",
      },
      {
        sender: "Maalem Hassan Benali",
        content: "Pose du zellige à 60%. Le rendu est magnifique avec cette lumière naturelle.",
        timestamp: new Date("2024-11-14T17:00:00Z"),
        type: "image",
        image: "/images/fabrication/zellige-pose-60.jpg",
      },
      {
        sender: "Bot Maison Attar",
        content: "🔄 *Statut mis à jour:* En fabrication → Pose du zellige\n\nLe client a été notifié avec la photo de progression.",
        timestamp: new Date("2024-11-14T17:05:00Z"),
        type: "status_update",
      },
      {
        sender: "Youssef Attar",
        content: "Superbe Hassan. Le client a répondu à l'email — il est ravi de voir l'avancement. Continue comme ça !",
        timestamp: new Date("2024-11-14T18:22:00Z"),
        type: "text",
      },
      {
        sender: "Maalem Hassan Benali",
        content: "Table terminée. Zellige posé, jointoiement fait, structure soudée et thermolaquée. Elle est prête pour les photos finales.",
        timestamp: new Date("2024-11-22T11:00:00Z"),
        type: "image",
        image: "/images/fabrication/table-terminee.jpg",
      },
      {
        sender: "Bot Maison Attar",
        content:
          "🔄 *Statut mis à jour:* Pose du zellige → Prête à expédier\n\n" +
          "✅ Contrôle qualité à effectuer avant emballage.\n" +
          "📦 Emballage caisse bois prévu pour le 25 novembre.\n" +
          "🚚 Enlèvement transporteur: 26 novembre.",
        timestamp: new Date("2024-11-22T11:05:00Z"),
        type: "status_update",
      },
      {
        sender: "Youssef Attar",
        content: "Excellent travail ! Je viens faire le contrôle qualité demain matin. On peut confirmer l'expédition pour le 26.",
        timestamp: new Date("2024-11-22T12:30:00Z"),
        type: "text",
      },
      {
        sender: "Bot Maison Attar",
        content:
          "🚚 *Statut mis à jour:* En cours d'expédition\n\n" +
          "Transporteur: Chronopost Fret\n" +
          "N° de suivi: CP847291FR\n" +
          "Livraison estimée: 29 novembre 2024\n\n" +
          "Le client a reçu son lien de suivi par SMS et email.",
        timestamp: new Date("2024-11-26T14:00:00Z"),
        type: "status_update",
      },
      {
        sender: "Bot Maison Attar",
        content: "✅ *Commande livrée* — MA-2024-00847\n\nLivraison confirmée le 29 novembre 2024 à 14h32.\nEmail de satisfaction envoyé au client.",
        timestamp: new Date("2024-11-29T14:35:00Z"),
        type: "status_update",
      },
    ],
  },
  {
    orderId: "MA-2024-00912",
    groupName: "MA-2024-00912 · Zellige Bejmat Terracotta · Sur mesure",
    members: ["Bot Maison Attar", "Maalem Karim Fassi", "Youssef Attar"],
    createdAt: new Date("2024-11-18T14:30:00Z"),
    messages: [
      {
        sender: "Bot Maison Attar",
        content:
          "🤖 *Nouvelle commande sur mesure* — MA-2024-00912\n\n" +
          "📦 *Produit:* Table à Manger Bejmat Terracotta (Sur mesure)\n" +
          "🎨 *Configuration:* Zellige Bejmat Terracotta · 200×100cm · Pieds Forgés Bronze\n" +
          "👤 *Client:* Antoine Dubois · a.dubois@architecture.fr\n" +
          "📅 *Livraison estimée:* 28 janvier 2025\n" +
          "💰 *Total commande:* 4 850 €\n\n" +
          "⚡ *Note:* Commande sur mesure — dimensions hors catalogue. Validation du gabarit requise.",
        timestamp: new Date("2024-11-18T14:30:30Z"),
        type: "status_update",
      },
      {
        sender: "Maalem Karim Fassi",
        content: "Reçu. Pour une table 200×100, je vais avoir besoin du gabarit confirmé avant de commander le zellige bejmat. La quantité est importante.",
        timestamp: new Date("2024-11-18T15:45:00Z"),
        type: "text",
      },
      {
        sender: "Youssef Attar",
        content: "Bien noté Karim. Le client est architecte, il m'envoie les plans précis demain. Je te transfère dès réception.",
        timestamp: new Date("2024-11-18T16:00:00Z"),
        type: "text",
      },
      {
        sender: "Youssef Attar",
        content: "Voici le plan de la salle à manger — Antoine veut que la table soit centrable dans l'espace. Il préfère une épaisseur de plateau de 8cm. Peux-tu confirmer la faisabilité ?",
        timestamp: new Date("2024-11-19T10:00:00Z"),
        type: "image",
        image: "/images/fabrication/plan-client-00912.jpg",
      },
      {
        sender: "Maalem Karim Fassi",
        content: "C'est faisable. Je vais renforcer la structure sous le plateau avec une âme en acier 15mm pour supporter le poids du zellige. Environ 65kg au total. OK ?",
        timestamp: new Date("2024-11-19T11:30:00Z"),
        type: "text",
      },
      {
        sender: "Bot Maison Attar",
        content: "🔄 *Statut mis à jour:* En attente de validation → En fabrication\n\nDébut de fabrication confirmé le 25 novembre 2024.",
        timestamp: new Date("2024-11-25T08:00:00Z"),
        type: "status_update",
      },
      {
        sender: "Maalem Karim Fassi",
        content: "Structure soudée et prête. Début de la pose du bejmat la semaine prochaine.",
        timestamp: new Date("2024-12-05T17:00:00Z"),
        type: "image",
        image: "/images/fabrication/structure-00912.jpg",
      },
      {
        sender: "Maalem Karim Fassi",
        content: "Première rangée de bejmat posée. La terracotta est magnifique avec les pieds bronze — la combinaison est vraiment belle.",
        timestamp: new Date("2024-12-12T16:00:00Z"),
        type: "image",
        image: "/images/fabrication/bejmat-debut-00912.jpg",
      },
      {
        sender: "Youssef Attar",
        content: "Magnifique Karim ! J'ai partagé ces photos avec Antoine — il est enthousiaste. Il demande si on peut légèrement teinter le joint en gris anthracite plutôt que blanc naturel ?",
        timestamp: new Date("2024-12-12T18:00:00Z"),
        type: "text",
      },
      {
        sender: "Maalem Karim Fassi",
        content: "Oui, c'est possible et ça va très bien avec la terracotta. Je commande le pigment demain. Pas d'impact sur le délai.",
        timestamp: new Date("2024-12-12T19:30:00Z"),
        type: "text",
      },
      {
        sender: "Bot Maison Attar",
        content: "🔄 *Statut mis à jour:* En fabrication → Pose du zellige\n\nMise à jour transmise au client avec photos.",
        timestamp: new Date("2024-12-13T08:00:00Z"),
        type: "status_update",
      },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getWhatsAppGroup(orderId: string): WhatsAppGroup | undefined {
  return mockWhatsAppGroups.find((g) => g.orderId === orderId);
}

export function getAllWhatsAppGroups(): WhatsAppGroup[] {
  return mockWhatsAppGroups;
}
