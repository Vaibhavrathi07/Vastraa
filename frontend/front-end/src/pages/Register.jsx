import React, { useState } from "react";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import axios from "axios";
import { Navigate } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  setIsLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/register",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 5000
      }
    );
    if (response.data) {
      toast.success("Registration successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setRedirect(true);
    } else {
      toast.error("Unexpected response from server");
    }

  } catch (error) {
   
    if (error.response) {
      toast.error(error.response.data?.message || "Registration failed");
    } else if (error.message.includes("User registered")) {
      toast.success("Registration successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      // Other errors
      toast.error(error.message || "Registration failed");
    }
  } finally {
    setIsLoading(false);
  }
};
if(redirect) {
  return <Navigate to="/login" />;
}

  return (
    <>
      <section className="register container mx-auto p-4 mt-6 mb-6 border-2 w-full md:w-1/2 border-gray-400 rounded-lg">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold mb-4">Welcome to Vastraa</h1>
          <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-gray-500 outline-none rounded-md p-2"
                required
              />
              
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Enter your Email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-gray-500 outline-none rounded-md p-2"
                required
              />
              
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Enter your Password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="border-2 border-gray-500 outline-none rounded-md p-2"
                required
                minLength="6"
              />
              
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border-2 border-gray-500 outline-none rounded-md p-2 mb-4"
                required
                minLength="6"
              />
            </div>
            
            <button 
              type="submit"
              className={`bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            
            <p className="text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </section>
      <Toaster 
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
      />
    </>
  );
};

export default Register;