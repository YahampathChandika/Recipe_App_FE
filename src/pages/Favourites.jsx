import React from "react";
import Navbar from "../components/Navbar";

export default function Favourites() {
  return (
    <div className="bg-blush-white min-h-screen">
      <Navbar userName="User Name" />
      <div className="px-4 md:px-24">
      Favourites
      </div>
    </div>
  );
}
