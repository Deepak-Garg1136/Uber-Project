import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Background from "./Background";
import { CaptainDataContext } from "../context/captainContext";

function CaptainLogout() {
  const { logout } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const log_out = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("token");
          console.log("logout");
          logout(true);
          navigate("/captain-login");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "An unexpected error occurred. Please try again.",
          background: "#1D1D1D",
          color: "#E2E2E2",
          confirmButtonColor: "#ff6b6b",
        });
      }
    };
    log_out();
  }, [navigate]);

  return (
    <div>
      <Background />
    </div>
  );
}

export default CaptainLogout;
