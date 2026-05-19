import React from "react";

export default function Button({
  text,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-orange-400 text-white mx-2 px-4 py-2 font-medium transition-all duration-200 hover:opacity-90 cursor-pointer active:scale-95 rounded-lg ${className}`}
    >
      {text}
    </button>
  );
}
