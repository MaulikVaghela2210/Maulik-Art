import { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  title: string;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  customerName: string;
  phone: string;
  city: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: Item[];
}

const AdminOrders = () => {

  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const res = await axios.get("https://maulik-art.onrender.com/api/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (_id: string) => {

    if (!window.confirm("Delete this order?")) return;

    await axios.delete("https://maulik-art.onrender.com/api/orders/${id}");

    fetchOrders();

  };

  const updateStatus = async (_id: string, status: string) => {

    await axios.put("https://maulik-art.onrender.com/api/orders/${id}", { status });

    fetchOrders();

  };

  const statusColor = (status: string) => {

    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";

    if (status === "Shipped")
      return "bg-blue-100 text-blue-700";

    if (status === "Delivered")
      return "bg-green-100 text-green-700";

    return "bg-gray-100 text-gray-700";

  };

  return (

    <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Orders Management
      </h1>

      <div className="bg-white shadow-xl rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-700 uppercase">

            <tr>

              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Product</th>

              <th className="p-4 text-left">Qty</th>

              <th className="p-4 text-left">Phone</th>

              <th className="p-4 text-left">City</th>

              <th className="p-4 text-left">Total</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Action</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) =>

              order.items.map((item, index) => (

                <tr
                  key={order._id + index}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-medium">
                    {order.customerName}
                  </td>

                  {/* IMAGE */}

                  <td className="p-4">

                    <img
                      src={item.image}
                      alt={item.title}
                      title={item.title}
                      className="w-14 h-14 object-cover rounded-lg border shadow"
                    />

                  </td>

                  {/* PRODUCT */}

                  <td className="p-4 font-medium text-gray-800">
                    {item.title}
                  </td>

                  {/* QUANTITY */}

                  <td className="p-4">
                    {item.quantity}
                  </td>

                  <td className="p-4">
                    {order.phone}
                  </td>

                  <td className="p-4">
                    {order.city}
                  </td>

                  <td className="p-4 font-semibold">
                    ₹{order.totalPrice}
                  </td>

                  <td className="p-4">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-sm ${statusColor(order.status)}`}
                    >

                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>

                    </select>

                  </td>

                  <td className="p-4 text-gray-500">

                    {new Date(order.createdAt).toLocaleDateString()}

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
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

export default AdminOrders;