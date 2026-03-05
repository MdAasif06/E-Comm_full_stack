import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      console.log(data); 
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-600">
        Our Collection 👟
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
          >
            <img
              src={product.image.url}
              alt={product.title}
              className="h-48 w-full object-cover rounded"
            />

            <h2 className="mt-4 font-semibold text-lg">{product.title}</h2>

            <p className="text-gray-600 text-sm">{product.category}</p>

            <p className="text-red-600 font-bold mt-2">₹ {product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
