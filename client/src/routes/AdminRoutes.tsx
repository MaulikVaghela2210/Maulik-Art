import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminCustomOrders from "../pages/admin/AdminCustomOrders";
import AdminArtworks from "../pages/admin/AdminArtworks";
import AddArtwork from "../pages/admin/AddArtwork";
import AdminCategories from "../pages/admin/AdminCategories";
import EditArtwork from "../pages/admin/EditArtwork";
import AdminHero from "../pages/admin/AdminHero";

import AddAbout from "../pages/admin/AddAbout";
import AdminAbout from "../pages/admin/AdminAbout";
import EditAbout from "../pages/admin/EditAbout";

import AdminUsers from "../pages/user/AdminUsers";
import AdminRevenue from "../pages/admin/AdminRevenue";

import AdminArtists from "../pages/admin/AdminArtists";
import AdminContacts from "../pages/admin/AdminContacts";

/* SERVICES IMPORT */
import AdminServices from "../pages/admin/AdminServices";
import AddService from "../pages/admin/AddService";
import EditService from "../pages/admin/EditService";

/* Protected Admin Route */
const AdminRoute = ({ children }: any) => {

  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;

};

const AdminRoutes = () => {

  return (

    <Routes>

      <Route
        path="/"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >

        {/* /admin */}
        <Route index element={<AdminDashboard />} />

        {/* /admin/dashboard */}
        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="users" element={<AdminUsers />} />
        <Route path="revenue" element={<AdminRevenue />} />

        <Route path="artists" element={<AdminArtists />} />
        <Route path="contacts" element={<AdminContacts />} />

        {/* /admin/hero */}
        <Route path="hero" element={<AdminHero />} />

        {/* ABOUT */}
        <Route path="about" element={<AdminAbout />} />
        <Route path="add-about" element={<AddAbout />} />
        <Route path="edit-about/:id" element={<EditAbout />} />

        {/* ORDERS */}
        <Route path="orders" element={<AdminOrders />} />

        <Route path="custom-orders" element={<AdminCustomOrders />}
/>

        {/* ARTWORKS */}
        <Route path="artworks" element={<AdminArtworks />} />
        <Route path="add-artwork" element={<AddArtwork />} />
        <Route path="artworks/edit/:id" element={<EditArtwork />} />

        {/* CATEGORIES */}
        <Route path="categories" element={<AdminCategories />} />

        {/* ================= SERVICES ================= */}

        {/* /admin/services */}
        <Route path="services" element={<AdminServices />} />

        {/* /admin/add-service */}
        <Route path="add-service" element={<AddService />} />

        {/* /admin/edit-service/:id */}
        <Route path="edit-service/:id" element={<EditService />} />

      </Route>

    </Routes>

  );

};

export default AdminRoutes;