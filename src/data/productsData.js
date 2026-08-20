import p1 from "../assets/product1.png";
import p2 from "../assets/product2.png";
import p3 from "../assets/product3.png";
import p4 from "../assets/product4.png";
import p5 from "../assets/product5.png";
import p6 from "../assets/product6.png";
import p7 from "../assets/product7.png";
import p8 from "../assets/product8.png";
import p9 from "../assets/product9.png";
import img9 from "../assets/image (9).png";
import img11 from "../assets/image (11).png";
import img12 from "../assets/image (12).png";

/**
 * FASCO Central Product Catalog
 * Specialized for Men & Women Clothing and Fashion Accessories Store.
 */
export const ALL_PRODUCTS = [
  // ==========================================
  // 1. FASHION (5 Items)
  // ==========================================
  {
    id: "fash-1",
    name: "Peaky Blinders Vintage Suit Set",
    price: 100.0,
    originalPrice: 150.0,
    discount: 33,
    image: img9,
    gallery: [img9],
    rating: 5.0,
    reviewCount: 48,
    category: "Fashion",
    brand: "FASCO",
    size: "M",
    sizes: ["S", "M", "L", "XL"],
    color: "#111111",
    colors: [{ name: "Black", hex: "#111111" }, { name: "Grey", hex: "#4b5563" }],
    collection: "New arrivals",
    tags: ["Fashion", "Vintage", "Suit", "Men"],
    description: "Iconic handwoven vintage-tailored wool blend suit set inspired by timeless retro aesthetics."
  },
  {
    id: "fash-2",
    name: "Glossy Black Leather Jacket",
    price: 89.0,
    originalPrice: 135.0,
    discount: 34,
    image: p8,
    gallery: [p8],
    rating: 4.9,
    reviewCount: 32,
    category: "Fashion",
    brand: "FASCO",
    size: "M",
    sizes: ["S", "M", "L"],
    color: "#111111",
    colors: [{ name: "Black", hex: "#111111" }],
    collection: "Best sellers",
    tags: ["Fashion", "Leather", "Jacket", "Women"],
    description: "High-shine tailored patent leather moto jacket with statement collar and gold hardware accents."
  },
  {
    id: "fash-3",
    name: "Mustard Longline Wool Trench Coat",
    price: 95.0,
    originalPrice: 140.0,
    discount: 32,
    image: img11,
    gallery: [img11],
    rating: 4.9,
    reviewCount: 26,
    category: "Fashion",
    brand: "FASCO",
    size: "L",
    sizes: ["M", "L", "XL"],
    color: "#ca8a04",
    colors: [{ name: "Mustard", hex: "#ca8a04" }, { name: "Camel", hex: "#b45309" }],
    collection: "New arrivals",
    tags: ["Fashion", "Coat", "Outerwear", "Men"],
    description: "Premium wool blend tailored longline overcoat with notched lapels and fluid drape."
  },
  {
    id: "fash-4",
    name: "Grey Wool Oversized Blazer",
    price: 75.0,
    originalPrice: 110.0,
    discount: 32,
    image: img12,
    gallery: [img12],
    rating: 4.8,
    reviewCount: 19,
    category: "Fashion",
    brand: "Brook",
    size: "M",
    sizes: ["S", "M", "L"],
    color: "#4b5563",
    colors: [{ name: "Charcoal Grey", hex: "#4b5563" }],
    collection: "All products",
    tags: ["Fashion", "Blazer", "Women"],
    description: "Contemporary relaxed oversized structured blazer jacket in rich melange wool."
  },
  {
    id: "fash-5",
    name: "Polka Dot Long Dress",
    price: 45.0,
    originalPrice: 70.0,
    discount: 36,
    image: p9,
    gallery: [p9],
    rating: 4.7,
    reviewCount: 37,
    category: "Fashion",
    brand: "Minimo",
    size: "S",
    sizes: ["XS", "S", "M", "L"],
    color: "#111111",
    colors: [{ name: "Black Polka", hex: "#111111" }],
    collection: "Best sellers",
    tags: ["Fashion", "Dress", "Women"],
    description: "Chic chiffon maxi dress with long balloon sleeves, ruffled collar, and classic polka dot pattern."
  },

  // ==========================================
  // 2. WOMEN (5 Items)
  // ==========================================
  {
    id: "women-1",
    name: "Denim Jacket",
    price: 39.0,
    originalPrice: 59.0,
    discount: 33,
    image: p6,
    gallery: [p6],
    rating: 5.0,
    reviewCount: 3,
    category: "Women",
    brand: "FASCO",
    size: "M",
    sizes: ["M", "L", "XL"],
    color: "#ef4444",
    colors: [{ name: "Red", hex: "#ef4444" }, { name: "Black", hex: "#111111" }, { name: "Blue", hex: "#38bdf8" }],
    collection: "New arrivals",
    tags: ["Fashion", "Jacket", "Women"],
    description: "Signature FASCO relaxed-fit jacket with brass buttons and classic tailored collar as seen in promo."
  },
  {
    id: "women-2",
    name: "Long Sleeve Blazer Coat",
    price: 56.0,
    originalPrice: 89.0,
    discount: 37,
    image: p3,
    gallery: [p3],
    rating: 4.5,
    reviewCount: 24,
    category: "Women",
    brand: "Brook",
    size: "M",
    sizes: ["S", "M", "L", "XL"],
    color: "#111827",
    colors: [{ name: "Charcoal", hex: "#111827" }],
    collection: "New arrivals",
    tags: ["Fashion", "Coat", "Women"],
    description: "Elegant tailored blazer style coat featuring deep front pockets and silk lined sleeves."
  },
  {
    id: "women-3",
    name: "Black Button-Down Shirt & Denim",
    price: 35.0,
    originalPrice: 50.0,
    discount: 30,
    image: p2,
    gallery: [p2],
    rating: 4.6,
    reviewCount: 19,
    category: "Women",
    brand: "Retablo",
    size: "M",
    sizes: ["S", "M", "L"],
    color: "#111827",
    colors: [{ name: "Black", hex: "#111827" }],
    collection: "Best sellers",
    tags: ["Fashion", "Shirt", "Women"],
    description: "Classic fitted black cotton button-down shirt paired with washed denim styling."
  },
  {
    id: "women-4",
    name: "Black Corset Top & Fedora",
    price: 42.0,
    originalPrice: 65.0,
    discount: 35,
    image: p5,
    gallery: [p5],
    rating: 4.8,
    reviewCount: 14,
    category: "Women",
    brand: "Minimo",
    size: "S",
    sizes: ["XS", "S", "M"],
    color: "#111827",
    colors: [{ name: "Black", hex: "#111827" }],
    collection: "New arrivals",
    tags: ["Fashion", "Top", "Women"],
    description: "Satin sweetheart corset top with peplum hem detailing and sweetheart neckline."
  },
  {
    id: "women-5",
    name: "Plaid Crop Flannel Shirt",
    price: 28.0,
    originalPrice: 42.0,
    discount: 33,
    image: p7,
    gallery: [p7],
    rating: 4.7,
    reviewCount: 18,
    category: "Women",
    brand: "Brook",
    size: "S",
    sizes: ["XS", "S", "M", "L"],
    color: "#ef4444",
    colors: [{ name: "Red Plaid", hex: "#ef4444" }],
    collection: "Best sellers",
    tags: ["Fashion", "Shirt", "Women"],
    description: "Tied-front cropped flannel long-sleeve shirt crafted from soft brushed cotton."
  },

  // ==========================================
  // 3. MEN (5 Items)
  // ==========================================
  {
    id: "men-1",
    name: "Men's Mustard Longline Overcoat",
    price: 89.0,
    originalPrice: 140.0,
    discount: 36,
    image: img11,
    gallery: [img11],
    rating: 4.9,
    reviewCount: 27,
    category: "Men",
    brand: "FASCO",
    size: "L",
    sizes: ["M", "L", "XL"],
    color: "#ca8a04",
    colors: [{ name: "Mustard", hex: "#ca8a04" }, { name: "Camel", hex: "#b45309" }],
    collection: "New arrivals",
    tags: ["Men", "Coat", "Outerwear"],
    description: "Sophisticated wool blend trench overcoat with minimal clean silhouette for modern men."
  },
  {
    id: "men-2",
    name: "Linen-Blend Summer Shirt",
    price: 24.0,
    originalPrice: 38.0,
    discount: 37,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80"
    ],
    rating: 4.5,
    reviewCount: 22,
    category: "Men",
    brand: "Retablo",
    size: "L",
    sizes: ["M", "L", "XL"],
    color: "#facc15",
    colors: [{ name: "Yellow", hex: "#facc15" }, { name: "White", hex: "#ffffff" }],
    collection: "Best sellers",
    tags: ["Men", "Shirt"],
    description: "Breathable airy linen-blend button down shirt designed for cool comfort all day."
  },
  {
    id: "men-3",
    name: "Classic Heavyweight Cotton Tee",
    price: 18.0,
    originalPrice: 28.0,
    discount: 35,
    image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 45,
    category: "Men",
    brand: "Brook",
    size: "XL",
    sizes: ["M", "L", "XL", "XXL"],
    color: "#ffffff",
    colors: [{ name: "White", hex: "#ffffff" }, { name: "Black", hex: "#111111" }],
    collection: "All products",
    tags: ["Men", "T-Shirt"],
    description: "Durable combed organic cotton streetwear crewneck tee with reinforced collar seam."
  },
  {
    id: "men-4",
    name: "Classic Denim Trucker Jacket",
    price: 65.0,
    originalPrice: 95.0,
    discount: 31,
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 38,
    category: "Men",
    brand: "FASCO",
    size: "M",
    sizes: ["S", "M", "L", "XL"],
    color: "#2563eb",
    colors: [{ name: "Blue Denim", hex: "#2563eb" }],
    collection: "Best sellers",
    tags: ["Men", "Jacket", "Denim"],
    description: "Rugged rigid denim jacket with dual chest flap pockets and adjustable button waist tabs."
  },
  {
    id: "men-5",
    name: "Casual Slim-Fit Chino Pants",
    price: 34.0,
    originalPrice: 50.0,
    discount: 32,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"
    ],
    rating: 4.6,
    reviewCount: 21,
    category: "Men",
    brand: "Minimo",
    size: "32",
    sizes: ["30", "32", "34", "36"],
    color: "#78350f",
    colors: [{ name: "Khaki", hex: "#78350f" }, { name: "Navy", hex: "#1e3a8a" }],
    collection: "All products",
    tags: ["Men", "Pants"],
    description: "Tailored stretch cotton twill chinos offering clean lines and versatile day-to-night styling."
  },

  // ==========================================
  // 4. KIDS (5 Items)
  // ==========================================
  {
    id: "kids-1",
    name: "Kids Colorful Cotton T-Shirt",
    price: 16.0,
    originalPrice: 25.0,
    discount: 36,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 19,
    category: "Kids",
    brand: "Mimosa",
    size: "S",
    sizes: ["XS", "S", "M"],
    color: "#06b6d4",
    colors: [{ name: "Cyan", hex: "#06b6d4" }, { name: "Orange", hex: "#f97316" }],
    collection: "All products",
    tags: ["Kids", "T-Shirt"],
    description: "Soft skin-friendly organic cotton t-shirt with playful colors for active kids."
  },
  {
    id: "kids-2",
    name: "Kids Denim Dungarees Overalls",
    price: 28.0,
    originalPrice: 42.0,
    discount: 33,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 14,
    category: "Kids",
    brand: "Mimosa",
    size: "M",
    sizes: ["S", "M", "L"],
    color: "#3b82f6",
    colors: [{ name: "Blue", hex: "#3b82f6" }],
    collection: "New arrivals",
    tags: ["Kids", "Denim"],
    description: "Comfortable stretch denim overalls with adjustable buckled shoulder straps."
  },
  {
    id: "kids-3",
    name: "Kids Warm Fleece Pullover Hoodie",
    price: 24.0,
    originalPrice: 35.0,
    discount: 31,
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80"
    ],
    rating: 4.6,
    reviewCount: 11,
    category: "Kids",
    brand: "Minimo",
    size: "S",
    sizes: ["XS", "S", "M"],
    color: "#f59e0b",
    colors: [{ name: "Amber", hex: "#f59e0b" }, { name: "Navy", hex: "#1e3a8a" }],
    collection: "Best sellers",
    tags: ["Kids", "Hoodie"],
    description: "Cozy brushed fleece pullover hoodie with front kangaroo pocket for children."
  },
  {
    id: "kids-4",
    name: "Kids Striped Cotton Sleepwear",
    price: 18.0,
    originalPrice: 26.0,
    discount: 30,
    image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 16,
    category: "Kids",
    brand: "Brook",
    size: "M",
    sizes: ["S", "M", "L"],
    color: "#3b82f6",
    colors: [{ name: "Blue Striped", hex: "#3b82f6" }],
    collection: "New arrivals",
    tags: ["Kids", "Sleepwear"],
    description: "Hypoallergenic organic cotton 2-piece sleepwear set with elasticated waistband."
  },
  {
    id: "kids-5",
    name: "Kids Insulated Puffer Winter Jacket",
    price: 42.0,
    originalPrice: 60.0,
    discount: 30,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 22,
    category: "Kids",
    brand: "FASCO",
    size: "L",
    sizes: ["S", "M", "L"],
    color: "#ef4444",
    colors: [{ name: "Red", hex: "#ef4444" }],
    collection: "Best sellers",
    tags: ["Kids", "Outerwear"],
    description: "Water-resistant insulated puffer jacket with detachable hood and fleece lining."
  },

  // ==========================================
  // 5. SHOES (5 Items)
  // ==========================================
  {
    id: "shoes-1",
    name: "Classic White Leather Sneakers",
    price: 65.0,
    originalPrice: 95.0,
    discount: 31,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 56,
    category: "Shoes",
    brand: "FASCO",
    size: "9",
    sizes: ["7", "8", "9", "10", "11"],
    color: "#ffffff",
    colors: [{ name: "White", hex: "#ffffff" }, { name: "Black", hex: "#111111" }],
    collection: "New arrivals",
    tags: ["Shoes", "Sneakers", "Fashion"],
    description: "Premium smooth leather low-top sneakers with vulcanized rubber anti-slip sole."
  },
  {
    id: "shoes-2",
    name: "Red High-Performance Running Shoes",
    price: 79.0,
    originalPrice: 120.0,
    discount: 34,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 88,
    category: "Shoes",
    brand: "Brook",
    size: "10",
    sizes: ["8", "9", "10", "11", "12"],
    color: "#ef4444",
    colors: [{ name: "Red", hex: "#ef4444" }],
    collection: "Best sellers",
    tags: ["Shoes", "Running", "Men"],
    description: "Engineered responsive air-cushioned running trainers for ultimate athletic speed."
  },
  {
    id: "shoes-3",
    name: "Formal Leather Oxford Shoes",
    price: 95.0,
    originalPrice: 150.0,
    discount: 36,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 31,
    category: "Shoes",
    brand: "Retablo",
    size: "9",
    sizes: ["8", "9", "10", "11"],
    color: "#451a03",
    colors: [{ name: "Brown", hex: "#451a03" }, { name: "Black", hex: "#111111" }],
    collection: "All products",
    tags: ["Shoes", "Formal", "Men"],
    description: "Handcrafted calfskin leather oxford dress shoes with Goodyear welted construction."
  },
  {
    id: "shoes-4",
    name: "Urban Chelsea Suede Boots",
    price: 89.0,
    originalPrice: 135.0,
    discount: 34,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 29,
    category: "Shoes",
    brand: "FASCO",
    size: "10",
    sizes: ["8", "9", "10", "11"],
    color: "#78350f",
    colors: [{ name: "Tan Suede", hex: "#78350f" }, { name: "Black", hex: "#111111" }],
    collection: "New arrivals",
    tags: ["Shoes", "Boots", "Men"],
    description: "Timeless water-resistant suede chelsea boots with elastic side gussets and pull tabs."
  },
  {
    id: "shoes-5",
    name: "Sporty Casual Canvas Sneakers",
    price: 35.0,
    originalPrice: 55.0,
    discount: 36,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
    ],
    rating: 4.6,
    reviewCount: 42,
    category: "Shoes",
    brand: "Minimo",
    size: "9",
    sizes: ["7", "8", "9", "10"],
    color: "#f97316",
    colors: [{ name: "Orange Canvas", hex: "#f97316" }],
    collection: "Best sellers",
    tags: ["Shoes", "Casual"],
    description: "Flexible lightweight vulcanized canvas skate sneakers with cushioned insole."
  },

  // ==========================================
  // 6. BAGS (5 Items)
  // ==========================================
  {
    id: "bags-1",
    name: "Minimalist Leather Tote Bag",
    price: 45.0,
    originalPrice: 70.0,
    discount: 35,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 31,
    category: "Bags",
    brand: "FASCO",
    size: "Medium",
    sizes: ["Medium", "Large"],
    color: "#78350f",
    colors: [{ name: "Tan Leather", hex: "#78350f" }, { name: "Black", hex: "#111111" }],
    collection: "Best sellers",
    tags: ["Bags", "Tote", "Women"],
    description: "Full-grain structured leather tote with magnetic snap clasp and interior laptop sleeve."
  },
  {
    id: "bags-2",
    name: "Urban Waterproof Backpack",
    price: 58.0,
    originalPrice: 85.0,
    discount: 31,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 22,
    category: "Bags",
    brand: "Retablo",
    size: "24L",
    sizes: ["20L", "24L"],
    color: "#111111",
    colors: [{ name: "Black", hex: "#111111" }, { name: "Olive", hex: "#3f6212" }],
    collection: "New arrivals",
    tags: ["Bags", "Backpack", "Men"],
    description: "Weatherproof roll-top commute backpack with padded 16-inch laptop compartment."
  },
  {
    id: "bags-3",
    name: "Leather Crossbody Handbag",
    price: 32.0,
    originalPrice: 50.0,
    discount: 36,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
    ],
    rating: 4.6,
    reviewCount: 19,
    category: "Bags",
    brand: "Brook",
    size: "Compact",
    sizes: ["Compact"],
    color: "#92400e",
    colors: [{ name: "Cognac", hex: "#92400e" }, { name: "Beige", hex: "#d4a373" }],
    collection: "All products",
    tags: ["Bags", "Handbag", "Women"],
    description: "Chic compact crossbody bag with gold-tone hardware and adjustable shoulder strap."
  },
  {
    id: "bags-4",
    name: "Classic Travel Canvas Duffel",
    price: 72.0,
    originalPrice: 110.0,
    discount: 34,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 37,
    category: "Bags",
    brand: "FASCO",
    size: "45L",
    sizes: ["35L", "45L"],
    color: "#374151",
    colors: [{ name: "Grey Canvas", hex: "#374151" }, { name: "Tan", hex: "#78350f" }],
    collection: "Best sellers",
    tags: ["Bags", "Travel", "Men"],
    description: "Heavyweight wax canvas weekend duffel reinforced with genuine leather handles."
  },
  {
    id: "bags-5",
    name: "Vintage Brown Shoulder Satchel",
    price: 39.0,
    originalPrice: 60.0,
    discount: 35,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 25,
    category: "Bags",
    brand: "Minimo",
    size: "Medium",
    sizes: ["Medium"],
    color: "#78350f",
    colors: [{ name: "Brown Leather", hex: "#78350f" }],
    collection: "New arrivals",
    tags: ["Bags", "Satchel", "Women"],
    description: "Everyday compact shoulder satchel featuring quick-access front buckle flap pockets."
  },

  // ==========================================
  // 7. ACCESSORIES (5 Items)
  // ==========================================
  {
    id: "acc-1",
    name: "Wide-Brim Red Felt Hat",
    price: 50.0,
    originalPrice: 75.0,
    discount: 33,
    image: p1,
    gallery: [p1],
    rating: 4.8,
    reviewCount: 12,
    category: "Accessories",
    brand: "Minimo",
    size: "M",
    sizes: ["S", "M", "L"],
    color: "#ef4444",
    colors: [{ name: "Red", hex: "#ef4444" }, { name: "Black", hex: "#111111" }],
    collection: "New arrivals",
    tags: ["Accessories", "Hat", "Women"],
    description: "Statement wide-brim crimson felt fedora with black ribbon band as seen in model look."
  },
  {
    id: "acc-2",
    name: "Wide-Brim Black Sun Hat",
    price: 35.0,
    originalPrice: 50.0,
    discount: 30,
    image: p4,
    gallery: [p4],
    rating: 4.7,
    reviewCount: 15,
    category: "Accessories",
    brand: "Mimosa",
    size: "S",
    sizes: ["S", "M"],
    color: "#111111",
    colors: [{ name: "Black", hex: "#111111" }],
    collection: "Accessories",
    tags: ["Accessories", "Hat", "Women"],
    description: "Oversized woven black dramatic sun hat crafted from breathable structured straw."
  },
  {
    id: "acc-3",
    name: "Polarized Retro Metal Sunglasses",
    price: 25.0,
    originalPrice: 40.0,
    discount: 37,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 29,
    category: "Accessories",
    brand: "FASCO",
    size: "Standard",
    sizes: ["Standard"],
    color: "#111111",
    colors: [{ name: "Black", hex: "#111111" }, { name: "Gold", hex: "#eab308" }],
    collection: "Best sellers",
    tags: ["Accessories", "Eyewear", "Fashion"],
    description: "Retro round metallic wire frame sunglasses with UV400 polarized dark tint lenses."
  },
  {
    id: "acc-4",
    name: "Minimalist Leather Analog Watch",
    price: 85.0,
    originalPrice: 130.0,
    discount: 35,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 44,
    category: "Accessories",
    brand: "Minimo",
    size: "40mm",
    sizes: ["38mm", "40mm", "42mm"],
    color: "#ffffff",
    colors: [{ name: "White", hex: "#ffffff" }, { name: "Black", hex: "#111111" }],
    collection: "New arrivals",
    tags: ["Accessories", "Watch", "Men"],
    description: "Ultra-minimalist quartz movement analog watch featuring clean white face and genuine leather strap."
  },
  {
    id: "acc-5",
    name: "Full-Grain Italian Leather Belt",
    price: 28.0,
    originalPrice: 45.0,
    discount: 38,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 21,
    category: "Accessories",
    brand: "Brook",
    size: "34",
    sizes: ["32", "34", "36", "38"],
    color: "#78350f",
    colors: [{ name: "Brown Leather", hex: "#78350f" }, { name: "Black", hex: "#111111" }],
    collection: "All products",
    tags: ["Accessories", "Belt", "Men"],
    description: "Solid brushed metal pin buckle belt handcrafted from 100% full-grain vegetable-tanned leather."
  }
];

export const getProductById = (id) => {
  return ALL_PRODUCTS.find((p) => String(p.id) === String(id)) || ALL_PRODUCTS[0];
};
