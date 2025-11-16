interface BuildDetails {
  projectType: string;
  pages: number;
  description: string;
}

const BASE_PRICE = 500; // Base price for any project
const PRICE_PER_PAGE = 100;

const KEYWORD_PRICES: { [key: string]: number } = {
  database: 500,
  email: 200, // Using a service like Twilio
  images: 100,
  videos: 200,
  "e-commerce": 1000,
  "payment processing": 500,
};

const VERBS: { [key: string]: string[] } = {
  "e-commerce": ["building", "creating", "constructing", "designing"],
  webapp: ["building", "creating", "developing", "engineering"],
  business: ["building", "creating", "designing", "establishing"],
  default: ["building", "creating", "making", "producing"],
};

export const estimatePrice = (build: BuildDetails) => {
  let price = BASE_PRICE;
  const priceBreakdown: { [key: string]: number } = {};

  // Price per page
  const pagePrice = build.pages * PRICE_PER_PAGE;
  price += pagePrice;
  priceBreakdown[`${build.pages} pages`] = pagePrice;

  // Price based on project type
  switch (build.projectType) {
    case "e-commerce":
      price += 2000;
      priceBreakdown["E-commerce functionality"] = 2000;
      break;
    case "webapp":
      price += 1500;
      priceBreakdown["Web app functionality"] = 1500;
      break;
    case "business":
      price += 500;
      priceBreakdown["Business website features"] = 500;
      break;
    default:
      price += 0;
  }

  // Price based on keywords in description
  const description = build.description.toLowerCase();
  for (const keyword in KEYWORD_PRICES) {
    if (description.includes(keyword)) {
      price += KEYWORD_PRICES[keyword];
      priceBreakdown[keyword] = KEYWORD_PRICES[keyword];
    }
  }

  const verb =
    VERBS[build.projectType]?.[
      Math.floor(Math.random() * VERBS[build.projectType].length)
    ] ||
    VERBS["default"][Math.floor(Math.random() * VERBS["default"].length)];

  return { price, priceBreakdown, verb };
};
