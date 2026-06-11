import bike from "@/assets/p-bike.jpg";
import camera from "@/assets/p-camera.jpg";
import guitar from "@/assets/p-guitar.jpg";
import chair from "@/assets/p-chair.jpg";
import sneakers from "@/assets/p-sneakers.jpg";
import books from "@/assets/p-books.jpg";
import lamp from "@/assets/p-lamp.jpg";
import plants from "@/assets/p-plants.jpg";
import a1 from "@/assets/avatar-1.jpg";
import a2 from "@/assets/avatar-2.jpg";
import a3 from "@/assets/avatar-3.jpg";

export const avatars = { a1, a2, a3 };

export type Product = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  condition: "New" | "Like new" | "Good" | "Fair";
  location: string;
  distanceKm: number;
  negotiable: boolean;
  featured?: boolean;
  seller: { name: string; avatar: string; rating: number; sales: number };
  description: string;
};

export const categories = [
  { slug: "electronics", name: "Electronics", emoji: "📷", image: camera, count: 12480, color: "from-orange-400 to-red-500" },
  { slug: "fashion", name: "Fashion", emoji: "👟", image: sneakers, count: 9320, color: "from-pink-400 to-rose-500" },
  { slug: "home", name: "Home", emoji: "🛋️", image: chair, count: 7821, color: "from-amber-400 to-orange-500" },
  { slug: "vehicles", name: "Vehicles", emoji: "🚲", image: bike, count: 3140, color: "from-sky-400 to-blue-500" },
  { slug: "music", name: "Music", emoji: "🎸", image: guitar, count: 2210, color: "from-violet-400 to-purple-500" },
  { slug: "books", name: "Books", emoji: "📚", image: books, count: 5402, color: "from-emerald-400 to-teal-500" },
  { slug: "garden", name: "Garden", emoji: "🌿", image: plants, count: 1880, color: "from-lime-400 to-green-500" },
  { slug: "kids", name: "Kids", emoji: "🧸", image: lamp, count: 4112, color: "from-yellow-300 to-amber-500" },
];

const S = {
  maya: { name: "Maya Chen", avatar: a1, rating: 4.9, sales: 47 },
  diego: { name: "Diego Park", avatar: a2, rating: 4.8, sales: 23 },
  sam: { name: "Sam Reyes", avatar: a3, rating: 5.0, sales: 12 },
};

export const products: Product[] = [
  // Electronics
  { id: "1", title: "Vintage Canon AE-1 Film Camera", price: 185, originalPrice: 320, image: camera, category: "electronics", condition: "Like new", location: "Nairobi, Westlands", distanceKm: 1.2, negotiable: true, featured: true, seller: S.maya, description: "Beautiful working AE-1 with 50mm f/1.8 lens. Shutter crisp, light meter accurate. Original strap and fresh battery included." },
  { id: "9", title: "Sony WH-1000XM4 Wireless Headphones", price: 220, originalPrice: 349, image: camera, category: "electronics", condition: "Like new", location: "Nairobi, Kilimani", distanceKm: 2.4, negotiable: true, seller: S.diego, description: "Industry-leading noise cancellation. Includes original case and cables." },
  { id: "10", title: "iPad Air 5th Gen 64GB Wi-Fi", price: 410, image: camera, category: "electronics", condition: "Good", location: "Nairobi, Karen", distanceKm: 5.1, negotiable: false, featured: true, seller: S.sam, description: "Space grey. Light usage, no scratches. Charger included." },

  // Vehicles
  { id: "2", title: "Steel Frame Road Bike — 56cm", price: 420, image: bike, category: "vehicles", condition: "Good", location: "Nairobi, Lavington", distanceKm: 2.8, negotiable: true, featured: true, seller: S.diego, description: "Smooth ride, recently tuned. Tires have plenty of life left." },
  { id: "11", title: "Mountain Bike — 27.5\" Hardtail", price: 290, image: bike, category: "vehicles", condition: "Good", location: "Nairobi, Runda", distanceKm: 6.8, negotiable: true, seller: S.maya, description: "21 speeds, hydraulic disc brakes. Perfect for weekend trails." },

  // Music
  { id: "3", title: "Acoustic Dreadnought Guitar", price: 230, image: guitar, category: "music", condition: "Good", location: "Nairobi, Westlands", distanceKm: 4.5, negotiable: true, seller: S.sam, description: "Warm tone, no cracks. Includes soft case and picks." },
  { id: "12", title: "Yamaha Digital Piano P-45", price: 380, image: guitar, category: "music", condition: "Like new", location: "Nairobi, Parklands", distanceKm: 3.6, negotiable: true, seller: S.diego, description: "88 weighted keys. Stand and bench included." },

  // Home
  { id: "4", title: "Mid-Century Lounge Chair", price: 340, originalPrice: 899, image: chair, category: "home", condition: "Like new", featured: true, location: "Nairobi, Kileleshwa", distanceKm: 0.9, negotiable: true, seller: S.maya, description: "Solid teak frame, boucle cushion. Smoke-free home. Pickup only." },
  { id: "7", title: "Brass Table Lamp with Linen Shade", price: 78, image: lamp, category: "home", condition: "Like new", location: "Nairobi, Spring Valley", distanceKm: 2.1, negotiable: true, seller: S.maya, description: "Warm bulb included. Cord in great shape." },
  { id: "13", title: "Scandinavian Oak Dining Table", price: 520, image: chair, category: "home", condition: "Good", location: "Nairobi, Karen", distanceKm: 5.3, negotiable: true, seller: S.sam, description: "Seats 6. Minor surface marks, easily refinished." },

  // Fashion
  { id: "5", title: "Retro White Leather Sneakers — Sz 10", price: 65, image: sneakers, category: "fashion", condition: "Like new", location: "Nairobi, CBD", distanceKm: 3.2, negotiable: true, seller: S.diego, description: "Worn twice. Box included. Just not my size." },
  { id: "14", title: "Genuine Leather Crossbody Bag", price: 95, image: sneakers, category: "fashion", condition: "New", location: "Nairobi, Westlands", distanceKm: 1.8, negotiable: false, featured: true, seller: S.maya, description: "Tan brown, brass hardware. Tags still attached." },
  { id: "15", title: "Vintage Denim Jacket — Medium", price: 48, image: sneakers, category: "fashion", condition: "Good", location: "Nairobi, Hurlingham", distanceKm: 2.7, negotiable: true, seller: S.sam, description: "Classic wash, broken-in perfectly. Unisex fit." },

  // Books
  { id: "6", title: "Set of 4 Hardcover Novels + Mug", price: 24, image: books, category: "books", condition: "Good", location: "Nairobi, Westlands", distanceKm: 1.5, negotiable: false, seller: S.sam, description: "Donating proceeds to local library." },
  { id: "16", title: "Programming Books Bundle (12 titles)", price: 110, image: books, category: "books", condition: "Like new", location: "Nairobi, Kilimani", distanceKm: 2.9, negotiable: true, seller: S.diego, description: "Includes Clean Code, Designing Data-Intensive Applications, and more." },

  // Garden
  { id: "8", title: "Healthy Monstera & Pothos Duo", price: 45, image: plants, category: "garden", condition: "New", location: "Nairobi, Loresho", distanceKm: 3.8, negotiable: false, featured: true, seller: S.sam, description: "Potted in handmade ceramic. Bright indirect light." },
  { id: "17", title: "Outdoor Bamboo Planter Set (3)", price: 38, image: plants, category: "garden", condition: "Like new", location: "Nairobi, Runda", distanceKm: 6.2, negotiable: true, seller: S.maya, description: "Weather-resistant, drainage holes pre-drilled." },

  // Kids
  { id: "18", title: "Wooden Kids Activity Cube", price: 55, image: lamp, category: "kids", condition: "Like new", location: "Nairobi, Karen", distanceKm: 4.6, negotiable: true, featured: true, seller: S.maya, description: "Beads, shapes, gears. Ages 1-4. Smoke-free, pet-free home." },
  { id: "19", title: "Toddler Balance Bike — Red", price: 42, image: bike, category: "kids", condition: "Good", location: "Nairobi, Kileleshwa", distanceKm: 1.1, negotiable: true, seller: S.diego, description: "Adjustable seat. Slight scratches from outdoor use." },
];

export const getProduct = (id: string) => products.find(p => p.id === id);
export const byCategory = (slug: string) => products.filter(p => p.category === slug);

export const conversations = [
  {
    id: "c1", product: products[0], with: { name: "Maya Chen", avatar: a1 },
    lastMessage: "Yes, the lens cap is included :)", time: "2m", unread: 2,
    messages: [
      { from: "them", text: "Hi! Still available?", time: "10:14" },
      { from: "me", text: "Yes it is! Want to come take a look?", time: "10:16" },
      { from: "them", text: "Would you take $170?", time: "10:18", offer: 170 },
      { from: "me", text: "Could do $180.", time: "10:20", offer: 180 },
      { from: "them", text: "Yes, the lens cap is included :)", time: "10:22" },
    ],
  },
  {
    id: "c2", product: products[3], with: { name: "Diego Park", avatar: a2 },
    lastMessage: "Cool, see you Saturday.", time: "1h", unread: 0,
    messages: [
      { from: "them", text: "Can I test ride this weekend?", time: "Yesterday" },
      { from: "me", text: "Sure, Saturday 11am works.", time: "Yesterday" },
      { from: "them", text: "Cool, see you Saturday.", time: "1h" },
    ],
  },
  {
    id: "c3", product: products[7], with: { name: "Sam Reyes", avatar: a3 },
    lastMessage: "Photos sent.", time: "3h", unread: 0,
    messages: [{ from: "them", text: "Photos sent.", time: "3h" }],
  },
];
