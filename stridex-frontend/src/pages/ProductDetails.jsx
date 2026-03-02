import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { cartItems } = useCart();

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
    console.log("Cart Updated:", cartItems);
  }, [id, cartItems]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  const handleBuyNow = async () => {
    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    const selectedSizeObj = product.sizes.find((s) => s.size === selectedSize);

    if (!selectedSizeObj || quantity > selectedSizeObj.stock) {
      alert("Not enough stock");
      return;
    }

    try {
      const { data } = await API.post("/orders/checkout", {
        productId: product._id,
        size: selectedSize,
        quantity,
      });

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 grid md:grid-cols-2 gap-10">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-84 object-cover rounded-xl"
      />

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

        <p className="text-gray-600 mb-4">{product.description}</p>

        <p className="text-2xl text-red-600 font-bold mb-6">
          ₹ {product.price}
        </p>

        {/* Size Selection */}
        <div className="mb-4">
          <p className="font-semibold mb-2">Select Size:</p>
          <div className="flex gap-2">
            {product.sizes.map((s) => (
              <button
                key={s.size}
                onClick={() => setSelectedSize(s.size)}
                className={`px-3 py-1 border rounded ${
                  selectedSize === s.size ? "bg-red-600 text-white" : ""
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <input
            type="number"
            min="1"
            // max={selectedSizeObj?.stock || 1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 w-24"
          />
        </div>

        <button
          onClick={() => {
            if (!selectedSize) {
              alert("Please select size");
              return;
            }
            addToCart(product, selectedSize, quantity);
            alert("Added to cart");
          }}
          className="bg-red-600 text-white px-6 py-3 rounded"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
