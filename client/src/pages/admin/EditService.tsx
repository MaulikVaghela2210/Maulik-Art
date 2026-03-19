import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServices, updateService } from "../../services/serviceService";

import { Pencil, FileText, Save, ArrowLeft } from "lucide-react";

const EditService = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {

    const fetchService = async () => {

      const { data } = await getServices();

      const service = data.find((s: any) => s._id === id);

      if (service) {

        setTitle(service.title);
        setDescription(service.description);

      }

    };

    fetchService();

  }, [id]);

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    await updateService(id!, {
      title,
      description
    });

    navigate("/admin/services");

  };

  return (

    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-8">

        {/* HEADER */}

        <div className="flex items-center gap-3 mb-6">

          <Pencil className="text-blue-500" size={28} />

          <h1 className="text-3xl font-bold text-gray-800">
            Edit Service
          </h1>

        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Service Title
            </label>

            <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-400">

              <FileText className="text-gray-400 mr-2" size={18} />

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter service title"
                className="w-full p-3 outline-none"
                required
              />

            </div>

          </div>


          {/* DESCRIPTION */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter service description"
              rows={4}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

          </div>


          {/* BUTTONS */}

          <div className="flex justify-between items-center pt-4">

            <button
              type="button"
              onClick={() => navigate("/admin/services")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              <ArrowLeft size={16} />
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow transition"
            >
              <Save size={18} />
              Update Service
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditService;