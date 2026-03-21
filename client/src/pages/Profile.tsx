import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
}

const Profile = () => {

  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "profile"
  );

  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [ordersCount, setOrdersCount] = useState(0);
  const [customOrdersCount, setCustomOrdersCount] = useState(0);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(res.data);

      setName(res.data.name || "");
      setPhone(res.data.phone || "");

      if (res.data.image) {
        setPreview(res.data.image);
      }

    } catch (error) {

      console.log("Profile fetch error");

    }

  };

  // ================= FETCH ORDERS =================
  const fetchOrders = async (email: string) => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const userOrders = res.data.filter(
        (o: any) => o.email === email
      );

      setOrdersCount(userOrders.length);

    } catch (error) {

      console.log("Orders fetch error");

    }

  };

  // ================= FETCH CUSTOM ORDERS =================
  const fetchCustomOrders = async (email: string) => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/custom-orders`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const userOrders = res.data.filter(
        (o: any) => o.email === email
      );

      setCustomOrdersCount(userOrders.length);

    } catch (error) {

      console.log("Custom orders fetch error");

    }

  };

  useEffect(() => {

    fetchProfile();

  }, []);

  useEffect(() => {

    if (user?.email) {

      fetchOrders(user.email);
      fetchCustomOrders(user.email);

    }

  }, [user]);

  // ================= IMAGE CHANGE =================
  const handleImageChange = (e: any) => {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  // ================= UPDATE PROFILE =================
  const updateProfile = async () => {

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("phone", phone);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Profile Updated");

      setUser(res.data.user);

      if (res.data.user.image) {
        setPreview(res.data.user.image);
      }

    } catch (error) {

      alert("❌ Update failed");

    }

  };

  // ================= CHANGE PASSWORD =================
  const changePassword = async () => {

    if (newPassword !== confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    try {

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/change-password`,
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Password Changed Successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {

      alert("❌ Password change failed");

    }

  };

  // ================= LOGOUT =================
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  if (!user) {

    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          Loading Profile...
        </div>
        <Footer />
      </>
    );

  }

  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex">

        {/* Sidebar */}

        <div className="w-[250px] bg-white shadow-lg p-6">

          <h2 className="text-xl font-bold mb-8">
            My Account
          </h2>

          <div className="flex flex-col gap-4">

            <button
              onClick={() => setActiveTab("profile")}
              className="text-left hover:text-blue-600"
            >
              Profile
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className="text-left hover:text-blue-600"
            >
              My Orders
            </button>

            <button
              onClick={() => setActiveTab("custom")}
              className="text-left hover:text-blue-600"
            >
              Custom Orders
            </button>

            <button
              onClick={() => setActiveTab("password")}
              className="text-left hover:text-blue-600"
            >
              Change Password
            </button>

            <button
              onClick={logout}
              className="text-left text-red-500"
            >
              Logout
            </button>

          </div>

        </div>

        {/* MAIN CONTENT */}

        <div className="flex-1 p-10">

          {/* PROFILE TAB */}

          {activeTab === "profile" && (

            <div className="bg-white p-10 rounded-xl shadow-lg max-w-[700px]">

              <h2 className="text-2xl font-bold mb-6">
                Profile Information
              </h2>

              <div className="flex items-center gap-6">

                {preview ? (

                  <img
                    src={preview}
                    className="w-28 h-28 rounded-full object-cover border"
                  />

                ) : (

                  <FaUserCircle className="text-[110px] text-gray-400" />

                )}

                <input
                  type="file"
                  onChange={handleImageChange}
                />

              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">

                <div>
                  <label>Name</label>
                  <input
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="border w-full p-2 rounded"
                  />
                </div>

                <div>
                  <label>Email</label>
                  <input
                    value={user.email}
                    disabled
                    className="border w-full p-2 rounded bg-gray-100"
                  />
                </div>

                <div>
                  <label>Phone</label>
                  <input
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    className="border w-full p-2 rounded"
                  />
                </div>

              </div>

              <button
                onClick={updateProfile}
                className="mt-6 bg-black text-white px-6 py-2 rounded-lg"
              >
                Save Changes
              </button>

            </div>

          )}

          {/* MY ORDERS */}

          {activeTab === "orders" && (

            <div className="bg-white p-10 rounded-xl shadow-lg max-w-[600px]">

              <h2 className="text-2xl font-bold mb-6">
                My Orders
              </h2>

              <p className="text-lg">
                Total Orders : <b>{ordersCount}</b>
              </p>

            </div>

          )}

          {/* CUSTOM ORDERS */}

          {activeTab === "custom" && (

            <div className="bg-white p-10 rounded-xl shadow-lg max-w-[600px]">

              <h2 className="text-2xl font-bold mb-6">
                Custom Orders
              </h2>

              <p className="text-lg">
                Total Custom Orders : <b>{customOrdersCount}</b>
              </p>

            </div>

          )}

          {/* PASSWORD */}

          {activeTab === "password" && (

            <div className="bg-white p-10 rounded-xl shadow-lg max-w-[600px]">

              <h2 className="text-2xl font-bold mb-6">
                Change Password
              </h2>

              <div className="flex flex-col gap-4">

                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e)=>setCurrentPassword(e.target.value)}
                  className="border p-2 rounded"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                  className="border p-2 rounded"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  className="border p-2 rounded"
                />

                <button
                  onClick={changePassword}
                  className="bg-black text-white py-2 rounded-lg"
                >
                  Update Password
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

      <Footer />

    </>

  );

};

export default Profile;