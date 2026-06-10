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
  { slug: "electronics", name: "Electronics", emoji: "📷", count: 12480 },
  { slug: "fashion", name: "Fashion", emoji: "👟", count: 9320 },
  { slug: "home", name: "Home", emoji: "🛋️", count: 7821 },
  { slug: "vehicles", name: "Vehicles", emoji: "🚲", count: 3140 },
  { slug: "music", name: "Music", emoji: "🎸", count: 2210 },
  { slug: "books", name: "Books", emoji: "📚", count: 5402 },
  { slug: "garden", name: "Garden", emoji: "🌿", count: 1880 },
  { slug: "kids", name: "Kids", emoji: "🧸", count: 4112 },
];

export const products: Product[] = [
  {
    id: "1", title: "Vintage Canon AE-1 Film Camera", price: 185, originalPrice: 320,
    image: camera, category: "electronics", condition: "Like new",
    location: "Brooklyn, NY", distanceKm: 1.2, negotiable: true, featured: true,
    seller: { name: "Maya Chen", avatar: a1, rating: 4.9, sales: 47 },
    description: "Beautiful working condition AE-1 with 50mm f/1.8 lens. Shutter sounds crisp, light meter accurate. Comes with original strap and a fresh battery."
  },
  {
    id: "2", title: "Steel Frame Road Bike — 56cm", price: 420,
    image: bike, category: "vehicles", condition: "Good",
    location: "Williamsburg, NY", distanceKm: 2.8, negotiable: true, featured: true,
    seller: { name: "Diego Park", avatar: a2, rating: 4.8, sales: 23 },
    description: "Smooth ride, recently tuned at local shop. Tires have plenty of life. Selling because I'm upsizing frames."
  },
  {
    id: "3", title: "Acoustic Dreadnought Guitar", price: 230,
    image: guitar, category: "music", condition: "Good",
    location: "Queens, NY", distanceKm: 4.5, negotiable: false,
    seller: { name: "Sam Reyes", avatar: a3, rating: 5.0, sales: 12 },
    description: "Warm tone, no cracks. Includes soft case and a few picks."
  },
  {
    id: "4", title: "Mid-Century Lounge Chair", price: 340, originalPrice: 899,
    image: chair, category: "home", condition: "Like new", featured: true,
    location: "Park Slope, NY", distanceKm: 0.9, negotiable: true,
    seller: { name: "Maya Chen", avatar: a1, rating: 4.9, sales: 47 },
    description: "Solid teak frame, boucle cushion. From a smoke-free home. Pickup only — too heavy to ship."
  },
  {
    id: "5", title: "Retro White Leather Sneakers — 10", price: 65,
    image: sneakers, category: "fashion", condition: "Like new",
    location: "Bushwick, NY", distanceKm: 3.2, negotiable: true,
    seller: { name: "Diego Park", avatar: a2, rating: 4.8, sales: 23 },
    description: "Worn twice. Box included. Just not my size."
  },
  {
    id: "6", title: "Set of 4 Hardcover Novels + Mug", price: 24,
    image: books, category: "books", condition: "Good",
    location: "Brooklyn, NY", distanceKm: 1.5, negotiable: false,
    seller: { name: "Sam Reyes", avatar: a3, rating: 5.0, sales: 12 },
    description: "Donating proceeds to local library."
  },
  {
    id: "7", title: "Brass Table Lamp with Linen Shade", price: 78,
    image: lamp, category: "home", condition: "Like new",
    location: "Cobble Hill, NY", distanceKm: 2.1, negotiable: true,
    seller: { name: "Maya Chen", avatar: a1, rating: 4.9, sales: 47 },
    description: "Warm bulb included. Cord is in great shape."
  },
  {
    id: "8", title: "Healthy Monstera & Pothos Duo", price: 45,
    image: plants, category: "garden", condition: "New",
    location: "Greenpoint, NY", distanceKm: 3.8, negotiable: false, featured: true,
    seller: { name: "Sam Reyes", avatar: a3, rating: 5.0, sales: 12 },
    description: "Both potted in handmade ceramic. Easy care, bright indirect light."
  },
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
    id: "c2", product: products[1], with: { name: "Diego Park", avatar: a2 },
    lastMessage: "Cool, see you Saturday.", time: "1h", unread: 0,
    messages: [
      { from: "them", text: "Can I test ride this weekend?", time: "Yesterday" },
      { from: "me", text: "Sure, Saturday 11am works.", time: "Yesterday" },
      { from: "them", text: "Cool, see you Saturday.", time: "1h" },
    ],
  },
  {
    id: "c3", product: products[3], with: { name: "Sam Reyes", avatar: a3 },
    lastMessage: "Photos sent.", time: "3h", unread: 0,
    messages: [{ from: "them", text: "Photos sent.", time: "3h" }],
  },
];
