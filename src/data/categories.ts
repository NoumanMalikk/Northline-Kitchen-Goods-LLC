export const categories = [
  {
    id: "cookware",
    name: "Cookware",
    slug: "cookware",
    href: "/collections/cookware",
    description: "Vessel shapes organized by cooking process and technique.",
    subcategories: [
      { name: "Fry Pans and Skillets", slug: "fry-pans-skillets", href: "/collections/fry-pans-skillets" },
      { name: "Saucepans and Sauciers", slug: "saucepans-sauciers", href: "/collections/saucepans-sauciers" },
      { name: "Sauté Pans and Braisers", slug: "saute-pans-braisers", href: "/collections/saute-pans-braisers" },
      { name: "Stockpots and Inserts", slug: "stockpots-inserts", href: "/collections/stockpots-inserts" },
      { name: "Woks and Griddles", slug: "woks-griddles", href: "/collections/woks-griddles" },
      { name: "Specialty Cookware", slug: "specialty-cookware", href: "/collections/cookware?sub=specialty" },
    ],
  },
  {
    id: "bake-roast",
    name: "Bake and Roast",
    slug: "bake-roast",
    href: "/collections/bake-roast",
    description: "Roasting pans, sheet pans, baking pans, and pizza tools.",
    subcategories: [
      { name: "Roasting Pans", slug: "roasting-pans", href: "/collections/bake-roast?sub=roasting" },
      { name: "Sheet Pans and Racks", slug: "sheet-pans", href: "/collections/bake-roast?sub=sheet" },
      { name: "Baking Pans", slug: "baking-pans", href: "/collections/bake-roast?sub=baking" },
      { name: "Pizza Tools", slug: "pizza-tools", href: "/collections/bake-roast?sub=pizza" },
    ],
  },
  {
    id: "prep-tools",
    name: "Prep Tools",
    slug: "prep-tools",
    href: "/collections/prep-tools",
    description: "Mixing, draining, measuring, slicing, and bench tools.",
    subcategories: [
      { name: "Mixing Bowls", slug: "mixing-bowls", href: "/collections/prep-tools?sub=mixing" },
      { name: "Colanders and Strainers", slug: "colanders", href: "/collections/prep-tools?sub=colanders" },
      { name: "Measuring Tools", slug: "measuring", href: "/collections/prep-tools?sub=measuring" },
      { name: "Mandoline and Slicing Tools", slug: "mandoline", href: "/collections/prep-tools?sub=mandoline" },
      { name: "Bench and Dough Tools", slug: "bench", href: "/collections/prep-tools?sub=bench" },
    ],
  },
  {
    id: "utensils",
    name: "Utensils",
    slug: "utensils",
    href: "/collections/utensils",
    description: "Turners, tongs, ladles, spoons, and precision tools.",
    subcategories: [
      { name: "Spatulas and Turners", slug: "turners", href: "/collections/utensils?sub=turners" },
      { name: "Tongs", slug: "tongs", href: "/collections/utensils?sub=tongs" },
      { name: "Ladles and Spoons", slug: "ladles", href: "/collections/utensils?sub=ladles" },
      { name: "Precision Tools", slug: "precision", href: "/collections/utensils?sub=precision" },
    ],
  },
  {
    id: "cutlery",
    name: "Cutlery",
    slug: "cutlery",
    href: "/collections/cutlery",
    description: "Chef knives, prep knives, shears, and knife care.",
    subcategories: [
      { name: "Chef Knives", slug: "chef-knives", href: "/collections/cutlery?sub=chef" },
      { name: "Prep Knives", slug: "prep-knives", href: "/collections/cutlery?sub=prep" },
      { name: "Kitchen Shears", slug: "shears", href: "/collections/cutlery?sub=shears" },
      { name: "Knife Care", slug: "knife-care", href: "/knife-use-care" },
    ],
  },
  {
    id: "flatware",
    name: "Flatware",
    slug: "flatware",
    href: "/collections/flatware",
    description: "Place settings and table tools for the final line to the table.",
    subcategories: [
      { name: "Flatware Sets", slug: "sets", href: "/collections/flatware" },
      { name: "Serving Utensils", slug: "serving", href: "/collections/utensils?sub=ladles" },
      { name: "Table Tools", slug: "table", href: "/collections/flatware" },
    ],
  },
] as const;

export const collectionFilters: Record<
  string,
  { title: string; description: string; match: (category: string, subcategory: string, sku: string) => boolean }
> = {
  cookware: {
    title: "Cookware",
    description: "Vessel shapes for heat, stir, turn, pour, and braise.",
    match: (c) => c === "Cookware" || c === "Specialty Cookware",
  },
  "fry-pans-skillets": {
    title: "Fry Pans and Skillets",
    description: "Low-wall and deep skillet forms for sear and sauté.",
    match: (_c, s, sku) => s.includes("Fry") || s.includes("Skillet") || sku === "NKG-CWK-001" || sku === "NKG-CWK-002",
  },
  "saucepans-sauciers": {
    title: "Saucepans and Sauciers",
    description: "Rounded and spouted vessels for simmer, reduce, and pour.",
    match: (_c, s) => s.includes("Saucepan") || s.includes("Saucier"),
  },
  "saute-pans-braisers": {
    title: "Sauté Pans and Braisers",
    description: "Wide pans and low braisers for sauté and braise work.",
    match: (_c, s) => s.includes("Sauté") || s.includes("Braiser") || s.includes("Saute"),
  },
  "stockpots-inserts": {
    title: "Stockpots and Inserts",
    description: "Tall vessels and fitted inserts for boil and drain.",
    match: (_c, s) => s.includes("Stockpot"),
  },
  "woks-griddles": {
    title: "Woks and Griddles",
    description: "Curved and flat carbon-steel heat surfaces.",
    match: (_c, s) => s.includes("Wok") || s.includes("Griddle"),
  },
  "bake-roast": {
    title: "Bake and Roast",
    description: "Roasting pans, sheet pans, baking pans, and pizza tools.",
    match: (c) => c === "Bake and Roast",
  },
  "prep-tools": {
    title: "Prep Tools",
    description: "Mixing, draining, measuring, slicing, and bench tools.",
    match: (c) => c === "Prep Tools" || c === "Measuring Tools",
  },
  utensils: {
    title: "Utensils",
    description: "Tools for turn, stir, lift, and serve motions.",
    match: (c) => c === "Utensils",
  },
  cutlery: {
    title: "Cutlery",
    description: "Knives and shears for cut and portion stages.",
    match: (c) => c === "Cutlery",
  },
  flatware: {
    title: "Flatware",
    description: "Place settings that complete the line from kitchen to table.",
    match: (c) => c === "Flatware",
  },
};
