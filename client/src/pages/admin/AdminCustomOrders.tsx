import { useEffect, useState } from "react";
import axios from "axios";

interface CustomOrder {
  _id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  width: number;
  height: number;
  referenceImages: string[];
  status: string;
  createdAt: string;
}

const AdminCustomOrders = () => {

  const [orders, setOrders] = useState<CustomOrder[]>([]);

  // Fetch Orders
  const fetchOrders = async () => {
    try {

      const res = await axios.get(
        "http://https://${import.meta.env.VITE_API_URL}/api/custom-orders"
      );

      setOrders(res.data);

    } catch (error) {

      console.error("Fetch error:", error);

    }
  };

  useEffect(() => {

    fetchOrders();

  }, []);

  // Delete Order
  const deleteOrder = async (id: string) => {

    if (!confirm("Delete this order?")) return;

    try {

      await axios.delete(
        `http://https://${import.meta.env.VITE_API_URL}/api/custom-orders/${id}`
      );

      fetchOrders();

    } catch (error) {

      console.error("Delete error:", error);

    }

  };

  // Update Status
  const updateStatus = async (id: string, status: string) => {

    try {

      await axios.put(
        `http://https://${import.meta.env.VITE_API_URL}/api/custom-orders/${id}`,
        { status }
      );

      fetchOrders();

    } catch (error) {

      console.error("Status update error:", error);

    }

  };

  // Direct Image Download
  const downloadImage = async (url: string) => {

    try {

      const response = await fetch(url);

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;

      link.download = "reference-image.jpg";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(blobUrl);

    } catch (error) {

      console.error("Download error:", error);

    }

  };

  return (

    <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Custom Orders
      </h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">

        <table className="w-full text-sm text-gray-700">

          <thead className="bg-gray-200 uppercase text-xs">

            <tr>

              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Reference Images</th>
              <th className="p-4 text-left">Size</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Action</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 font-medium">
                  {order.name}
                  <div className="text-xs text-gray-500">
                    {order.email}
                  </div>
                </td>

                <td className="p-4">
                  {order.category}
                </td>

                <td className="p-4">
                  {order.phone}
                </td>

                <td className="p-4 max-w-xs truncate">
                  {order.description}
                </td>

                {/* Reference Images */}

                <td className="p-4">

                  <div className="flex flex-wrap gap-4">

                    {order.referenceImages?.length > 0 ? (

                      order.referenceImages.map((img, index) => (

                        <div
                          key={index}
                          className="flex flex-col items-center bg-gray-50 p-2 rounded shadow"
                        >

                          <img
                            src={img}
                            alt="reference"
                            className="w-24 h-24 object-cover rounded border"
                          />

                          <button
                            onClick={() => downloadImage(img)}
                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                          >
                            Download
                          </button>

                        </div>

                      ))

                    ) : (

                      <span className="text-gray-400 text-sm">
                        No Images
                      </span>

                    )}

                  </div>

                </td>

                {/* Size */}

                <td className="p-4">
                  {order.width} × {order.height} inch
                </td>

                {/* Status */}

                <td className="p-4">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="border px-2 py-1 rounded"
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                  </select>

                </td>

                {/* Date */}

                <td className="p-4 text-gray-500">

                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}

                </td>

                {/* Delete */}

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteOrder(order._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminCustomOrders;