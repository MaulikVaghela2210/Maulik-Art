import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  PlusSquare,
  List,
  Package,
  Layers,
  FileText,
  Edit,
  LogOut,
  Palette,
  Users, 
  UsersRound,
  DollarSign,
  Mail,
  ClipboardList, // Added for Services
} from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive ? "bg-blue-500" : "hover:bg-gray-700"
    }`;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col justify-between">
      {/* TOP */}
      <div>
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/admin/dashboard" className={linkStyle}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/admin/users" className={linkStyle}>
            <Users size={18} /> Users
          </NavLink>

          <NavLink to="/admin/revenue" className={linkStyle}>
            <DollarSign size={18} /> Revenue
          </NavLink>

          <NavLink to="/admin/hero" className={linkStyle}>
            <Image size={18} /> Hero Slider
          </NavLink>

          <NavLink to="/admin/about" className={linkStyle}>
            <FileText size={18} /> About List
          </NavLink>

          <NavLink to="/admin/add-about" className={linkStyle}>
            <Edit size={18} /> Add About
          </NavLink>

          <NavLink to="/admin/artworks" className={linkStyle}>
            <Package size={18} /> Artworks
          </NavLink>

          <NavLink to="/admin/add-artwork" className={linkStyle}>
            <PlusSquare size={18} /> Add Artwork
          </NavLink>

          <NavLink to="/admin/categories" className={linkStyle}>
            <Layers size={18} /> Categories
          </NavLink>

          <NavLink to="/admin/orders" className={linkStyle}>
            <List size={18} /> Orders
          </NavLink>

          <NavLink to="/admin/custom-orders" className={linkStyle}>
            <Palette size={18} /> Custom Orders
          </NavLink>

          {/* ================= Services Link ================= */}
          <NavLink to="/admin/services" className={linkStyle}>
            <ClipboardList size={18} /> Services
          </NavLink>

          <NavLink to="/admin/artists" className={linkStyle}>
            <UsersRound size={18} /> Artists
          </NavLink>

          <NavLink to="/admin/contacts" className={linkStyle}>
            <Mail size={18} /> Contacts
          </NavLink>
        </nav>
      </div>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;