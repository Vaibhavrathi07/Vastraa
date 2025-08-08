import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import logo from "../assets/images/icons/logo.png";
import { FiSearch } from "react-icons/fi";
import { useCart } from "../Context/CartContext"; 


const Header = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:hidden">
          <Link to="/" className="h-10 flex items-center">
            <img
              src={logo}
              alt="logo"
              className="h-full w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center"
                >
                  <CgProfile className="text-2xl" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
  <Link
    to="/dashboard/profile"
    className="block px-4 py-2 hover:bg-gray-100"
  >
    My Profile
  </Link>
  <Link
    to="/orders"
    className="block px-4 py-2 hover:bg-gray-100"
  >
    My Orders
  </Link>
  <button
    onClick={handleLogout}
    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
  >
    <CgLogOut /> Logout
  </button>
</div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hover:text-emerald-300">
                <CgProfile className="text-2xl" />
              </Link>
            )}

            <Link to="/wishlist" className="hover:text-emerald-300">
              <CiHeart className="text-2xl" />
            </Link>

            <Link to="/cart" className="hover:text-emerald-300">
              <MdOutlineShoppingBag className="text-2xl" />
            </Link>
          </div>
        </div>

        {/* Search Bar (Mobile - Below) */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="px-4 py-2 w-full rounded-l-md bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-500 text-white px-4 py-2 rounded-r-md hover:bg-emerald-600"
            >
              <FiSearch />
            </button>
          </form>
        </div>

        {/* Desktop Layout - All in one row */}
        <div className="hidden md:flex items-center justify-between py-3 gap-6">
          {/* Logo */}
          <Link to="/" className="h-10 flex-shrink-0">
            <img
              src={logo}
              alt="logo"
              className="h-full w-auto ml-20 object-contain"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl px-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="px-4 py-2 w-full rounded-l-md bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-500 text-white px-4 py-2 rounded-r-md hover:bg-emerald-600"
              >
                <FiSearch />
              </button>
            </form>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative group">
                <div className="flex items-center gap-1 cursor-pointer">
                  <CgProfile className="text-2xl" />
                  <span className="text-sm">{user.name.split(' ')[0]}</span>
                </div>
               <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
  <Link
    to="/dashboard/profile"
    className="block px-4 py-2 hover:bg-gray-100"
  >
    My Profile
  </Link>
  <Link
    to="/orders"
    className="block px-4 py-2 hover:bg-gray-100"
  >
    My Orders
  </Link>
  <button
    onClick={handleLogout}
    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
  >
    <CgLogOut /> Logout
  </button>
</div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 hover:text-emerald-300"
              >
                <CgProfile className="text-2xl" />
                <span className="text-sm">Login</span>
              </Link>
            )}

            <Link
              to="/wishlist"
              className="flex items-center gap-1 hover:text-emerald-300"
            >
              <CiHeart className="text-2xl" />
              <span className="text-sm">Wishlist</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-1 hover:text-emerald-300"
            >
              <MdOutlineShoppingBag className="text-2xl" />

              <span className="text-sm">{cartItems.length} Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;