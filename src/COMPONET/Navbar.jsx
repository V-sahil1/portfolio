import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full px-6 md:px-12 bg-white shadow-md fixed top-0 z-50">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/image/logo.png" alt="Logo" className="w-24 h-auto" />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-10 text-gray-800 font-medium">
          <li><a href="#home" className="hover:text-blue-500">Home</a></li>
          <li><a href="#about" className="hover:text-blue-500">About</a></li>
          <li><a href="#projects" className="hover:text-blue-500">Projects</a></li>
          <li><a href="#contact" className="hover:text-blue-500">Contact</a></li>
        </ul>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-700">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 py-4 px-4 text-gray-800 font-medium bg-white shadow-md">
          <li><a href="#home" className="hover:text-blue-500" onClick={toggleMenu}>Home</a></li>
          <li><a href="#about" className="hover:text-blue-500" onClick={toggleMenu}>About</a></li>
          <li><a href="#projects" className="hover:text-blue-500" onClick={toggleMenu}>Projects</a></li>
          <li><a href="#contact" className="hover:text-blue-500" onClick={toggleMenu}>Contact</a></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
