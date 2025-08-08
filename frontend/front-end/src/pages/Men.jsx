import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Men = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Men's Collection</h1>
      
      {/* Subcategory Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/Men/All')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          All
        </button>
        <button 
          onClick={() => navigate('/Men/TopWear')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Top Wear
        </button>
        <button 
          onClick={() => navigate('/Men/BottomWear')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Bottom Wear
        </button>
        <button 
          onClick={() => navigate('/Men/Accessories')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Accessories
        </button>
      </div>

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Men;