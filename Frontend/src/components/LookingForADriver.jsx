import React from "react";

function LookingForADriver({
  setVehicleFoundPanel,
  pickup,
  destination,
  fare,
  vehicleType,
  vehicleImage,
}) {
  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold text-[#E2E2E2]">
          Looking for a Driver
        </h4>
        <i
          className="ri-arrow-down-wide-line text-lg font-semibold text-[#E2E2E2] cursor-pointer"
          onClick={() => setVehicleFoundPanel(false)}
        ></i>
      </div>

      {/* Ride Details Section */}
      <div className="flex flex-col gap-4">
        {/* Vehicle Image */}
        <img
          className="w-full h-32 object-contain rounded-lg"
          src={vehicleImage}
          alt="Uber Vehicle"
        />

        {/* Ride Details */}
        <div className="flex flex-col gap-4">
          {/* Pickup Location */}
          <div className="flex items-center gap-3">
            <i className="ri-map-pin-line text-xl text-[#3FC3EE]"></i>
            <div>
              <h3 className="text-lg font-medium text-[#E2E2E2]">562/11/A</h3>
              <p className="text-sm text-gray-400">{pickup}</p>
            </div>
          </div>

          {/* Drop-off Location */}
          <div className="flex items-center gap-3">
            <i className="ri-map-pin-user-fill text-xl text-[#3FC3EE]"></i>
            <div>
              <h3 className="text-lg font-medium text-[#E2E2E2]">562/11/A</h3>
              <p className="text-sm text-gray-400">{destination}</p>
            </div>
          </div>

          {/* Fare Details */}
          <div className="flex items-center gap-3">
            <i className="ri-bank-card-2-fill text-xl text-[#3FC3EE]"></i>
            <div>
              <h3 className="text-lg font-medium text-[#E2E2E2]">
                ₹{fare[vehicleType]}
              </h3>
              <p className="text-sm text-gray-400">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LookingForADriver;
