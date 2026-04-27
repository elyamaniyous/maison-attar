export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "artisanat" | "zellige" | "decoration" | "guide" | "fes" | "entretien";
  tags: string[];
  author: string;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  geoKeywords: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    slug: "quest-ce-que-le-zellige-marocain-origines-fabrication-art-ancestral",
    title: "Qu'est-ce que le zellige marocain ? Origines, fabrication et art ancestral",
    excerpt:
      "Le zellige est bien plus qu'un simple carrelage : c'est un langage géométrique millénaire, ciselé à la main dans l'argile de Fès, porteur d'un héritage civilisationnel d'une rare profondeur.",
    content: `Le zellige est bien plus qu'un simple revêtement décoratif. Né dans les ateliers de la médina de Fès il y a plus de mille ans, c'est un art complet, une discipline exigeante qui engage le corps et l'esprit de l'artisan sur chaque fragment de terre cuite émaillée. Comprendre le zellige, c'est comprendre une partie de l'âme du Maroc.

## Les origines du zellige : un art venu des profondeurs de l'histoire

Le mot "zellige" vient de l'arabe dialectal marocain, lui-même dérivé d'un terme signifiant "petite pierre polie". Apparu en Andalousie et au Maghreb autour du Xe siècle, le zellige s'est épanoui sous les dynasties mérinide et saadienne dans les grandes villes impériales du Maroc : Fès, Marrakech, Meknès et Rabat. Les maîtres artisans — les maalems — ont élevé cet art au rang de langage visuel universel, capable d'exprimer la géométrie sacrée de l'islam, la fluidité des mathématiques arabes et la sensualité de la matière.

Les premiers zelliges ornaient les mosquées, les médersas et les palais royaux. Aujourd'hui encore, les plus belles installations historiques, comme celles de la medersa Bou Inania à Fès ou du palais de la Bahia à Marrakech, témoignent de cette maîtrise absolue. Chaque composition est un exercice de symétrie, de répétition et d'harmonie qui fascine autant les mathématiciens que les esthètes.

## La fabrication : un processus entièrement manuel

La fabrication du zellige commence par une argile locale, extraite dans les environs de Fès et reconnue pour sa plasticité exceptionnelle. L'argile est malaxée, façonnée en grandes plaques à la main, puis séchée au soleil plusieurs jours. Ces plaques sont ensuite cuites dans des fours traditionnels alimentés au bois, à une température d'environ 1000 °C. On obtient ainsi des carreaux de faïence brute — les "blancas" — sur lesquels les émaux colorés seront appliqués.

L'émaillage est une étape décisive. Chaque émail est composé d'oxydes minéraux naturels : le cuivre pour le vert, le manganèse pour le brun ou le noir, l'antimoine pour le jaune, le cobalt pour le bleu. Une fois appliqués, les carreaux repartent au four pour une seconde cuisson qui fixe définitivement les couleurs. Vient alors l'étape la plus spectaculaire et la plus difficile : la découpe.

Le maalem saisit son marteau — le "menqach" — et son ciseau, et taille chaque carreau à la forme exacte requise par le motif. Étoiles, losanges, triangles, hexagones : chaque pièce est obtenue par une série de coups précis, guidés par des décennies d'expérience et une acuité visuelle hors du commun. Il n'existe pas de machine capable de reproduire cette gestuelle. Le travail est entièrement manuel, et c'est précisément ce qui confère au zellige son caractère unique et sa valeur.

## Les motifs et leurs significations

Les motifs du zellige ne sont pas arbitraires. Ils s'inscrivent dans un répertoire géométrique codifié, transmis oralement de maître à apprenti, et chargé de sens. L'étoile à huit branches — symbole d'équilibre et d'harmonie — est l'une des figures les plus répandues. La rosace symbolise le rayonnement du divin. Les entrelacs géométriques évoquent l'infini et la continuité du cosmos.

Cette géométrie sacrée s'exprime dans des palettes chromatiques qui varient selon les époques et les régions. Le bleu profond de la faïence fassi, le vert émeraude, le blanc ivoire, le jaune safran et le brun terre forment des accords que les maalems contemporains revisitent avec audace tout en respectant l'esprit de la tradition.

## Le zellige aujourd'hui : entre patrimoine et modernité

Le zellige connaît aujourd'hui un renouveau spectaculaire. Architectes, décorateurs et créateurs du monde entier l'intègrent dans des projets contemporains — tables, plateaux, plans de travail, façades — en dialogue avec des matériaux modernes comme l'acier ou le béton. Chez Maison Attar, nous collaborons directement avec des maalems de Fès pour créer des pièces qui honorent cette tradition tout en l'inscrivant dans une sensibilité actuelle.

Le zellige marocain n'est pas un produit : c'est une promesse de singularité. Chaque pièce est unique, marquée par la main de l'artisan qui l'a façonnée. C'est cette imperfection sublime qui en fait l'un des matériaux les plus désirables du monde de la décoration contemporaine.`,
    category: "zellige",
    tags: ["zellige", "maroc", "fes", "artisanat", "tradition"],
    author: "Maison Attar",
    publishedAt: "2026-01-15",
    readingTime: 7,
    featured: true,
    seoTitle: "Qu'est-ce que le zellige marocain ? Origines, fabrication et art ancestral | Maison Attar",
    seoDescription:
      "Découvrez l'histoire et la fabrication du zellige marocain : origines médiévales, processus artisanal à Fès, motifs et significations. Guide complet par Maison Attar.",
    geoKeywords: [
      "zellige marocain",
      "zellige de fes",
      "carrelage marocain artisanal",
      "art zellige maroc",
      "fabrication zellige traditionnel",
    ],
  },
  {
    id: "2",
    slug: "comment-choisir-table-basse-zellige-guide-complet",
    title: "Comment choisir sa table basse en zellige : le guide complet",
    excerpt:
      "Dimensions, couleurs, finitions, entretien : tout ce qu'il faut savoir pour choisir la table basse en zellige parfaite pour votre intérieur, signée par nos maalems de Fès.",
    content: `Une table basse en zellige n'est pas un simple meuble : c'est une déclaration de caractère, une invitation permanente à admirer l'art ancestral. Mais face à la diversité des formats, des palettes et des finitions disponibles, le choix peut sembler complexe. Ce guide complet vous donne toutes les clés pour trouver la pièce idéale.

## Définir les bonnes dimensions pour votre espace

La première question à se poser est celle des proportions. Une table basse en zellige doit respirer dans l'espace — ni trop petite au risque d'être ignorée, ni trop imposante au point d'étouffer la pièce. En règle générale, la surface du plateau représente environ un tiers de la surface du canapé qui lui fait face. Pour un salon de taille standard, une table de 80 à 120 cm de longueur sur 40 à 70 cm de largeur constitue un choix équilibré.

La hauteur est un paramètre souvent sous-estimé. Les tables basses en zellige se situent généralement entre 35 et 45 cm de hauteur — une plage qui permet à la fois une utilisation confortable (poser un verre, un livre) et une lisibilité optimale du motif depuis le canapé. Chez Maison Attar, nos structures en acier forgé permettent d'ajuster la hauteur selon vos besoins : n'hésitez pas à nous consulter pour une configuration sur mesure.

## Choisir la palette et le motif zellige

Le zellige offre une palette infinie, mais certaines combinaisons ont fait leurs preuves dans le contexte du design intérieur contemporain. Pour un intérieur aux tonalités neutres — blancs, beiges, gris — le zellige en blanc ivoire, bleu de Fès ou vert sauge apportera une touche de couleur maîtrisée et lumineuse. Pour un espace déjà riche en couleurs et en matières, un zellige en noir et blanc géométrique ou en gamme monochrome de terra cotta s'imposera avec élégance.

Les motifs influencent aussi l'ambiance générale. Un motif à grande échelle, comme l'étoile à douze branches, crée un effet de présence forte, presque architectural. Un motif à petits modules, plus fin et répétitif, donne au contraire une texture douce et hypnotique, qui invite le regard à se perdre dans la composition. Prenez le temps d'observer des échantillons en lumière naturelle, car l'émail change de caractère selon l'heure du jour.

## Les critères de qualité à examiner

Toutes les tables en zellige ne se valent pas. Quelques points de vigilance s'imposent pour distinguer une pièce d'exception d'une imitation industrielle. Examinez d'abord la régularité des joints : un zellige authentique présente des joints légèrement irréguliers, témoins du travail à la main. Des joints parfaitement uniformes et trop fins indiquent généralement un processus mécanisé qui n'a plus grand-chose à voir avec l'artisanat traditionnel.

Inspectez ensuite la qualité des émaux : ils doivent être profonds, brillants, sans craquelures apparentes. Les variations légères de teinte d'une pièce à l'autre sont normales — elles sont même souhaitables, car elles attestent de la cuisson artisanale. Enfin, évaluez la structure : un plateau en zellige est lourd, et la base doit être solide et stable. Nos tables Maison Attar sont montées sur des structures en acier forgé à la main, traitées contre la rouille et dotées de patins de protection.

## Adapter la table à votre style de vie

Une table basse est un meuble d'usage quotidien. Pensez à votre mode de vie : avez-vous des enfants en bas âge ? Des animaux ? Recevez-vous régulièrement ? Le zellige, bien entretenu, est un matériau résistant, mais il demande quelques précautions. Évitez de poser des objets très chauds directement sur le plateau — protégez-le avec des dessous de verre ou de plat. Nettoyez rapidement les liquides acides comme le vin ou le jus de citron.

Pour ceux qui souhaitent un plateau plus polyvalent, certaines de nos configurations proposent un plateau en zellige sur structure à double niveau : un niveau supérieur en zellige pour l'esthétique, un niveau inférieur en acier brossé pour le rangement pratique. Une solution qui allie le beau et l'utile sans compromis.

## Le bon geste : commander sur mesure

La beauté du zellige artisanal réside dans sa capacité à s'adapter à vos souhaits exacts. Dimensions hors standard, palette personnalisée, motif exclusif : chez Maison Attar, chaque commande peut être configurée selon vos spécifications. Nos maalems de Fès travaillent directement sur vos demandes, et nous vous proposons un suivi complet du projet, de la sélection des émaux à la livraison blanche gantée. Découvrez notre collection et notre configurateur en ligne pour commencer.`,
    category: "guide",
    tags: ["table basse", "zellige", "decoration", "guide achat"],
    author: "Maison Attar",
    publishedAt: "2026-01-28",
    readingTime: 8,
    featured: false,
    seoTitle: "Comment choisir sa table basse en zellige : guide complet 2026 | Maison Attar",
    seoDescription:
      "Guide d'achat complet pour choisir votre table basse en zellige marocain : dimensions, motifs, qualité, prix et conseils d'experts des maalems de Fès.",
    geoKeywords: [
      "table basse zellige",
      "table zellige prix",
      "table marocaine",
      "table basse zellige marocain",
      "acheter table zellige",
      "table zellige artisanale",
    ],
  },
  {
    id: "3",
    slug: "maalems-fes-gardiens-savoir-faire-millenaire",
    title: "Les maalems de Fès : gardiens d'un savoir-faire millénaire",
    excerpt:
      "Derrière chaque fragment de zellige se trouve la main d'un maalem. Portrait de ces maîtres artisans de Fès qui perpétuent, dans le silence de leurs ateliers, un art vieux de mille ans.",
    content: `Dans la médina de Fès, derrière des portes en bois patinées que rien ne distingue des autres, se cachent des ateliers où le temps semble suspendu. Des hommes — et parfois des femmes — y exercent un art que leurs grands-pères leur ont enseigné, lequel le tenait lui-même d'un lignage d'artisans remontant aux premières dynasties du Maroc impérial. Ces hommes s'appellent les maalems, et ce sont eux qui donnent vie au zellige.

## Maalem : le titre d'une vie

Le mot "maalem" (maître, en arabe) n'est pas un titre que l'on s'accorde soi-même. Il se mérite, au terme de longues années d'apprentissage auprès d'un maître reconnu. Le cursus traditionnel commence à l'adolescence — parfois dès l'enfance — et peut durer une décennie avant que l'apprenti soit jugé apte à travailler de façon autonome. Dans ce système d'apprentissage oral et gestuel, pas de manuel, pas de diplôme : la transmission se fait par l'observation, la répétition et la correction patiente.

Le jeune apprenti commence par les tâches les plus basiques : préparer l'argile, alimenter le four, nettoyer l'atelier. Peu à peu, on lui confie des gestes plus techniques : l'émaillage, la découpe des pièces les plus simples. Des années passent avant qu'il ne touche au marteau-ciseau pour tailler les formes complexes — les étoiles, les polygones irréguliers, les pièces d'angle qui demandent le plus de précision.

## L'atelier : un écosystème vivant

Un atelier de zellige à Fès est un univers à part entière. L'espace est organisé selon une logique qui s'est affinée au fil des générations. À l'entrée, les plaques de terre cuite fraîchement cuites, encore tièdes. Plus loin, les émaux rangés par couleur dans des jarres en terre. Au centre, les maalems assis sur des nattes ou de petits tabourets, le plateau de travail posé à même le sol devant eux, à la hauteur idéale pour guider le marteau avec précision.

Le son d'un atelier de zellige est immédiatement reconnaissable : une percussion rythmée, répétitive, presque musicale. Chaque coup de marteau est calibré. Trop fort, et l'émail éclate. Trop léger, et la coupe est imprécise. Ce calibrage instinctif, acquis au fil de milliers d'heures de pratique, est ce qui distingue le maalem du simple ouvrier.

## Les secrets de la géométrie sacrée

La connaissance des motifs géométriques est le coeur du savoir-faire du maalem. Ces motifs — étoiles à cinq, six, huit, dix ou douze branches, entrelacs de polygones, rosaces — ne sont pas appris sur papier mais mémorisés dans la main. Le maalem sait d'instinct l'angle exact auquel tailler une pièce pour qu'elle s'emboîte parfaitement dans la suivante, sans mesure, sans crayon.

Cette connaissance est précieuse et fragile. Elle ne s'écrit pas. Elle ne se filme pas vraiment — un apprenti peut regarder des heures de vidéo sans comprendre le geste juste. Elle s'acquiert uniquement dans la proximité physique avec un maître, dans la répétition et la correction quotidienne. C'est pourquoi, malgré l'intérêt croissant du monde entier pour le zellige, le nombre de véritables maalems reste limité.

## Maison Attar et les maalems de Fès

Chez Maison Attar, notre engagement envers les maalems est au fondement de notre projet. Nous travaillons exclusivement avec des artisans fassis, que nous rémunérons à leur juste valeur — bien au-dessus des standards du marché touristique. Chaque commande est l'occasion d'un dialogue : nous discutons des motifs, des couleurs, des contraintes techniques avec les maalems, et nous leur laissons la liberté d'expression que mérite leur expertise.

Certaines de nos pièces portent la signature discrète de leur créateur — une convention rare dans un secteur où l'anonymat de l'artisan est la norme. Nous croyons que valoriser le maalem, c'est valoriser l'art lui-même. Et c'est la seule façon de garantir que ce savoir-faire millénaire sera encore vivant dans cent ans.`,
    category: "artisanat",
    tags: ["maalem", "artisan", "fes", "savoir-faire"],
    author: "Maison Attar",
    publishedAt: "2026-02-08",
    readingTime: 7,
    featured: false,
    seoTitle: "Les maalems de Fès : maîtres artisans du zellige | Maison Attar",
    seoDescription:
      "Découvrez l'univers des maalems, maîtres artisans du zellige à Fès. Apprentissage, ateliers, savoir-faire transmis de génération en génération. Portraits d'artisans d'exception.",
    geoKeywords: [
      "artisan zellige fes",
      "maalem marocain",
      "artisanat fes",
      "maitre artisan zellige",
      "artisan zellige maroc",
    ],
  },
  {
    id: "4",
    slug: "zellige-design-contemporain-integrer-artisanat-marocain-interieur-moderne",
    title: "Zellige et design contemporain : comment intégrer l'artisanat marocain dans un intérieur moderne",
    excerpt:
      "Le zellige n'est plus cantonné aux riads traditionnels. Découvrez comment les designers les plus pointus l'intègrent dans des espaces résolument contemporains, avec audace et sophistication.",
    content: `Il y a encore vingt ans, le zellige était avant tout associé aux hammams, aux riads et aux cuisines traditionnelles du Maghreb. Aujourd'hui, il s'invite dans les appartements haussmanniens, les lofts industriels et les villas minimalistes du monde entier. Comment expliquer ce passage de la tradition à la modernité ? Et surtout, comment réussir cette intégration avec goût ?

## Comprendre le dialogue entre zellige et design contemporain

Le zellige fonctionne si bien dans les intérieurs contemporains parce qu'il partage avec eux une même exigence de l'essentiel. L'architecture contemporaine valorise la matière brute, l'artisanat visible, l'imperfection assumée. Le béton ciré, le bois massif, l'acier brut — autant de matériaux qui, comme le zellige, portent la trace du processus qui les a créés. Le zellige s'inscrit naturellement dans cette famille de matières authentiques.

Il y a aussi une dimension géométrique qui fait résonner le zellige avec le design actuel. Les motifs traditionnels du zellige — étoiles, polygones, entrelacs — anticipent d'une certaine façon les motifs graphiques que les designers contemporains explorent via la technologie numérique. Le zellige est, en quelque sorte, le premier "pattern design" de l'histoire.

## Règles d'or pour une intégration réussie

La première règle est celle de la sobriété contextuelle. Le zellige est un élément fort, doté d'une grande présence visuelle. Dans un intérieur contemporain, il se distingue le mieux lorsqu'il est entouré de matières plus calmes : un mur blanc lisse, un parquet en chêne naturel, du linge de maison neutre. L'erreur classique consiste à vouloir multiplier les motifs et les couleurs autour d'une pièce en zellige, ce qui crée une cacophonie visuelle où personne ne l'emporte.

La deuxième règle est celle de la cohérence chromatique. Choisissez votre pièce en zellige en dernier, ou du moins laissez-la dicter votre palette de couleurs. Un plateau en zellige bleu de Fès appellera des coussins bleu nuit ou kaki, des objets en laiton doré, des murs très légèrement teintés. Un zellige en terra cotta s'harmonisera avec des teintes ocre, des textiles en lin brut, des bois clairs.

## Des usages inattendus et inspirants

Au-delà de la table basse — l'usage le plus répandu — le zellige s'invite dans des contextes de plus en plus variés. En plan de travail de cuisine, il crée un point focal magnétique qui élève immédiatement la pièce. En tablette de cheminée, il apporte une chaleur et une présence incomparables. En tête de lit, dans une chambre aux tonalités neutres, il devient une oeuvre d'art à part entière.

Les designers avant-gardistes l'utilisent également en revêtement mural partiel — une paroi d'entrée, un mur d'accent dans une salle à manger — pour créer un effet de galerie d'art domestique. La clé, dans tous ces cas, est de ne pas sur-décorer autour : laisser le zellige respirer, lui accorder l'espace qu'il mérite.

## L'acier, partenaire naturel du zellige contemporain

Chez Maison Attar, nous avons fait le choix de marier le zellige avec l'acier forgé à la main. Ce dialogue entre la terre émaillée et le métal brut est l'une des signatures de notre maison. L'acier apporte la rigueur structurelle et la modernité industrielle ; le zellige apporte la chaleur, la couleur et l'histoire. Ensemble, ils créent une tension esthétique qui est au coeur de notre vision du design contemporain.

Intégrer une pièce Maison Attar dans votre intérieur, c'est choisir une conversation entre deux arts, deux matières, deux cultures. Une conversation qui n'a pas de date d'expiration.`,
    category: "decoration",
    tags: ["decoration", "design", "interieur", "zellige"],
    author: "Maison Attar",
    publishedAt: "2026-02-20",
    readingTime: 6,
    featured: false,
    seoTitle: "Zellige et design contemporain : intégrer l'artisanat marocain chez soi | Maison Attar",
    seoDescription:
      "Comment intégrer le zellige marocain dans un intérieur moderne ? Conseils de décoration, règles d'association, usages inattendus. Guide par Maison Attar.",
    geoKeywords: [
      "decoration zellige moderne",
      "zellige interieur contemporain",
      "zellige design interieur",
      "integrer zellige marocain",
      "zellige salon contemporain",
    ],
  },
  {
    id: "5",
    slug: "fes-berceau-zellige-voyage-coeur-medina",
    title: "Fès, berceau du zellige : voyage au coeur de la médina",
    excerpt:
      "Fès n'est pas seulement une ville : c'est un monde. Plongée dans la médina de Fès el-Bali, capitale mondiale du zellige, où chaque rue, chaque atelier raconte une histoire millénaire.",
    content: `Il est des villes qui résistent à la compréhension rapide. Fès est de celles-là. La capitale spirituelle du Maroc, classée au patrimoine mondial de l'UNESCO depuis 1981, est un labyrinthe de sens autant qu'un labyrinthe de rues. Pour comprendre le zellige — vraiment le comprendre — il faut venir ici, dans cette médina dont l'organisation n'a pratiquement pas changé depuis le Moyen-Âge.

## Fès el-Bali : la médina hors du temps

Fès el-Bali, la vieille ville, compte selon les estimations entre 9 000 et 13 000 ruelles et passages. Aucune voiture n'y circule — les ânes sont encore le principal moyen de transport. Les ruelles sont organisées par corporations de métiers : les tanneurs dans un quartier, les bijoutiers dans un autre, les tisserands plus loin. Et au coeur de tout cela, les ateliers de zellige, discrets, actifs, vivants.

La ville a été fondée en 789 par Idriss Ier, et agrandie par Idriss II au IXe siècle. Elle a connu son apogée sous les Mérinides (XIIIe-XVe siècles), qui ont fait de Fès la capitale d'un empire s'étendant jusqu'à l'Andalousie. C'est à cette époque que le zellige a atteint sa maturité artistique, embellissant les grandes mosquées, les médersas et les palais qui constituent encore aujourd'hui le coeur patrimonial de la ville.

## Les lieux incontournables du zellige à Fès

La medersa Bou Inania, construite entre 1350 et 1357, est le premier arrêt obligatoire de tout amateur de zellige. Ses murs intérieurs sont couverts jusqu'à mi-hauteur d'un zellige polychrome d'une finesse absolue, surmonté d'une frise de stuc sculpté et d'un lambris en cèdre de l'Atlas. L'ensemble constitue l'une des plus belles démonstrations de l'art ornemental marocain.

La medersa el-Attarine, jouxtant la mosquée al-Qarawiyyine, offre un zellige plus épuré, dans des teintes de bleu, vert et ocre qui semblent dialoguer avec la lumière changeante du patio central. Le palais Dar Batha, aujourd'hui musée, conserve une collection exceptionnelle de zellige ancien qui permet de suivre l'évolution des motifs et des palettes sur plusieurs siècles.

Pour voir le zellige vivant — celui qui se fabrique encore aujourd'hui — il faut s'aventurer dans le quartier de Sidi Moussa, où se concentrent la plupart des ateliers de production. Certains maalems acceptent les visiteurs respectueux ; d'autres préfèrent la discrétion de leur art. Chez Maison Attar, nous organisons pour nos clients des visites d'ateliers encadrées, qui permettent d'assister à toutes les étapes de la fabrication.

## La tannerie Chouara : quand l'artisanat fascine le monde entier

Non loin des ateliers de zellige, la tannerie Chouara est l'un des spectacles les plus fascinants de Fès. Des centaines d'hommes travaillent dans des cuves de couleur au fond de la médina, tannant et teintant les peaux selon des méthodes millénaires. Ce tableau vivant, que l'on contemple depuis les terrasses des maroquineries environnantes, dit quelque chose d'essentiel sur Fès : ici, la tradition n'est pas un musée, c'est un mode de vie.

## Voyager à Fès : conseils pratiques

Fès se visite idéalement au printemps (mars-mai) ou en automne (septembre-novembre), lorsque les températures sont clémentes. Logez dans un riad de la médina pour vous immerger pleinement dans l'atmosphère de la vieille ville. Faites appel à un guide local officiel pour ne pas vous perdre dans le labyrinthe et surtout pour accéder aux ateliers et aux lieux habituellement fermés aux touristes.

Fès mérite au moins trois jours de visite sérieuse. Pour ceux qui souhaitent combiner voyage culturel et acquisition de pièces artisanales, Maison Attar peut organiser des circuits sur mesure incluant des visites d'ateliers et des rencontres avec nos maalems partenaires. Le zellige vu depuis Fès n'a plus rien à voir avec le zellige vu depuis une boutique : c'est une expérience qui transforme votre rapport à l'objet artisanal.`,
    category: "fes",
    tags: ["fes", "medina", "voyage", "maroc"],
    author: "Maison Attar",
    publishedAt: "2026-03-05",
    readingTime: 8,
    featured: false,
    seoTitle: "Fès, berceau du zellige : guide complet de la médina | Maison Attar",
    seoDescription:
      "Voyage au coeur de Fès el-Bali, capitale mondiale du zellige. Médersas, ateliers de maalems, tanneries : guide culturel complet de la médina de Fès.",
    geoKeywords: [
      "fes maroc",
      "medina fes",
      "zellige fes artisanat",
      "visiter fes medina",
      "artisanat traditionnel fes",
      "medersa bou inania zellige",
    ],
  },
  {
    id: "6",
    slug: "entretenir-table-zellige-conseils-astuces-experts",
    title: "Entretenir sa table en zellige : conseils et astuces d'experts",
    excerpt:
      "Un zellige bien entretenu dure des siècles. Voici les gestes essentiels et les erreurs à éviter pour conserver votre table Maison Attar dans un état impeccable sur le long terme.",
    content: `Le zellige est un matériau d'une longévité exceptionnelle — les pavements des médersas médiévales de Fès, vieux de sept siècles, en témoignent. Mais cette durabilité n'est pas inconditionnelle. Elle requiert une attention régulière et quelques gestes simples que tout propriétaire peut maîtriser. Voici le guide complet d'entretien de votre table en zellige Maison Attar.

## Les bases de l'entretien quotidien

Pour l'entretien au quotidien, la règle d'or est la simplicité. Un chiffon en microfibre légèrement humide suffit pour nettoyer le plateau après utilisation. Essuyez dans le sens des joints, sans forcer, pour ne pas desserrer les petites particules de coulis qui pourraient s'être déposées en surface. Séchez ensuite avec un chiffon sec pour éviter les traces d'eau.

Évitez à tout prix les éponges abrasives, les tampons récureurs ou les brosses à poils durs. L'émail du zellige est résistant mais pas indestructible : des frottements trop vigoureux peuvent ternir le brillant sur le long terme. De même, les nettoyants ménagers agressifs — javel, ammoniaque, produits à base d'acide — sont à proscrire absolument. Ils attaquent les émaux et peuvent altérer les joints de façon irréversible.

## Faire face aux taches

La réactivité est la clé de la gestion des taches. Plus une tache est traitée rapidement, plus elle est facile à éliminer. Pour les liquides courants (eau, café, thé, jus), essuyez immédiatement avec un chiffon absorbant, puis nettoyez à l'eau tiède. Pour les liquides acides (vin rouge, jus de citron, vinaigre), agissez en urgence : ces substances peuvent mordre les émaux si elles restent en contact prolongé. Rincez abondamment à l'eau claire, puis séchez.

Pour les taches plus tenaces — huile, cire de bougie, résidu collant — laissez agir quelques gouttes de liquide vaisselle dilué dans l'eau tiède pendant deux à trois minutes, puis essuyez délicatement. Le bicarbonate de soude en pâte (bicarbonate mélangé à un peu d'eau) constitue un nettoyant doux efficace pour les taches résistantes, sans risque pour les émaux.

## La protection préventive : joints et imperméabilisation

Les joints sont la partie la plus vulnérable d'un plateau en zellige. Ils peuvent jaunir, s'effriter ou se décolorer sous l'effet de l'humidité répétée ou des produits acides. Pour les protéger, il est recommandé d'appliquer une fois par an un hydrofuge pour joints, disponible dans les magasins de matériaux ou en nous contactant directement. Ce traitement crée un film protecteur invisible qui repousse l'eau et les taches sans altérer l'aspect du zellige.

Pour le plateau lui-même, un polish pour carrelage émaillé — appliqué une à deux fois par an — ravivera l'éclat des émaux et renforcera leur résistance aux micro-rayures. Appliquez-le en fines couches circulaires avec un chiffon doux, laissez sécher, puis lustrez doucement. Le résultat est spectaculaire : les couleurs retrouvent leur profondeur et leur luminosité d'origine.

## Ce qu'il ne faut jamais faire

Quelques interdits absolus à mémoriser : ne posez jamais d'objets très chauds directement sur le plateau — la dilatation thermique peut provoquer des microfissures dans l'émail ou dans les joints. Utilisez toujours des sous-verres, des dessous de plat ou des napperons isolants. Ne glissez pas d'objets lourds sur le plateau sans protection — la pointe d'un pied de vase en métal peut rayer l'émail.

Évitez également l'exposition prolongée au soleil direct pour les plateaux situés près d'une baie vitrée non traitée : certains pigments, notamment les bleus au cobalt, peuvent légèrement s'altérer sur de longues années d'exposition UV intense. Un film anti-UV sur les vitres environnantes est une bonne précaution.

## En cas de dommage : réparation et restauration

Si malgré toutes les précautions un fragment de zellige se détache ou se fissure, ne paniquez pas. Le zellige est un matériau réparable. Conservez tous les fragments, même les plus petits. Contactez-nous chez Maison Attar : selon la nature du dommage, nous pouvons soit vous envoyer un kit de réparation avec les pièces de remplacement assorties, soit organiser une intervention de restauration par l'un de nos maalems partenaires. Un plateau en zellige bien restauré retrouve toute sa beauté, et l'intervention d'un maalem renforce même le caractère unique de la pièce.`,
    category: "entretien",
    tags: ["entretien", "zellige", "soin", "conseil"],
    author: "Maison Attar",
    publishedAt: "2026-03-18",
    readingTime: 6,
    featured: false,
    seoTitle: "Entretenir sa table en zellige : guide complet 2026 | Maison Attar",
    seoDescription:
      "Comment entretenir, nettoyer et protéger votre table en zellige marocain ? Conseils d'experts Maison Attar : nettoyage quotidien, taches, joints, réparation.",
    geoKeywords: [
      "entretien zellige",
      "nettoyer zellige",
      "soin table zellige",
      "entretenir table marocaine",
      "nettoyage zellige artisanal",
      "proteger zellige",
    ],
  },
];

// ─── Note ──────────────────────────────────────────────────────────────────────
// Sync getter functions (getBlogBySlug, getBlogsByCategory, getFeaturedArticles)
// have been removed. Use the async helpers in @/db/helpers instead
// (getArticleBySlug, getArticles).
//
// This file retains the raw blogArticles array (used by db/seed.ts) and
// the categoryLabels record (used by public pages).

export const categoryLabels: Record<BlogArticle["category"], string> = {
  artisanat: "Artisanat",
  zellige: "Zellige",
  decoration: "Décoration",
  guide: "Guide",
  fes: "Fès",
  entretien: "Entretien",
};
