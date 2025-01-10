import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useState } from "react";
import FinishRidePopUp from "./FinishRidePopUp";

function CaptainRiding() {
  const finishRideRef = useRef();

  const [finishRidePanel, setFinishRidePanel] = useState(false);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRideRef.current, { translateY: "0%" });
    } else {
      gsap.to(finishRideRef.current, { translateY: "100%" });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen relative">
      {/* Uber Logo and Logout Icon */}
      <div className="absolute p-4 flex justify-between items-center w-screen">
        <img
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber Logo"
          className="h-16 object-contain"
        />
        <Link
          to={"/captain/logout"}
          className="flex items-center justify-center w-11 h-11 rounded-full border-4 border-[#3FC3EE] text-[#3FC3EE] hover:bg-[#3FC3EE] hover:text-[#121212] transition-all duration-300 ease-in-out bg-[#1D1D1D] shadow-lg"
        >
          <i className="ri-logout-box-r-line text-2xl"></i>
        </Link>
      </div>

      {/* Top Image Section */}
      <div className="h-4/5">
        <img
          className="w-full h-full object-cover rounded-b-lg shadow-lg"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Driver Animation"
        />
      </div>

      {/* Bottom Section */}
      <div
        className="h-1/5 bg-[#1D1D1D] rounded-t-lg p-4 pt-2 flex flex-col shadow-lg gap-2"
        onClick={() => setFinishRidePanel(true)}
      >
        {/* Drag Up Indicator */}
        <div className="flex justify-center">
          <i className="ri-arrow-up-s-line text-2xl font-bold text-gray-400 cursor-pointer hover:text-[#3FC3EE] transition-all duration-300"></i>
        </div>

        {/* Distance Info */}
        <h4 className="text-center text-lg font-semibold text-[#E2E2E2]">
          4 Km away
        </h4>

        {/* Complete Ride Button */}
        <button className="w-full py-2 bg-[#3FC3EE] text-[#121212] text-lg font-semibold rounded-lg hover:bg-[#1DB4D3] transition-all duration-300 shadow-lg">
          Complete Ride
        </button>
      </div>

      <div
        className="fixed bottom-0 left-0 w-full p-6 translate-y-full bg-[#121212] z-20 shadow-lg flex flex-col gap-6"
        ref={finishRideRef}
      >
        <FinishRidePopUp setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
}

export default CaptainRiding;
