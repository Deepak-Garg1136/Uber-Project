import React from "react";
function VehiclePanel({ setChooseVehiclePanel, setConfirmedRidePanel }) {
  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold text-[#E2E2E2] mb-4">
          Choose a Vehicle
        </h4>
        <i
          className="ri-arrow-down-wide-line text-lg font-semibold text-[#E2E2E2] cursor-pointer mb-4"
          onClick={() => setChooseVehiclePanel(false)}
        ></i>
      </div>
      <div className="flex flex-col gap-5">
        {/* Vehicle Option 1 */}
        <div
          className="flex items-center justify-between bg-[#1D1D1D] p-3 rounded-lg shadow-md hover:bg-[#2A2A2A] transition duration-300"
          onClick={() => setConfirmedRidePanel(true)}
        >
          <div className="flex items-center gap-4">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
              alt="UberGo"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-[#E2E2E2] flex items-center gap-2">
                UberGo{" "}
                <span className="text-base text-[#3FC3EE] items-center gap-1">
                  <i className="ri-user-fill"></i> 4
                </span>
              </h4>

              <h5 className="text-sm text-gray-400">2 mins away</h5>
              <p className="text-sm text-gray-500">Affordable, compact rides</p>
            </div>
          </div>
          <h2 className="text-[#3FC3EE] font-bold text-lg">₹193.20</h2>
        </div>

        {/* Vehicle Option 2 */}
        <div
          className="flex items-center justify-between bg-[#1D1D1D] p-3 rounded-lg shadow-md hover:bg-[#2A2A2A] transition duration-300"
          onClick={() => setConfirmedRidePanel(true)}
        >
          <div className="flex items-center gap-4">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              alt="Moto"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-[#E2E2E2] flex items-center gap-2">
                Moto{" "}
                <span className="text-base text-[#3FC3EE] items-center gap-1">
                  <i className="ri-user-fill"></i> 1
                </span>
              </h4>

              <h5 className="text-sm text-gray-400">3 mins away</h5>
              <p className="text-sm text-gray-500">
                Affordable, Motorcycle rides
              </p>
            </div>
          </div>
          <h2 className="text-[#3FC3EE] font-bold text-lg">₹65</h2>
        </div>

        {/* Vehicle Option 3 */}
        <div
          className="flex items-center justify-between bg-[#1D1D1D] p-3 rounded-lg shadow-md hover:bg-[#2A2A2A] transition duration-300"
          onClick={() => setConfirmedRidePanel(true)}
        >
          <div className="flex items-center gap-4">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
              alt="UberAuto"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-[#E2E2E2] flex items-center gap-2">
                UberAuto{" "}
                <span className="text-base text-[#3FC3EE] items-center gap-1">
                  <i className="ri-user-fill"></i> 3
                </span>
              </h4>

              <h5 className="text-sm text-gray-400">8 mins away</h5>
              <p className="text-sm text-gray-500">Affordable, Auto rides</p>
            </div>
          </div>
          <h2 className="text-[#3FC3EE] font-bold text-lg">₹118.65</h2>
        </div>
      </div>
    </>
  );
}

export default VehiclePanel;
