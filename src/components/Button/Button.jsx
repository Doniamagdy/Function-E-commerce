export default function Button({
  text,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      
    className="bg-gray-600 text-white mx-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-90 active:scale-95 "
    
    >
      {text}
    </button>
  );
}