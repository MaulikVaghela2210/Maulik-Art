import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

interface Artwork {
  _id: string;
  title: string;
  image: string;
  price: number;
  category?: {
    name: string;
  };
}

const filterOptions = [
  "Painting",
  "Sketch",
  "Sculpture",
  "Acrylic",
  "Watercolor",
  "3D Art",
  "Canvas",
  "HomeDecor",
];

const Product = () => {
  const [products, setProducts] = useState<Artwork[]>([]);
  const [filtered, setFiltered] = useState<Artwork[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://https://${import.meta.env.VITE_API_URL}/api/artworks"
      );
      setProducts(data);
      setFiltered(data);
    };

    fetchProducts();
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let temp = [...products];

    if (selectedFilters.length > 0) {
      temp = temp.filter((p) =>
        selectedFilters.includes(p.category?.name || "")
      );
    }

    // SORTING
    if (sortOption === "low-high") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      temp.sort((a, b) => b.price - a.price);
    } else if (sortOption === "a-z") {
      temp.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "z-a") {
      temp.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFiltered(temp);
  }, [selectedFilters, sortOption, products]);

  const handleFilterChange = (value: string) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          Our Products
        </h1>

        <div className="flex gap-8">

          {/* LEFT FILTER */}
          <div className="w-1/4 bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Filters</h3>

            {filterOptions.map((item) => (
              <div key={item} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handleFilterChange(item)}
                />
                <label>{item}</label>
              </div>
            ))}
          </div>

          {/* RIGHT PRODUCTS */}
          <div className="w-3/4">

            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-6">
              <p className="font-semibold">
                {filtered.length} Products
              </p>

              <select
                className="border p-2 rounded"
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="low-high">Price Low to High</option>
                <option value="high-low">Price High to Low</option>
                <option value="a-z">Title A to Z</option>
                <option value="z-a">Title Z to A</option>
              </select>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid md:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow hover:shadow-xl transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-56 w-full object-cover rounded-t-xl cursor-pointer"
                    onClick={() =>
                      navigate(`/product/${item._id}`)
                    }
                  />

                  <div className="p-4">
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {item.category?.name}
                    </p>

                    <p className="font-bold text-lg mb-3">
                      ₹{item.price}
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/product/${item._id}`)
                      }
                      className="bg-black text-white w-full py-2 rounded"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Product;