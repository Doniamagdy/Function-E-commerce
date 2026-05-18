import React from 'react'

export default function ProductCard({
  image,
  title,
  price,
  description,
  category,
}) {
  return (
    <div className=" bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-50 mx-auto"
      />

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {category}
        </span>

        {/* Title */}
        <h3 className="text-md font-semibold mt-1 text-gray-800">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2">
          {description}
        </p>

        {/* Price */}
        <div className="mt-4 flex justify-end">
          <span className="text-green-600 font-bold text-lg">
            ${price}
          </span>
        </div>
      </div>
    </div>
  );
}
