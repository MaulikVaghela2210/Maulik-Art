import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAbout, updateAbout } from "../../services/aboutService";

const EditAbout = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {

    const fetchAbout = async () => {

      try {

        const { data } = await getAbout();

        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          setPreview(data.image);
        }

      } catch (error) {
        console.error("Fetch Error:", error);
      }

    };

    fetchAbout();

  }, []);

  const handleImageChange = (e: any) => {

    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }

  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!id) return;

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      await updateAbout(id, formData);

      alert("About Updated Successfully ✅");

      navigate("/admin/about");

    } catch (error) {
      console.error("Update Error:", error);
      alert("Update failed");
    }

  };

  return (

    <div className="p-8">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Edit About Section
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="file"
            onChange={handleImageChange}
          />

          {preview && (
            <img
              src={preview}
              className="w-40 rounded mt-3"
            />
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Update About
          </button>

        </form>

      </div>

    </div>

  );

};

export default EditAbout;