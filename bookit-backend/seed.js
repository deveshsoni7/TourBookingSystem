import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "./models/Experience.js";
import PromoCode from "./models/PromoCode.js";

dotenv.config();

const demoExperiences = [
  {
    title: "Desert Safari Adventure",
    description: "Experience the thrill of the desert with a 4x4 ride, camel trek, and local dinner.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    availableSlots: [
      {
        date: "2025-11-01",
        slots: [
          { time: "09:00", isBooked: false },
          { time: "16:00", isBooked: false },
        ],
      },
      {
        date: "2025-11-02",
        slots: [
          { time: "09:00", isBooked: false },
          { time: "16:00", isBooked: false },
        ],
      },
    ],
  },
  {
    title: "Mountain Hiking Tour",
    description: "Breathtaking hike with a guide, snacks, and spectacular views.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    availableSlots: [
      {
        date: "2025-11-03",
        slots: [
          { time: "07:00", isBooked: false },
          { time: "10:00", isBooked: false },
        ],
      },
      {
        date: "2025-11-04",
        slots: [
          { time: "07:00", isBooked: false },
        ],
      },
    ],
  },
];

const demoPromos = [
  { code: "SAVE10", discountType: "percent", amount: 10, isActive: true },
  { code: "FLAT100", discountType: "flat", amount: 100, isActive: true },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Experience.deleteMany();
  await PromoCode.deleteMany();
  await Experience.insertMany(demoExperiences);
  await PromoCode.insertMany(demoPromos);
  console.log("Seed complete");
  mongoose.disconnect();
}

seed();
