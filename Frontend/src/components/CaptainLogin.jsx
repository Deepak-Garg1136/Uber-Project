import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";
import Swal from "sweetalert2";
function CaptainLogin() {
  const captainEmail = useRef();
  const captainPassword = useRef();

  const navigate = useNavigate();
  const { setCaptainData } = useContext(CaptainDataContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: captainEmail.current.value,
      password: captainPassword.current.value,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        data
      );

      if (response.status === 200) {
        setCaptainData(response.data.captain);
        // logout(false);
        localStorage.setItem("token", response.data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
          background: "#1D1D1D",
          color: "#E2E2E2",
          confirmButtonColor: "#ff6b6b",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "An unexpected error occurred. Please try again.",
          background: "#1D1D1D",
          color: "#E2E2E2",
          confirmButtonColor: "#ff6b6b",
        });
      }
    } finally {
      captainEmail.current.value = "";
      captainPassword.current.value = "";
    }
    setCaptainData(data);

    // Reset the input fields
    captainEmail.current.value = "";
    captainPassword.current.value = "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-6">
      {/* Card Container */}
      <div className="bg-[#1D1D1D] rounded-lg shadow-md w-full max-w-md p-5 pt-1">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Link to={"/"}>
            <img
              className="w-20"
              src="https://pngimg.com/d/uber_PNG24.png"
              alt="Uber Logo"
            />
          </Link>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-[#E2E2E2] text-center">
          Welcome back, Captain!
        </h2>
        <p className="text-sm text-gray-400 text-center mt-2">
          Log in to access your account
        </p>

        {/* Login Form */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="captainemail"
              className="block text-sm text-gray-400"
            >
              Email Address
            </label>
            <input
              type="email"
              id="captainEmail"
              name="captainEmail"
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-1 bg-[#1D1D1D] text-[#E2E2E2] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              ref={captainEmail}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="captainPassword"
              className="block text-sm text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="captainPassword"
              name="captainPassword"
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-1 bg-[#1D1D1D] text-[#E2E2E2] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              ref={captainPassword}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative text-center">
            <span className="bg-[#1D1D1D] px-3 text-sm text-gray-500">or</span>
          </div>
        </div>

        {/* Alternative Sign-In Option */}
        <Link
          to={"/login"}
          className="flex justify-center items-center w-full py-3 bg-[#1D1D1D] text-[#E2E2E2] font-medium rounded-lg shadow-md hover:bg-[#1D1D1D] transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Sign in as User
        </Link>

        {/* New Here Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Want to join a fleet?{" "}
            <Link
              to={"/captain-signup"}
              className="font-medium text-teal-400 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptainLogin;
