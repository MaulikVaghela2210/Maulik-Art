import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
  description?: string;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const API = "http://localhost:5000/api/categories";

  // ================= Fetch Categories =================
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(API);
      setCategories(data);
    } catch (error) {
      console.error("Fetch Category Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ================= Add / Update Category =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) return alert("Category name required");

    try {

      if (editingId) {
        // UPDATE CATEGORY
        await axios.put(
          `${API}/${editingId}`,
          { name, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Category Updated ✅");

      } else {
        // ADD CATEGORY
        await axios.post(
          API,
          { name, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Category Added ✅");
      }

      setName("");
      setDescription("");
      setEditingId(null);

      fetchCategories();

    } catch (error) {
      console.error("Save Category Error:", error);
      alert("Action failed");
    }
  };

  // ================= Edit Category =================
  const handleEdit = (cat: Category) => {
    setName(cat.name);
    setDescription(cat.description || "");
    setEditingId(cat._id);
  };

  // ================= Delete Category =================
  const handleDelete = async (id: string) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories((prev) =>
        prev.filter((cat) => cat._id !== id)
      );

    } catch (error) {
      console.error("Delete Category Error:", error);
      alert("Delete failed");
    }
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Category Management
      </h1>

      {/* ================= FORM ================= */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow mb-8"
      >

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Category Name
          </label>

          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Description
          </label>

          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="bg-black text-white px-6 py-2 rounded-xl">

          {editingId ? "Update Category" : "Add Category"}

        </button>

      </form>

      {/* ================= CATEGORY LIST ================= */}

      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">
          No categories found
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white p-4 rounded-2xl shadow border"
            >

              <h2 className="text-lg font-semibold">
                {cat.name}
              </h2>

              <p className="text-gray-500 text-sm mb-4">
                {cat.description}
              </p>

              <div className="flex justify-between">

                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-blue-500 text-white px-4 py-1 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(cat._id)}
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

export default AdminCategories;