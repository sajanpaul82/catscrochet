const PRODUCT_STORAGE_KEY = "loopLittleProducts";

const CATEGORY_LABELS = {
  amigurumi: "Amigurumi(Plushies)",
  accessories: "Accessories",
  decor: "Decor"
};

const CATEGORY_MIGRATIONS = {
  plush: "amigurumi",
  wear: "accessories",
  home: "decor"
};

const DEFAULT_PRODUCTS = [
  {
    id: "bouquet",
    name: "Bouquet",
    price: 10,
    originalPrice: "12",
    category: "amigurumi",
    image: "assets/bouquet.jpg",
    description: "Bouquet",
    offer: "Kids Bazar",
    status: "Made on request"
  },  
  {
    id: "cow",
    name: "Cow",
    price: 3,
    originalPrice: "12",
    category: "amigurumi",
    image: "assets/cow.jpg",
    description: "Cow",
    offer: "Kids Bazar",
    status: "Made on request"
  },

  {
    id: "honeybee",
    name: "Honey Bee",
    price: 3,
    originalPrice: "12",
    category: "amigurumi",
    image: "assets/honey_bee.jpg",
    description: "Honey Bee",
    offer: "Kids Bazar",
    status: "Made on request"
  },
  {
    id: "NormalScrunchie",
    name: "Normal Scrunchie",
    price: 3,
    originalPrice: 8,
    category: "accessories",
    image: "assets/normal-scrunchie.svg",
    description: "Normal Scrunchie",
    offer: "Kids Bazar ",
    status: "Made on request"
  },
  {
    id: "normaloctopus",
    name: "Normal Octopus",
    price: 3,
    originalPrice: "10",
    category: "amigurumi",
    image: "assets/normal-octopus.svg",
    description: "Normal Octopus",
    offer: "Kids Bazar",
    status: "Made on request"
  },
  {
    id: "bluewhale",
    name: "Blue Whale",
    price: 3,
    originalPrice: "12",
    category: "amigurumi",
    image: "assets/blue_whale.jpg",
    description: "Blue Whale",
    offer: "Kids Bazar",
    status: "Made on request"
  },
  {
    id: "plushscrunchies",
    name: "Plush Scrunchies",
    price: 3,
    originalPrice: "9",
    category: "amigurumi",
    image: "assets/plush-scrunchie.svg",
    description: "Plush Scrunchies",
    offer: "Kids Bazar",
    status: "Made on request"
  },
  {
    id: "conchkeychain",
    name: "Conch Key Chain",
    price: 3,
    originalPrice: "9",
    category: "accessories",
    image: "assets/conch-shell.jpg",
    description: "Conch Key Chain",
    offer: "Kids Bazar",
    status: "Made on request"
  },
  {
    id: "cherrykeychain",
    name: "Cherry Key Chain",
    price: 3,
    originalPrice: "6",
    category: "accessories",
    image: "assets/cherry-chain.svg",
    description: "Cherry Key Chain",
    offer: "Kids Bazar",
    status: "Made on request"
  },
  {
    id: "StrawberryCow",
    name: "Strawberry Cow",
    price: 3,
    originalPrice: "12",
    category: "amigurumi",
    image: "assets/strawberry-cow.svg",
    description: "Strawberry Cow",
    offer: "Kids Bazar",
    status: "Made on request"
  },
  {
    id: "StartFishChain",
    name: "Start Fish Key Chain",
    price: 3,
    originalPrice: "5",
    category: "accessories",
    image: "assets/star-fish-keychain.svg",
    description: "Star Fish Key Chain",
    offer: "Kids Bazar",
    status: "Made on request"
  },
  {
    id: "smileykeychain",
    name: "Smiley Key Chain",
    price: 3,
    originalPrice: "8",
    category: "accessories",
    image: "assets/smiley-keychain.svg",
    description: "Smiley Key Chain",
    offer: "Kids Bazar",
    status: "Made on request"
  },
  {
    id: "plushoctopus",
    name: "Plush Octopus",
    price: 3,
    originalPrice: "10",
    category: "amigurumi",
    image: "assets/plush-octopus.svg",
    description: "Plush Octopus",
    offer: "Kids Bazar",
    status: "Made on request"
  },
  {
    id: "strawberryfruit",
    name: "Strawberry Fruit",
    price: 3,
    originalPrice: "9",
    category: "amigurumi",
    image: "assets/strawberry-fruit.svg",
    description: "Strawberry Fruit",
    offer: "Kids Bazar",
    status: "Made on request"
  }
];

function normalizeProduct(product) {
  const category = CATEGORY_MIGRATIONS[product.category] || product.category || "decor";

  return {
    id: product.id || `product-${Date.now()}`,
    name: product.name || "Untitled Item",
    price: Number(product.price) || 0,
    originalPrice: product.originalPrice ? Number(product.originalPrice) : "",
    category: CATEGORY_LABELS[category] ? category : "decor",
    image: product.image || "assets/product-plush.svg",
    description: product.description || "",
    offer: product.offer || "",
    status: product.status || "Made on request"
  };
}

function categoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}

function loadProducts() {
  try {
    const saved = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!saved) return DEFAULT_PRODUCTS.map(normalizeProduct);
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizeProduct) : DEFAULT_PRODUCTS.map(normalizeProduct);
  } catch (error) {
    return DEFAULT_PRODUCTS.map(normalizeProduct);
  }
}

function saveProducts(products) {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products.map(normalizeProduct)));
}

function resetProducts() {
  saveProducts(DEFAULT_PRODUCTS);
  return loadProducts();
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}
