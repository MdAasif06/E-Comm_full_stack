import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/products?search=${search}&category=${category}&sort=${sort}&page=${page}`
    );

    setProducts(res.data.products)
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, page]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Our Products</h1>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="clothing">Clothing</option>
          <option value="gadgets">Gadgets</option>
          <option value="art">Art</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price_asc">Price Low → High</option>
          <option value="price_desc">Price High → Low</option>
        </select>
      </div>

      {/* Product Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage(page - 1)}>Prev</button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default ProductListing;