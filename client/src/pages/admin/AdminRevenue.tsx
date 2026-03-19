import { useEffect, useState } from "react";

import { getRevenueData } from "../../services/revenueService";

import type { RevenueData } from "../../types/revenue";

const AdminRevenue = () => {

  const [data, setData] =
    useState<RevenueData | null>(null);

  useEffect(() => {

    const fetchRevenue = async () => {

      const res = await getRevenueData();

      setData(res);

    };

    fetchRevenue();

  }, []);

  if (!data) {

    return <div>Loading...</div>;

  }

  return (

    <div className="p-8">

      <h2 className="text-3xl font-bold mb-6">
        Revenue
      </h2>

      {/* Total Revenue */}

      <div className="bg-green-500 text-white p-6 rounded-xl mb-8">

        <h3 className="text-lg">
          Total Revenue
        </h3>

        <p className="text-3xl font-bold">
          ₹{data.totalRevenue}
        </p>

      </div>

      {/* Orders Table */}

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Order ID
              </th>

              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3 text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {data.orders.map((order) => (

              <tr
                key={order._id}
                className="border-t"
              >

                <td className="p-3">
                  {order._id.slice(-6)}
                </td>

                <td className="p-3">
                  {order.name}
                </td>

                <td className="p-3 font-semibold">
                  ₹{order.totalPrice}
                </td>

                <td className="p-3 text-gray-500">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminRevenue;