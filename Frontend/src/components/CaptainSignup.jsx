import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";
import Swal from "sweetalert2";
function CaptainSignup() {
  const captainFirstname = useRef();
  const captainLastname = useRef();
  const captainEmail = useRef();
  const captainPassword = useRef();
  const vehicleColor = useRef();
  const plateNumber = useRef();
  const capacity = useRef();
  const type = useRef();
  const { setCaptainData } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const captainData = {
      fullname: {
        firstname: captainFirstname.current.value,
        lastname: captainLastname.current.value,
      },
      email: captainEmail.current.value,
      password: captainPassword.current.value,
      vehicle: {
        color: vehicleColor.current.value,
        plate: plateNumber.current.value,
        capacity: capacity.current.value,
        vehicleType: type.current.value,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: "Your account has been created successfully. Please log in to continue.",

          background: "#1D1D1D",
          color: "#E2E2E2",
          confirmButtonColor: "#22c55e",
        }).then((value) => {
          setCaptainData(response.data.captain);
          navigate("/captain-login");
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
      captainFirstname.current.value = "";
      captainLastname.current.value = "";
      captainEmail.current.value = "";
      captainPassword.current.value = "";
      vehicleColor.current.value = "";
      plateNumber.current.value = "";
      capacity.current.value = "";
      type.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-6">
      <div className="bg-[#1D1D1D] rounded-lg shadow-md w-full max-w-md p-5 pt-1">
        <div className="flex justify-center mb-2">
          <Link to={"/"}>
            <img
              className="w-20"
              src="https://pngimg.com/d/uber_PNG24.png"
              alt="Uber Logo"
            />
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-[#E2E2E2] text-center">
          Join Us!
        </h2>
        <p className="text-sm text-gray-400 text-center mt-2">
          Create your account to get started
        </p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="captainLoginForm space-y-5 max-h-[270px] overflow-y-auto w-full">
            {/* Name Fields */}
            <div>
              <label className="block text-sm text-gray-400">Full Name</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-1/2 px-4 py-3 bg-[#1D1D1D] text-[#E2E2E2] border-2 border-gray-800 rounded-lg 
                  focus:outline-none 
                  focus:border- focus:border-teal-500
                  mt-1"
                  ref={captainFirstname}
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-1/2 px-4 py-3 bg-[#1D1D1D] text-[#E2E2E2] border-2 border-gray-800 rounded-lg 
                  focus:outline-none 
                  focus:border- focus:border-teal-500
                  mt-1"
                  ref={captainLastname}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#1D1D1D] text-[#E2E2E2] border-2 border-gray-800 rounded-lg 
                  focus:outline-none 
                  focus:border- focus:border-teal-500
                  mt-1"
                ref={captainEmail}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-gray-400">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-[#1D1D1D] text-[#E2E2E2] border-2 border-gray-800 rounded-lg 
                  focus:outline-none 
                  focus:border- focus:border-teal-500
                  mt-1"
                ref={captainPassword}
                required
              />
            </div>

            {/* Vehicle Details Section */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Vehicle Information
              </label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <input
                  type="text"
                  placeholder="Color"
                  className="px-4 py-3 bg-[#1D1D1D] text-[#E2E2E2] border-2 border-gray-800 rounded-lg 
                  focus:outline-none 
                  focus:border- focus:border-teal-500
                  mt-1"
                  ref={vehicleColor}
                  required
                />
                <input
                  type="text"
                  placeholder="Plate Number"
                  className="px-4 py-3 bg-[#1D1D1D] text-[#E2E2E2] border-2 border-gray-800 rounded-lg 
                  focus:outline-none 
                  focus:border- focus:border-teal-500
                  mt-1"
                  ref={plateNumber}
                  required
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  className="px-4 py-3 bg-[#1D1D1D] text-[#E2E2E2] border-2 border-gray-800 rounded-lg 
                  focus:outline-none 
                  focus:border- focus:border-teal-500
                  mt-1"
                  ref={capacity}
                  required
                />
                <select
                  className="px-4 py-3 bg-[#1D1D1D] text-[#E2E2E2] border-2 border-gray-800 rounded-lg 
                  focus:outline-none 
                  focus:border- focus:border-teal-500
                  mt-1"
                  ref={type}
                  required
                >
                  <option disabled selected value="">
                    Vehicle type
                  </option>
                  <option
                    value="car"
                    className="bg-[#121212] text-white hover:bg-teal-500"
                  >
                    Car
                  </option>
                  <option
                    className="bg-[#121212] text-white hover:bg-teal-500"
                    value="auto"
                  >
                    Auto
                  </option>
                  <option
                    className="bg-[#121212] text-white hover:bg-teal-500"
                    value="bike"
                  >
                    Bike
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Sign Up
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative text-center">
            <span className="bg-[#1D1D1D] px-3 text-sm text-gray-400">or</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/captain-login"
              className="text-teal-400 hover:underline focus:ring-1 focus:ring-teal-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptainSignup;
