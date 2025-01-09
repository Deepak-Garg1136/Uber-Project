import React, { useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Background from "./Background";
import axios from "axios";
import { UserDataContext } from "../context/userContext";

function UserProtectedWrapper({ children }) {
  const { setUserData } = useContext(UserDataContext);
  const isLoading = useRef(true); // Use useRef to store the loading state
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        // No token scenario
        Swal.fire({
          icon: "info",
          title: "Access Restricted",
          html: "You need to log in to access this page. Please log in or sign up if you don't have an account.",
          background: "#1D1D1D",
          color: "#E2E2E2",
          confirmButtonColor: "#3FC3EE",
        }).then(() => {
          isLoading.current = false; // Update isLoading without re-render
          navigate("/login");
        });
        return;
      }

      // Token present, verify it with API
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Token is valid, set captain data
        if (response.status === 200) {
          setUserData(response.data);
          isLoading.current = false; // Update isLoading without re-render
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        // Token invalid or expired
        Swal.fire({
          icon: "info",
          title: "Access Restricted",
          html: "You need to log in to access this page. Please log in or sign up if you don't have an account.",
          background: "#1D1D1D",
          color: "#E2E2E2",
          confirmButtonColor: "#3FC3EE",
        }).then(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
      }
    };

    verifyToken();
  }, []);

  // Show loading page while verifying token
  if (isLoading.current) {
    return <Background />;
  }

  // Render children if authentication succeeds
  return <>{children}</>;
}

export default UserProtectedWrapper;
