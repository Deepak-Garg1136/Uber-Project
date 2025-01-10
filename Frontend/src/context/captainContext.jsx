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
    isLoggedOut: false,
    logout: (logout) => {},
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

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const setCaptainData = (updatedCaptain) => {
    setCaptain(updatedCaptain);
  };

  const logout = (logout) => {
    setIsLoggedOut(logout);
  };
  return (
    <div>
      <CaptainDataContext.Provider
        value={{ captain, setCaptainData, isLoggedOut, logout }}
      >
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
}

export default CaptainContext;
