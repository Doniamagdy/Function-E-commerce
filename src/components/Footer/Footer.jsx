import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 text-center mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </p>
    </footer>
  );
}