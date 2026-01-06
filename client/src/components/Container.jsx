import React from "react";
import { assets } from "@/assets/assets";
import { useNavigate } from "react-router-dom";
const Container = ({ children, className }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex justify-center items-center min-h-screen  ${className} bg-gradient-to-br from-blue-200 to-purple-400`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="App Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      {children}
    </div>
  );
};

export default Container;
