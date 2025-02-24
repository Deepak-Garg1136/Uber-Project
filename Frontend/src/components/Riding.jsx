import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../context/socketContext";
import LiveTracking from "./LiveTracking";

function Riding() {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { ride } = location.state || { ride: {} };

  socket.on("ride-ended", () => {
    navigate("/home");
  });
  return (
    <div className="h-screen bg-[#121212]">
      {/* Home Icon */}

      <div className="absolute p-4 top-3 flex justify-between items-center w-screen">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-20"
        />
        <Link
          to={"/home"}
          className="absolute top-2 right-3 flex items-center justify-center w-11 h-11 rounded-full border-4 border-[#3FC3EE] text-[#3FC3EE] hover:bg-[#3FC3EE] hover:text-[#121212] transition-all duration-300 ease-in-out bg-[#1D1D1D]"
        >
          <i className="ri-home-9-fill text-2xl"></i>
        </Link>
      </div>
      {/* Top Image Section */}
      <div className="h-1/2">
        {/* <LiveTracking/> use his in plave of image */}
        <img
          className="w-full h-full object-cover "
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Driver Animation"
        />
      </div>

      {/* Bottom Section */}
      <div className="h-1/2 bg-[#1D1D1D] rounded-t-lg p-4 flex flex-col gap-3 shadow-lg">
        {/* Driver Details */}
        <div className="bg-[#292929] p-4 rounded-lg shadow-md flex justify-between items-center gap-4">
          {/* Driver Image */}
          <div className="relative">
            <img
              className="w-20 h-20 object-cover rounded-full border-4 border-[#3FC3EE] shadow-lg"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
              alt="Driver"
            />
            {/* Online Status Indicator */}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#3FC3EE] border-2 border-[#292929] rounded-full"></span>
          </div>

          {/* Driver Info */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#E2E2E2] capitalize">
              {ride?.captain?.fullname.firstname +
                " " +
                ride?.captain?.fullname.lastname}
            </h2>
            <h4 className="text-base text-[#3FC3EE] font-semibold">
              {ride?.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-400 italic">Maruti 800</p>
          </div>
        </div>

        {/* Ride Details */}
        <div className="flex flex-col gap-4">
          {/* Drop-off Location */}
          <div className="flex items-center gap-3">
            <i className="ri-map-pin-user-fill text-xl text-[#3FC3EE]"></i>
            <div>
              <h3 className="text-lg font-medium text-[#E2E2E2]">162/22/B</h3>
              <p className="text-sm text-gray-400">{ride?.destination}</p>
            </div>
          </div>

          {/* Fare Details */}
          <div className="flex items-center gap-3">
            <i className="ri-bank-card-2-fill text-xl text-[#3FC3EE]"></i>
            <div>
              <h3 className="text-lg font-medium text-[#E2E2E2]">
                ₹{ride?.fare}
              </h3>
              <p className="text-sm text-gray-400">
                {ride.paymentMethod || "Payment Method"}
              </p>
            </div>
          </div>
        </div>

        {/* Make a Payment Button */}
        <button className="w-full py-2 bg-[#3FC3EE] text-[#121212] text-lg font-semibold rounded-md shadow-md hover:bg-[#35ADC7] transition-all duration-300">
          Make a Payment
        </button>
      </div>
    </div>
  );
}

export default Riding;
