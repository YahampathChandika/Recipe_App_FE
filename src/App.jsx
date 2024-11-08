import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registerUser" element={<RegisterUser />} />
      </Routes>
    </Router>
  );
}

export default App;
