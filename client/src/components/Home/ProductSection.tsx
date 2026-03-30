import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Artwork {
  _id: string;
  title: string;
  image: string;
  price: number;
}

const ProductSection = () => {
  const [products, setProducts] = useState<Artwork[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatest = async () => {
      const { data } = await axios.get(
        "https://maulik-art.onrender.com/api/artworks"
      );
      setProducts(data.slice(0, 12));
    };

    fetchLatest();
  }, []);

  return (
    <section className="py-16 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">
        Latest Products
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover rounded-lg mb-4 cursor-pointer"
              onClick={() =>
                navigate(`/product/${item._id}`)
              }
            />

            <h3 className="font-semibold">{item.title}</h3>
            <p className="font-bold mb-3">₹{item.price}</p>

            <button
              onClick={() =>
                navigate(`/product/${item._id}`)
              }
              className="bg-black text-white px-3 py-2 rounded w-full"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/product")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ProductSection;