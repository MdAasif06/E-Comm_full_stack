import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    sizes: "",
  });
  console.log(product);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("image", image);
    const sizes = [
      { size: 6, stock: product.stock },
      { size: 7, stock: product.stock },
      { size: 8, stock: product.stock },
    ];

    formData.append("sizes", JSON.stringify(sizes));

    try {
      const res = await API.post("/products/add-product", formData);

      alert("Product Added Successfully");
      navigate("/");
      // fields reset
      setProduct({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        sizes: "",
      });

      setImage(null);
      setPreview(null);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            placeholder="Product Title"
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Formal">Formal</option>
            <option value="Sports">Sports</option>
            <option value="Casual">Casual</option>
            <option value="Fitness">Fitness</option>
          </select>

          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* Image Upload */}

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full"
            required
          />

          {/* Image Preview */}

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover rounded"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
