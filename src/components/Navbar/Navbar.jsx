
import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to={"/"} className="text-xl font-bold text-gray-800">
          MyShop
        </Link>

        {/* Links */}
        <h2 className="flex gap-6 text-gray-600 font-medium">
          Enjoy shopping 
        </h2>
      </div>
    </nav>
  );
}