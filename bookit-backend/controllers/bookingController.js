import Booking from '../models/Booking.js';
import Experience from '../models/Experience.js';

export const createBooking = async (req, res) => {
  try {
    const { experienceId, slot, user, promoCode, price } = req.body;
    const experience = await Experience.findById(experienceId);
    if (!experience) return res.status(404).json({ error: "Experience not found" });
    // Find date and slot
    const slotObj = experience.availableSlots.find(x => x.date === slot.date);
    if (!slotObj) return res.status(400).json({ error: "Date not found" });
    const slotIdx = slotObj.slots.findIndex(s => s.time === slot.time);
    if (slotIdx === -1) return res.status(400).json({ error: "Time not found" });
    if (slotObj.slots[slotIdx].isBooked)
      return res.status(409).json({ error: "Sorry, this slot has already been booked by someone else. Please choose another." });
    // Book slot by setting isBooked to true
    slotObj.slots[slotIdx].isBooked = true;
    await experience.save();
    const booking = new Booking({
      experience: experienceId,
      slot,
      user,
      promoCode,
      price,
    });
    await booking.save();
    res.json({ success: true, bookingId: booking._id });
  } catch (err) {
    res.status(500).json({ error: "Booking failed. Please try again.", detail: err.message });
  }
};
