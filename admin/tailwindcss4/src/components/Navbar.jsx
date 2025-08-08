import React from 'react';
import logo from '../assets/logo.png';

const Navbar = ({ setToken }) => {
  return (
    <nav className="bg-gray-900 shadow-md fixed w-full z-10 top-0 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <img 
              src={logo} 
              alt="logo" 
              className="h-10 w-auto" 
            />
            <span className="ml-3 text-xl font-semibold text-white hidden md:block">
              Admin Panel
            </span>
          </div>


          <div className="flex items-center space-x-4">
            <button onClick={() => setToken('')} className="bg-gray-600 hover:bg-gray-500  text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;