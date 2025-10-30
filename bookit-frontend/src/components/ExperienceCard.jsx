function ExperienceCard({ image, title, location, description, price, onClick }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col w-full max-w-xs">
      <img src={image} alt={title} className="h-44 w-full object-cover" />
      <div className="flex-1 flex flex-col px-4 pt-3 pb-4">
        <div className="flex items-center mb-2 gap-2">
          <span className="font-medium text-lg text-gray-900">{title}</span>
          {location && <span className="ml-auto text-[11px] bg-gray-100 text-gray-700 rounded px-2 py-0.5 font-semibold">{location}</span>}
        </div>
        <p className="text-gray-600 text-xs mb-4 flex-1 min-h-[36px]">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-gray-700 text-sm">From <span className="font-semibold text-lg">₹{price}</span></span>
          <button
            className="bg-yellow-400 hover:bg-yellow-300 text-black rounded px-4 py-1 text-sm font-medium transition"
            onClick={onClick}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
