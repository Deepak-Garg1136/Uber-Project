import React from "react";
function CaptainDetails() {
  return (
    <>
      {/* Driver Details */}
      <div className="bg-[#292929] p-4 rounded-lg shadow-md flex items-center gap-4">
        {/* Driver Image */}
        <div className="relative">
          <img
            className="w-20 h-20 object-cover rounded-full border-4 border-[#3FC3EE] shadow-lg"
            src="https://img.freepik.com/premium-photo/ai-generated-images-build-user-profile-page_1290175-101.jpg"
            alt="Driver"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#3FC3EE] border-2 border-[#292929] rounded-full"></span>
        </div>

        {/* Driver Info */}
        <div className="flex-1 text-center">
          <h2 className="text-xl font-semibold text-gray-50">Deepak</h2>
          <h4 className="text-base text-[#3FC3EE] font-semibold">₹193</h4>
          <p className="text-sm text-gray-400 italic">Earned Today</p>
        </div>
      </div>

      {/* Driver Stats */}
      <div className="flex justify-evenly items-center gap-6">
        <div className="flex flex-col items-center bg-[#2A2A2A] p-2 rounded-xl shadow-md w-1/3">
          <i className="ri-timer-2-line text-3xl text-[#3FC3EE]"></i>
          <h5 className="text-lg font-semibold text-gray-50">10.2</h5>
          <p className="text-sm text-gray-400 ">Hours Online</p>
        </div>

        <div className="flex flex-col items-center bg-[#2A2A2A] p-2 rounded-xl shadow-md w-1/3">
          <i className="ri-speed-up-fill text-3xl text-[#3FC3EE]"></i>
          <h5 className="text-lg font-semibold text-gray-50">28 KM</h5>
          <p className="text-sm text-gray-400">Distance</p>
        </div>

        <div className="flex flex-col items-center bg-[#2A2A2A] p-2 rounded-xl shadow-md w-1/3">
          <i className="ri-booklet-line text-3xl text-[#3FC3EE]"></i>
          <h5 className="text-lg font-semibold text-gray-50">5.0</h5>
          <p className="text-sm text-gray-400">Rating</p>
        </div>
      </div>
    </>
  );
}

export default CaptainDetails;
