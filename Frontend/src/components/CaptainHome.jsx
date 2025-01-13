import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "./CaptainDetails";
import RidePopUp from "./RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "./ConfirmRidePopUp";
import { CaptainDataContext } from "../context/captainContext";
import { useSocket } from "../context/socketContext";
import axios from "axios";

function CaptainHome() {
  const ridePopUpRef = useRef();
  const confirmRidePopUpRef = useRef();

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const { captain } = useContext(CaptainDataContext);
  const { socket, sendMessage } = useSocket();
  useEffect(() => {
    sendMessage("join", { userId: captain._id, userType: "captain" });

    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          console.log({
            userId: captain._id,
            location: { ltd: latitude, lng: longitude },
          });
          sendMessage("update-location-captain", {
            userId: captain._id,
            location: { ltd: latitude, lng: longitude },
          });
        });
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const confirmRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopUpPanel(true);
    console.log(data);
  });
  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpRef.current, { translateY: "0%" });
    } else {
      gsap.to(ridePopUpRef.current, { translateY: "100%" });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpRef.current, { translateY: "0%" });
    } else {
      gsap.to(confirmRidePopUpRef.current, { translateY: "100%" });
    }
  }, [confirmRidePopUpPanel]);

  return (
    <div className="h-screen relative">
      {/* Uber Logo and Logout Icon */}
      <div className="absolute p-4 flex justify-between items-center w-screen">
        <img
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber Logo"
          className="h-16 object-contain"
        />
        <Link
          to={"/captain/logout"}
          className="flex items-center justify-center w-11 h-11 rounded-full border-4 border-[#3FC3EE] text-[#3FC3EE] hover:bg-[#3FC3EE] hover:text-[#121212] transition-all duration-300 ease-in-out bg-[#1D1D1D] shadow-lg"
        >
          <i className="ri-logout-box-r-line text-2xl"></i>
        </Link>
      </div>

      {/* Top Image Section */}
      <div className="h-3/5">
        <img
          className="w-full h-full object-cover rounded-b-lg shadow-lg"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Driver Animation"
        />
      </div>

      {/* Bottom Section */}
      <div className="h-2/5 bg-[#1D1D1D] rounded-t-lg p-4 flex flex-col gap-5 shadow-lg">
        <CaptainDetails />
      </div>

      {/* Ride PopUp */}
      <div
        className="fixed bottom-0 left-0 w-full p-6 translate-y-full bg-[#121212] z-20 shadow-lg flex flex-col gap-6 rounded-t-lg"
        ref={ridePopUpRef}
      >
        <RidePopUp
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          ride={ride}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride PopUp */}
      <div
        className="fixed bottom-0 left-0 w-full p-6 translate-y-full bg-[#121212] z-20 shadow-lg flex flex-col gap-6"
        ref={confirmRidePopUpRef}
      >
        <ConfirmRidePopUp
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
          ride={ride}
        />
      </div>
    </div>
  );
}

export default CaptainHome;
