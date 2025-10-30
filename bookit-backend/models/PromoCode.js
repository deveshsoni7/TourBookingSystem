import mongoose from "mongoose";

const PromoCodeSchema = new mongoose.Schema({
  code: String,
  discountType: { type: String, enum: ["percent", "flat"] },
  amount: Number,
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("PromoCode", PromoCodeSchema);
