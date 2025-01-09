import React, { createContext, useState } from "react";

export const CaptainDataContext = createContext({
  captain: {
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  },
  setCaptainData: (captain) => {},
});

function CaptainContext({ children }) {
  const [captain, setCaptain] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  });

  const setCaptainData = (updatedCaptain) => {
    setCaptain(updatedCaptain);
  };
  return (
    <div>
      <CaptainDataContext.Provider value={{ captain, setCaptainData }}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
}

export default CaptainContext;
