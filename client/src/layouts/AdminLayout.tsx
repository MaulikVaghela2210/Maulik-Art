import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
        <AdminHeader />

        {/* Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;