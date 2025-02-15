"use client";

import { useState } from "react";
import useLocation from "../lib/useLocation";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { address } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left - Logo */}
        <h1 className="text-lg font-semibold tracking-wide">ENATEGA</h1>

        {/* Center - Location Selector (only on desktop) */}
        <div className="hidden md:flex flex-1 justify-center">
          <button className="flex items-center text-gray-600 text-sm hover:text-black transition">
            <span className="mr-1">📍</span>
            {address || "Loading..."}
            <span className="ml-1">▼</span>
          </button>
        </div>

        {/* Right - Buttons & Cart Icon */}
        <div className="hidden md:flex items-center gap-6">
          <button className="px-4 py-1 border border-gray-400 rounded-full text-gray-700 text-sm hover:bg-gray-100">
            Login
          </button>
          <button className="px-4 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600">
            Sign up
          </button>
          <button className="text-gray-700 hover:text-black transition">
            <FaShoppingBag size={18} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center bg-white border-t border-gray-200 py-4 gap-4">
          {/* Location Selector */}
          <button className="flex items-center text-gray-600 text-sm hover:text-black transition">
            <span className="mr-1">📍</span>
            {address || "Loading..."}
            <span className="ml-1">▼</span>
          </button>

          {/* Auth Buttons */}
          <button className="px-4 py-1 border border-gray-400 rounded-full text-gray-700 text-sm hover:bg-gray-100 w-32 text-center">
            Login
          </button>
          <button className="px-4 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 w-32 text-center">
            Sign up
          </button>

          {/* Cart Icon */}
          <button className="text-gray-700 hover:text-black transition">
            <FaShoppingBag size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
