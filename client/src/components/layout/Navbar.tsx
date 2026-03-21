import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { ShoppingCart } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const [user, setUser] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ================= FETCH USER =================
  const fetchUser = async () => {

    try {

      const res = await axios.get(
        "https://maulik-art.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(res.data);

    } catch (error) {

      console.log("Navbar user fetch error");

    }

  };

  useEffect(() => {

    if (token) {
      fetchUser();
    }

  }, [token]);

  // ================= LOGOUT =================
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

    window.location.reload();

  };

  const goToProfileTab = (tab: string) => {

    setOpenMenu(false);

    navigate(`/profile?tab=${tab}`);

  };

  return (

    <nav className="flex justify-between items-center px-10 py-4 shadow-md sticky top-0 bg-white z-50">

      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/">Maulik.art</Link>
      </div>

      {/* Center Links */}
      <div className="flex gap-8 font-medium">

        <Link to="/">Home</Link>
        <Link to="/product">Product</Link>
        <Link to="/about">About</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/custom-order">Order Now</Link>
        <Link to="/contact">Contact</Link>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Cart */}
        <Link to="/cart" className="relative">

          <ShoppingCart />

          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 rounded-full">
              {cartItems.length}
            </span>
          )}

        </Link>

        {/* NOT LOGIN */}
        {!token && (

          <div className="flex items-center gap-3">

            <FaUserCircle className="text-3xl text-gray-500" />

            <Link
              to="/login"
              className="bg-black text-white px-4 py-1 rounded-lg"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="border px-4 py-1 rounded-lg"
            >
              Signup
            </Link>

          </div>

        )}

        {/* LOGIN USER */}
        {token && (

          <div className="relative">

            {/* PROFILE ICON */}
            <div
              onClick={() => setOpenMenu(!openMenu)}
              className="cursor-pointer"
            >

              {user?.image ? (

                <img
                  src={user.image}
                  className="w-9 h-9 rounded-full object-cover border"
                />

              ) : (

                <FaUserCircle className="text-3xl text-gray-600" />

              )}

            </div>

            {/* DROPDOWN */}
            {openMenu && (

              <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-lg w-44 py-2">

                <button
                  onClick={() => goToProfileTab("profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button>

                <button
                  onClick={() => goToProfileTab("orders")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Orders
                </button>

                <button
                  onClick={() => goToProfileTab("custom")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Custom Orders
                </button>

                <button
                  onClick={() => goToProfileTab("settings")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </button>

                <hr />

                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>

              </div>

            )}

          </div>

        )}

      </div>

    </nav>

  );

};

export default Navbar;