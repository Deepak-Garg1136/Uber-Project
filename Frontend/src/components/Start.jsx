import React from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://img.freepik.com/premium-photo/traffic-laws-burning-traffic-light-ai-generative_955712-4584.jpg)] h-screen w-full flex flex-col justify-between">
        {/* Logo Section */}
        <div className="pt-8 pl-8">
          <Link to={"/"}>
            <img
              className="w-20"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber Logo"
            />
          </Link>
        </div>

        {/* Content Section */}
        <div
          className="bg-white px-6 py-6
         rounded-t-2xl shadow-lg flex flex-col justify-center items-center"
        >
          <h2 className="font-bold text-3xl text-gray-800 text-center">
            Get Started with Uber
          </h2>
          <p className="text-gray-600 text-sm mt-2 text-center">
            Join us and experience a new way of traveling.
          </p>
          <Link
            to={"/login"}
            className="flex justify-center items-center w-full bg-black text-white text-lg font-semibold py-3 rounded-lg mt-6 shadow-md hover:bg-gray-800 transition duration-300"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
