import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/Search.jsx";
import axios from "axios";

const ProductSearchPage = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const location = useLocation();
  const mockSearch = (query) => {
    const ProductData = axios.get(`{apiUrl}/api/products/list-products`);
    return ProductData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };
const handleCart = () => {
  alert("Product added to cart!");
  setCartItems([...cartItems, results]);

}
  // Handle search submission
  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setTimeout(() => {
      const searchResults = mockSearch(query);
      setResults(searchResults);
      setIsLoading(false);
    }, 500);
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");
    if (query) {
      handleSearch(query);
    }
  }, [location.search]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Search</h1>

      {/* Search component with current query */}
      <Search
        onSearch={handleSearch}
        isLoading={isLoading}
        initialQuery={searchQuery}
      />

      {/* Results display */}
      <div className="mt-6">
        {isLoading ? (
          <p className="text-gray-500">Searching...</p>
        ) : results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((item) => (
              <li
                key={item.id}
                className="p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex justify-between">
                  <span>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.price}</p>
                  </span>
                  <div className="flex gap-6">
                    <span>
                      <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleCart}>
                        Add to Cart
                      </button>
                    </span>
                    <span>
                      <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Buy Now
                      </button>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : searchQuery ? (
          <p className="text-gray-500">No results found for "{searchQuery}"</p>
        ) : (
          <p className="text-gray-500">Enter a search term to find products</p>
        )}
      </div>
    </div>
  );
};

export default ProductSearchPage;
