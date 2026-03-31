import type { TableConfigurator, ConfiguredTable } from "./types";

// ─── Base price ───────────────────────────────────────────────────────────────

export const BASE_COST_PRICE = 350;
export const BASE_SELLING_PRICE = 890;

// ─── Configurator data ────────────────────────────────────────────────────────

export function getConfiguratorData(): TableConfigurator {
  return {
    shapes: {
      id: "shapes",
      label: "Forme de la table",
      description: "La silhouette qui définit l'espace",
      options: [
        {
          id: "rectangulaire",
          label: "Rectangulaire",
          description: "Forme classique, s'adapte à tous les espaces",
          costPrice: 0,
          sellingPrice: 0,
          available: true,
        },
        {
          id: "ronde",
          label: "Ronde",
          description: "Conviviale et douce, sans angles vifs",
          costPrice: 50,
          sellingPrice: 100,
          available: true,
        },
        {
          id: "ovale",
          label: "Ovale",
          description: "Élégance fluide, parfaite pour les grands espaces",
          costPrice: 80,
          sellingPrice: 150,
          available: true,
        },
        {
          id: "carree",
          label: "Carrée",
          description: "Géométrie pure, symétrie absolue",
          costPrice: 0,
          sellingPrice: 0,
          available: true,
        },
      ],
    },

    sizes: {
      id: "sizes",
      label: "Dimensions",
      description: "Choisissez parmi nos formats ou optez pour du sur-mesure",
      options: [
        // Rectangulaire sizes
        {
          id: "rect-60x40",
          label: "60 × 40 cm",
          description: "Table d'appoint compacte",
          costPrice: 100,
          sellingPrice: 0,
          available: true,
          dimensions: { width: 60, depth: 40, label: "60 × 40 cm" },
        },
        {
          id: "rect-90x60",
          label: "90 × 60 cm",
          description: "Table basse salon — format standard",
          costPrice: 160,
          sellingPrice: 150,
          available: true,
          dimensions: { width: 90, depth: 60, label: "90 × 60 cm" },
        },
        {
          id: "rect-120x80",
          label: "120 × 80 cm",
          description: "Table centrale — format généreux",
          costPrice: 240,
          sellingPrice: 350,
          available: true,
          dimensions: { width: 120, depth: 80, label: "120 × 80 cm" },
        },
        {
          id: "rect-140x100",
          label: "140 × 100 cm",
          description: "Grande table basse — présence affirmée",
          costPrice: 360,
          sellingPrice: 550,
          available: true,
          dimensions: { width: 140, depth: 100, label: "140 × 100 cm" },
        },
        // Ronde sizes
        {
          id: "ronde-d50",
          label: "Ø 50 cm",
          description: "Table d'appoint ronde",
          costPrice: 100,
          sellingPrice: 0,
          available: true,
          dimensions: { diameter: 50, label: "Ø 50 cm" },
        },
        {
          id: "ronde-d70",
          label: "Ø 70 cm",
          description: "Table basse ronde — format salon",
          costPrice: 150,
          sellingPrice: 150,
          available: true,
          dimensions: { diameter: 70, label: "Ø 70 cm" },
        },
        {
          id: "ronde-d90",
          label: "Ø 90 cm",
          description: "Grande table ronde — convivialité maximale",
          costPrice: 220,
          sellingPrice: 350,
          available: true,
          dimensions: { diameter: 90, label: "Ø 90 cm" },
        },
        {
          id: "ronde-d110",
          label: "Ø 110 cm",
          description: "Table ronde XXL — pièce maîtresse",
          costPrice: 320,
          sellingPrice: 550,
          available: true,
          dimensions: { diameter: 110, label: "Ø 110 cm" },
        },
        // Carree sizes
        {
          id: "carree-50x50",
          label: "50 × 50 cm",
          description: "Table d'appoint carrée",
          costPrice: 100,
          sellingPrice: 0,
          available: true,
          dimensions: { width: 50, depth: 50, label: "50 × 50 cm" },
        },
        {
          id: "carree-70x70",
          label: "70 × 70 cm",
          description: "Table basse carrée — équilibre parfait",
          costPrice: 160,
          sellingPrice: 150,
          available: true,
          dimensions: { width: 70, depth: 70, label: "70 × 70 cm" },
        },
        {
          id: "carree-90x90",
          label: "90 × 90 cm",
          description: "Grande table carrée — symétrie absolue",
          costPrice: 240,
          sellingPrice: 350,
          available: true,
          dimensions: { width: 90, depth: 90, label: "90 × 90 cm" },
        },
        // Ovale sizes
        {
          id: "ovale-80x50",
          label: "80 × 50 cm",
          description: "Ovale compact — élégance contenue",
          costPrice: 130,
          sellingPrice: 0,
          available: true,
          dimensions: { width: 80, depth: 50, label: "80 × 50 cm" },
        },
        {
          id: "ovale-100x60",
          label: "100 × 60 cm",
          description: "Ovale standard — courbes affirmées",
          costPrice: 200,
          sellingPrice: 200,
          available: true,
          dimensions: { width: 100, depth: 60, label: "100 × 60 cm" },
        },
        {
          id: "ovale-130x80",
          label: "130 × 80 cm",
          description: "Grand ovale — présence sculpturale",
          costPrice: 300,
          sellingPrice: 450,
          available: true,
          dimensions: { width: 130, depth: 80, label: "130 × 80 cm" },
        },
        // Sur Mesure (applies to all shapes)
        {
          id: "sur-mesure",
          label: "Sur Mesure",
          description: "Dimensions personnalisées — devis gratuit sous 48h",
          costPrice: 0,
          sellingPrice: 0,
          available: true,
          isSurMesure: true,
        },
      ],
    },

    zelligePatterns: {
      id: "zelligePatterns",
      label: "Forme du zellige",
      description: "La forme des carreaux taillés à la main par nos maalems",
      options: [
        {
          id: "ecaille",
          label: "Écaille",
          description: "Motif écaille de poisson, fluide et répétitif",
          costPrice: 200,
          sellingPrice: 0,
          available: true,
        },
        {
          id: "losange",
          label: "Losange",
          description: "Carreaux diamant en diagonale, dynamisme géométrique",
          costPrice: 220,
          sellingPrice: 50,
          available: true,
        },
        {
          id: "carre",
          label: "Carré",
          description: "Grille orthogonale, rigueur et clarté",
          costPrice: 190,
          sellingPrice: 0,
          available: true,
        },
        {
          id: "hexagone",
          label: "Hexagone",
          description: "Nid d'abeille régulier, nature et modernité",
          costPrice: 250,
          sellingPrice: 100,
          available: true,
        },
        {
          id: "etoile-8",
          label: "Étoile 8 branches",
          description: "Rosace étoilée, symbole de perfection islamique",
          costPrice: 320,
          sellingPrice: 250,
          available: true,
        },
        {
          id: "rectangle-biseaute",
          label: "Rectangle Biseauté",
          description: "Briques obliques aux angles taillés, sobriété raffinée",
          costPrice: 210,
          sellingPrice: 30,
          available: true,
        },
      ],
    },

    legStyles: {
      id: "legStyles",
      label: "Forme des pieds",
      description: "La structure qui porte le plateau",
      options: [
        {
          id: "cylindre",
          label: "Cylindre",
          description: "Pied tubulaire, ligne pure et épurée",
          costPrice: 60,
          sellingPrice: 0,
          available: true,
        },
        {
          id: "cube",
          label: "Cube",
          description: "Bloc rectangulaire massif, ancrage minéral",
          costPrice: 80,
          sellingPrice: 80,
          available: true,
        },
        {
          id: "compas",
          label: "Compas",
          description: "Pieds en V inclinés, élégance mi-siècle",
          costPrice: 90,
          sellingPrice: 100,
          available: true,
        },
        {
          id: "forge-artistique",
          label: "Forge artistique",
          description: "Métal forgé main, traces de marteau apparentes",
          costPrice: 150,
          sellingPrice: 250,
          available: true,
        },
        {
          id: "trapeze",
          label: "Trapèze",
          description: "Profil effilé vers le bas, légèreté optique",
          costPrice: 100,
          sellingPrice: 130,
          available: true,
        },
        {
          id: "arche",
          label: "Arche",
          description: "Structure arquée, référence à l'architecture marocaine",
          costPrice: 130,
          sellingPrice: 200,
          available: true,
        },
      ],
    },

    legColors: {
      id: "legColors",
      label: "Couleur des pieds",
      description: "La finition métallique ou peinte des pieds",
      options: [
        {
          id: "noir-mat",
          label: "Noir Mat",
          description: "Laqué noir profond, intemporel",
          costPrice: 20,
          sellingPrice: 0,
          available: true,
        },
        {
          id: "blanc-casse",
          label: "Blanc Cassé",
          description: "Blanc chaud teinté ivoire, douceur lumineuse",
          costPrice: 20,
          sellingPrice: 0,
          available: true,
        },
        {
          id: "laiton-brosse",
          label: "Laiton Brossé",
          description: "Métal doré aux reflets chauds et sophistiqués",
          costPrice: 80,
          sellingPrice: 150,
          available: true,
        },
        {
          id: "bronze-antique",
          label: "Bronze Antique",
          description: "Patine foncée aux nuances brunes et cuivrées",
          costPrice: 90,
          sellingPrice: 180,
          available: true,
        },
        {
          id: "acier-brut",
          label: "Acier Brut",
          description: "Métal naturel non traité, matière brute authentique",
          costPrice: 50,
          sellingPrice: 80,
          available: true,
        },
        {
          id: "vert-de-fes",
          label: "Vert de Fès",
          description: "Laqué vert profond, hommage à la ville bleue",
          costPrice: 60,
          sellingPrice: 100,
          available: true,
        },
      ],
    },

    colors: {
      id: "colors",
      label: "Couleur du plateau",
      description: "La teinte principale du zellige",
      options: [
        {
          id: "blanc-zellige",
          label: "Blanc Zellige",
          description: "Blanc laiteux aux reflets nacrés",
          costPrice: 30,
          sellingPrice: 0,
          available: true,
        },
        {
          id: "noir-mat",
          label: "Noir Mat",
          description: "Noir profond absorbant la lumière",
          costPrice: 30,
          sellingPrice: 0,
          available: true,
        },
        {
          id: "terracotta",
          label: "Terracotta",
          description: "Terre cuite aux nuances orangées de Marrakech",
          costPrice: 50,
          sellingPrice: 80,
          available: true,
        },
        {
          id: "bleu-fes",
          label: "Bleu de Fès",
          description: "Cobalt profond, signature de la faïence marocaine",
          costPrice: 60,
          sellingPrice: 100,
          available: true,
        },
        {
          id: "vert-menthe",
          label: "Vert Menthe",
          description: "Vert tendre évoquant les jardins andalous",
          costPrice: 60,
          sellingPrice: 100,
          available: true,
        },
        {
          id: "ocre-doree",
          label: "Ocre Dorée",
          description: "Jaune ocre chaleureux, lumière du désert",
          costPrice: 50,
          sellingPrice: 80,
          available: true,
        },
      ],
    },
  };
}

// ─── Size filtering by shape ──────────────────────────────────────────────────

export function getSizesForShape(shapeId: string, allSizes: ReturnType<typeof getConfiguratorData>["sizes"]["options"]) {
  const shapePrefix: Record<string, string[]> = {
    rectangulaire: ["rect-", "sur-mesure"],
    ronde: ["ronde-", "sur-mesure"],
    carree: ["carree-", "sur-mesure"],
    ovale: ["ovale-", "sur-mesure"],
  };
  const prefixes = shapePrefix[shapeId] ?? ["sur-mesure"];
  return allSizes.filter((s) => prefixes.some((p) => s.id.startsWith(p)));
}

// ─── Price calculation ────────────────────────────────────────────────────────

export function calculateTablePrice(config: ConfiguredTable): {
  costPrice: number;
  sellingPrice: number;
  margin: number;
} {
  const costPrice = BASE_COST_PRICE + config.totalCostPrice;
  const sellingPrice = BASE_SELLING_PRICE + config.totalSellingPrice;
  const margin = sellingPrice > 0
    ? Math.round(((sellingPrice - costPrice) / sellingPrice) * 100)
    : 0;

  return { costPrice, sellingPrice, margin };
}

// ─── Helper to compute totals from option selections ─────────────────────────

export function computeConfiguredTable(
  sizeId: string,
  shapeId: string,
  legStyleId: string,
  colorId: string,
  zelligePatternId: string,
  legColorId: string,
): ConfiguredTable {
  const data = getConfiguratorData();

  const find = (category: ReturnType<typeof getConfiguratorData>["sizes"], id: string) =>
    category.options.find((o) => o.id === id);

  const size = find(data.sizes, sizeId);
  const shape = find(data.shapes, shapeId);
  const leg = find(data.legStyles, legStyleId);
  const color = find(data.colors, colorId);
  const pattern = find(data.zelligePatterns, zelligePatternId);
  const legColor = find(data.legColors, legColorId);

  const totalCostPrice =
    (size?.costPrice ?? 0) +
    (shape?.costPrice ?? 0) +
    (leg?.costPrice ?? 0) +
    (color?.costPrice ?? 0) +
    (pattern?.costPrice ?? 0) +
    (legColor?.costPrice ?? 0);

  const totalSellingPrice =
    (size?.sellingPrice ?? 0) +
    (shape?.sellingPrice ?? 0) +
    (leg?.sellingPrice ?? 0) +
    (color?.sellingPrice ?? 0) +
    (pattern?.sellingPrice ?? 0) +
    (legColor?.sellingPrice ?? 0);

  return {
    size: sizeId,
    shape: shapeId,
    legStyle: legStyleId,
    color: colorId,
    zelligePattern: zelligePatternId,
    legColor: legColorId,
    totalCostPrice,
    totalSellingPrice,
  };
}
