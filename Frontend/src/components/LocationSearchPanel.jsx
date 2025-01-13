import React from "react";

function LocationSearchPanel({
  setChooseVehiclePanel,
  setPanelOpen,
  suggestions,
  onSuggestionClick,
  getFare,
}) {
  return (
    <>
      <div className="max-h-80 overflow-y-scroll no-scrollbar">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center justify-start gap-4 border-b border-gray-700 py-3 cursor-pointer"
            onClick={() => {
              onSuggestionClick(suggestion);
              setPanelOpen(true);
            }}
          >
            <i className="ri-map-pin-line text-[#3FC3EE] text-2xl"></i>
            <h4 className="text-base text-white">{suggestion}</h4>
          </div>
        ))}
      </div>
      <button
        className="w-full bg-[#3FC3EE] text-[#121212] text-lg font-semibold py-3 rounded-lg hover:bg-[#1DB4D3] transition-all duration-300 mt-4"
        onClick={() => {
          // setPanelOpen(false);
          // setChooseVehiclePanel(true);
          getFare();
        }}
      >
        Find Trip
      </button>
    </>
  );
}

export default LocationSearchPanel;
