import type {
  Product,
  Maalem,
  Order,
  FabricationUpdate,
} from "./types";

// ─── Maalems ─────────────────────────────────────────────────────────────────

export const maalems: Maalem[] = [
  {
    id: "maalem-01",
    name: "Hassan Bensouda",
    slug: "hassan-bensouda",
    image: "/images/maalems/hassan-bensouda/avatar.jpg",
    portrait: "/images/maalems/hassan-bensouda/portrait.jpg",
    bio: "Hassan Bensouda a appris l'art du zellige dans l'atelier de son père, à deux pas des tanneries de Fes el-Bali. Formé dès l'âge de neuf ans, il maîtrise aujourd'hui l'ensemble des 360 formes géométriques traditionnelles que la mémoire des maalems fassiens a transmises de génération en génération. Sa précision au marteau est légendaire dans la médina : il est capable de tailler une pièce à moins d'un demi-millimètre près, à l'œil, sans calibre. Hassan travaille exclusivement avec des terres argileuses extraites de la région de Fes, qu'il fait cuire dans son propre four à bois selon une recette d'émaillage héritée de son arrière-grand-père.",
    specialty: "Géométrie islamique avancée, mosaïques étoilées",
    yearsExperience: 34,
    piecesCreated: 847,
    quote:
      "Chaque carreau est une prière. Quand ils s'assemblent, c'est la géométrie du ciel qui se révèle sur la terre.",
  },
  {
    id: "maalem-02",
    name: "Youssef El Ouali",
    slug: "youssef-el-ouali",
    image: "/images/maalems/youssef-el-ouali/avatar.jpg",
    portrait: "/images/maalems/youssef-el-ouali/portrait.jpg",
    bio: "Youssef El Ouali est le dernier représentant d'une lignée de cinq générations de maalems spécialisés dans le zellige blanc. Il a passé ses années de formation à étudier les grands panneaux du palais Batha, dont il a mémorisé chaque motif comme on mémorise des versets. Là où d'autres cherchent la couleur, Youssef cherche la lumière : ses compositions en Blanc Nacré jouent avec les reflets et les ombres pour créer des reliefs impossibles sur des surfaces planes. Son travail a été intégré dans plusieurs riads classés du patrimoine de l'UNESCO.",
    specialty: "Zellige blanc, compositions lumineuses, motifs écailles",
    yearsExperience: 28,
    piecesCreated: 512,
    quote:
      "Le blanc n'est pas une absence. C'est la somme de toutes les couleurs, retenues en silence.",
  },
  {
    id: "maalem-03",
    name: "Driss Aït Taleb",
    slug: "driss-ait-taleb",
    image: "/images/maalems/driss-ait-taleb/avatar.jpg",
    portrait: "/images/maalems/driss-ait-taleb/portrait.jpg",
    bio: "Originaire des contreforts du Moyen Atlas, Driss Aït Taleb a apporté à Fes une sensibilité berbère qui tranche avec la rigueur classique de l'école fassienne. Ses compositions mêlent l'exactitude mathématique du zellige arabe aux motifs organiques et telluriques de l'artisanat amazigh. Il est le premier maalem à avoir systématiquement associé la forge de l'acier à la pose du zellige, concevant lui-même les bases métalliques de ses tables. Cette maîtrise des deux matières — la dureté froide de l'acier et la fragilité émaillée de la terre cuite — lui confère une vision plastique unique dans le monde de l'artisanat marocain contemporain.",
    specialty: "Fusion zellige & forge, motifs amazighs contemporains",
    yearsExperience: 22,
    piecesCreated: 319,
    quote:
      "La montagne m'a appris la résistance. Fes m'a appris la finesse. Mes tables vivent de cette tension.",
  },
  {
    id: "maalem-04",
    name: "Mohammed Cherkaoui",
    slug: "mohammed-cherkaoui",
    image: "/images/maalems/mohammed-cherkaoui/avatar.jpg",
    portrait: "/images/maalems/mohammed-cherkaoui/portrait.jpg",
    bio: "Mohammed Cherkaoui est ce que l'on appelle à Fes un maalem complet : il coupe, il émaille, il pose, il forge. Après vingt ans passés à restaurer les zellige des monuments historiques du Maroc — dont le mausolée Moulay Idriss et les médersa Bou Inania — il a choisi de mettre son savoir au service de l'objet du quotidien. Pour Mohammed, la table n'est pas un meuble : c'est un espace de vie, un lieu de partage, une surface que les mains touchent chaque jour et qui doit, à ce titre, être habitée par une intention. Ses pièces aux tonalités sombres — noir onyx, bleu de nuit — portent quelque chose de solennel, comme des autels dressés pour le repas.",
    specialty: "Restauration du patrimoine, zellige sombre, grandes compositions",
    yearsExperience: 41,
    piecesCreated: 1203,
    quote:
      "J'ai restauré les palais des sultans. Aujourd'hui, je pose du zellige dans vos maisons. C'est le même geste, la même exigence.",
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────

export const products: Product[] = [
  // ── Table basse ────────────────────────────────────────────────────────────
  {
    id: "prod-01",
    name: "Nuit de Fès",
    slug: "nuit-de-fes",
    description:
      "Table basse ronde en zellige noir onyx sur base en acier noir forgé. Un astre sombre posé sur votre sol.",
    longDescription:
      "« Nuit de Fès » naît de l'obsession de Hassan Bensouda pour les rosaces étoilées de la grande mosquée Qarawiyyin. Chaque fragment de zellige noir onyx est taillé à la main selon la forme d'une des 12 étoiles qui composent le motif central, puis rejoint dans une composition rayonnante qui semble tourner lentement sur elle-même selon la lumière. La base en acier noir forgé — martelée à froid pour laisser apparaître les traces du travail — prolonge la profondeur chromatique du plateau. Posée dans un salon, cette table est un trou noir élégant qui attire le regard et retient la lumière.",
    price: 1490,
    images: [
      "/images/products/nuit-de-fes/1.jpg",
      "/images/products/nuit-de-fes/2.jpg",
      "/images/products/nuit-de-fes/3.jpg",
      "/images/products/nuit-de-fes/4.jpg",
    ],
    category: "table-basse",
    dimensions: { width: 90, height: 38, depth: 90, weight: 32 },
    materials: {
      zellige: "Noir Onyx — argile fassienne émaillée en oxyde de manganèse",
      base: "Acier noir forgé, finition martelée à la cire",
    },
    maalem: {
      id: "maalem-01",
      name: "Hassan Bensouda",
      image: "/images/maalems/hassan-bensouda/avatar.jpg",
      bio: "Maalem depuis 34 ans, spécialiste de la géométrie islamique.",
    },
    fabricationHours: 72,
    availableConfigurations: {
      zelliges: ["Noir Onyx", "Bleu de Fès", "Terre Naturelle"],
      sizes: ["Standard", "Grand", "Sur Mesure"],
      bases: ["Acier Noir Forgé", "Acier Laiton", "Cylindre Blanc"],
    },
    inStock: true,
    featured: true,
  },
  {
    id: "prod-02",
    name: "Écaille Blanche",
    slug: "ecaille-blanche",
    description:
      "Table basse rectangulaire en zellige blanc nacré, motif écailles de poisson sur base pieds compas laiton.",
    longDescription:
      "L'écaille de poisson est l'un des motifs les plus anciens et les plus exigeants du répertoire zellige : chaque pièce en demi-lune doit s'imbriquer avec une précision absolue pour que le motif ondule sans rupture sur toute la surface. Youssef El Ouali, dont la famille a consacré cinq générations à ce motif particulier, taille chaque écaille à la main depuis un carreau de zellige blanc nacré dont l'émail capte la lumière selon un angle unique. Le résultat est une surface vivante, qui change d'aspect du matin au soir. Les pieds compas en laiton brossé ajoutent une touche Art Déco qui fait dialoguer l'ancestral et le contemporain.",
    price: 1290,
    images: [
      "/images/products/ecaille-blanche/1.jpg",
      "/images/products/ecaille-blanche/2.jpg",
      "/images/products/ecaille-blanche/3.jpg",
      "/images/products/ecaille-blanche/4.jpg",
    ],
    category: "table-basse",
    dimensions: { width: 110, height: 36, depth: 60, weight: 28 },
    materials: {
      zellige: "Blanc Nacré — argile blanche émaillée à l'étain",
      base: "Acier laiton brossé, soudure TIG invisible",
    },
    maalem: {
      id: "maalem-02",
      name: "Youssef El Ouali",
      image: "/images/maalems/youssef-el-ouali/avatar.jpg",
      bio: "Cinquième génération de maalems spécialisés dans le zellige blanc.",
    },
    fabricationHours: 60,
    availableConfigurations: {
      zelliges: ["Blanc Nacré", "Vert Émeraude", "Bleu de Fès"],
      sizes: ["Standard", "Grand", "Sur Mesure"],
      bases: ["Pieds Compas", "Acier Laiton", "Cylindre Blanc"],
    },
    inStock: true,
    featured: true,
  },
  {
    id: "prod-03",
    name: "Géométrie Sacrée",
    slug: "geometrie-sacree",
    description:
      "Table basse carrée en zellige multicolore, étoile à seize branches sur base cylindre blanc.",
    longDescription:
      "L'étoile à seize branches est la figure géométrique la plus complexe du zellige traditionnel. Elle nécessite 47 formes de carreaux différentes, chacune taillée à angle précis pour que la composition converge vers un centre parfait. Hassan Bensouda a consacré quatre années à maîtriser cette figure avant de l'exécuter pour la première fois. « Géométrie Sacrée » est sa version contemporaine de ce chef-d'œuvre : zellige Bleu de Fès en dominante, rehaussé de touches de Blanc Nacré et de Vert Émeraude aux intersections. La base cylindrique laquée blanc crée un contraste de forme — le cercle sous le carré — qui accentue la tension mathématique de la composition.",
    price: 1650,
    images: [
      "/images/products/geometrie-sacree/1.jpg",
      "/images/products/geometrie-sacree/2.jpg",
      "/images/products/geometrie-sacree/3.jpg",
    ],
    category: "table-basse",
    dimensions: { width: 80, height: 40, depth: 80, weight: 35 },
    materials: {
      zellige:
        "Bleu de Fès, Blanc Nacré, Vert Émeraude — trois émaux traditionnels",
      base: "Acier laqué blanc, finition cylindrique",
    },
    maalem: {
      id: "maalem-01",
      name: "Hassan Bensouda",
      image: "/images/maalems/hassan-bensouda/avatar.jpg",
      bio: "Maalem depuis 34 ans, spécialiste de la géométrie islamique.",
    },
    fabricationHours: 95,
    availableConfigurations: {
      zelliges: ["Bleu de Fès", "Noir Onyx", "Terre Naturelle"],
      sizes: ["Standard", "Sur Mesure"],
      bases: ["Cylindre Blanc", "Acier Noir Forgé", "Acier Laiton"],
    },
    inStock: true,
    featured: false,
  },
  {
    id: "prod-04",
    name: "Atlas",
    slug: "atlas",
    description:
      "Table basse ronde en zellige Terre Naturelle, motif spirale concentrique sur base acier noir forgé tripode.",
    longDescription:
      "Driss Aït Taleb a grandi en vue des sommets enneigés du Moyen Atlas. « Atlas » est sa déclaration d'amour à cette géographie : une spirale concentrique en zellige Terre Naturelle qui évoque les courbes de niveau d'une carte topographique, les strates d'une roche sédimentaire, les cercles dans l'eau d'une source. Les tons chauds de la terre naturelle — ocre, brun rosé, beige cassé — varient légèrement d'un carreau à l'autre selon la composition minérale de l'argile, rendant chaque exemplaire absolument unique. La base tripode en acier noir forgé ancre la pièce au sol avec la solidité d'une racine.",
    price: 1380,
    images: [
      "/images/products/atlas/1.jpg",
      "/images/products/atlas/2.jpg",
      "/images/products/atlas/3.jpg",
      "/images/products/atlas/4.jpg",
    ],
    category: "table-basse",
    dimensions: { width: 95, height: 35, depth: 95, weight: 38 },
    materials: {
      zellige: "Terre Naturelle — argile non pigmentée, émail transparent",
      base: "Acier noir forgé, base tripode soudée",
    },
    maalem: {
      id: "maalem-03",
      name: "Driss Aït Taleb",
      image: "/images/maalems/driss-ait-taleb/avatar.jpg",
      bio: "Pionnier de la fusion zellige et forge, originaire du Moyen Atlas.",
    },
    fabricationHours: 55,
    availableConfigurations: {
      zelliges: ["Terre Naturelle", "Blanc Nacré", "Vert Émeraude"],
      sizes: ["Standard", "Grand", "Sur Mesure"],
      bases: ["Acier Noir Forgé", "Acier Laiton", "Pieds Compas"],
    },
    inStock: true,
    featured: false,
  },

  // ── Table à manger ─────────────────────────────────────────────────────────
  {
    id: "prod-05",
    name: "La Grande Bleue",
    slug: "la-grande-bleue",
    description:
      "Grande table à manger en zellige Bleu de Fès, composition damier étoilé, base acier noir forgé.",
    longDescription:
      "Mohammed Cherkaoui a passé trois ans à restaurer les zellige bleus de la médersa Bou Inania avant de concevoir « La Grande Bleue ». Cette table à manger est le fruit de cette immersion : un damier étoilé d'un bleu profond, le même bleu cobalt qui a rendu la céramique fassienne célèbre dans le monde entier, déployé sur une surface de 200 × 100 cm en un seul motif continu sans interruption. La complexité technique est considérable — plus de 2 400 pièces de zellige taillées individuellement pour une table de taille standard. La base en acier noir forgé massif, avec ses traverses soudées à la main, peut supporter des décennies d'usage intensif.",
    price: 4200,
    images: [
      "/images/products/la-grande-bleue/1.jpg",
      "/images/products/la-grande-bleue/2.jpg",
      "/images/products/la-grande-bleue/3.jpg",
      "/images/products/la-grande-bleue/4.jpg",
      "/images/products/la-grande-bleue/5.jpg",
    ],
    category: "table-a-manger",
    dimensions: { width: 200, height: 76, depth: 100, weight: 120 },
    materials: {
      zellige: "Bleu de Fès — cobalt traditionnel, cuisson à 980°C",
      base: "Acier noir forgé massif, traverses soudées main",
    },
    maalem: {
      id: "maalem-04",
      name: "Mohammed Cherkaoui",
      image: "/images/maalems/mohammed-cherkaoui/avatar.jpg",
      bio: "41 ans de métier, restaurateur du patrimoine marocain.",
    },
    fabricationHours: 180,
    availableConfigurations: {
      zelliges: ["Bleu de Fès", "Noir Onyx", "Blanc Nacré"],
      sizes: ["Standard", "Grand", "Sur Mesure"],
      bases: ["Acier Noir Forgé", "Acier Laiton"],
    },
    inStock: true,
    featured: true,
  },
  {
    id: "prod-06",
    name: "Jardin d'Éden",
    slug: "jardin-d-eden",
    description:
      "Table à manger en zellige Vert Émeraude, motif losanges entrelacés, base pieds compas laiton.",
    longDescription:
      "Le vert émeraude est la couleur du Prophète, la couleur des jardins du paradis dans la tradition islamique. Youssef El Ouali en a fait sa couleur de prédilection, et « Jardin d'Éden » en est l'expression la plus aboutie. Sur une surface de 180 × 90 cm, les losanges entrelacés créent un effet de profondeur hypnotique, comme si la table était un bassin aux reflets végétaux. Les carreaux de zellige vert émeraude varient imperceptiblement dans leur tonalité — certains tirant vers le céladon, d'autres vers le jade foncé — grâce à de légères variations dans la composition du bain d'émail. Les pieds compas en laiton massif complètent le tableau d'une touche dorée.",
    price: 3600,
    images: [
      "/images/products/jardin-d-eden/1.jpg",
      "/images/products/jardin-d-eden/2.jpg",
      "/images/products/jardin-d-eden/3.jpg",
      "/images/products/jardin-d-eden/4.jpg",
    ],
    category: "table-a-manger",
    dimensions: { width: 180, height: 76, depth: 90, weight: 105 },
    materials: {
      zellige:
        "Vert Émeraude — oxyde de chrome, variations tonales naturelles",
      base: "Acier laiton massif, pieds compas forgés",
    },
    maalem: {
      id: "maalem-02",
      name: "Youssef El Ouali",
      image: "/images/maalems/youssef-el-ouali/avatar.jpg",
      bio: "Cinquième génération de maalems spécialisés dans le zellige blanc.",
    },
    fabricationHours: 160,
    availableConfigurations: {
      zelliges: ["Vert Émeraude", "Blanc Nacré", "Bleu de Fès"],
      sizes: ["Standard", "Grand", "Sur Mesure"],
      bases: ["Pieds Compas", "Acier Laiton", "Acier Noir Forgé"],
    },
    inStock: false,
    featured: true,
  },
  {
    id: "prod-07",
    name: "Médina",
    slug: "medina",
    description:
      "Table à manger en zellige Terre Naturelle, composition cartographie, base acier noir forgé.",
    longDescription:
      "Driss Aït Taleb voulait créer une table qui ressemble à une vue aérienne de la médina de Fes — ses ruelles entrelacées, ses impasses, ses cours intérieures cachées derrière des murs aveugles. « Médina » est le résultat de cette ambition : une composition en zellige Terre Naturelle où les joints de ciment gris forment un réseau dense de lignes qui évoque effectivement la trame urbaine d'une vieille ville. Les carreaux, tous de forme rectangulaire, sont posés selon une orientation aléatoire contrôlée qui crée le sentiment d'une organisation sans plan préétabli — exactement comme une médina. Une table pour ceux qui aiment les espaces habités, chargés d'histoires.",
    price: 3200,
    images: [
      "/images/products/medina/1.jpg",
      "/images/products/medina/2.jpg",
      "/images/products/medina/3.jpg",
    ],
    category: "table-a-manger",
    dimensions: { width: 160, height: 76, depth: 85, weight: 98 },
    materials: {
      zellige: "Terre Naturelle — argile ocre, joints ciment gris anthracite",
      base: "Acier noir forgé, profil carré massif",
    },
    maalem: {
      id: "maalem-03",
      name: "Driss Aït Taleb",
      image: "/images/maalems/driss-ait-taleb/avatar.jpg",
      bio: "Pionnier de la fusion zellige et forge, originaire du Moyen Atlas.",
    },
    fabricationHours: 140,
    availableConfigurations: {
      zelliges: ["Terre Naturelle", "Blanc Nacré", "Noir Onyx"],
      sizes: ["Standard", "Grand", "Sur Mesure"],
      bases: ["Acier Noir Forgé", "Acier Laiton"],
    },
    inStock: true,
    featured: false,
  },

  // ── Table d'appoint ────────────────────────────────────────────────────────
  {
    id: "prod-08",
    name: "Lune de Miel",
    slug: "lune-de-miel",
    description:
      "Table d'appoint ronde en zellige blanc nacré, motif pleine lune, base cylindre blanc laqué.",
    longDescription:
      "« Lune de Miel » est la pièce la plus intime du catalogue Maison Attar. Sa surface circulaire de 45 cm de diamètre reçoit un unique motif concentrique en zellige Blanc Nacré — cercles dans les cercles, comme les ondes d'une pierre jetée dans l'eau, ou comme la lune vue à travers la moucharabieh d'un riad. Youssef El Ouali a travaillé avec des carreaux de zellige taillés à moins de 8 mm pour obtenir la finesse des cercles intérieurs. Posée sur une base cylindrique laquée blanc, cette table d'appoint est à la fois une sculpture et un objet fonctionnel, parfaite dans un angle de chambre ou à côté d'un canapé.",
    price: 890,
    images: [
      "/images/products/lune-de-miel/1.jpg",
      "/images/products/lune-de-miel/2.jpg",
      "/images/products/lune-de-miel/3.jpg",
    ],
    category: "table-d-appoint",
    dimensions: { width: 45, height: 55, depth: 45, weight: 12 },
    materials: {
      zellige: "Blanc Nacré — émail étain, finesse extrême",
      base: "Acier laqué blanc, cylindre",
    },
    maalem: {
      id: "maalem-02",
      name: "Youssef El Ouali",
      image: "/images/maalems/youssef-el-ouali/avatar.jpg",
      bio: "Cinquième génération de maalems spécialisés dans le zellige blanc.",
    },
    fabricationHours: 40,
    availableConfigurations: {
      zelliges: ["Blanc Nacré", "Bleu de Fès", "Vert Émeraude"],
      sizes: ["Standard", "Sur Mesure"],
      bases: ["Cylindre Blanc", "Acier Laiton", "Acier Noir Forgé"],
    },
    inStock: true,
    featured: false,
  },
  {
    id: "prod-09",
    name: "Brasero",
    slug: "brasero",
    description:
      "Table d'appoint ronde en zellige Noir Onyx, motif flammes, base tripode acier forgé.",
    longDescription:
      "Le feu est au cœur de la fabrication du zellige : sans le four à bois, sans la montée en température, l'émail ne fonderait pas, la couleur n'éclaterait pas. Mohammed Cherkaoui a voulu rendre hommage à cet élément fondateur avec « Brasero » : un plateau circulaire en zellige Noir Onyx traversé d'un motif de flammes stylisées, découpées dans des carreaux de zellige rouge brique et orange brûlé. Le contraste chromatique est saisissant — les flammes semblent danser sur fond noir. La base tripode en acier noir forgé, avec ses pieds légèrement inclinés vers l'extérieur, évoque un vrai brasero marocain.",
    price: 980,
    images: [
      "/images/products/brasero/1.jpg",
      "/images/products/brasero/2.jpg",
      "/images/products/brasero/3.jpg",
    ],
    category: "table-d-appoint",
    dimensions: { width: 50, height: 52, depth: 50, weight: 14 },
    materials: {
      zellige:
        "Noir Onyx, rouge brique, orange brûlé — trilogie de feu",
      base: "Acier noir forgé, tripode à pieds inclinés",
    },
    maalem: {
      id: "maalem-04",
      name: "Mohammed Cherkaoui",
      image: "/images/maalems/mohammed-cherkaoui/avatar.jpg",
      bio: "41 ans de métier, restaurateur du patrimoine marocain.",
    },
    fabricationHours: 48,
    availableConfigurations: {
      zelliges: ["Noir Onyx", "Terre Naturelle", "Bleu de Fès"],
      sizes: ["Standard", "Sur Mesure"],
      bases: ["Acier Noir Forgé", "Acier Laiton"],
    },
    inStock: true,
    featured: false,
  },
  {
    id: "prod-10",
    name: "Chambre des Merveilles",
    slug: "chambre-des-merveilles",
    description:
      "Table d'appoint hexagonale en zellige Bleu de Fès, motif hexagones emboîtés, base acier laiton.",
    longDescription:
      "L'hexagone est la figure de la perfection naturelle — la cellule de ruche, le cristal de neige, la roche basaltique. Hassan Bensouda a bâti autour de cette figure un double motif en abyme sur un plateau hexagonal de 55 cm de côté : des hexagones de zellige Bleu de Fès emboîtés du plus grand au plus petit, créant un effet de profondeur qui donne l'illusion d'un puits sans fond. La table s'appelle « Chambre des Merveilles » en référence aux cabinets de curiosités du XVIIe siècle, ces pièces qui contenaient des objets précieux venus du monde entier. La base en acier laiton poli reflète le bleu du plateau et double l'effet de lumière.",
    price: 1050,
    images: [
      "/images/products/chambre-des-merveilles/1.jpg",
      "/images/products/chambre-des-merveilles/2.jpg",
      "/images/products/chambre-des-merveilles/3.jpg",
    ],
    category: "table-d-appoint",
    dimensions: { width: 55, height: 50, depth: 55, weight: 16 },
    materials: {
      zellige: "Bleu de Fès — cobalt intense, effet profondeur",
      base: "Acier laiton poli, soudure invisible",
    },
    maalem: {
      id: "maalem-01",
      name: "Hassan Bensouda",
      image: "/images/maalems/hassan-bensouda/avatar.jpg",
      bio: "Maalem depuis 34 ans, spécialiste de la géométrie islamique.",
    },
    fabricationHours: 52,
    availableConfigurations: {
      zelliges: ["Bleu de Fès", "Vert Émeraude", "Noir Onyx"],
      sizes: ["Standard", "Sur Mesure"],
      bases: ["Acier Laiton", "Acier Noir Forgé", "Cylindre Blanc"],
    },
    inStock: true,
    featured: true,
  },

  // ── Console ────────────────────────────────────────────────────────────────
  {
    id: "prod-11",
    name: "Arche de Fès",
    slug: "arche-de-fes",
    description:
      "Console en zellige Bleu de Fès et Blanc Nacré, motif arc outrepassé, base acier laiton.",
    longDescription:
      "La console « Arche de Fès » est une pièce architecturale autant que mobilière. Son plateau étroit (140 × 35 cm) reçoit en son centre la représentation stylisée d'un arc outrepassé — cet arc en fer à cheval caractéristique de l'architecture hispano-mauresque — en zellige Blanc Nacré sur fond Bleu de Fès. Les écoinçons géométriques qui encadrent l'arc sont traités dans un zellige Vert Émeraude qui rappelle les décors de la mosquée Attarine. Contre un mur d'entrée ou dans un couloir, cette console transforme l'espace en passage monumental. La base en acier laiton, fine et élancée, soulève le plateau pour lui donner une légèreté architecturale.",
    price: 2100,
    images: [
      "/images/products/arche-de-fes/1.jpg",
      "/images/products/arche-de-fes/2.jpg",
      "/images/products/arche-de-fes/3.jpg",
      "/images/products/arche-de-fes/4.jpg",
    ],
    category: "console",
    dimensions: { width: 140, height: 82, depth: 35, weight: 52 },
    materials: {
      zellige:
        "Bleu de Fès, Blanc Nacré, Vert Émeraude — composition tricolore",
      base: "Acier laiton, profil plat élancé",
    },
    maalem: {
      id: "maalem-04",
      name: "Mohammed Cherkaoui",
      image: "/images/maalems/mohammed-cherkaoui/avatar.jpg",
      bio: "41 ans de métier, restaurateur du patrimoine marocain.",
    },
    fabricationHours: 110,
    availableConfigurations: {
      zelliges: ["Bleu de Fès", "Blanc Nacré", "Noir Onyx"],
      sizes: ["Standard", "Sur Mesure"],
      bases: ["Acier Laiton", "Acier Noir Forgé"],
    },
    inStock: true,
    featured: true,
  },
  {
    id: "prod-12",
    name: "Sillon",
    slug: "sillon",
    description:
      "Console étroite en zellige Terre Naturelle, motif sillons parallèles, base acier noir forgé.",
    longDescription:
      "« Sillon » est la console la plus épurée de la collection. Driss Aït Taleb y a réduit le langage du zellige à son expression la plus minimaliste : des lignes parallèles, légèrement irrégulières comme tracées à la main, en zellige Terre Naturelle sur fond de joints ciment naturel. Le motif évoque un champ labouré vu d'avion, les stries d'une roche sédimentaire ou la page d'un cahier d'écolier. Rien de plus, rien de moins. La base en acier noir forgé — deux montants droits reliés par une traverse — est d'une sobriété architecturale qui ne cherche aucun ornement. Une console pour les intérieurs qui ont déjà tout, et qui cherchent le silence.",
    price: 1750,
    images: [
      "/images/products/sillon/1.jpg",
      "/images/products/sillon/2.jpg",
      "/images/products/sillon/3.jpg",
    ],
    category: "console",
    dimensions: { width: 120, height: 80, depth: 32, weight: 44 },
    materials: {
      zellige: "Terre Naturelle — argile brute, joints ciment naturel",
      base: "Acier noir forgé, montants droits et traverse",
    },
    maalem: {
      id: "maalem-03",
      name: "Driss Aït Taleb",
      image: "/images/maalems/driss-ait-taleb/avatar.jpg",
      bio: "Pionnier de la fusion zellige et forge, originaire du Moyen Atlas.",
    },
    fabricationHours: 80,
    availableConfigurations: {
      zelliges: ["Terre Naturelle", "Blanc Nacré", "Noir Onyx"],
      sizes: ["Standard", "Sur Mesure"],
      bases: ["Acier Noir Forgé", "Acier Laiton"],
    },
    inStock: true,
    featured: false,
  },
];

// ─── Mock Order (tracker demo) ────────────────────────────────────────────────

export const mockOrder: Order = {
  id: "MA-2024-00847",
  customerEmail: "client@example.com",
  items: [
    {
      id: "prod-05",
      name: "La Grande Bleue",
      slug: "la-grande-bleue",
      price: 4200,
      quantity: 1,
      image: "/images/products/la-grande-bleue/1.jpg",
      configuration: {
        zellige: "Bleu de Fès",
        size: "Standard",
        base: "Acier Noir Forgé",
      },
    },
  ],
  total: 4200,
  status: "zellige_pose",
  maalemName: "Mohammed Cherkaoui",
  estimatedDelivery: "2024-03-15",
  trackingSteps: [
    {
      status: "confirmed",
      label: "Commande confirmée",
      description:
        "Votre commande a été reçue et validée. Mohammed Cherkaoui a été informé et prépare son atelier.",
      date: "2024-01-22",
      image: "/images/tracking/confirmed.jpg",
      completed: true,
    },
    {
      status: "in_fabrication",
      label: "Fabrication en cours",
      description:
        "Les matériaux sont sélectionnés. La base en acier noir forgé est en cours de façonnage dans notre atelier de forge.",
      date: "2024-01-28",
      image: "/images/tracking/fabrication.jpg",
      completed: true,
    },
    {
      status: "zellige_pose",
      label: "Pose du zellige",
      description:
        "Mohammed Cherkaoui pose les carreaux un à un. Chaque pièce de zellige Bleu de Fès est taillée et positionnée à la main. Vous recevrez des photos chaque semaine.",
      date: "2024-02-10",
      image: "/images/tracking/zellige-pose.jpg",
      completed: true,
    },
    {
      status: "expedition",
      label: "Expédition",
      description:
        "Votre table est emballée dans une caisse sur mesure et confiée à notre transporteur spécialisé en objets fragiles.",
      date: null,
      completed: false,
    },
    {
      status: "delivered",
      label: "Livraison",
      description:
        "Votre table est arrivée à destination. Nous espérons qu'elle illuminera votre intérieur pendant des générations.",
      date: null,
      completed: false,
    },
  ],
};

// ─── Mock Fabrication Updates ─────────────────────────────────────────────────

export const mockFabricationUpdates: FabricationUpdate[] = [
  {
    orderId: "MA-2024-00847",
    step: "in_fabrication",
    photo: "/images/updates/MA-2024-00847/forge-01.jpg",
    message:
      "La base est en train d'être forgée. J'ai choisi un acier de qualité supérieure pour cette commande, légèrement plus épais que le standard — la table est grande, elle doit tenir des décennies.",
    date: "2024-01-28",
  },
  {
    orderId: "MA-2024-00847",
    step: "zellige_pose",
    photo: "/images/updates/MA-2024-00847/zellige-01.jpg",
    message:
      "Première journée de pose. J'ai commencé par le centre étoilé, là où la précision est la plus critique. Environ 200 pièces posées aujourd'hui. La couleur du Bleu de Fès est magnifique dans la lumière de l'atelier.",
    date: "2024-02-10",
  },
  {
    orderId: "MA-2024-00847",
    step: "zellige_pose",
    photo: "/images/updates/MA-2024-00847/zellige-02.jpg",
    message:
      "La moitié du plateau est posée. Vous pouvez voir le motif étoilé commencer à rayonner vers les bords. Il reste encore environ 1 200 pièces à poser. Je travaille 8 heures par jour sur votre table.",
    date: "2024-02-17",
  },
];

// ─── Helper Functions ──────────────────────────────────────────────────────────

/**
 * Returns a single product by its slug, or undefined if not found.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Returns all products belonging to a given category.
 */
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

/**
 * Returns all products marked as featured.
 */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

/**
 * Returns a Maalem by their id, or undefined if not found.
 */
export function getMaalemById(id: string): Maalem | undefined {
  return maalems.find((m) => m.id === id);
}

/**
 * Returns a Maalem by their slug, or undefined if not found.
 */
export function getMaalemBySlug(slug: string): Maalem | undefined {
  return maalems.find((m) => m.slug === slug);
}

/**
 * Returns all fabrication updates for a given order id.
 */
export function getFabricationUpdates(orderId: string): FabricationUpdate[] {
  return mockFabricationUpdates.filter((u) => u.orderId === orderId);
}
