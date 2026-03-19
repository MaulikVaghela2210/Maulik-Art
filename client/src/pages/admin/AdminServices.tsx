import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices, deleteService } from "../../services/serviceService";
import type { Service } from "../../types/service";

import { Plus, Pencil, Trash2 } from "lucide-react";

const AdminServices = () => {

  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = async () => {
    const { data } = await getServices();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {

    if (!window.confirm("Are you sure you want to delete this service?")) return;

    await deleteService(id);
    fetchServices();

  };

  return (

    <div className="p-10 bg-gray-50 min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Manage Services
        </h1>

        <Link
          to="/admin/add-service"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          <Plus size={18}/>
          Add Service
        </Link>

      </div>


      {/* TABLE CARD */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">

            <tr>

              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {services.length === 0 ? (

              <tr>
                <td colSpan={3} className="text-center py-10 text-gray-500">
                  No Services Found
                </td>
              </tr>

            ) : (

              services.map((service) => (

                <tr
                  key={service._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="p-4 font-semibold text-gray-800">
                    {service.title}
                  </td>

                  <td className="p-4 text-gray-600">
                    {service.description}
                  </td>

                  <td className="p-4 flex justify-center gap-3">

                    <Link
                      to={`/admin/edit-service/${service._id}`}
                      className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg transition"
                    >
                      <Pencil size={16}/>
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(service._id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition"
                    >
                      <Trash2 size={16}/>
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminServices;