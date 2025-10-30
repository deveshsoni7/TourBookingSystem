import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Interaction state:
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedTimeIdx, setSelectedTimeIdx] = useState(null);
  const [about, setAbout] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/experiences/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExperience(data);
        setAbout(data.about || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load experience");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!experience) return null;
  // Guard against missing slots/dates
  const dates = experience.availableSlots?.map(s => s.date) || [];
  const slotsForDate =
    experience.availableSlots && experience.availableSlots[selectedDateIdx]
      ? experience.availableSlots[selectedDateIdx].slots
      : [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <img
            src={experience.image}
            alt={experience.title}
            className="rounded-xl w-full h-72 object-cover mb-8 shadow border"
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <span className="text-2xl font-semibold text-gray-900">
                {experience.title}
              </span>
              {/* Location could be refined if present */}
            </div>
            <div className="text-sm text-gray-700 mt-1 mb-5">
              {experience.description}
            </div>
            {/* Date Picker from list */}
            <div>
              <div className="mb-1 text-sm font-medium text-gray-800">Choose date</div>
              <div className="flex gap-2 mb-4">
                {dates.map((d, i) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDateIdx(i);
                      setSelectedTimeIdx(null);
                    }}
                    className={`px-3 py-1 rounded border text-xs font-medium transition-colors duration-100 ${i === selectedDateIdx ? "bg-yellow-400 border-yellow-400 text-black" : "bg-gray-100 hover:bg-yellow-100 border-gray-200 text-gray-700"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            {/* Slot Picker for selected date */}
            <div>
              <div className="mb-1 text-sm font-medium text-gray-800">Choose time</div>
              <div className="flex gap-2">
                {slotsForDate.length === 0 && (
                  <span className="text-xs text-gray-400">No slots</span>
                )}
                {slotsForDate.map((slot, i) => (
                  <button
                    key={slot.time}
                    onClick={() => !slot.isBooked && setSelectedTimeIdx(i)}
                    className={`px-3 py-1 rounded border text-xs font-medium flex flex-col items-center min-w-[80px] transition-colors duration-100
                      ${slot.isBooked
                        ? "bg-gray-100 text-gray-400 border-gray-200 line-through cursor-not-allowed"
                        : selectedTimeIdx === i
                        ? "bg-yellow-400 border-yellow-400 text-black"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-yellow-100"}
                    `}
                  >
                    <span>{slot.time}</span>
                    {slot.isBooked ? (
                      <span className="text-[10px] font-normal">Sold out</span>
                    ) : (
                      <span className="text-[10px] font-normal">Available</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-400">All times are in IST (GMT +5:30)</div>
            </div>
            {/* About Section */}
            <div className="mt-8">
              <div className="font-semibold text-sm mb-1">About</div>
              <textarea
                className="rounded bg-gray-100 text-gray-700 text-xs p-2 w-full min-h-[44px] resize-vertical border border-gray-200 focus:outline-yellow-400"
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Booking Summary */}
        <div className="lg:w-[350px] w-full">
          <div className="bg-gray-50 rounded-xl border shadow p-6 mb-3">
            <div className="mb-2 flex justify-between text-gray-700 text-sm">
              <span>Experience</span><span className="font-semibold">{experience.title}</span>
            </div>
            <div className="mb-2 flex items-center justify-between text-gray-700 text-sm">
              <span>Date</span>
              <span>{dates[selectedDateIdx]}</span>
            </div>
            <div className="mb-2 flex items-center justify-between text-gray-700 text-sm">
              <span>Time</span>
              <span>{slotsForDate[selectedTimeIdx]?.time || "-"}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            {/* Normally price/taxes from backend */}
            <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-4">
              <span>Total</span>
              <span>₹{experience.price || 999}</span>
            </div>
            <button
              className="bg-yellow-400 hover:bg-yellow-300 transition w-full py-2 rounded text-base font-medium text-black shadow"
              onClick={() =>
                navigate(`/checkout/${experience._id}`, {
                  state: {
                    experience,
                    selectedDate: dates[selectedDateIdx],
                    selectedTime: slotsForDate[selectedTimeIdx]?.time || null,
                  },
                })
              }
              disabled={selectedTimeIdx === null}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
