import { Link } from "react-router-dom";

function ProductCard({ product }) {

  console.log(product.image);

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-lg transition duration-300 overflow-hidden bg-white">

      <img
        src={product.image?.url}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.title}
        </h3>

        <p className="text-blue-600 font-bold mb-3">
          ₹{product.price}
        </p>

        <Link to={`/product/${product._id}`}>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            View Details
          </button>
        </Link>

      </div>
    </div>
  );
}

export default ProductCard;