import { useState } from "react";
import { createAbout } from "../../services/aboutService";

const AddAbout = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }

  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    try {

      await createAbout(formData);

      alert("About Section Added Successfully");

      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);

    } catch (error) {
      alert("Error adding about section");
    }

  };

  return (

    <div className="p-8">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add About Section
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter about title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>

            <textarea
              placeholder="Write about your art studio..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-48 rounded-lg shadow"
              />
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add About Section
          </button>

        </form>

      </div>

    </div>

  );

};

export default AddAbout;