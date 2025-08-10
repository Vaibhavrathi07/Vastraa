import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.post(
      `${apiUrl}/api/user/login`,
      { email: formData.email, password: formData.password },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data) {
      // Store tokens
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      // Update parent component's user state
      if (onLoginSuccess) {
        onLoginSuccess(response.data.data); // Pass user data to App.jsx
      }
      
      toast.success("Login successful!");
      navigate("/"); // Redirect to home
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md p-8 bg-white rounded-lg border-2 border-gray-600"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
        
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 bg-gray-800 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
      <Toaster position="top-center" />
    </section>
  );
};

export default Login;