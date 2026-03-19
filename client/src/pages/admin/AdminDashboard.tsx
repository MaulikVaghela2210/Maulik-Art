import { useEffect, useState } from "react";

import {
  FaShoppingCart,
  FaRupeeSign,
  FaUsers,
  FaImage,
  FaPalette
} from "react-icons/fa";

import { getDashboardStats } from "../../services/dashboardService";

import type { DashboardStats } from "../../types/dashboard";

import StatCard from "../../components/Home/StatCard";

const AdminDashboard = () => {

  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  useEffect(() => {

    const fetchData = async () => {

      const data = await getDashboardStats();

      setStats(data);

    };

    fetchData();

  }, []);

  if (!stats) {

    return <div>Loading...</div>;

  }

  return (

    <div>

      <h2 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          link="/admin/orders"
          icon={<FaShoppingCart className="text-3xl text-blue-500" />}
        />

        <StatCard
          title="Custom Orders"
          value={stats.totalCustomOrders}
          link="/admin/custom-orders"
          icon={<FaPalette className="text-3xl text-pink-500" />}
        />

        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue}`}
          link="/admin/revenue"
          icon={<FaRupeeSign className="text-3xl text-green-500" />}
        />

        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          link="/admin/users"
          icon={<FaUsers className="text-3xl text-purple-500" />}
        />

        <StatCard
          title="Total Artworks"
          value={stats.totalArtworks}
          link="/admin/artworks"
          icon={<FaImage className="text-3xl text-orange-500" />}
        />

      </div>

    </div>

  );

};

export default AdminDashboard;