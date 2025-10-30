import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingInfo = location.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");

  const subtotal = bookingInfo.experience ? (bookingInfo.experience.price || 999) : 0;
  const taxes = 59;
  const total = subtotal + taxes - (promoApplied?.discount || 0);

  const handlePay = () => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        experienceId: bookingInfo.experience?._id,
        slot: { date: bookingInfo.selectedDate, time: bookingInfo.selectedTime },
        user: { name, email },
        promoCode: promoApplied?.code || promo || "",
        price: total,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          navigate(`/result/success/${data.bookingId}`);
        } else if (
          data.error &&
          data.error.includes("already been booked")
        ) {
          setError("Sorry, this slot has just been booked by someone else. Please choose another slot.");
        } else {
          setError(data.error || "Booking failed");
        }
      })
      .catch(() => setError("Booking failed. Try again."))
      .finally(() => setLoading(false));
  };

  const handlePromo = () => {
    setPromoMessage("");
    setPromoApplied(null);
    if (!promo.trim()) return;
    setPromoMessage("Checking promo...");
    fetch("http://localhost:5000/promo/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: promo.trim() })
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          let discount = 0;
          if (data.type === "percent") discount = subtotal * (data.amount / 100);
          if (data.type === "flat") discount = data.amount;
          setPromoApplied({ code: promo, discount });
          setPromoMessage(`Promo applied: -₹${Math.round(discount)}`);
        } else {
          setPromoApplied(null);
          setPromoMessage("Invalid or inactive promo code.");
        }
      })
      .catch(() => {
        setPromoApplied(null);
        setPromoMessage("Error validating promo code.");
      });
  };

  // Reset promo if user changes input
  const handlePromoChange = (e) => {
    setPromo(e.target.value);
    setPromoApplied(null);
    setPromoMessage("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-8 flex flex-col md:flex-row gap-10">
        {/* Left: Form */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow border p-6 max-w-2xl">
            <div className="font-semibold text-black mb-6">Checkout</div>
            <div className="flex flex-col md:flex-row gap-4 mb-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-700 mb-1 ml-1">Full name</label>
                <input
                  className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-xs mb-2 focus:outline-yellow-400"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-700 mb-1 ml-1">Email</label>
                <input
                  className="w-full p-2 rounded bg-gray-100 border border-gray-200 text-xs mb-2 focus:outline-yellow-400"
                  placeholder="Your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row gap-2 mb-2 w-full">
              <input
                className="flex-1 p-2 rounded bg-gray-100 border border-gray-200 text-xs focus:outline-yellow-400"
                placeholder="Promo code"
                value={promo}
                onChange={handlePromoChange}
              />
              <button
                className="px-4 py-2 bg-black text-white rounded text-xs hover:bg-gray-900"
                type="button"
                onClick={handlePromo}
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <div className={`mb-1 text-xs font-medium ${promoApplied ? "text-green-700" : "text-red-500"}`}>{promoMessage}</div>
            )}
            {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
            <div className="mt-1 mb-1 flex items-center gap-2 text-xs">
              <input id="agree" type="checkbox" className="accent-yellow-400" checked={agree} onChange={e => setAgree(e.target.checked)} />
              <label htmlFor="agree" className="text-gray-500">I agree to the terms and safety policy</label>
            </div>
          </div>
        </div>
        {/* Right: Booking Summary */}
        <div className="md:w-[340px] w-full">
          <div className="bg-gray-50 rounded-xl border shadow p-6 mb-3">
            <table className="w-full text-sm text-gray-700">
              <tbody>
                <tr><td className="pb-1">Experience</td><td className="font-semibold pb-1 text-right">{bookingInfo.experience?.title || "-"}</td></tr>
                <tr><td>Date</td><td className="text-right text-xs">{bookingInfo.selectedDate || "-"}</td></tr>
                <tr><td>Time</td><td className="text-right text-xs">{bookingInfo.selectedTime || "-"}</td></tr>
                <tr><td>Qty</td><td className="text-right">1</td></tr>
                <tr><td>Subtotal</td><td className="text-right font-normal">₹{subtotal}</td></tr>
                <tr><td>Taxes</td><td className="text-right font-normal">₹{taxes}</td></tr>
                {promoApplied && <tr><td>Discount</td><td className="text-right text-green-600 font-semibold">-₹{Math.round(promoApplied.discount)}</td></tr>}
              </tbody>
            </table>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between items-center text-base font-semibold text-gray-800 mb-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button
              className="bg-yellow-400 hover:bg-yellow-300 transition w-full py-2 rounded text-base font-medium text-black shadow disabled:opacity-60"
              disabled={!agree || loading || !name || !email || !bookingInfo.experience || !bookingInfo.selectedDate || !bookingInfo.selectedTime}
              onClick={handlePay}
            >
              {loading ? "Processing..." : "Pay and Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
