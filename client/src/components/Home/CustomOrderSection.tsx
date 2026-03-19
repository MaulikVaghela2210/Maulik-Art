import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
}

const CustomOrder = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("Sketch");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    width: "",
    height: "",
  });

  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/categories"
      );
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("description", formData.description);
      data.append("width", formData.width);
      data.append("height", formData.height);
      data.append("category", activeCategory);

      images.forEach((img) => {
        data.append("referenceImages", img);
      });

      await axios.post(
        "http://localhost:5000/api/custom-orders",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Custom Order Submitted 🎨");

      setFormData({
        name: "",
        email: "",
        phone: "",
        description: "",
        width: "",
        height: "",
      });

      setImages([]);
    } catch (error) {
      console.error(error);
      alert("Submission Failed");
    }
  };

  const renderFormFields = () => {
    switch (activeCategory.toLowerCase()) {
      case "sculpture":
        return (
          <>
            <input
              type="number"
              name="width"
              placeholder="Width (cm)"
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />

            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />

            <div>
              <label className="block font-semibold mb-2">
                Upload 6 Side Images
              </label>

              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="border p-3 rounded-xl w-full"
              />
            </div>
          </>
        );

      default:
        return (
          <>
            <input
              type="number"
              name="width"
              placeholder="Width (cm)"
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />

            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />

            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="border p-3 rounded-xl w-full"
            />
          </>
        );
    }
  };

  return (
    <section className="px-20 py-20 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10">
        Custom Order Now
      </h2>

      {/* Category Tabs */}

      <div className="flex justify-center gap-6 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-6 py-2 rounded-full border ${
              activeCategory === cat.name
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            {cat.name}
          </button>
        ))}

        {/* General Tab */}

        <button
          onClick={() => setActiveCategory("General")}
          className={`px-6 py-2 rounded-full border ${
            activeCategory === "General"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          General
        </button>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10 space-y-6"
      >
        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />
        </div>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
          className="border p-3 rounded-xl w-full"
        />

        {renderFormFields()}

        <textarea
          name="description"
          placeholder="Describe your custom order..."
          rows={4}
          required
          onChange={handleChange}
          className="border p-3 rounded-xl w-full"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-xl w-full hover:opacity-90"
        >
          Submit Order
        </button>
      </form>
    </section>
  );
};

export default CustomOrder;