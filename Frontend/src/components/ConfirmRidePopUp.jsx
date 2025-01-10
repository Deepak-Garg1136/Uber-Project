import { useRef } from "react";
import { Link } from "react-router-dom";

function ConfirmRidePopUp({ setConfirmRidePopUpPanel, setRidePopUpPanel }) {
  const otp = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(otp.current.value);
  };
  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 mt-1">
        <h4 className="text-2xl font-semibold text-[#3FC3EE] tracking-wider">
          🚗 Confirm Your Ride
        </h4>
        <i
          className="ri-close-circle-line text-2xl text-[#FF6B6B] cursor-pointer hover:text-[#FF4A4A] transition-all duration-300"
          onClick={() => {
            setConfirmRidePopUpPanel(false);
            setRidePopUpPanel(false);
          }}
        ></i>
      </div>

      {/* Driver Details */}
      <div className="bg-[#1D1D1D] p-5 rounded-xl shadow-md flex items-center gap-6 mb-4">
        {/* Driver Image */}
        <div className="relative">
          <img
            className="w-20 h-20 object-cover rounded-full border-4 border-[#3FC3EE] shadow-md"
            src="https://img.freepik.com/premium-photo/ai-generated-images-build-user-profile-page_1290175-101.jpg"
            alt="Driver"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#3FC3EE] border-2 border-[#1D1D1D] rounded-full"></span>
        </div>

        {/* Driver Info */}
        <div className="flex flex-col flex-1 gap-1">
          <h2 className="text-xl font-semibold text-[#E2E2E2]">Deepak</h2>
          <p className="text-base font-medium text-[#3FC3EE]">2.2 KM</p>
        </div>
      </div>

      {/* Ride Details */}
      <div className="bg-[#1D1D1D] p-5 rounded-xl shadow-md flex flex-col gap-6 mb-6">
        {/* Pickup Location */}
        <div className="flex items-center gap-4">
          <i className="ri-map-pin-line text-2xl text-[#3FC3EE]"></i>
          <div>
            <h3 className="text-base font-semibold text-[#E2E2E2]">562/11/A</h3>
            <p className="text-sm text-gray-400">Shahjahan Road, New Delhi</p>
          </div>
        </div>

        {/* Drop-off Location */}
        <div className="flex items-center gap-4">
          <i className="ri-map-pin-user-fill text-2xl text-[#3FC3EE]"></i>
          <div>
            <h3 className="text-base font-semibold text-[#E2E2E2]">162/22/B</h3>
            <p className="text-sm text-gray-400">Rajiv Chowk, New Delhi</p>
          </div>
        </div>

        {/* Fare Details */}
        <div className="flex items-center gap-4">
          <i className="ri-bank-card-2-fill text-2xl text-[#3FC3EE]"></i>
          <div>
            <h3 className="text-base font-semibold text-[#E2E2E2]">₹193.25</h3>
            <p className="text-sm text-gray-400">Payment: Cash</p>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <form className="flex flex-col gap-4" onSubmit={(e) => submitHandler(e)}>
        {/* OTP Input */}
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full py-3 px-4 bg-[#1D1D1D] text-[#E2E2E2] text-base font-medium rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3FC3EE] transition-all duration-300"
          ref={otp}
        />

        {/* Buttons */}
        <div className="flex gap-4">
          {/* Confirm Button */}
          <Link
            to={"/captain-riding"}
            className="flex-1 py-3 bg-[#3FC3EE] text-[#121212] text-lg font-semibold rounded-xl hover:bg-[#1DB4D3] transition-all duration-300 text-center"
          >
            Confirm
          </Link>

          {/* Cancel Button */}
          <button
            className="flex-1 py-3 bg-[#FF6B6B] text-[#121212] text-lg font-semibold rounded-xl hover:bg-[#FF4A4A] transition-all duration-300"
            onClick={() => {
              setConfirmRidePopUpPanel(false);
              setRidePopUpPanel(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
export default ConfirmRidePopUp;
