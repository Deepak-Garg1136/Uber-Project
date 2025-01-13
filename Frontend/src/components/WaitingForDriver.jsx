import React from "react";
function WaitingForDriver({ setWaitingForDriverPanel, ride }) {
  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold text-[#E2E2E2]">
          Driver Information
        </h4>
        <i
          className="ri-arrow-down-wide-line text-lg font-semibold text-[#E2E2E2] cursor-pointer"
          onClick={() => setWaitingForDriverPanel(false)}
        ></i>
      </div>

      {/* Driver and Ride Details Section */}
      <div className="flex flex-col gap-6">
        {/* Driver Details */}
        <div className="bg-[#1D1D1D] p-4 rounded-lg shadow-lg flex justify-between items-center gap-4 border border-[#292929]">
          {/* Driver Image */}
          <div className="relative">
            <img
              className="w-20 h-20 object-cover rounded-full border-4 border-[#3FC3EE] shadow-md"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
              alt="Driver"
            />
            {/* Online Status Indicator */}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#3FC3EE] border-2 border-[#1D1D1D] rounded-full"></span>
          </div>

          {/* Driver Info */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#E2E2E2]">
              {ride?.captain.fullname.firstname +
                " " +
                ride?.captain.fullname.lastname}
            </h2>
            <h4 className="text-base text-[#3FC3EE] font-semibold">
              {ride?.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-400 italic">Maruti 800</p>
            <h4 className="text-base text-[#3FC3EE] font-semibold">
              {ride?.otp}
            </h4>
          </div>
        </div>

        {/* Ride Details */}
        <div className="flex flex-col gap-4">
          {/* Pickup Location */}
          <div className="flex items-center gap-3">
            <i className="ri-map-pin-line text-xl text-[#3FC3EE]"></i>
            <div>
              <h3 className="text-lg font-medium text-[#E2E2E2]">562/11/A</h3>
              <p className="text-sm text-gray-400">{ride?.pickup}</p>
            </div>
          </div>

          {/* Drop-off Location */}
          <div className="flex items-center gap-3">
            <i className="ri-map-pin-user-fill text-xl text-[#3FC3EE]"></i>
            <div>
              <h3 className="text-lg font-medium text-[#E2E2E2]">562/11/A</h3>
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
              <p className="text-sm text-gray-400">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WaitingForDriver;

{
  /* <div className="bg-[#1D1D1D] p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 border border-[#292929]">

  <div className="relative">
    <img
      className="w-20 h-20 object-cover rounded-full border-4 border-[#3FC3EE] shadow-md"
      src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
      alt="Driver"
    />
    
    <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#3FC3EE] border-2 border-[#1D1D1D] rounded-full"></span>
  </div>


  <div className="text-center">
    <h2 className="text-xl font-semibold text-[#E2E2E2]">Deepak</h2>
    <p className="text-sm text-gray-400 italic">Maruti 800</p>
    <p className="text-sm text-[#3FC3EE] font-medium">HR 12 AB 1111</p>
  </div>


  <hr className="w-full border-t border-[#292929]" />


  <button className="w-full py-2 bg-[#3FC3EE] text-[#121212] font-semibold rounded-md hover:bg-[#35ADC7] transition duration-200">
    Contact Driver
  </button>
</div>; */
}
