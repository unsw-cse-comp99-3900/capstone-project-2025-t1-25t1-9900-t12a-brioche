import React from "react";

const Button = ({ text, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
