import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useAddUserMutation } from "../store/api/userApi";
import Swal from "sweetalert2";

export default function RegisterUser() {
  const navigate = useNavigate();
  const [registerUser] = useAddUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("User registered:", data);

    try {
      const response = await registerUser(data);
      if (response?.data && !response?.data?.error) {
        reset();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "User Registered!",
        });
        navigate("/");
      } else {
        console.log("User Adding failed!", response);
        Swal.fire({
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Failed to add record!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Failed to add record!", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add record!",
      });
    }
  };

  const handleLoginRedirect = () => {
    navigate("/");
  };

  useEffect(() => {
    document.title = "Register | Cook";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white py-12 px-6 md:px-12 rounded-lg shadow-lg w-10/12 md:w-2/5">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-32 md:w-48" />
        </div>
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-rose-pink mb-8">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              {...register("firstName", { required: "First name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              {...register("lastName", { required: "Last name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              {...register("phoneNumber", { required: "Phone number is required" })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </div>

          <button
            type="submit"
            className="bg-rose-pink w-full h-12 rounded-md hover:bg-dark-pink text-white transition-all duration-300"
          >
            Register
          </button>

          {errors.form && (
            <div className="text-center text-red-500 mt-4">
              {errors.form.message}
            </div>
          )}

          <div className="text-center mt-8">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={handleLoginRedirect}
                className="text-pink-600 hover:underline"
              >
                Login
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
