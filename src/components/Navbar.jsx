import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between bg-white-snow px-5 md:px-32 py-4 shadow-md w-full">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-16 md:w-24" />
      </div>
      <div className="flex space-x-5 md:space-x-24">
        <button
          onClick={() => navigate("/home")}
          className={`${
            location.pathname === "/home"
              ? "text-rose-pink underline underline-offset-8"
              : "text-dark-pink"
          } transition-all duration-300 hover:text-rose-pink font-medium md:text-xl`}
        >
          Home
        </button>
        <button
          onClick={() => navigate("/favourites")}
          className={`${
            location.pathname === "/favourites"
              ? "text-rose-pink underline underline-offset-8"
              : "text-dark-pink"
          } transition-all duration-300 hover:text-rose-pink font-medium md:text-xl`}
        >
          Favourites
        </button>
      </div>
      <div className="flex items-center md:space-x-6">
        <span className="text-dark-pink font-medium hidden md:inline text-xl">
          Thomas Shelby
        </span>
        <span
          onClick={() => navigate("/logout")}
          className="material-symbols-outlined text-dark-pink transition-all duration-300 hover:text-rose-pink text-2xl cursor-pointer"
        >
          logout
        </span>
      </div>
    </nav>
  );
}
