import React, { useState } from "react";
import { TextField } from "@mui/material";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    if (!email || !password) {
      if (!email) setEmailError("Please enter your email.");
      if (!password) setPasswordError("Please enter your password.");
      return;
    }

    if (email === "abc" && password === "0000") {
      navigate("/home");
    } else {
      setLoginError("Your password or username is incorrect.");
    }
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white py-12 px-6 md:px-12 rounded-lg shadow-lg w-10/12 md:w-1/4">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-32 md:w-48" />
        </div>

        <h2 className="text-center text-3xl md:text-4xl font-semibold text-rose-pink mb-8">
          LogIn
        </h2>

        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          className="!mt-6 !mb-8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />

        <button
          onClick={handleLogin}
          className="bg-rose-pink w-full h-12 rounded-md hover:bg-dark-pink text-white transition-all duration-300"
        >
          SIGN IN
        </button>

        {loginError && (
          <div className="text-sm md:text-base text-center text-red-500 mt-4">{loginError}</div>
        )}

        <div className="text-center mt-8">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={handleCreateAccount}
              className="text-pink-600 hover:underline"
            >
              Create an account
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
