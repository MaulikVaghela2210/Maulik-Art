import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Artwork {
  _id: string;
  title: string;
  image: string;
}

const GallerySection = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://https://${import.meta.env.VITE_API_URL}/api/artworks"
      );
      setArtworks(data.slice(0, 4)); // only 4 for home
    };

    fetchData();
  }, []);

  return (
    <section className="px-20 py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-10">
        Gallery Preview
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {artworks.map((art) => (
          <div
            key={art._id}
            className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl transition"
            onClick={() => navigate(`/gallery/${art._id}`)}
          >
            <img
              src={art.image}
              alt={art.title}
              className="h-64 w-full object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="font-semibold">
                {art.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/gallery")}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          View Full Gallery
        </button>
      </div>
    </section>
  );
};

export default GallerySection;