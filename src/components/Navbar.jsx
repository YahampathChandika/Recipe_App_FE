import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2"; // Import Swal for logout confirmation
import logo from "../assets/images/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.firstName);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Logout",
      customClass: {
        popup: "w-10/12 max-w-xs md:max-w-lg",
        title: "text-lg md:text-2xl",
        icon: "text-sm md:text-lg",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/");
      }
    });
  };

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
          {username || "User"}
        </span>
        <span
          onClick={handleLogout}
          className="material-symbols-outlined text-dark-pink transition-all duration-300 hover:text-rose-pink text-2xl cursor-pointer"
        >
          logout
        </span>
      </div>
    </nav>
  );
}
