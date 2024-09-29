import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";

const Search = () => {
  const [query, setQuery] = useState(""); // State for search query
  const dispatch = useDispatch();
  const { products, message, loading } = useSelector((state) => state.products); // Accessing products, loading state, and message from Redux

  // Handle search action
  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchProducts(null, 1, query)); // Fetch products based on the search query
    } else {
      dispatch(fetchProducts(null, 1)); // If no query, fetch default products
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper flex space-x-4 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="border p-2 rounded-md w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Loading spinner */}
      {loading && <p>Loading...</p>}

      
      {/* Display message if no products are found */}
      {!loading && products.length === 0 && (
        <p className="no-results-message text-red-500">Oops, we don't have that!</p>
      )}
    </div>
  );
};

export default Search;
