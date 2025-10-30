import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  experience: { type: mongoose.Schema.Types.ObjectId, ref: "Experience" },
  slot: {
    date: String,
    time: String,
  },
  user: {
    name: String,
    email: String,
  },
  promoCode: String,
  price: Number,
  status: { type: String, enum: ["confirmed", "failed"], default: "confirmed" },
});

export default mongoose.model("Booking", BookingSchema);
