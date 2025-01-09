import React from "react";

function Background() {
  return (
    <div className="bg-[#121212] w-full h-screen flex flex-col items-center justify-center space-y-8">
      {/* Pulsating Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Logo"
        className="w-32 animate-pulse"
      />

      {/* Loading Text with Typing Effect */}

      {/* Bouncing Gradient Balls */}
      <div className="flex space-x-3 mt-8">
        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 animate-bounce"></div>
        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-bounce delay-150"></div>
        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce delay-300"></div>
      </div>
    </div>
  );
}

export default Background;
