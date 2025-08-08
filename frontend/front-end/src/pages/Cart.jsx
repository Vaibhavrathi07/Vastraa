import React from 'react';
import { useCart } from '../Context/CartContext'; 
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  const handleCheckout = () => {
    navigate('/checkout', { state: { totalAmount: total } });
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center bg-white rounded-lg shadow-md p-12">
          <p className="text-lg mb-4 text-gray-600">Your cart is empty</p>
          <button 
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center shadow-sm">
                <img 
                  src={item.images[0]} 
                  alt={item.name}
                  className="w-20 h-20 object-cover mr-4 rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center mx-4">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <div className="w-24 text-right">
                  <p className="font-bold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="ml-6 text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Total: ₹{total.toFixed(2)}</h2>
              <button 
                onClick={handleCheckout}
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition-transform duration-200 hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;