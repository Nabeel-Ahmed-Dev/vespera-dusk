/** Placeholder copy + asset paths for Vespera Dusk. Single source until content is finalized. */

export type NavLink = {
  label: string;
  href: string;
};

export type StoryStat = {
  value: string;
  label: string;
};

export type ScentNoteTier = {
  roman: string;
  phase: "Top" | "Heart" | "Base";
  timing: string;
  title: string;
  notes: string[];
};

export type CraftDetail = {
  number: string;
  title: string;
  description: string;
};

export type PressLogo = {
  name: string;
};

export type Review = {
  quote: string;
  author: string;
  meta: string;
  stars: number;
};

export type OfferSize = {
  id: "50ml" | "100ml";
  volume: string;
  price: number;
  priceLabel: string;
  perMl: string;
  badge?: string;
  selected?: boolean;
};

export type GuaranteeItem = {
  title: string;
  detail: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FooterLinkGroup = {
  links: { label: string; href: string }[];
};

export type SiteImage = {
  src: string;
  alt: string;
};

export type SiteContent = {
  brand: {
    name: string;
    product: string;
    edition: string;
  };
  meta: {
    title: string;
    description: string;
  };
  images: {
    bottleTilt: SiteImage;
    bottleDark: SiteImage;
    darkAmber: SiteImage;
    goldFlat: SiteImage;
    labelClose: SiteImage;
    topdown: SiteImage;
  };
  nav: {
    logo: string;
    links: NavLink[];
    bag: string;
    shopCta: string;
  };
  hero: {
    eyebrow: string;
    metaLeft: string;
    metaRight: string;
    metaVertical: string;
    wordmark: string;
    editionMark: string;
    tagline: string;
    description: string;
    cta: string;
    stock: string;
    discover: string;
    perks: string;
    scrollHint: string;
  };
  story: {
    label: string;
    aside: string;
    headline: string;
    headlineItalic: string;
    headlineRest: string;
    body: string;
    attribution: string;
    figCaption: string;
    badgeEdition: string;
    badgeLabel: string;
    stats: StoryStat[];
  };
  scentPyramid: {
    label: string;
    headline: string;
    headlineItalic: string;
    body: string;
    disclaimer: string;
    tiers: ScentNoteTier[];
  };
  craft: {
    label: string;
    headline: string;
    headlineItalic: string;
    body: string;
    details: CraftDetail[];
  };
  socialProof: {
    label: string;
    quote: string;
    quoteAttribution: string;
    press: PressLogo[];
    rating: number;
    ratingLabel: string;
    reviews: Review[];
    disclaimer: string;
  };
  offer: {
    label: string;
    batchBadge: string;
    figCaption: string;
    title: string;
    subtitle: string;
    price: number;
    compareAt: number;
    compareAtLabel: string;
    saveBadge: string;
    sizeLabel: string;
    sizes: OfferSize[];
    sample: string;
    cta: string;
    payments: string;
    stockPercent: number;
    stockClaimed: string;
    stockLeft: string;
    perks: string[];
  };
  guarantee: {
    items: GuaranteeItem[];
  };
  faq: {
    label: string;
    headline: string;
    headlineItalic: string;
    items: FaqItem[];
  };
  finalCta: {
    label: string;
    headline: string;
    headlineItalic: string;
    primaryCta: string;
    secondaryCta: string;
  };
  footer: {
    newsletterTitle: string;
    newsletterBody: string;
    emailPlaceholder: string;
    subscribe: string;
    linkGroups: FooterLinkGroup[];
    logo: string;
    copyright: string;
  };
  stickyBuy: {
    title: string;
    detail: string;
    cta: string;
  };
};

export const site: SiteContent = {
  brand: {
    name: "Vespera",
    product: "Dusk #01",
    edition: "N° 01",
  },
  meta: {
    title: "Vespera Dusk N° 01",
    description:
      "An amber eau de parfum of saffron, smoked rose and warm oud. Composed for the last light of the day.",
  },
  images: {
    bottleTilt: {
      src: "/images/bottle_tilt_cutout.png",
      alt: "Dusk #01 bottle",
    },
    bottleDark: {
      src: "/images/bottle_dark_cutout.png",
      alt: "Dusk #01",
    },
    darkAmber: {
      src: "/images/img_dark_amber.png",
      alt: "",
    },
    goldFlat: {
      src: "/images/img_gold_flat.jpg",
      alt: "",
    },
    labelClose: {
      src: "/images/img_label_close.png",
      alt: "",
    },
    topdown: {
      src: "/images/img_topdown.png",
      alt: "",
    },
  },
  nav: {
    logo: "VESPERA",
    links: [
      { label: "The Scent", href: "#story" },
      { label: "Notes", href: "#notes" },
      { label: "The Vessel", href: "#vessel" },
      { label: "Reviews", href: "#reviews" },
    ],
    bag: "Bag (0)",
    shopCta: "Shop Dusk — $185",
  },
  hero: {
    eyebrow: "Eau de parfum — N° 01 — First edition",
    metaLeft: "Eau de Parfum — 100 ml",
    metaRight: "N° 01 — First edition",
    metaVertical: "18:47 — Golden hour, Grasse",
    wordmark: "DUSK",
    editionMark: "# 01",
    tagline: "The hour when gold turns to night — bottled.",
    description:
      "An amber eau de parfum of saffron, smoked rose and warm oud. Composed for the last light of the day.",
    cta: "Add to bag — $185",
    stock: "347 of 1,200 Batch 01 bottles left",
    discover: "Discover Dusk ↓",
    perks: "Free shipping · 30-day wear test · Free 2 ml sample",
    scrollHint: "( Scroll to descend )",
  },
  story: {
    label: "( 01 ) The story",
    aside: "An hour, not a scent",
    headline: "There is an hour ",
    headlineItalic: "between day and night,",
    headlineRest: " when everything turns to gold.",
    body: "Dusk #01 began as a single memory: a stone terrace in Grasse, still warm from the day, the sky burning from honey to violet. We spent two years trying to hold that minute still.",
    attribution: "— Élise Marchand, Perfumer (fictional)",
    figCaption: "Fig. 01 — The last light, 18:47",
    badgeEdition: "N° 01",
    badgeLabel: "First edition",
    stats: [
      { value: "18:47", label: "The minute it was composed for" },
      { value: "22%", label: "Extrait-level concentration" },
      { value: "12h+", label: "First light to last" },
    ],
  },
  scentPyramid: {
    label: "( 02 ) The composition",
    headline: "Composed in ",
    headlineItalic: "three movements.",
    body: "Gilded at first spray, molten at its heart, and finally as deep as the night that follows.",
    disclaimer: "Notes shown are a design concept — final formula TBC",
    tiers: [
      {
        roman: "I",
        phase: "Top",
        timing: "0 to 15 min",
        title: "The First Light",
        notes: ["Calabrian Bergamot", "Saffron", "Pink Pepper"],
      },
      {
        roman: "II",
        phase: "Heart",
        timing: "15 min to 4 h",
        title: "The Golden Hour",
        notes: ["Turkish Rose", "Jasmine Sambac", "Labdanum"],
      },
      {
        roman: "III",
        phase: "Base",
        timing: "4 h to dawn",
        title: "The Night",
        notes: ["Oud", "Ambergris Accord", "Madagascar Vanilla", "Tonka"],
      },
    ],
  },
  craft: {
    label: "( 03 ) The vessel",
    headline: "Cut like crystal. ",
    headlineItalic: "Weighted like a promise.",
    body: "Heavy faceted glass, a hand-cut stopper that catches light like the sun's last edge, and a label applied by hand.",
    details: [
      {
        number: "01",
        title: "Faceted crystal stopper",
        description: "Hand-cut, 24 facets.",
      },
      {
        number: "02",
        title: "380 g weighted base",
        description: "Substantial in the hand.",
      },
      {
        number: "03",
        title: "Numbered by hand",
        description: "Each Batch 01 bottle, 1–1,200.",
      },
      {
        number: "04",
        title: "Made to be refilled",
        description: "100 ml refills at 30% less.",
      },
    ],
  },
  socialProof: {
    label: "( 04 ) Worn at dusk",
    quote: "“Smells like the last warm minute of summer.”",
    quoteAttribution: "— Beauty editor, Vogue (placeholder)",
    press: [
      { name: "VOGUE" },
      { name: "ELLE" },
      { name: "GQ" },
      { name: "Wallpaper*" },
    ],
    rating: 4.9,
    ratingLabel: "from 2,184 verified reviews",
    reviews: [
      {
        quote:
          "“I get stopped every single evening. Expensive, but warm — never loud.”",
        author: "Amira K.",
        meta: "Verified buyer",
        stars: 5,
      },
      {
        quote:
          "“Started with the sample. Bought the full bottle the next day.”",
        author: "Sofia M.",
        meta: "Verified buyer",
        stars: 5,
      },
    ],
    disclaimer: "All quotes, names, ratings & press are placeholders",
  },
  offer: {
    label: "( 05 ) Make it yours",
    batchBadge: "● Batch 01 — hand-numbered",
    figCaption: "Fig. 03 — Dusk #01, 100 ml",
    title: "Dusk #01",
    subtitle: "Eau de Parfum · ★★★★★ 4.9 (2,184)",
    price: 185,
    compareAt: 240,
    compareAtLabel: "$240",
    saveBadge: "Launch price — save $55",
    sizeLabel: "Size",
    sizes: [
      {
        id: "50ml",
        volume: "50 ml",
        price: 125,
        priceLabel: "$125",
        perMl: "$2.50 / ml",
      },
      {
        id: "100ml",
        volume: "100 ml",
        price: 185,
        priceLabel: "$185",
        perMl: "$1.85 / ml · best value",
        badge: "Most chosen",
        selected: true,
      },
    ],
    sample:
      "Not sure yet? Try the 2 ml vial first — $8, credited to your bottle.",
    cta: "Add to bag — $185 →",
    payments: "or 4 interest-free payments of $46.25",
    stockPercent: 71,
    stockClaimed: "71% claimed",
    stockLeft: "347 of 1,200 left",
    perks: [
      "✓ Free express shipping",
      "✓ 30-day Dusk Promise — full refund",
      "✓ Complimentary engraving & gift box",
    ],
  },
  guarantee: {
    items: [
      {
        title: "Free express shipping",
        detail: "every order",
      },
      {
        title: "30-day Dusk Promise",
        detail: "full refund",
      },
      {
        title: "Sample first",
        detail: "credited to your bottle",
      },
    ],
  },
  faq: {
    label: "( 06 ) Before you decide",
    headline: "Questions, ",
    headlineItalic: "answered.",
    items: [
      {
        question: "How long does it last?",
        answer: "Around 10–12 hours on skin and longer on fabric.",
      },
      {
        question: "What if it isn't for me?",
        answer:
          "Wear it for up to 30 days under the Dusk Promise. If it isn't your hour, return it for a full refund — no questions asked.",
      },
      {
        question: "Can I try it first?",
        answer:
          "Yes. Start with the 2 ml Discovery vial for $8 — fully credited when you buy a full bottle.",
      },
      {
        question: "Is it unisex?",
        answer:
          "Yes. Dusk #01 was composed without a gendered brief — an amber hour meant to be worn by anyone.",
      },
    ],
  },
  finalCta: {
    label: "( 07 ) The last light is limited",
    headline: "Wear",
    headlineItalic: "the hour.",
    primaryCta: "Claim your bottle — $185 →",
    secondaryCta: "Try the sample — $8",
  },
  footer: {
    newsletterTitle: "Join the Night List",
    newsletterBody: "First access to Batch 02 and 10% off your first order.",
    emailPlaceholder: "your@email.com",
    subscribe: "Subscribe →",
    linkGroups: [
      {
        links: [
          { label: "Dusk #01", href: "#offer" },
          { label: "Discovery vial", href: "#offer" },
          { label: "Refills", href: "#vessel" },
        ],
      },
      {
        links: [
          { label: "Our story", href: "#story" },
          { label: "Shipping", href: "#faq" },
          { label: "Contact", href: "#footer" },
        ],
      },
    ],
    logo: "VESPERA",
    copyright: "© 2026 Vespera Parfums — concept design",
  },
  stickyBuy: {
    title: "Dusk #01",
    detail: "100 ml · $185",
    cta: "Add to bag",
  },
};
