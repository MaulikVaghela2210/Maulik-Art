import { useEffect, useState } from "react";

interface Slide {
  _id: string;
  title: string;
  desc: string;
  img: string;
  bg: string;
}

const AdminHero = () => {

  const [slides, setSlides] = useState<Slide[]>([]);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    bg: "from-orange-100 to-orange-200"
  });

  const [image, setImage] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  // ✅ FETCH SLIDES
  const fetchSlides = async () => {
    try {
      const res = await fetch("https://maulik-art.onrender.com/api/hero");
      const data = await res.json();
      setSlides(data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ SUBMIT (ADD / UPDATE)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", form.title);
      data.append("desc", form.desc);
      data.append("bg", form.bg);

      if (image) {
        data.append("img", image);
      }

      const url = editingId
        ? `https://maulik-art.onrender.com/api/hero/${editingId}`
        : "https://maulik-art.onrender.com/api/hero";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });

      if (!res.ok) {
        throw new Error("Submit failed");
      }

      // reset
      setForm({
        title: "",
        desc: "",
        bg: "from-orange-100 to-orange-200"
      });

      setImage(null);
      setEditingId(null);

      fetchSlides();

    } catch (error) {
      console.log("Submit Error:", error);
    }
  };

  // ✅ DELETE SLIDE (FIXED)
  const deleteSlide = async (_id: string) => {
    try {
      const res = await fetch(
        `https://maulik-art.onrender.com/api/hero/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      fetchSlides();

    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  // ✅ EDIT SLIDE
  const editSlide = (slide: Slide) => {
    setForm({
      title: slide.title,
      desc: slide.desc,
      bg: slide.bg
    });

    setEditingId(slide._id);
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Hero Slider Manager
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-10 grid gap-4 max-w-xl"
      >

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded"
          required
        />

        <input
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
          required
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2 rounded"
        />

        <select
          name="bg"
          value={form.bg}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="from-orange-100 to-orange-200">Orange</option>
          <option value="from-blue-100 to-blue-200">Blue</option>
          <option value="from-purple-100 to-purple-200">Purple</option>
          <option value="from-gray-800 to-black text-white">Dark</option>
        </select>

        <button
          type="submit"
          className="bg-black text-white py-2 rounded"
        >
          {editingId ? "Update Slide" : "Add Slide"}
        </button>

      </form>

      {/* SLIDES */}
      <div className="grid md:grid-cols-3 gap-6">

        {slides.map((slide) => (

          <div
            key={slide._id}
            className="border rounded-lg p-4 shadow"
          >

            <img
              src={slide.img}
              className="h-40 w-full object-cover rounded mb-3"
            />

            <h3 className="font-bold">
              {slide.title}
            </h3>

            <p className="text-sm text-gray-600">
              {slide.desc}
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() => editSlide(slide)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteSlide(slide._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminHero;