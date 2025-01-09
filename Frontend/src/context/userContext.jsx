import React, { useState } from "react";
import { createContext } from "react";

export const UserDataContext = createContext({
  user: {
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  },
  setUserData: (user) => {},
  isLoggedOut: false,
  logout: (logout) => {},
});

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  });

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const setUserData = (updatedUser) => {
    setUser(updatedUser);
  };

  const logout = (logout) => {
    setIsLoggedOut(logout);
  };

  return (
    <div>
      <UserDataContext.Provider
        value={{ user, setUserData, isLoggedOut, logout }}
      >
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
