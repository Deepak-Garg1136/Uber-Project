import React from "react";
function LocationSearchPanel({ setChooseVehiclePanel, setPanelOpen }) {
  const locations = [
    "24b, Near Kapoor Cafe, Maharishi Dayanand University",
    "24b, Near Kapoor Cafe, Maharishi Dayanand University",
    "24b, Near Kapoor Cafe, Maharishi Dayanand University",
    "24b, Near Kapoor Cafe, Maharishi Dayanand University",
  ];
  return (
    <div>
      {locations.map((loc, index) => (
        <div
          key={index}
          className="flex items-center justify-start gap-4 border-b border-gray-700 py-3 cursor-pointer"
          onClick={() => {
            setChooseVehiclePanel(true);
            setPanelOpen(false);
          }}
        >
          <i className="ri-map-pin-line text-[#3FC3EE] text-2xl"></i>
          <h4 className="text-sm text-white">{loc}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;
