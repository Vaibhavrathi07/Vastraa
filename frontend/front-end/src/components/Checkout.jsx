import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext'; 

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = React.useState('upi');
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  if (!location.state?.totalAmount) {
    navigate('/cart');
    return null;
  }

  const totalAmount = location.state.totalAmount;

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!scriptLoaded) {
        alert('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      const orderResponse = await fetch('http://localhost:4000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }),
      });

      if (!orderResponse.ok) {
        alert('Failed to create order.');
        setLoading(false);
        return;
      }

      const orderData = await orderResponse.json();

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: 'INR',
        name: 'Your Awesome Store',
        description: 'Test Transaction',
        image: 'https://placehold.co/100x100/2563EB/FFFFFF?text=Store',
        order_id: orderData.id,
        handler: async function (response) {
          const verificationResponse = await fetch('http://localhost:4000/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const result = await verificationResponse.json();
          if(result.success) {
            alert('Payment successful! Thank you for your order.');
            clearCart();
            navigate('/men');
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        alert(`Payment failed: ${response.error.description}`);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred during payment processing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Complete Your Payment</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6 pb-4 border-b">
          <div className="flex justify-between text-lg">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-bold text-gray-800">₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
        <div className="space-y-3">
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
            <input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="form-radio h-5 w-5 text-blue-600"/>
            <span className="ml-4 text-lg">UPI / QR Code</span>
          </label>
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
            <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="form-radio h-5 w-5 text-blue-600"/>
            <span className="ml-4 text-lg">Credit / Debit Card</span>
          </label>
        </div>

        <div className="mt-8">
          <button 
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition-all duration-300 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : `Pay ₹${totalAmount.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;