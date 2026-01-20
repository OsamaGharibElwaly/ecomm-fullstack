export type Product = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  description: string;
  specifications: string[];
  images: string[];
  category?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Elite Pro–Gaming Headphones',
    price: 199,
    oldPrice: 249,
    rating: 4.8,
    reviewsCount: 124,
    badge: 'NEW ARRIVAL',
    category: 'Audio',
    description:
      'Pro-grade headset with tuned drivers, low-latency wireless, and all-day comfort ear cups.',
    specifications: [
      '50mm neodymium drivers',
      'Memory foam ear cups',
      'Detachable mic',
      'Low-latency wireless',
      'USB-C fast charging',
    ],
    images: [
      'https://picsum.photos/seed/headset-1/1200/900',
      'https://picsum.photos/seed/headset-2/1200/900',
      'https://picsum.photos/seed/headset-3/1200/900',
      'https://picsum.photos/seed/headset-4/1200/900',
    ],
  },
  {
    id: 'p2',
    title: 'Pro Wireless Mouse X',
    price: 59,
    oldPrice: 79,
    rating: 4.6,
    reviewsCount: 88,
    badge: 'HOT',
    category: 'Accessories',
    description:
      'Ultra-light wireless mouse with precise sensor and long battery life for competitive play.',
    specifications: [
      '16,000 DPI sensor',
      'Ultra-light shell',
      'USB-C charging',
      '2.4GHz low-latency',
      'PTFE glide feet',
    ],
    images: [
      'https://picsum.photos/seed/mouse-1/1200/900',
      'https://picsum.photos/seed/mouse-2/1200/900',
      'https://picsum.photos/seed/mouse-3/1200/900',
      'https://picsum.photos/seed/mouse-4/1200/900',
    ],
  },
  {
    id: 'p3',
    title: 'RGB Mechanical Keyboard',
    price: 129,
    oldPrice: 159,
    rating: 4.7,
    reviewsCount: 203,
    badge: 'BEST SELLER',
    category: 'Accessories',
    description:
      'Tactile mechanical keyboard with hot-swappable switches and per-key RGB profiles.',
    specifications: [
      'Hot-swappable switches',
      'Per-key RGB',
      'Aluminum top plate',
      'Detachable USB-C cable',
      'N-key rollover',
    ],
    images: [
      'https://picsum.photos/seed/keyboard-1/1200/900',
      'https://picsum.photos/seed/keyboard-2/1200/900',
      'https://picsum.photos/seed/keyboard-3/1200/900',
      'https://picsum.photos/seed/keyboard-4/1200/900',
    ],
  },
  {
    id: 'p4',
    title: 'Ergo Gaming Chair',
    price: 299,
    oldPrice: 349,
    rating: 4.5,
    reviewsCount: 64,
    badge: 'LIMITED',
    category: 'Furniture',
    description:
      'Ergonomic chair with breathable mesh, lumbar support, and adjustable armrests.',
    specifications: [
      'Adjustable lumbar support',
      '4D armrests',
      'Breathable mesh back',
      'Recline up to 135°',
      'Steel base',
    ],
    images: [
      'https://picsum.photos/seed/chair-1/1200/900',
      'https://picsum.photos/seed/chair-2/1200/900',
      'https://picsum.photos/seed/chair-3/1200/900',
      'https://picsum.photos/seed/chair-4/1200/900',
    ],
  },
  {
    id: 'p5',
    title: '4K UltraWide Monitor 34"',
    price: 499,
    oldPrice: 549,
    rating: 4.6,
    reviewsCount: 91,
    badge: 'DEAL',
    category: 'Displays',
    description:
      'Immersive 34-inch ultrawide with crisp 4K detail and smooth refresh rate.',
    specifications: [
      '34-inch ultrawide',
      '4K resolution',
      'High refresh rate',
      'HDR support',
      'Multiple input ports',
    ],
    images: [
      'https://picsum.photos/seed/monitor-1/1200/900',
      'https://picsum.photos/seed/monitor-2/1200/900',
      'https://picsum.photos/seed/monitor-3/1200/900',
      'https://picsum.photos/seed/monitor-4/1200/900',
    ],
  },
  {
    id: 'p6',
    title: 'USB-C GaN Fast Charger',
    price: 39,
    oldPrice: 49,
    rating: 4.4,
    reviewsCount: 156,
    badge: 'NEW',
    category: 'Power',
    description:
      'Compact GaN charger with fast USB-C power delivery for phones, tablets, and laptops.',
    specifications: [
      'GaN compact design',
      'USB-C Power Delivery',
      'Multi-device support',
      'Overheat protection',
      'Travel-friendly',
    ],
    images: [
      'https://picsum.photos/seed/charger-1/1200/900',
      'https://picsum.photos/seed/charger-2/1200/900',
      'https://picsum.photos/seed/charger-3/1200/900',
      'https://picsum.photos/seed/charger-4/1200/900',
    ],
  },
  {
    id: 'p7',
    title: 'Everyday Tech Backpack',
    price: 120,
    oldPrice: 140,
    rating: 4.7,
    reviewsCount: 77,
    badge: 'TRENDING',
    category: 'Bags',
    description:
      'Water-resistant backpack with padded laptop sleeve and smart organization pockets.',
    specifications: [
      '20L capacity',
      'Water-resistant fabric',
      'Padded laptop sleeve',
      'Hidden pocket',
      'Breathable straps',
    ],
    images: [
      'https://picsum.photos/seed/backpack-1/1200/900',
      'https://picsum.photos/seed/backpack-2/1200/900',
      'https://picsum.photos/seed/backpack-3/1200/900',
      'https://picsum.photos/seed/backpack-4/1200/900',
    ],
  },
  {
    id: 'p8',
    title: 'Minimalist Sneakers',
    price: 89,
    oldPrice: 109,
    rating: 4.3,
    reviewsCount: 52,
    badge: 'SALE',
    category: 'Fashion',
    description:
      'Clean silhouette sneakers with cushioned insole and durable outsole for daily wear.',
    specifications: [
      'Cushioned insole',
      'Durable outsole',
      'Breathable upper',
      'Lightweight feel',
      'Easy to clean',
    ],
    images: [
      'https://picsum.photos/seed/sneakers-1/1200/900',
      'https://picsum.photos/seed/sneakers-2/1200/900',
      'https://picsum.photos/seed/sneakers-3/1200/900',
      'https://picsum.photos/seed/sneakers-4/1200/900',
    ],
  },
  {
    id: 'p9',
    title: 'Smart Watch Active',
    price: 149,
    oldPrice: 179,
    rating: 4.5,
    reviewsCount: 118,
    badge: 'TOP RATED',
    category: 'Wearables',
    description:
      'Fitness-first smartwatch with heart rate tracking, sleep insights, and great battery life.',
    specifications: [
      'Heart rate tracking',
      'Sleep insights',
      'Water resistant',
      'Multi-sport modes',
      'Long battery life',
    ],
    images: [
      'https://picsum.photos/seed/watch-1/1200/900',
      'https://picsum.photos/seed/watch-2/1200/900',
      'https://picsum.photos/seed/watch-3/1200/900',
      'https://picsum.photos/seed/watch-4/1200/900',
    ],
  },
  {
    id: 'p10',
    title: 'Classic Aviator Sunglasses',
    price: 45,
    oldPrice: 60,
    rating: 4.2,
    reviewsCount: 41,
    badge: 'POPULAR',
    category: 'Fashion',
    description:
      'Timeless aviator style with UV protection and lightweight metal frame.',
    specifications: [
      'UV protection',
      'Lightweight frame',
      'Scratch-resistant lenses',
      'Comfort nose pads',
      'Classic aviator design',
    ],
    images: [
      'https://picsum.photos/seed/shades-1/1200/900',
      'https://picsum.photos/seed/shades-2/1200/900',
      'https://picsum.photos/seed/shades-3/1200/900',
      'https://picsum.photos/seed/shades-4/1200/900',
    ],
  },
];
