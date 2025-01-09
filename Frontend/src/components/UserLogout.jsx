import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Background from "./Background";
import { UserDataContext } from "../context/userContext";

function UserLogout() {
  const { logout } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem("token");

      try {
        console.log("runnning");

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // localStorage.removeItem("token");
          logout(true);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div>
      <Background />
    </div>
  ); // Optional: Add a spinner or better UI
}

export default UserLogout;
