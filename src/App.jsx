import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registerUser" element={<RegisterUser />} />
      <Route path="/home" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  );
}

export default App;
