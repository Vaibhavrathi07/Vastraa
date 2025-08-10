import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useCart } from '../Context/CartContext';
const kids = () => {
  const [products, setProducts] = useState([]);
   const navigate=useNavigate();
  const { addToCart, removeFromCart } = useCart();
  const apiUrl = import.meta.env.VITE_API_URL;
 
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`{apiUrl}/api/products/list-products`);
      const KidsProduct = response.data.products.filter(product => product.category === "Kids");
      setProducts(KidsProduct.map(p => ({ ...p, quantity: 1 }))); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    addToCart(product);
    navigate("/cart");
  };

  const handleRemoveFromCart = (product) => {
    console.log('Removed from cart:', product);
    removeFromCart(product);
  };

  const increaseQuantity = (product) => {
    setProducts(products.map(p => 
      p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
    ));
  };

  const decreaseQuantity = (product) => {
    setProducts(products.map(p => 
      p._id === product._id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p
    ));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Kids Collection</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className=" overflow-hidden  hover:shadow-lg hover:scale-105 hover:bg-gray-100 transform transition-shadow">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full object-cover h-48  "
            />
            
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <p className="text-lg font-semibold mb-3">Rs. {product.price} </p>
              
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => decreaseQuantity(product)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(product)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <span className="font-medium">
                Rs.  {(product.price * product.quantity)} 
                </span>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-sky-500 text-white px-3 py-1 rounded flex-1 hover:bg-sky-600"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => removeFromCart(product)}
                  className="bg-gray-500 text-white px-3 py-1 rounded flex-1 hover:bg-gray-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default kids;