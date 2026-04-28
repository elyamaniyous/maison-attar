/**
 * lib/page-content.ts
 *
 * Defines the flat key-value structure for each page's editable content,
 * and provides the default (hardcoded) values extracted from each page component.
 *
 * The `sections` column in the `pages` DB table stores one of these flat objects
 * as JSON — NOT the legacy PageSection[] array format.
 */

// ─── Per-page section types ───────────────────────────────────────────────────

export type AccueilSections = {
  hero_eyebrow: string
  hero_title: string
  hero_subtitle: string
  hero_cta_label: string
  hero_cta_link: string
  manifesto_eyebrow: string
  manifesto_text: string
  pillars_eyebrow: string
  pillars_title: string
  pillar_1_label: string
  pillar_1_title: string
  pillar_1_desc: string
  pillar_2_label: string
  pillar_2_title: string
  pillar_2_desc: string
  pillar_3_label: string
  pillar_3_title: string
  pillar_3_desc: string
  collection_eyebrow: string
  collection_title: string
  collection_subtitle: string
  maalem_eyebrow: string
  maalem_title: string
  maalem_quote: string
  maalem_quote_author: string
  maalem_body: string
  maalem_link_label: string
  maalem_link_url: string
  process_eyebrow: string
  process_title: string
  process_step1_label: string
  process_step1_desc: string
  process_step2_label: string
  process_step2_desc: string
  process_step3_label: string
  process_step3_desc: string
  process_step4_label: string
  process_step4_desc: string
  newsletter_title: string
  newsletter_subtitle: string
  newsletter_body: string
  newsletter_disclaimer: string
}

export type NotreHistoireSections = {
  hero_eyebrow: string
  hero_title: string
  hero_subtitle: string
  attar_chapter: string
  attar_title: string
  attar_body_1: string
  attar_body_2: string
  attar_body_3: string
  attar_quote: string
  attar_quote_source: string
  zellige_chapter: string
  zellige_title: string
  zellige_subtitle: string
  zellige_body_1: string
  zellige_body_2: string
  zellige_body_3: string
  zellige_body_4: string
  zellige_stat_number: string
  zellige_stat_label: string
  zellige_stat_body: string
  acier_chapter: string
  acier_title: string
  acier_body_1: string
  acier_body_2: string
  acier_body_3: string
  acier_quote: string
  tension_chapter: string
  tension_title: string
  tension_body_1: string
  tension_body_2: string
  tension_body_3: string
  cta_eyebrow: string
  cta_title: string
  cta_body: string
  cta_label: string
  cta_link: string
  cta_secondary_label: string
  cta_secondary_link: string
}

export type LivraisonSections = {
  hero_eyebrow: string
  hero_title: string
  hero_body: string
  stat_1_number: string
  stat_1_label: string
  stat_2_number: string
  stat_2_label: string
  stat_3_number: string
  stat_3_label: string
  stat_4_number: string
  stat_4_label: string
  zones_eyebrow: string
  zones_title: string
  zones_body: string
  zone_1_name: string
  zone_1_price: string
  zone_1_delay: string
  zone_1_note: string
  zone_2_name: string
  zone_2_price: string
  zone_2_delay: string
  zone_2_note: string
  zone_3_name: string
  zone_3_price: string
  zone_3_delay: string
  zone_3_note: string
  zone_4_name: string
  zone_4_price: string
  zone_4_delay: string
  zone_4_note: string
  delays_eyebrow: string
  delays_title: string
  timeline_step1_title: string
  timeline_step1_duration: string
  timeline_step1_desc: string
  timeline_step2_title: string
  timeline_step2_duration: string
  timeline_step2_desc: string
  timeline_step3_title: string
  timeline_step3_duration: string
  timeline_step3_desc: string
  timeline_step4_title: string
  timeline_step4_duration: string
  timeline_step4_desc: string
  timeline_step5_title: string
  timeline_step5_duration: string
  timeline_step5_desc: string
  packaging_eyebrow: string
  packaging_title: string
  packaging_body: string
  packaging_item1_title: string
  packaging_item1_desc: string
  packaging_item2_title: string
  packaging_item2_desc: string
  packaging_item3_title: string
  packaging_item3_desc: string
  tracking_eyebrow: string
  tracking_title: string
  tracking_body: string
  faq_eyebrow: string
  faq_title: string
  faq_q1: string
  faq_a1: string
  faq_q2: string
  faq_a2: string
  faq_q3: string
  faq_a3: string
  faq_q4: string
  faq_a4: string
  faq_q5: string
  faq_a5: string
  faq_q6: string
  faq_a6: string
}

export type EntretienSections = {
  hero_eyebrow: string
  hero_title: string
  hero_body: string
  hero_quote: string
  hero_quote_author: string
  alert_title: string
  alert_body: string
  section1_title: string
  section1_body: string
  section2_title: string
  section2_body_1: string
  section2_body_2: string
  section3_title: string
  section3_body: string
  section4_title: string
  section5_title: string
  section5_body: string
  section6_title: string
  section6_body_1: string
  section6_body_2: string
  section6_body_3: string
}

export type FaqSections = {
  hero_eyebrow: string
  hero_title: string
  cat_commandes_label: string
  cat_fabrication_label: string
  cat_livraison_label: string
  cat_paiement_label: string
  cat_retours_label: string
  cat_entretien_label: string
  // Commandes
  commandes_q1: string
  commandes_a1: string
  commandes_q2: string
  commandes_a2: string
  commandes_q3: string
  commandes_a3: string
  commandes_q4: string
  commandes_a4: string
  commandes_q5: string
  commandes_a5: string
  // Fabrication
  fabrication_q1: string
  fabrication_a1: string
  fabrication_q2: string
  fabrication_a2: string
  fabrication_q3: string
  fabrication_a3: string
  fabrication_q4: string
  fabrication_a4: string
  fabrication_q5: string
  fabrication_a5: string
  // Livraison
  livraison_q1: string
  livraison_a1: string
  livraison_q2: string
  livraison_a2: string
  livraison_q3: string
  livraison_a3: string
  livraison_q4: string
  livraison_a4: string
  livraison_q5: string
  livraison_a5: string
  // Paiement
  paiement_q1: string
  paiement_a1: string
  paiement_q2: string
  paiement_a2: string
  paiement_q3: string
  paiement_a3: string
  paiement_q4: string
  paiement_a4: string
  paiement_q5: string
  paiement_a5: string
  // Retours
  retours_q1: string
  retours_a1: string
  retours_q2: string
  retours_a2: string
  retours_q3: string
  retours_a3: string
  retours_q4: string
  retours_a4: string
  retours_q5: string
  retours_a5: string
  // Entretien
  entretien_q1: string
  entretien_a1: string
  entretien_q2: string
  entretien_a2: string
  entretien_q3: string
  entretien_a3: string
  entretien_q4: string
  entretien_a4: string
  entretien_q5: string
  entretien_a5: string
  // Footer
  footer_title: string
  footer_body: string
  footer_cta_label: string
}

export type CgvSections = {
  hero_eyebrow: string
  hero_title: string
  hero_updated: string
  intro_text: string
  s1_title: string
  s1_body_1: string
  s1_body_2: string
  s2_title: string
  s2_body_1: string
  s2_body_2: string
  s2_infobox: string
  s3_title: string
  s3_body_1: string
  s3_body_2: string
  s3_body_3: string
  s4_title: string
  s4_body_1: string
  s4_body_2: string
  s4_infobox: string
  s5_title: string
  s5_body_1: string
  s5_body_2: string
  s5_body_3: string
  s5_body_4: string
  s6_title: string
  s6_body_1: string
  s6_body_2: string
  s6_body_3: string
  s6_exception_title: string
  s6_exception_body: string
  s7_title: string
  s7_body_1: string
  s7_body_2: string
  s7_body_3: string
  s7_infobox: string
  s8_title: string
  s8_body_1: string
  s8_body_2: string
  s8_body_3: string
  s9_title: string
  s9_body_1: string
  s9_body_2: string
  s10_title: string
  s10_body_1: string
  s10_body_2: string
  s11_title: string
  s11_body_1: string
  s11_body_2: string
  footer_editor_label: string
  footer_editor_name: string
  footer_editor_address: string
  footer_contact_label: string
  footer_contact_email: string
}

// ─── Union type for all page sections ────────────────────────────────────────

export type PageSectionsMap = {
  accueil: AccueilSections
  'notre-histoire': NotreHistoireSections
  livraison: LivraisonSections
  entretien: EntretienSections
  faq: FaqSections
  cgv: CgvSections
}

export type KnownSlug = keyof PageSectionsMap

// ─── Default content (extracted from the hardcoded page components) ───────────

export const defaultPageContents: PageSectionsMap = {
  accueil: {
    hero_eyebrow: 'Zellige & Acier Artisanal · Fès',
    hero_title: 'Maison Attar',
    hero_subtitle: "Ce que les mains distillent, le temps ne peut pas l'effacer",
    hero_cta_label: 'Découvrir la collection',
    hero_cta_link: '/collection',

    manifesto_eyebrow: 'Notre origine',
    manifesto_text:
      "À Fès, dans la médina la plus ancienne du monde, deux matières se font face depuis des siècles. La terre cuite émaillée. Le fer forgé. Maison Attar est née du jour où un artisan a osé les unir.",

    pillars_eyebrow: 'La philosophie',
    pillars_title: 'Trois principes',
    pillar_1_label: '01',
    pillar_1_title: 'Zellige de Fès',
    pillar_1_desc:
      'Chaque fragment est taillé à la main par nos maalems selon les 360 formes géométriques de la tradition fassienne, transmises depuis le XIVe siècle sans rupture.',
    pillar_2_label: '02',
    pillar_2_title: 'Acier Forgé',
    pillar_2_desc:
      "Les bases sont forgées à froid, martelées une à une pour révéler les traces du geste. L'acier n'est pas peint — il est ciré, vivant, appelé à se patiner avec le temps.",
    pillar_3_label: '03',
    pillar_3_title: 'Pièce Unique',
    pillar_3_desc:
      "Aucune table ne ressemble à une autre. Chaque composition naît d'une commande, d'une conversation, d'un maalem. Un certificat accompagne chaque pièce.",

    collection_eyebrow: 'La collection',
    collection_title: 'La Collection',
    collection_subtitle: 'Chaque pièce est une conversation entre la terre et le feu.',

    maalem_eyebrow: 'Héritage vivant',
    maalem_title: 'Le geste du maalem',
    maalem_quote: 'Chaque carreau est une prière',
    maalem_quote_author: '— Hassan Bensouda, Maalem',
    maalem_body:
      "Le maalem ne travaille pas avec des gabarits. Sa main est son outil le plus précis — formée par des décennies de martèle, de taille, d'ajustage. Sept siècles de tradition transmise dans les ateliers de la médina de Fès.",
    maalem_link_label: 'Rencontrer nos artisans',
    maalem_link_url: '/maalems',

    process_eyebrow: "De l'atelier à votre intérieur",
    process_title: 'La promesse',
    process_step1_label: 'Votre commande',
    process_step1_desc:
      "Nous accusons réception et votre maalem est sélectionné selon votre pièce.",
    process_step2_label: 'De fabrication',
    process_step2_desc:
      "La forge de la base en acier commence. Chaque soudure, à la main.",
    process_step3_label: 'Dédié à votre pièce',
    process_step3_desc:
      "Un seul artisan, du premier coup de marteau au dernier carreau de zellige.",
    process_step4_label: 'Pièces identiques',
    process_step4_desc:
      "Chaque table est unique. Elle portera les traces du geste, pour toujours.",

    newsletter_title: "Les nouvelles de l'atelier",
    newsletter_subtitle: "de l'atelier",
    newsletter_body:
      "Nouvelles pièces, portraits de maalems, coulisses de fabrication. Une lettre par mois depuis Fès.",
    newsletter_disclaimer: 'Pas de spam. Juste des nouvelles de Fès, une fois par mois.',
  },

  'notre-histoire': {
    hero_eyebrow: 'Maison Attar',
    hero_title: 'Notre Histoire',
    hero_subtitle: 'À Fès, dans la médina la plus ancienne du monde',

    attar_chapter: 'I — L\'Attar',
    attar_title: 'Le nom d\'une lignée',
    attar_body_1:
      "Dans le souk Attarine de Fès — le souk des épices et des parfums, l'un des plus anciens marchés du monde — l'attar désigne le marchand de senteurs. Celui qui tient dans ses tiroirs de bois sombre la cannelle du Sahara, le musc d'Arabie, l'eau de rose de Kelaa, le benjoin du Soudan. L'attar ne vend pas ce que tout le monde a.",
    attar_body_2:
      "Ce nom, nous l'avons choisi pour ce qu'il porte : une exigence de rareté, une promesse de singularité, et cette idée que chaque matière a une âme qu'il faut savoir révéler. Nous faisons du mobilier ce que l'attar fait des essences — nous cherchons l'extraordinaire dans l'élémentaire, la beauté dans ce qui résiste à la reproduction.",
    attar_body_3:
      "Maison Attar est née d'une conviction : que le zellige de Fès et l'acier forgé à la main sont deux matières qui, ensemble, peuvent créer des objets d'une présence rare. Des pièces qui ne vieillissent pas — elles se patinent. Des pièces que l'on transmet.",
    attar_quote: "L'attar ne vend pas ce que tout le monde a.",
    attar_quote_source: 'Philosophie fondatrice',

    zellige_chapter: 'II — Le Zellige',
    zellige_title: 'Zellige de Fès',
    zellige_subtitle: 'Terre cuite émaillée depuis le Xe siècle',
    zellige_body_1:
      "Le zellige est né à Fès. Pas à Marrakech, pas à Casablanca — à Fès, dans les ateliers qui longent la rivière Oued Fès, à quelques dizaines de mètres des grandes madrasas qui ont enseigné les mathématiques islamiques pendant mille ans. Ce voisinage n'est pas accidentel : le zellige est de la géométrie appliquée à la terre.",
    zellige_body_2:
      "Le procédé est resté inchangé depuis le Xe siècle. Une argile argileuse extraite des collines autour de Fès est façonnée en carreaux plats, cuits une première fois, puis émaillée à la main dans des bains de couleur — cobalt pour le bleu, oxyde de chrome pour le vert, oxyde de manganèse pour le noir. Une deuxième cuisson, entre 960 et 1 020 degrés, fixe l'émail et lui donne son éclat.",
    zellige_body_3:
      "Vient ensuite la taille à la marteline — un petit marteau au tranchant acéré, hérité du vocabulaire des tailleurs de pierre. Le maalem retourne le carreau, côté émaillé contre son genou, et frappe. Le geste se répète des milliers de fois par jour. Il faut des années pour que la main apprenne à doser la force, à suivre le fil de la fracture, à obtenir l'angle précis que le motif exige.",
    zellige_body_4:
      "Ce que l'industrie ne peut pas reproduire, c'est cette légère irrégularité de chaque pièce — les variations infimes de taille, la légère ondulation de la surface émaillée, les transitions de teinte d'un carreau à l'autre. C'est l'imperfection constitutive du zellige qui le rend vivant. L'œil ne se lasse pas d'une surface que la main a faite.",
    zellige_stat_number: '7',
    zellige_stat_label: 'siècles de tradition',
    zellige_stat_body:
      "Le zellige fassien est inscrit au patrimoine culturel immatériel de l'UNESCO. Sa technique, ses formes, ses couleurs sont transmises de maalem à apprenti depuis le XIVe siècle. Pas un brevet. Pas un logiciel. Une mémoire vivante.",

    acier_chapter: 'III — L\'Acier',
    acier_title: 'Acier Forgé',
    acier_body_1:
      "L'acier arrive dans nos ateliers sous forme de barres et de tubes bruts. Il n'y a pas de moule, pas de catalogue. Chaque base est dessinée spécifiquement pour la dalle de zellige qu'elle doit porter — ses dimensions, son poids, son centre de gravité.",
    acier_body_2:
      "Le forgeron plie l'acier à froid, mesure, coupe, ajuste. La soudure TIG — une technique de précision empruntée à l'aéronautique — assemble les pièces sans bourrelet apparent. Le meulage efface les traces de joint. La finition, selon la pièce, est soit martelée à la main pour laisser apparaître le travail, soit lisse et traitée contre l'oxydation.",
    acier_body_3:
      "L'acier est ce que le zellige n'est pas : il courbe sans casser, absorbe les chocs, porte des charges que la terre cuite ne pourrait jamais tenir. Les deux matières se complètent comme deux tempéraments opposés qui s'équilibrent.",
    acier_quote:
      'Robuste là où le zellige est fragile. Froid là où la terre cuite est chaude.',

    tension_chapter: 'IV — La Tension des Matières',
    tension_title: 'Millénaire et contemporain, fragile et robuste, chaud et froid.',
    tension_body_1:
      "Le zellige et l'acier ne se ressemblent pas. L'un est millénaire, l'autre industriel. L'un est fragile à l'impact, l'autre résiste à la torsion. L'un absorbe la chaleur et l'humidité des saisons, l'autre reste froid sous la main.",
    tension_body_2:
      "C'est précisément cette tension qui nous intéresse. Pas la fusion, pas le compromis — la tension maintenue. Chaque pièce Maison Attar est une conversation entre deux matières qui se défient et se complètent. On pose la main sur le zellige, on sent sa température, ses légères aspérités. On pose la main sur l'acier, et c'est une autre histoire.",
    tension_body_3:
      "Ensemble, ils créent quelque chose qu'aucun des deux ne pourrait créer seul : un objet qui a à la fois la mémoire du temps et l'exactitude du présent.",

    cta_eyebrow: 'Maison Attar',
    cta_title: "Chaque pièce porte l'histoire que vous venez de lire",
    cta_body:
      "Taillée à la main, forgée à la main. Signée par un maalem. Conçue pour être transmise.",
    cta_label: 'Découvrir la collection',
    cta_link: '/collection',
    cta_secondary_label: 'Rencontrer les maalems →',
    cta_secondary_link: '/maalems',
  },

  livraison: {
    hero_eyebrow: 'Maison Attar — Service',
    hero_title: 'Livraison & Emballage',
    hero_body:
      "De l'atelier de Fès jusqu'à votre salon. Chaque pièce voyage dans les meilleures conditions, avec le soin qu'elle mérite.",

    stat_1_number: '6–8',
    stat_1_label: 'semaines de fabrication',
    stat_2_number: '1–2',
    stat_2_label: 'semaines de livraison (FR)',
    stat_3_number: '100%',
    stat_3_label: 'emballage sur mesure',
    stat_4_number: '0 €',
    stat_4_label: 'livraison en France',

    zones_eyebrow: '01',
    zones_title: 'Zones de livraison',
    zones_body:
      "Nous livrons dans toute l'Europe et à l'international. Les frais varient selon la destination et le poids de votre pièce.",
    zone_1_name: 'France métropolitaine',
    zone_1_price: 'Offerte',
    zone_1_delay: '1–2 semaines après fabrication',
    zone_1_note: 'Livraison à domicile avec rendez-vous',
    zone_2_name: 'Union Européenne',
    zone_2_price: '50 € – 150 €',
    zone_2_delay: '2–3 semaines après fabrication',
    zone_2_note: 'Selon poids et destination',
    zone_3_name: 'Royaume-Uni',
    zone_3_price: '80 € – 200 €',
    zone_3_delay: '2–4 semaines après fabrication',
    zone_3_note: 'Frais douaniers à la charge du destinataire',
    zone_4_name: 'International',
    zone_4_price: 'Sur devis',
    zone_4_delay: '3–6 semaines après fabrication',
    zone_4_note: 'Nous contacter pour un devis personnalisé',

    delays_eyebrow: '02',
    delays_title: 'Comprendre les délais',
    timeline_step1_title: 'Confirmation de commande',
    timeline_step1_duration: 'Jour J',
    timeline_step1_desc:
      'Votre commande est validée, votre espace de suivi est créé, votre maalem est désigné.',
    timeline_step2_title: 'Fabrication en atelier',
    timeline_step2_duration: '6 à 8 semaines',
    timeline_step2_desc:
      'Votre maalem commence le travail. Découpe du zellige, fabrication de la structure, assemblage. Vous recevez des photos à chaque étape.',
    timeline_step3_title: 'Contrôle qualité & emballage',
    timeline_step3_duration: '2 à 3 jours',
    timeline_step3_desc:
      "Inspection complète avant emballage dans la caisse sur mesure. Vous êtes notifié avec des photos finales.",
    timeline_step4_title: 'Expédition',
    timeline_step4_duration: '1 à 2 semaines (FR)',
    timeline_step4_desc:
      "Votre caisse est confiée à notre transporteur spécialisé. Un lien de suivi vous est envoyé par SMS et email.",
    timeline_step5_title: 'Livraison à domicile',
    timeline_step5_duration: 'Sur rendez-vous',
    timeline_step5_desc:
      'Le transporteur vous contacte pour convenir d\'un rendez-vous. Livraison avec déballage optionnel.',

    packaging_eyebrow: '03',
    packaging_title: "Un emballage à la hauteur",
    packaging_body:
      "Nous avons développé notre propre système d'emballage pour protéger chaque pièce comme une oeuvre d'art.",
    packaging_item1_title: 'Caisse bois sur mesure',
    packaging_item1_desc:
      'Chaque caisse est fabriquée aux dimensions exactes de votre pièce, en bois de pin traité.',
    packaging_item2_title: 'Mousse haute densité',
    packaging_item2_desc:
      'Double couche de mousse polyéthylène 40kg/m³ autour de chaque surface fragile.',
    packaging_item3_title: 'Assurance transport',
    packaging_item3_desc:
      "Chaque expédition est assurée à 100% pour sa valeur. En cas de dommage, vous êtes intégralement remboursé ou la pièce est refabriquée.",

    tracking_eyebrow: '04',
    tracking_title: 'Suivi en temps réel',
    tracking_body:
      "Vous ne restez jamais dans l'incertitude. À chaque étape, vous êtes informé et vous voyez votre pièce prendre vie.",

    faq_eyebrow: '05',
    faq_title: 'Questions fréquentes',
    faq_q1: 'Puis-je choisir ma date de livraison ?',
    faq_a1:
      "Oui. Une fois votre pièce expédiée, notre transporteur vous contacte pour convenir d'un rendez-vous. Nous faisons tout pour nous adapter à vos disponibilités.",
    faq_q2: "Que se passe-t-il si je suis absent lors de la livraison ?",
    faq_a2:
      "Le transporteur vous recontacte pour fixer un nouveau rendez-vous. En cas d'absence répétée, la pièce est conservée en dépôt pendant 10 jours ouvrés.",
    faq_q3: 'Ma pièce peut-elle être livrée en dehors de la France ?',
    faq_a3:
      "Oui, nous livrons dans toute l'Union Européenne, au Royaume-Uni et à l'international sur devis. Contactez-nous avant de passer commande pour les destinations hors UE.",
    faq_q4: 'Comment est protégée ma table pendant le transport ?',
    faq_a4:
      "Chaque pièce est emballée dans une caisse en bois sur mesure avec mousse haute densité et calages anti-choc. C'est la même protection utilisée pour les oeuvres d'art.",
    faq_q5: 'Que faire si ma pièce arrive endommagée ?',
    faq_a5:
      "Prenez des photos immédiatement et contactez-nous dans les 48h à contact@maisonattar.com. Nous gérons directement avec l'assurance transport et nous remplacerons votre pièce.",
    faq_q6: 'Les frais de livraison sont-ils inclus dans le prix ?',
    faq_a6:
      "Pour la France métropolitaine, la livraison est offerte. Pour les autres destinations, les frais sont calculés et affichés avant la validation définitive de votre commande.",
  },

  entretien: {
    hero_eyebrow: 'Maison Attar — Savoir-faire',
    hero_title: 'Entretien & Patine',
    hero_body:
      "Le zellige de Fès est une matière vivante. Bien entretenu, il gagne en beauté avec le temps — une patine unique qui raconte l'usage et les années.",
    hero_quote:
      "Une pièce bien entretenue se transmet. C'est notre fierté d'artisan.",
    hero_quote_author: '— Hassan Benali, Maalem zelligeur',

    alert_title: 'À retenir absolument',
    alert_body:
      "N'utilisez jamais de produits acides, abrasifs ou contenant du vinaigre sur le zellige. Évitez les éponges à récurer. Ces précautions simples préservent l'émail et le mortier pour des décennies.",

    section1_title: 'Nettoyage quotidien',
    section1_body:
      "Le zellige est une matière robuste qui nécessite peu d'entretien au quotidien. Un nettoyage simple et régulier suffit à préserver son éclat.",

    section2_title: 'Protection du zellige',
    section2_body_1:
      "Le zellige traditionnel n'est pas traité avec des résines industrielles — c'est ce qui lui donne son aspect naturel et légèrement poreux. Une protection naturelle annuelle suffit à le préserver.",
    section2_body_2:
      "L'huile de lin naturelle est le produit utilisé par les maalems depuis des siècles. Elle pénètre dans les pores du zellige, renforce sa résistance à l'humidité et avive les couleurs.",

    section3_title: 'Entretien de la structure acier',
    section3_body:
      "Les structures de nos pièces sont en acier thermolaqué ou patiné. Ce traitement en surface les protège naturellement, mais quelques précautions simples permettent de préserver leur apparence.",

    section4_title: "Précautions d'usage",

    section5_title: 'Produits recommandés',
    section5_body:
      "Nous recommandons uniquement des produits naturels, sans composés chimiques agressifs.",

    section6_title: 'Garantie artisanale',
    section6_body_1:
      "Toutes nos pièces sont couvertes par une garantie de 2 ans contre les défauts de fabrication. Mais notre engagement va au-delà de la garantie légale.",
    section6_body_2:
      "Si votre zellige se décolle ou se fissure de façon inattendue — même après plusieurs années — contactez-nous. Nous travaillons avec notre réseau de maalems en France pour organiser une réparation dans les meilleures conditions.",
    section6_body_3:
      "Une pièce Maison Attar est faite pour durer des décennies. Si nous avons bien fait notre travail, vous la transmettrez.",
  },

  faq: {
    hero_eyebrow: 'Maison Attar — Support',
    hero_title: 'Questions fréquentes',

    cat_commandes_label: 'Commandes',
    cat_fabrication_label: 'Fabrication',
    cat_livraison_label: 'Livraison',
    cat_paiement_label: 'Paiement',
    cat_retours_label: 'Retours',
    cat_entretien_label: 'Entretien',

    commandes_q1: 'Comment passer une commande sur maisonattar.com ?',
    commandes_a1:
      "Rendez-vous sur la page de la pièce qui vous intéresse, configurez votre zellige, taille et type de pieds, puis ajoutez au panier. Le paiement est sécurisé par Stripe. Vous recevez immédiatement un email de confirmation avec votre numéro de commande.",
    commandes_q2: 'Puis-je modifier ou annuler ma commande après validation ?',
    commandes_a2:
      "Vous avez 24 heures après la commande pour la modifier ou l'annuler sans frais. Au-delà, si la fabrication a commencé, l'annulation n'est plus possible pour les pièces sur mesure. Pour les pièces catalogue, le droit de rétractation de 14 jours s'applique dès la réception.",
    commandes_q3: "Comment suivre l'avancement de ma commande ?",
    commandes_a3:
      "Chaque commande dispose d'un espace de suivi sur maisonattar.com/suivi. Vous y voyez l'avancement étape par étape, les photos prises par votre maalem, et les dates estimées. Vous recevez aussi des emails à chaque changement de statut.",
    commandes_q4: 'Puis-je commander plusieurs pièces dans une même commande ?',
    commandes_a4:
      "Oui. Vous pouvez ajouter plusieurs pièces au panier. Elles seront fabriquées conjointement quand c'est possible, ce qui peut légèrement ajuster les délais. La livraison sera groupée en une seule expédition.",
    commandes_q5: 'Acceptez-vous les commandes professionnelles (architectes, hôtels) ?',
    commandes_a5:
      "Absolument. Nous travaillons avec des architectes d'intérieur, des hôtels et des décorateurs pour des projets de plusieurs pièces. Contactez-nous pour un devis professionnel avec des conditions adaptées.",

    fabrication_q1: "Combien de temps prend la fabrication d'une pièce ?",
    fabrication_a1:
      "La fabrication prend généralement 6 à 8 semaines pour les pièces catalogue. Les pièces sur mesure nécessitent 10 à 12 semaines selon leur complexité. Le délai commence à courir dès la confirmation de la commande.",
    fabrication_q2: 'Qui fabrique mes pièces exactement ?',
    fabrication_a2:
      "Chaque pièce est fabriquée par un maalem — un maître artisan zelligeur formé à Fès selon les techniques traditionnelles. Son nom vous est communiqué à la commande, et il vous enverra des photos tout au long de la fabrication.",
    fabrication_q3: 'Mes pièces sont-elles vraiment uniques ?',
    fabrication_a3:
      "Oui. Le zellige est une matière naturelle coupée à la main, une tesselle à la fois. Chaque pièce présente de légères variations de teinte, de texture et de disposition qui en font un objet unique. Ces imperfections sont constitutives de la beauté artisanale.",
    fabrication_q4: 'Puis-je faire une demande de fabrication complètement sur mesure ?',
    fabrication_a4:
      "Oui. Nous acceptons les commandes avec dimensions spéciales, combinaisons de zellige hors catalogue, ou formes personnalisées. Contactez-nous via le formulaire avec vos souhaits pour recevoir un devis et un délai précis.",
    fabrication_q5: "Peut-on visiter l'atelier à Fès ?",
    fabrication_a5:
      "Dans certains cas exceptionnels, et sur invitation préalable, il est possible de visiter l'atelier. Contactez-nous si vous êtes de passage à Fès et que vous souhaitez voir nos maalems au travail.",

    livraison_q1: 'Dans quels pays livrez-vous ?',
    livraison_a1:
      "Nous livrons en France métropolitaine (livraison offerte), dans toute l'Union Européenne (50–150 €), au Royaume-Uni (80–200 €), et à l'international sur devis. Pour les destinations hors UE, contactez-nous avant de commander.",
    livraison_q2: 'Comment mes pièces sont-elles emballées ?',
    livraison_a2:
      "Chaque pièce est emballée dans une caisse en bois sur mesure avec mousse haute densité, calages anti-choc et protection textile. C'est la même méthode utilisée pour les œuvres d'art. Chaque expédition est assurée à 100% de sa valeur.",
    livraison_q3: 'Puis-je choisir ma date de livraison ?',
    livraison_a3:
      "Oui. Une fois votre pièce expédiée, le transporteur vous contacte pour convenir d'un rendez-vous adapté à vos disponibilités. Nous collaborons avec des transporteurs spécialisés qui font de la livraison avec prise de rendez-vous.",
    livraison_q4: 'Que faire si ma livraison est endommagée ?',
    livraison_a4:
      "Prenez des photos de l'emballage ET de la pièce avant de signer le bon de livraison, puis notez les réserves sur le bon. Contactez-nous dans les 48h à contact@maisonattar.com. Nous gérons l'assurance et organisons le remplacement.",
    livraison_q5: "Est-il possible de récupérer ma commande à l'atelier ?",
    livraison_a5:
      "Oui, si vous êtes à Fès ou si vous organisez un transport personnel, il est possible de récupérer votre pièce à l'atelier. Aucune réduction n'est appliquée sur les frais de livraison dans ce cas, mais vous économisez sur le transport.",

    paiement_q1: 'Quels moyens de paiement acceptez-vous ?',
    paiement_a1:
      "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express) via Stripe, et le paiement en 3 ou 4 fois sans frais via Alma pour les commandes supérieures à 300 €. Les virements bancaires sont également acceptés pour les commandes professionnelles.",
    paiement_q2: 'Le paiement en plusieurs fois est-il possible ?',
    paiement_a2:
      "Oui, via notre partenaire Alma. Pour les commandes entre 300 € et 2000 €, vous pouvez payer en 3 fois sans frais. Pour les commandes supérieures, le paiement en 4 fois est disponible. Alma vérifie l'éligibilité en quelques secondes.",
    paiement_q3: 'Mes données bancaires sont-elles sécurisées ?',
    paiement_a3:
      "Absolument. Nous ne stockons jamais vos numéros de carte bancaire. Tous les paiements sont traités directement par Stripe, certifié PCI DSS Niveau 1 (le niveau le plus élevé de sécurité des paiements). Nous voyons uniquement les 4 derniers chiffres.",
    paiement_q4: 'Quand suis-je débité ?',
    paiement_a4:
      "Pour les pièces catalogue, vous êtes débité intégralement à la commande. Pour les pièces sur mesure, un acompte de 50% est prélevé à la commande et le solde avant expédition. Vous recevez une facture à chaque étape.",
    paiement_q5: 'Puis-je recevoir une facture pour ma comptabilité ?',
    paiement_a5:
      "Oui, une facture est automatiquement générée et envoyée par email après chaque paiement. Vous pouvez aussi télécharger vos factures depuis votre espace client.",

    retours_q1: 'Puis-je retourner ma commande ?',
    retours_a1:
      "Oui, vous disposez de 14 jours après réception pour exercer votre droit de rétractation, sans avoir à justifier de motifs. La pièce doit être retournée en parfait état et dans son emballage d'origine. Les frais de retour sont à votre charge.",
    retours_q2: "Le droit de rétractation s'applique-t-il aux pièces sur mesure ?",
    retours_a2:
      "Non. Conformément à l'article L221-28 du Code de la consommation, les pièces fabriquées selon vos spécifications personnalisées (sur mesure ou configurations hors catalogue) sont exclues du droit de rétractation.",
    retours_q3: 'Comment organiser un retour ?',
    retours_a3:
      "Contactez-nous à contact@maisonattar.com avec votre numéro de commande et la raison du retour. Nous vous guiderons sur la procédure. Nous recommandons de réutiliser la caisse bois d'origine et de faire assurer le retour.",
    retours_q4: "Quand suis-je remboursé après un retour ?",
    retours_a4:
      "Nous procédons au remboursement dans les 14 jours suivant la réception de la pièce retournée et la vérification de son état. Le remboursement est effectué sur le moyen de paiement utilisé lors de la commande.",
    retours_q5: 'Ma pièce est défectueuse — que faire ?',
    retours_a5:
      "Contactez-nous immédiatement avec des photos du défaut. Toutes nos pièces sont couvertes par une garantie de 2 ans contre les défauts de fabrication. Nous organiserons soit une réparation, soit un remplacement, à notre charge.",

    entretien_q1: 'Comment nettoyer mon zellige au quotidien ?',
    entretien_a1:
      "Un simple essuyage avec un chiffon humide et de l'eau tiède suffit. Pour un nettoyage plus poussé, utilisez du savon doux (ph neutre) et une éponge non abrasive. Séchez toujours après nettoyage pour éviter les traces calcaires.",
    entretien_q2: 'Puis-je poser un verre chaud sur le zellige ?',
    entretien_a2:
      "Déconseillé. Utilisez toujours un dessous-de-plat ou un sous-verre. Les chocs thermiques répétés peuvent fragiliser les joints et, à terme, décoller les tesselles. Une simple précaution suffit à préserver votre pièce pour des décennies.",
    entretien_q3: 'Faut-il traiter le zellige avec un produit spécial ?',
    entretien_a3:
      "Une fois par mois, vous pouvez appliquer de l'huile de lin pure avec un chiffon microfibre pour nourrir le zellige et raviver ses couleurs. N'utilisez jamais de produits acides (vinaigre, citron) ou de nettoyants abrasifs.",
    entretien_q4: 'Comment entretenir la structure en acier ?',
    entretien_a4:
      "L'acier thermolaqué s'entretient avec un chiffon humide. Pour l'acier patiné ou le laiton, une cire naturelle (cire d'abeille) appliquée 2 fois par an protège et embellit. La patine naturelle qui se développe avec le temps est une qualité, pas un défaut.",
    entretien_q5: 'Une tesselle s\'est décollée — que faire ?',
    entretien_a5:
      "Conservez la tesselle. Contactez-nous à contact@maisonattar.com avec une photo. Selon votre localisation, nous pouvons vous envoyer le mortier adapté et les instructions pour une petite réparation, ou vous mettre en contact avec un artisan proche de chez vous.",

    footer_title: 'Toujours une question ?',
    footer_body:
      "Notre équipe répond sous 24 heures ouvrées. N'hésitez pas à nous écrire — nous adorons parler de zellige.",
    footer_cta_label: "Écrire à l'équipe",
  },

  cgv: {
    hero_eyebrow: 'Maison Attar — Légal',
    hero_title: 'Conditions Générales de Vente',
    hero_updated: '1er janvier 2025',

    intro_text:
      'Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre la société Maison Attar SARL, dont le siège social est situé Médina de Fès, Maroc (ci-après « le Vendeur »), et toute personne physique ou morale effectuant un achat sur le site maisonattar.com (ci-après « l\'Acheteur »). Tout achat implique l\'acceptation pleine et entière des présentes CGV.',

    s1_title: 'Objet',
    s1_body_1:
      'Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne de pièces de mobilier artisanal en zellige marocain et acier forgé proposées par Maison Attar.',
    s1_body_2:
      "Maison Attar commercialise des tables basses, tables à manger, consoles et tables d'appoint, fabriquées à la main dans l'atelier de Fès, Maroc, par nos artisans maalems. Chaque pièce est unique par nature, les variations inhérentes à la fabrication artisanale étant constitutives de la valeur du produit.",

    s2_title: 'Prix',
    s2_body_1:
      "Les prix sont indiqués en euros (EUR), toutes taxes comprises (TTC), conformément à la législation en vigueur. Maison Attar se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.",
    s2_body_2:
      "Les frais de livraison ne sont pas inclus dans le prix affiché et sont calculés en fonction de la destination et du poids de la commande. Ils sont indiqués avant la validation définitive de la commande.",
    s2_infobox:
      'France métropolitaine : livraison offerte. Union Européenne : 50 € à 150 €. Royaume-Uni et international : nous contacter pour un devis personnalisé.',

    s3_title: 'Commandes',
    s3_body_1:
      "La commande est ferme et définitive dès lors que l'Acheteur a validé son panier, renseigné ses coordonnées et procédé au paiement. Un email de confirmation est automatiquement adressé à l'Acheteur à l'adresse indiquée lors de la commande.",
    s3_body_2:
      "Maison Attar se réserve le droit d'annuler ou de refuser toute commande en cas de litige existant avec l'Acheteur, de suspicion de fraude, ou de rupture de stock exceptionnelle. Dans ce cas, l'Acheteur sera remboursé intégralement dans un délai de 14 jours ouvrés.",
    s3_body_3:
      "Chaque commande fait l'objet d'un numéro de référence unique (ex. MA-2024-XXXXX) permettant de suivre l'avancement de la fabrication via l'espace de suivi disponible sur maisonattar.com.",

    s4_title: 'Fabrication sur mesure',
    s4_body_1:
      "Maison Attar propose des pièces sur mesure (dimensions hors catalogue, coloris spécifiques, configurations personnalisées). Les commandes sur mesure font l'objet d'un devis préalable, accepté par l'Acheteur avant toute mise en fabrication.",
    s4_body_2:
      "Pour les pièces sur mesure, un acompte de 50 % du montant total TTC est demandé à la commande. Le solde est dû avant expédition. L'acompte versé ne peut en aucun cas être remboursé en cas d'annulation par l'Acheteur une fois la fabrication commencée, sauf en cas de manquement avéré du Vendeur à ses obligations contractuelles.",
    s4_infobox:
      "Les pièces fabriquées sur mesure sont expressément exclues du droit de rétractation conformément à l'article L221-28 du Code de la consommation (voir section 6).",

    s5_title: 'Délais de livraison',
    s5_body_1:
      "Chaque pièce Maison Attar est fabriquée à la commande par nos artisans maalems. Le délai de fabrication est de 6 à 8 semaines à compter de la validation de la commande. Pour les pièces sur mesure, ce délai peut être porté à 10 à 12 semaines selon la complexité.",
    s5_body_2:
      "Une fois la pièce emballée et remise au transporteur, la livraison est effectuée sous 1 à 2 semaines en France métropolitaine, et sous 2 à 3 semaines en Union Européenne.",
    s5_body_3:
      "Ces délais sont donnés à titre indicatif. Toute circonstance indépendante de la volonté de Maison Attar (intempéries, grèves, cas de force majeure) peut entraîner un retard de livraison. L'Acheteur sera informé sans délai de tout retard significatif.",
    s5_body_4:
      "En cas de retard de livraison supérieur à 30 jours au-delà de la date estimée, l'Acheteur peut demander la résolution du contrat et sera remboursé intégralement dans les 14 jours suivant cette demande.",

    s6_title: 'Droit de rétractation',
    s6_body_1:
      "Conformément aux articles L221-18 et suivants du Code de la consommation, l'Acheteur particulier (consommateur) dispose d'un délai de 14 jours calendaires à compter de la réception de sa commande pour exercer son droit de rétractation, sans avoir à justifier de motifs.",
    s6_body_2:
      "Pour exercer ce droit, l'Acheteur doit notifier sa décision à Maison Attar par email à l'adresse contact@maisonattar.com ou via le formulaire de contact. La pièce doit être retournée en parfait état et dans son emballage d'origine dans les 14 jours suivant la notification.",
    s6_body_3:
      "Les frais de retour sont à la charge de l'Acheteur. Le remboursement sera effectué dans les 14 jours suivant la réception de la pièce retournée et vérification de son état.",
    s6_exception_title: 'Exception — Pièces sur mesure',
    s6_exception_body:
      "Conformément à l'article L221-28, 3° du Code de la consommation, le droit de rétractation ne s'applique pas aux pièces fabriquées selon les spécifications de l'Acheteur ou nettement personnalisées. Les commandes sur mesure sont définitives dès leur confirmation.",

    s7_title: 'Garantie',
    s7_body_1:
      "Toutes les pièces Maison Attar bénéficient de la garantie légale de conformité (articles L217-4 et suivants du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil).",
    s7_body_2:
      "Maison Attar garantit ses pièces contre tout défaut de fabrication pendant une durée de 2 ans à compter de la date de livraison. Cette garantie couvre les défauts affectant la structure de la pièce (soudures, assemblages) et les défauts significatifs du zellige (fissures, décollements) non liés à une utilisation incorrecte.",
    s7_body_3:
      "Sont exclus de la garantie : les variations naturelles de teinte et de texture du zellige artisanal (constitutives de la pièce unique), les dommages causés par un choc, une mauvaise utilisation, une exposition à des produits abrasifs ou acides, et l'usure normale liée à l'usage.",
    s7_infobox:
      "Pour une conservation optimale de votre pièce, consultez notre guide d'entretien disponible sur maisonattar.com/entretien.",

    s8_title: 'Responsabilité',
    s8_body_1:
      "La responsabilité de Maison Attar ne peut être engagée qu'en cas de faute prouvée. Maison Attar ne saurait être tenu responsable des dommages immatériels, préjudices commerciaux ou pertes de données résultant de l'utilisation ou de l'impossibilité d'utiliser le site.",
    s8_body_2:
      "Maison Attar ne peut être tenu responsable des retards ou défaillances dans l'exécution de ses obligations contractuelles résultant d'un cas de force majeure, incluant sans limitation : catastrophes naturelles, grèves, conflits sociaux, restrictions gouvernementales ou perturbations logistiques exceptionnelles.",
    s8_body_3:
      "En tout état de cause, la responsabilité de Maison Attar est limitée au montant de la commande concernée.",

    s9_title: 'Données personnelles',
    s9_body_1:
      "Les données personnelles collectées lors de la commande (nom, email, adresse, téléphone) sont utilisées uniquement pour le traitement et le suivi de la commande, et ne sont jamais cédées à des tiers à des fins commerciales.",
    s9_body_2:
      "Pour l'intégralité de notre politique de confidentialité et l'exercice de vos droits RGPD, consultez notre Politique de Confidentialité.",

    s10_title: 'Litiges',
    s10_body_1:
      "En cas de litige, l'Acheteur est invité à contacter en premier lieu le service client de Maison Attar à contact@maisonattar.com afin de trouver une solution amiable.",
    s10_body_2:
      "Conformément aux articles L612-1 et suivants du Code de la consommation, l'Acheteur consommateur peut recourir gratuitement au service de médiation compétent. Pour les litiges concernant des achats en ligne, la plateforme européenne de règlement en ligne des litiges (RLL) est accessible à l'adresse ec.europa.eu/consumers/odr.",

    s11_title: 'Droit applicable',
    s11_body_1:
      "Les présentes CGV sont soumises au droit français. Tout litige relatif à leur interprétation ou leur exécution relève de la compétence exclusive des tribunaux français, sauf dispositions contraires d'ordre public applicables dans le pays de résidence de l'Acheteur consommateur.",
    s11_body_2:
      "La langue des présentes CGV est le français. En cas de traduction dans une autre langue, la version française prévaut.",

    footer_editor_label: 'Éditeur',
    footer_editor_name: 'Maison Attar SARL',
    footer_editor_address: 'Médina de Fès, Maroc',
    footer_contact_label: 'Contact légal',
    footer_contact_email: 'contact@maisonattar.com',
  },
}
