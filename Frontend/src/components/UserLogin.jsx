import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";
import Swal from "sweetalert2";

function UserLogin() {
  const userEmail = useRef();
  const userPassword = useRef();
  const { setUserData, logout, isLoggedOut } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: userEmail.current.value,
      password: userPassword.current.value,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        data
      );

      if (response.status === 200) {
        setUserData(response.data.user);
        logout(false);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Unable to authenticate. Check your credentials.",
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
      userEmail.current.value = "";
      userPassword.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-6">
      {/* Card Container */}
      <div
        className={`bg-[#1D1D1D] rounded-lg shadow-md w-full max-w-md ${
          isLoggedOut ? "p-5" : "p-6"
        }`}
      >
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
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-400 text-center mt-2">
          Log in to access your account
        </p>

        {isLoggedOut && (
          <div
            className="bg-[#1D372A] border-l-4 border-teal-500 text-teal-400 rounded-lg shadow-md mt-3 p-2 text-center"
            role="alert"
          >
            <p className="font-bold text-teal-300">Logout Successful!</p>
          </div>
        )}

        {/* Login Form */}
        <form
          className={`${isLoggedOut ? "mt-3 space-y-4" : "mt-6 space-y-5"} `}
          onSubmit={handleSubmit}
        >
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
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-1 bg-[#1D1D1D] text-[#E2E2E2] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              ref={userPassword}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
            <span className="bg-[#1D1D1D] px-3 text-sm text-gray-400">or</span>
          </div>
        </div>

        {/* Alternate Login */}
        <Link
          to={"/captain-login"}
          className="flex justify-center items-center w-full py-3 bg-[#1D1D1D] text-gray-400 font-medium rounded-lg shadow-md hover:bg-[#1D1D1D] hover:text-teal-500 transition duration-300"
        >
          Sign in as Captain
        </Link>

        {/* Signup */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            New here?{" "}
            <Link
              to={"/signup"}
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

export default UserLogin;
