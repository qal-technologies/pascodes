import {SITE_CONFIG, KEYWORD_PRICES, PROJECT_TYPE_MULTIPLIERS} from "./site-config";

interface BuildDetails {
  projectType: string;
  pages: number;
  description: string;
}

const VERBS: { [key: string]: string[] } = {
  "e-commerce": ["building", "creating", "constructing", "designing"],
  webapp: ["building", "creating", "developing", "engineering"],
  business: ["building", "creating", "designing", "establishing"],
  default: ["building", "creating", "making", "producing"],
};

export const estimatePrice = (build: BuildDetails) => {
  let price = SITE_CONFIG.pricing.basePrice;
  const priceBreakdown: { [key: string]: number } = {};

  // 1. Pages Cost
  const pagePrice = build.pages * SITE_CONFIG.pricing.pricePerPage;
  price += pagePrice;
  priceBreakdown[`${build.pages} Pages`] = pagePrice;

  // 2. Project Type Base Augmentation (Simulating specialized logic)
  // We apply a base add-on for specific complex types before multiplier
  let typeBase = 0;
  if(build.projectType === "e-commerce") typeBase = 1000;
  if(build.projectType === "webapp") typeBase = 800;

  if(typeBase > 0) {
    price += typeBase;
    priceBreakdown[`${build.projectType} Base Logic`] = typeBase;
  }

  // 3. Keyword Analysis
  const description = build.description.toLowerCase();
  let keywordCost = 0;
  const foundKeywords: string[] = [];

  for(const [keyword, cost] of Object.entries(KEYWORD_PRICES)) {
    // Check for whole word matches to avoid partial confusion (e.g. "car" in "cart")
    // Using a regex with word boundaries
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if(regex.test(description)) {
      // Did we already count this exact word? (Optional: allow duplicate concepts? No, normally once)
      if(!foundKeywords.includes(keyword)) {
        keywordCost += cost;
        priceBreakdown[`Feature: ${keyword}`] = cost;
        foundKeywords.push(keyword);
      }
    }
  }
  price += keywordCost;

  // 4. Complexity Multiplier (based on description length/detail + keyword density)
  // If user writes a very long detailed description, it likely implies more work.
  // We cap this multiplier to avoid crazy prices.
  let complexityMultiplier = 1.0;
  if(description.length > 200) complexityMultiplier += 0.1;
  if(description.length > 500) complexityMultiplier += 0.1;
  if(foundKeywords.length > 5) complexityMultiplier += 0.1;

  // 5. Project Type Multiplier (Use the Config)
  const typeMultiplier = PROJECT_TYPE_MULTIPLIERS[build.projectType] || 1.0;

  // Apply Multipliers to the current Subtotal
  // (We apply specific type multiplier to the whole, or just use it as a complexity factor?)
  // Let's use it as a factor on the *Keywords + TypeBase* part, preserving Page cost as mostly fixed,
  // OR apply to total. Applying to total makes sense for "E-commerce" needing more QA, PM, etc.

  // Total logic: (Base + Pages + TypeBase + Keywords) * Complexity * TypeMultiplier
  // But strictly, let's keep it additive for transparency + a final markup.

  // Let's just apply the TypeMultiplier to the END result for simplicity in business logic
  // "E-commerce is generally 50% harder than a basic portfolio"
  const preMultiplierPrice = price;
  price = price * typeMultiplier * complexityMultiplier;

  // Round to nearest 50
  price = Math.ceil(price / 50) * 50;

  // Show the markup in breakdown if significant
  const markup = price - preMultiplierPrice;
  if(markup > 0) {
    priceBreakdown["Complexity & Type Overhead"] = Math.round(markup);
  }

  const verb =
    VERBS[build.projectType]?.[
      Math.floor(Math.random() * VERBS[build.projectType].length)
    ] ||
    VERBS["default"][Math.floor(Math.random() * VERBS["default"].length)];

  return { price, priceBreakdown, verb };
};
