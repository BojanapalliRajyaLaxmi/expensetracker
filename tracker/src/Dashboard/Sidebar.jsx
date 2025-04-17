import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Menu, X } from "lucide-react";

const Sidebar = ({ onAddClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full bg-gray-800 text-white p-4 fixed top-0 left-0 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-xl font-bold">TallyUp</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-lg hover:text-gray-300 transition"
          >
            Dashboard
          </Link>
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-md transition"
          >
            <Plus size={20} />
            Add Transaction
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 bg-gray-700 rounded p-4 space-y-4">
          <Link
            to="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="block text-lg hover:text-gray-300 transition"
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
              onAddClick();
              setIsMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-md transition"
          >
            <Plus size={20} />
            Add Transaction
          </button>
        </div>
      )}
    </header>
  );
};

export default Sidebar;
