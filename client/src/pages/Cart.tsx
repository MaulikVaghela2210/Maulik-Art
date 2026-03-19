import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="p-10 min-h-screen bg-gray-50">

        <h1 className="text-3xl font-bold mb-6">
          Your Cart
        </h1>

        {cartItems.length === 0 && (
          <p className="text-gray-600">
            Cart is empty
          </p>
        )}

        {cartItems.map((item) => (

          <div
            key={item._id}
            className="flex items-center justify-between bg-white p-4 mb-4 shadow rounded-lg"
          >

            <div className="flex items-center gap-4">

              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div>

                <h2 className="font-semibold text-lg">
                  {item.title}
                </h2>

                <p className="text-gray-600">
                  ₹{item.price}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={() => dispatch(decreaseQty(item._id))}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                -
              </button>

              <span className="font-medium">
                {item.quantity}
              </span>

              <button
                onClick={() => dispatch(increaseQty(item._id))}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                +
              </button>

              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="bg-red-500 text-white px-3 py-1 rounded ml-4"
              >
                Remove
              </button>

            </div>

          </div>

        ))}

        {cartItems.length > 0 && (

          <div className="text-right mt-6 space-y-4">

            <h2 className="text-2xl font-bold">
              Total: ₹{totalPrice}
            </h2>

            <div className="flex justify-end gap-4">

              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-600 text-white px-6 py-2 rounded"
              >
                Clear Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-black text-white px-6 py-2 rounded"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>

        )}

      </div>

      <Footer />
    </>
  );
};

export default Cart;