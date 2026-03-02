import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 grid md:grid-cols-2 gap-10">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover rounded-xl"
      />

      <div>
        <h1 className="text-3xl font-bold mb-4">
          {product.title}
        </h1>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <p className="text-2xl text-red-600 font-bold mb-6">
          ₹ {product.price}
        </p>

        <button className="bg-red-600 text-white px-6 py-3 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;