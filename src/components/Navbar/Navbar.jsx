import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-gray-800">
          MyShop
        </h1>

        {/* Links */}
        <ul className="flex gap-6 text-gray-600 font-medium">
          <li className="hover:text-black cursor-pointer">Home</li>
          <li className="hover:text-black cursor-pointer">Products</li>
          <li className="hover:text-black cursor-pointer">About</li>
          <li className="hover:text-black cursor-pointer">Contact</li>
        </ul>
      </div>
    </nav>
  );
}