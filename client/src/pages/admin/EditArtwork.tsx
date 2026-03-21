import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
}

const EditArtwork = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch Single Artwork
  const fetchArtwork = async () => {
    try {
      const { data } = await axios.get(
        `http://https://${import.meta.env.VITE_API_URL}/api/artworks/${id}`
      );

      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
      setCategory(data.category?._id || "");
    } catch (error) {
      console.error("Fetch artwork error:", error);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://https://${import.meta.env.VITE_API_URL}/api/categories"
      );
      setCategories(data);
    } catch (error) {
      console.error("Fetch categories error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtwork();
    fetchCategories();
  }, []);

  // Submit Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);

      if (image) {
        formData.append("image", image);
      }

      await axios.put(
      `http://https://${import.meta.env.VITE_API_URL}/api/artworks/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      }
);

      alert("Artwork updated successfully!");
      navigate("/admin/artworks");
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Artwork</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files ? e.target.files[0] : null)
          }
          className="w-full"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Update Artwork
        </button>

      </form>
    </div>
  );
};

export default EditArtwork;