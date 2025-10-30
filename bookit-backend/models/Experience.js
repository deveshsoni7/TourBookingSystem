import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  date: String,
  slots: [
    {
      time: String,
      isBooked: { type: Boolean, default: false },
    },
  ],
});

const ExperienceSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  availableSlots: [SlotSchema],
});

export default mongoose.model("Experience", ExperienceSchema);
