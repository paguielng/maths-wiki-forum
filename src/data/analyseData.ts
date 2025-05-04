import { PublicationData } from '../components/Publication';

export const analyseIntroduction = `
L'analyse mathématique est une branche fondamentale des mathématiques qui s'intéresse aux notions de variation, de changement et de limite. Elle a émergé au XVIIe siècle avec les travaux de Newton et Leibniz sur le calcul infinitésimal, et s'est considérablement développée depuis.

L'analyse se distingue par son approche des processus continus et des approximations infinitésimales. Elle fournit les outils mathématiques nécessaires pour modéliser et comprendre de nombreux phénomènes physiques, biologiques et économiques.

Parmi les concepts fondamentaux de l'analyse, on trouve les notions de limite, de continuité, de dérivée et d'intégrale. Ces concepts permettent d'étudier le comportement des fonctions et des suites, ainsi que de résoudre des équations différentielles décrivant l'évolution de systèmes dynamiques.

L'analyse moderne comprend plusieurs branches spécialisées, comme l'analyse réelle, l'analyse complexe, l'analyse fonctionnelle, et l'analyse harmonique. Chacune de ces branches a ses propres méthodes et applications, mais toutes partagent un socle commun de concepts et de techniques.
`;

export const analyseTheorems = [
  {
    title: "Théorème de la valeur intermédiaire",
    statement: "\\text{Soit } f : [a, b] \\rightarrow \\mathbb{R} \\text{ une fonction continue et } y \\text{ un réel tel que } f(a) < y < f(b) \\text{ ou } f(b) < y < f(a). \\text{ Alors il existe } c \\in (a, b) \\text{ tel que } f(c) = y.",
    proof: "\\text{Supposons } f(a) < y < f(b) \\text{ (le cas } f(b) < y < f(a) \\text{ est similaire).} \\\\ \\text{Soit } A = \\{x \\in [a, b] : f(x) \\leq y\\}. \\text{ L'ensemble } A \\text{ est non vide (car } a \\in A \\text{) et majoré par } b. \\\\ \\text{Par le principe de la borne supérieure, posons } c = \\sup A. \\text{ Montrons que } f(c) = y. \\\\ \\text{Supposons } f(c) < y. \\text{ Par continuité de } f \\text{ en } c, \\text{ il existe } \\delta > 0 \\text{ tel que pour tout } x \\in [a, b] \\text{ avec } |x - c| < \\delta, \\text{ on a } f(x) < y. \\\\ \\text{Cela signifie que } c + \\min(\\delta, b-c)/2 \\in A, \\text{ ce qui contredit le fait que } c = \\sup A. \\\\ \\text{Supposons } f(c) > y. \\text{ Alors, par continuité, il existe } \\delta > 0 \\text{ tel que pour tout } x \\in [a, b] \\text{ avec } |x - c| < \\delta, \\text{ on a } f(x) > y. \\\\ \\text{Mais alors, pour tout } x \\in (c - \\delta, c) \\cap [a, b], \\text{ on a } x \\notin A, \\text{ donc } \\sup A \\leq c - \\delta < c, \\text{ contradiction.} \\\\ \\text{On a donc nécessairement } f(c) = y.",
    applications: [
      "Détermination des zéros d'une fonction",
      "Démonstration de l'existence de solutions pour des équations",
      "Étude de la continuité des fonctions inverses"
    ],
    year: "1817",
    author: "Bolzano"
  },
  {
    title: "Théorème des valeurs extrêmes",
    statement: "\\text{Soit } f : [a, b] \\rightarrow \\mathbb{R} \\text{ une fonction continue sur un intervalle fermé borné } [a, b]. \\text{ Alors } f \\text{ atteint ses bornes supérieure et inférieure sur } [a, b], \\text{ c'est-à-dire qu'il existe } c, d \\in [a, b] \\text{ tels que } f(c) \\leq f(x) \\leq f(d) \\text{ pour tout } x \\in [a, b].",
    applications: [
      "Optimisation de fonctions sur des domaines fermés bornés",
      "Démonstration de l'existence de solutions optimales en économie",
      "Preuve d'existence de valeurs propres en analyse spectrale"
    ],
    year: "1830",
    author: "Weierstrass"
  },
  {
    title: "Théorème fondamental du calcul",
    statement: "\\text{Soit } f : [a, b] \\rightarrow \\mathbb{R} \\text{ une fonction continue. Définissons la fonction } F : [a, b] \\rightarrow \\mathbb{R} \\text{ par } F(x) = \\int_a^x f(t) \\, dt. \\text{ Alors } F \\text{ est dérivable sur } [a, b] \\text{ et } F'(x) = f(x) \\text{ pour tout } x \\in [a, b].",
    proof: "\\text{Soit } x \\in [a, b] \\text{ et } h \\neq 0 \\text{ suffisamment petit pour que } x + h \\in [a, b]. \\text{ On a:} \\\\ \\frac{F(x+h) - F(x)}{h} = \\frac{1}{h}\\int_a^{x+h} f(t)\\,dt - \\frac{1}{h}\\int_a^{x} f(t)\\,dt = \\frac{1}{h}\\int_{x}^{x+h} f(t)\\,dt \\\\ \\text{Par le théorème de la moyenne intégrale, il existe } c \\in [x, x+h] \\text{ (ou } [x+h, x] \\text{ si } h < 0 \\text{) tel que } \\int_{x}^{x+h} f(t)\\,dt = f(c)(x+h-x) = f(c)\\cdot h \\\\ \\text{Donc, } \\frac{F(x+h) - F(x)}{h} = f(c) \\\\ \\text{Comme } f \\text{ est continue, lorsque } h \\to 0, \\text{ on a } c \\to x \\text{ et donc } f(c) \\to f(x). \\\\ \\text{Ainsi, } \\lim_{h \\to 0} \\frac{F(x+h) - F(x)}{h} = f(x), \\text{ ce qui prouve que } F'(x) = f(x).",
    applications: [
      "Calcul d'intégrales définies via les primitives",
      "Résolution d'équations différentielles",
      "Modélisation de phénomènes cumulatifs en physique"
    ],
    year: "1668",
    author: "Newton & Leibniz"
  },
  {
    title: "Théorème de Taylor",
    statement: "\\text{Soit } f : \\mathbb{R} \\rightarrow \\mathbb{R} \\text{ une fonction } n+1 \\text{ fois dérivable sur un intervalle contenant } a. \\text{ Alors pour tout } x \\text{ dans cet intervalle, il existe } \\xi \\text{ entre } a \\text{ et } x \\text{ tel que:} \\\\ f(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\ldots + \\frac{f^{(n)}(a)}{n!}(x-a)^n + \\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1}",
    applications: [
      "Approximation polynomiale de fonctions",
      "Analyse d'erreur en méthodes numériques",
      "Développements limités en analyse asymptotique",
      "Résolution approchée d'équations différentielles"
    ],
    year: "1715",
    author: "Brook Taylor"
  },
  {
    title: "Théorème de convergence monotone",
    statement: "\\text{Soit } (u_n)_{n \\in \\mathbb{N}} \\text{ une suite croissante et majorée de réels. Alors } (u_n) \\text{ converge et } \\lim_{n \\to \\infty} u_n = \\sup \\{u_n : n \\in \\mathbb{N}\\}.",
    applications: [
      "Étude de la convergence des séries à termes positifs",
      "Théorie de la mesure et intégration",
      "Analyse des algorithmes itératifs en optimisation"
    ],
    year: "19e siècle",
    author: "Cauchy & Weierstrass"
  }
];

export const publications: PublicationData[] = [
  {
    id: "pub1",
    title: "Analyse fonctionnelle et applications aux équations différentielles partielles",
    authors: "Martin, Sophie et Dupont, Jean",
    year: 2023,
    journal: "Revue Française d'Analyse Mathématique",
    abstract: "Cette étude examine les méthodes d'analyse fonctionnelle modernes appliquées aux équations différentielles partielles non linéaires. Nous démontrons comment les espaces de Sobolev et la théorie des opérateurs compacts peuvent être utilisés pour établir l'existence et l'unicité des solutions faibles pour une classe d'équations elliptiques.",
    link: "https://example.com/analyse-fonctionnelle",
    tags: ["Analyse fonctionnelle", "EDP", "Espaces de Sobolev", "Solutions faibles"]
  },
  {
    id: "pub2",
    title: "Nouvelles méthodes d'approximation numérique pour les équations différentielles stochastiques",
    authors: "Laurent, Claire",
    year: 2022,
    journal: "Journal de Mathématiques Appliquées",
    abstract: "Nous présentons un nouveau schéma numérique pour la résolution des équations différentielles stochastiques avec bruit multiplicatif. Notre méthode combine une approche par éléments finis stochastiques avec une technique de réduction de variance, permettant d'obtenir une convergence forte d'ordre supérieur par rapport aux méthodes existantes.",
    link: "https://example.com/eds-numerique",
    tags: ["Équations différentielles stochastiques", "Analyse numérique", "Éléments finis", "Convergence"]
  },
  {
    id: "pub3",
    title: "Sur la régularité des solutions d'équations elliptiques non linéaires à coefficients discontinus",
    authors: "Moreau, Thomas et Girard, Émilie",
    year: 2021,
    journal: "Comptes Rendus de l'Académie des Sciences",
    abstract: "Cette recherche établit de nouveaux résultats de régularité pour les solutions d'équations elliptiques non linéaires lorsque les coefficients présentent des discontinuités. En utilisant des techniques d'analyse microlocale et de décomposition en ondelettes, nous démontrons que les solutions appartiennent à des espaces de Besov optimaux.",
    link: "https://example.com/regularite-elliptique",
    tags: ["Équations elliptiques", "Régularité", "Coefficients discontinus", "Espaces de Besov"]
  },
  {
    id: "pub4",
    title: "Inégalités de concentration pour les processus stochastiques en grande dimension",
    authors: "Petit, Alexandre",
    year: 2023,
    abstract: "Nous développons de nouvelles inégalités de concentration pour les processus stochastiques en dimension élevée. Ces résultats généralisent les inégalités classiques de type Azuma-Hoeffding et permettent d'établir des bornes non asymptotiques pour l'erreur d'estimation dans divers problèmes statistiques et d'apprentissage automatique.",
    link: "https://example.com/inegalites-concentration",
    tags: ["Probabilités", "Inégalités de concentration", "Grande dimension", "Processus stochastiques"]
  },
  {
    id: "pub5",
    title: "Analyse harmonique non commutative et géométrie des espaces métriques",
    authors: "Bernard, Marie et Fischer, Paul",
    year: 2022,
    journal: "Annales de l'Institut Fourier",
    abstract: "Cet article établit des connexions entre l'analyse harmonique non commutative et la géométrie des espaces métriques. Nous étendons plusieurs résultats classiques de la théorie des opérateurs au cadre des espaces de courbure négative, et développons une théorie d'analyse spectrale adaptée à ces structures.",
    link: "https://example.com/harmonique-non-commutative",
    tags: ["Analyse harmonique", "Géométrie métrique", "Théorie des opérateurs", "Analyse spectrale"]
  }
];

export const comments = [
  {
    id: "c1",
    author: "Marie Dupont",
    date: "15 avril 2023",
    content: "Excellente explication du théorème de la valeur intermédiaire. J'aime particulièrement la démonstration par le principe de la borne supérieure, qui est très élégante.",
    likes: 5,
    replies: [
      {
        id: "c1r1",
        author: "Pierre Martin",
        date: "16 avril 2023",
        content: "Tout à fait d'accord ! On pourrait aussi mentionner son lien avec le théorème de Bolzano et ses applications en analyse numérique.",
        likes: 2
      }
    ]
  },
  {
    id: "c2",
    author: "Thomas Laurent",
    date: "12 avril 2023",
    content: "Je travaille actuellement sur les applications du théorème fondamental du calcul en physique quantique. Auriez-vous des références récentes sur ce sujet spécifique ?",
    likes: 3
  },
  {
    id: "c3",
    author: "Sophie Gauthier",
    date: "10 avril 2023",
    content: "La section sur l'analyse fonctionnelle pourrait être enrichie avec des exemples concrets en traitement du signal. Je serais heureux de contribuer à cette partie si vous êtes intéressés.",
    likes: 7,
    replies: [
      {
        id: "c3r1",
        author: "Admin",
        date: "11 avril 2023",
        content: "Merci pour votre proposition ! N'hésitez pas à soumettre un contenu via le formulaire dédié, nous serions ravis d'enrichir cette section.",
        likes: 1
      }
    ]
  }
];