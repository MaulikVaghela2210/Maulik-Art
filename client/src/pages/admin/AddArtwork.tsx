import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
}

const AddArtwork = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const token = localStorage.getItem("token");

  // ================= Fetch Categories =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://https://${import.meta.env.VITE_API_URL}/api/categories"
        );
        setCategories(data);
      } catch (error) {
        console.error("Category Fetch Error:", error);
      }
    };

    fetchCategories();
  }, []);

  // ================= Submit =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Image is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      await axios.post(
        "http://https://${import.meta.env.VITE_API_URL}/api/artworks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const navigate = useNavigate();

      alert("Artwork Added Successfully 🚀");
      navigate("/admin/artworks");

      // Reset
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage(null);
    } catch (error) {
      console.error("Add Artwork Error:", error);
      alert("Error adding artwork");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Artwork</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow"
      >
        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border p-2 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            className="w-full border p-2 rounded-lg"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="w-full border p-2 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            className="w-full"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            required
          />
        </div>

        <button className="bg-black text-white px-6 py-2 rounded-xl">
          Add Artwork
        </button>
      </form>
    </div>
  );
};

export default AddArtwork;