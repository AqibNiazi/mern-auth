import React from "react";

const Button = ({ children, type }) => {
  return (
    <button
      className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer"
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
