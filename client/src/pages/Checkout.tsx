import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import type { RootState } from "../app/store";
import { clearCart } from "../features/cart/cartSlice";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Checkout = () => {

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  const [formData, setFormData] = useState({
    customerName: "",
    email: "", // ⭐ EMAIL FIELD
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  // login email fallback
  const loginEmail = localStorage.getItem("userEmail");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleOrder = async () => {

    const orderData = {

      ...formData,

      // ⭐ agar user email na dale to login email use hoga
      email: formData.email || loginEmail,

      items: cartItems,

      totalPrice

    };

    try {

      await axios.post(
        "http://https://${import.meta.env.VITE_API_URL}/api/orders",
        orderData
      );

      alert("Order Placed Successfully 🎉");

      dispatch(clearCart());

    } catch (error) {

      alert("Order Failed");

    }

  };

  return (
    <>
      <Navbar />

      <div className="p-10 min-h-screen bg-gray-50 grid md:grid-cols-2 gap-10">

        {/* Shipping Form */}

        <div className="bg-white p-6 rounded-lg shadow">

          <h2 className="text-2xl font-bold mb-6">
            Shipping Details
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              name="customerName"
              placeholder="Full Name"
              onChange={handleChange}
              className="border p-3 w-full rounded"
            />

            {/* ⭐ EMAIL FIELD */}

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border p-3 w-full rounded"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="border p-3 w-full rounded"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="border p-3 w-full rounded"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="border p-3 w-full rounded"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="border p-3 w-full rounded"
            />

          </form>

        </div>

        {/* Order Summary */}

        <div className="bg-white p-6 rounded-lg shadow">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {cartItems.map((item) => (

            <div key={item._id} className="flex justify-between mb-3">

              <span>
                {item.title} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>

            </div>

          ))}

          <hr className="my-4" />

          <h3 className="text-xl font-bold mb-4">
            Total: ₹{totalPrice}
          </h3>

          <button
            onClick={handleOrder}
            className="bg-black text-white w-full py-3 rounded"
          >
            Place Order
          </button>

        </div>

      </div>

      <Footer />
    </>
  );

};

export default Checkout;