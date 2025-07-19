import React from "react";

function Navbar() {
  return (
    <nav className="w-full px-12  bg-white shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex  items-center">
          <img src="/image/.png" alt="" className="w-30"/>
        </div>

        {/* Nav Links */}
        <ul className="flex items-center gap-12 text-gray-800 font-medium">
          <li><a href="#home" className="hover:text-blue-500">Home</a></li>
          <li><a href="#about" className="hover:text-blue-500">About</a></li>
          <li><a href="#projects" className="hover:text-blue-500">Projects</a></li>
          <li><a href="#contact" className="hover:text-blue-500">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
