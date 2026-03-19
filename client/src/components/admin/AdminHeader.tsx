import { useNavigate } from "react-router-dom";

const AdminHeader = () => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="h-16 bg-white shadow-md flex items-center justify-between px-6">

      <h1 className="text-xl font-semibold text-gray-800">
        Admin Panel
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>

    </div>

  );

};

export default AdminHeader;