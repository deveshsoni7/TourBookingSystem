import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const { refId, bookingId } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-24">
        {/* Green Check Icon */}
        <div className="rounded-full bg-green-500 h-16 w-16 flex items-center justify-center mb-8">
          <svg
            width="38"
            height="38"
            fill="none"
            stroke="white"
            strokeWidth="3.2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-2xl font-semibold text-gray-800 mb-1">
          Booking Confirmed
        </div>

        {/* Dynamic Booking Info */}
        <div className="mb-6 text-gray-500 text-sm">
          Ref ID: {refId} <br />
          Booking ID: {bookingId}
        </div>

        {/* Button */}
        <button
          className="px-4 py-2 rounded bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition shadow"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Result;
