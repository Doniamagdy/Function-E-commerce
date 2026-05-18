import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  onSearch,
  className = "",
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div
      className={`flex items-center border rounded-xl px-3 py-2 bg-white shadow-sm ${className}`}
    >
      <Search className="w-5 h-5 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full outline-none px-2 text-sm bg-transparent"
      />

      {onSearch && (
        <button
          onClick={() => onSearch(value)}
          className="ml-2 bg-black text-white px-3 py-1 rounded-lg text-sm hover:opacity-90"
        >
          Search
        </button>
      )}
    </div>
  );
};

export default SearchBar;