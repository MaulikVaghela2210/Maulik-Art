import { useEffect, useState } from "react";
import { getAbout, deleteAbout } from "../../services/aboutService";
import { useNavigate } from "react-router-dom";

interface About {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const AdminAbout = () => {

  const [about, setAbout] = useState<About | null>(null);
  const navigate = useNavigate();

  const fetchAbout = async () => {

    const { data } = await getAbout();
    setAbout(data);

  };

  useEffect(() => {
    fetchAbout();
  }, []);

 const handleDelete = async () => {

  if (!about) return;

  const confirmDelete = window.confirm("Delete About Section?");

  if (!confirmDelete) return;

  await deleteAbout(about._id);

  alert("About deleted");

  fetchAbout(); // IMPORTANT
};

  const handleEdit = () => {

    if (!about) return;

    navigate(`/admin/edit-about/${about._id}`);

  };

  if (!about) {

    return (
      <div className="p-8">
        <p>No About Section Found</p>
      </div>
    );

  }

  return (

    <div className="p-8">

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          About Section
        </h2>

        <img
          src={about.image}
          alt="About"
          className="w-72 rounded-lg shadow mb-6"
        />

        <h3 className="text-xl font-semibold">
          {about.title}
        </h3>

        <p className="text-gray-600 mt-3">
          {about.description}
        </p>

        <div className="flex gap-4 mt-6">

          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

};

export default AdminAbout;