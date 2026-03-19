import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

interface Artwork {
  _id: string;
  title: string;
  image: string;
  description: string;
  artistName: string;
  category?: {
    name: string;
  };
}

const GalleryDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/artworks/${id}`
      );
      setArtwork(data);
    };

    fetchArtwork();
  }, [id]);

  if (!artwork) return <p className="p-10">Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto py-16 px-6">
        
        {/* Big Image */}
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-[500px] object-cover rounded-2xl shadow-lg mb-10"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">
          {artwork.title}
        </h1>

        {/* Artist + Category */}
        <div className="flex gap-6 text-gray-500 mb-6">
          <p>Artist: {artwork.artistName}</p>
          <p>Category: {artwork.category?.name}</p>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 leading-8">
          {artwork.description}
        </p>
      </div>

      <Footer />
    </>
  );
};

export default GalleryDetails;