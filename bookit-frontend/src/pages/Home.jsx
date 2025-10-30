import Navbar from "../components/Navbar";
import ExperienceCard from "../components/ExperienceCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../services/api";

function Home() {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch(`${API}/experiences`)
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching experiences.");
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const q = search.toLowerCase();
    setFiltered(
      experiences.filter(
        exp =>
          exp.title.toLowerCase().includes(q) ||
          (exp.location || "").toLowerCase().includes(q) ||
          exp.description.toLowerCase().includes(q)
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar search={search} setSearch={setSearch} onSearch={handleSearch} />
      <div className="max-w-7xl mx-auto px-5 pt-8">
        {loading && <div className="text-center py-10 text-gray-600">Loading experiences...</div>}
        {error && <div className="text-center py-10 text-red-500">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filtered.map((exp) => (
            <ExperienceCard
              key={exp._id}
              image={exp.image}
              title={exp.title}
              location={exp.location || ""}
              description={exp.description}
              price={exp.price || 999}
              onClick={() => navigate(`/details/${exp._id}`)}
            />
          ))}
        </div>
        {!loading && !error && filtered.length === 0 && (
          <div className="py-8 text-center text-gray-500">No experiences found.</div>
        )}
      </div>
    </div>
  );
}
export default Home;
