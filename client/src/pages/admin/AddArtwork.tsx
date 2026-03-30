import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
}

const AddArtwork = () => {

  const navigate = useNavigate(); // ✅ FIXED (Top level)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const token = localStorage.getItem("token");

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://maulik-art.onrender.com/api/categories"
        );
        setCategories(data);
      } catch (error) {
        console.error("Category Fetch Error:", error);
      }
    };

    fetchCategories();
  }, []);

  // Submit
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
        "https://maulik-art.onrender.com/api/artworks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Artwork Added Successfully 🚀");

      navigate("/admin/artworks"); // ✅ now works

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

        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded-lg mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded-lg mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded-lg mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <select
          className="w-full border p-2 rounded-lg mb-4"
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

        <input
          type="file"
          className="w-full mb-4"
          onChange={(e) =>
            setImage(e.target.files ? e.target.files[0] : null)
          }
          required
        />

        <button className="bg-black text-white px-6 py-2 rounded-xl">
          Add Artwork
        </button>

      </form>
    </div>
  );
};

export default AddArtwork;