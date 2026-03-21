import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import axios from "axios";
import { addToCart } from "../features/cart/cartSlice";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

interface Artwork {
  _id: string;
  title: string;
  image: string;
  price: number;
  description?: string;
  category?: {
    name: string;
  };
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [product, setProduct] = useState<Artwork | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        "https://maulik-art.onrender.com/api/artworks/${id}"
      );
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-10">Loading...</p>;

  // ✅ Add To Cart Function
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
      })
    );

    navigate("/cart"); // SPA navigation to cart page
  };

  return (
    <>
      <Navbar />

      <div className="p-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Image Section */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
        />

        {/* Details Section */}
        <div>
          <h1 className="text-4xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-gray-500 mb-4">
            Category: {product.category?.name}
          </p>

          <p className="text-2xl font-bold mb-6">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mb-8">
            {product.description ||
              "Beautiful handmade artwork."}
          </p>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Add To Cart
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;