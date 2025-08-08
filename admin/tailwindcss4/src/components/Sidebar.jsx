// Sidebar component
// Sidebar component
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed left-4 top-18 z-20 bg-gray-800 text-white p-2 rounded"
      >
        ☰
      </button>
      <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-800 text-white p-4 z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300`}>
        <nav className="flex flex-col gap-2">
          <NavLink 
            to="/add" 
            className={({ isActive }) => 
              `p-2 hover:bg-gray-700 rounded ${isActive ? 'bg-gray-600' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            Add Items
          </NavLink>
          <NavLink 
            to="/list-items" 
            className={({ isActive }) => 
              `p-2 hover:bg-gray-700 rounded ${isActive ? 'bg-gray-600' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            List Items
          </NavLink>
          <NavLink 
            to="/Orders" 
            className={({ isActive }) => 
              `p-2 hover:bg-gray-700 rounded ${isActive ? 'bg-gray-600' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            Orders
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
