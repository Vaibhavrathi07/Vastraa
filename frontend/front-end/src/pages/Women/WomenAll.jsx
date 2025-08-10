import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const WomenAll = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
    const apiUrl = import.meta.env.VITE_API_URL;
 
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/products/list-products`);
      const menWProducts = response.data.products.filter(product => (
        product.category === "Women"
      ));
      setProducts(menWProducts.map(p => ({ ...p, quantity: 1 }))); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-8 text-center">Women's Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div 
            key={product._id} 
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative pt-[100%] overflow-hidden">
              <img 
                src={product.images?.[0] || product.image} 
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                }}
              />
            </div>
            
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">Rs. {product.price.toFixed(2)}</p>
              
              
              <button 
                onClick={() => addToCart(product)}
                className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-200 w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenAll;