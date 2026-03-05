import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      {/* <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      /> */}

      <img
        src={product.image?.url}
        alt={product.title}
        className="w-full h-64 object-cover rounded-lg"
      />

      <h3>{product.title}</h3>

      <p>₹{product.price}</p>

      <Link to={`/product/${product._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;
