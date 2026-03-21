import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Artwork {
  _id: string;
  title: string;
  price: number;
  image: string;
}

const AdminArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const API = "http://https://${import.meta.env.VITE_API_URL}/api/artworks";

  /* ================= Fetch Artworks ================= */

  const fetchArtworks = async () => {
    try {
      const { data } = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(data)) setArtworks(data);
      else if (Array.isArray(data.artworks)) setArtworks(data.artworks);
      else setArtworks([]);

    } catch (error) {
      console.error("Fetch Artwork Error:", error);
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  /* ================= Delete Artwork ================= */

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setArtworks((prev) => prev.filter((art) => art._id !== id));

    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete artwork");
    }
  };

  /* ================= UI ================= */

  return (
    <div>
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Artwork Management
        </h1>

        <button
          onClick={() => navigate("/admin/add-artwork")}
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          + Add Artwork
        </button>

      </div>

      {loading ? (
        <p>Loading artworks...</p>
      ) : artworks.length === 0 ? (
        <p className="text-gray-500">No artworks found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="bg-white p-4 rounded-2xl shadow border"
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              <h2 className="text-lg font-semibold">
                {art.title}
              </h2>

              <p className="text-gray-500 mb-4">
                ₹{art.price}
              </p>

              <div className="flex justify-between">

                <button
                  onClick={() =>
                    navigate(`/admin/artworks/edit/${art._id}`)
                  }
                  className="bg-blue-500 text-white px-4 py-1 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(art._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminArtworks;