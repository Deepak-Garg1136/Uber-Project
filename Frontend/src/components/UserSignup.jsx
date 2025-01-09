// TODO :- Strong password and Button enable and disable

import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Signup() {
  const userFirstname = useRef();
  const userLastname = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      fullname: {
        firstname: userFirstname.current.value,
        lastname: userLastname.current.value,
      },
      email: userEmail.current.value,
      password: userPassword.current.value,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        data
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: "Your account has been created successfully. Please log in to continue.",

          background: "#1D1D1D",
          color: "#E2E2E2",
          confirmButtonColor: "#22c55e",
        }).then((value) => {
          navigate("/login");
        });
      }
    } catch (error) {
      const err = error.response?.data;

      let str = "";
      if (err.errors) {
        const err = error.response.data.errors;
        err.forEach((error) => {
          str += error.msg + ".\n";
        });
      } else if (err.message) {
        str = err.message;
      }

      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: str != "" ? str : "An error occurred. Please try again.",
        background: "#1D1D1D",
        color: "#E2E2E2",
        confirmButtonColor: "#ff6b6b",
      });
    } finally {
      userFirstname.current.value = "";
      userLastname.current.value = "";
      userEmail.current.value = "";
      userPassword.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-6">
      {/* Card Container */}
      <div className="bg-[#1D1D1D] rounded-lg shadow-md w-full max-w-md p-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to={"/"}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber Logo"
              className="w-28"
            />
          </Link>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-[#E2E2E2] text-center">
          Join us!
        </h2>
        <p className="text-sm text-gray-400 text-center mt-2">
          Create your account to get started
        </p>

        {/* Signup Form */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm text-gray-400"
              htmlFor="captainfirstname"
            >
              Full Name
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="userFirstname"
                name="userFirstname"
                placeholder="First name"
                className="w-1/2 px-4 py-3 mt-1 bg-[#1D1D1D] text-[#E2E2E2] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                ref={userFirstname}
                required
              />
              <input
                type="text"
                id="userLastname"
                name="userLastname"
                placeholder="Last name"
                className="w-1/2 px-4 py-3 mt-1 bg-[#1D1D1D] text-[#E2E2E2] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                ref={userLastname}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-1 bg-[#1D1D1D] text-[#E2E2E2] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              ref={userEmail}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 mt-1 bg-[#1D1D1D] text-[#E2E2E2] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              ref={userPassword}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative text-center">
            <span className="bg-[#1D1D1D] px-3 text-sm text-gray-400">or</span>
          </div>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-teal-400 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
