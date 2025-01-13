import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "./LocationSearchPanel";
import VehiclePanel from "./VechiclePanel";
import ConfirmRide from "./ConfirmRide";
import LookingForADriver from "./LookingForADriver";
import WaitingForDriver from "./WaitingForDriver";
import Swal from "sweetalert2";
import { UserDataContext } from "../context/userContext";
import { useSocket } from "../context/socketContext";
import LiveTracking from "./LiveTracking";

function Home() {
  const pickup = useRef();
  const destination = useRef();
  const panelRef = useRef();
  const roundRef = useRef();
  const arrowRef = useRef();
  const chooseVehicleRef = useRef();
  const confirmedRideRef = useRef();
  const vehicleFoundRef = useRef();
  const waitingForDriverRef = useRef();

  const navigate = useNavigate();

  const [panelOpen, setPanelOpen] = useState(false);
  const [chooseVehiclePanel, setChooseVehiclePanel] = useState(false);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputType, setInputType] = useState("");
  const [fare, setFare] = useState({
    car: 0,
    auto: 0,
    moto: 0,
  });
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
  );
  const [ride, setRide] = useState(null);
  const { socket, sendMessage, receiveMessage } = useSocket();
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    console.log(user);
    sendMessage("join", {
      userId: user._id,
      userType: "user",
    });
  }, []);

  socket.on("ride-confirmed", (ride) => {
    setRide(ride);
    setWaitingForDriverPanel(true);
    console.log(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriverPanel(false);
    navigate("/riding", { state: { ride } });
  });

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (value.length < 1) {
      setSuggestions([]);
      return;
    }
    setInputType(type);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    if (inputType === "pickup") {
      pickup.current.value = suggestion;
    } else if (inputType === "destination") {
      destination.current.value = suggestion;
    }
    setPanelOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(pickup.current.value, destination.current.value);
  };

  const getFare = async () => {
    if (
      pickup.current.value.trim() === "" ||
      destination.current.value.trim() === ""
    ) {
      Swal.fire({
        icon: "info",
        title: "Details Required",
        html: "Both pickup and destination are required to proceed with your booking.",
        background: "#1D1D1D",
        color: "#E2E2E2",
        confirmButtonColor: "#3FC3EE",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            pickup: pickup.current.value,
            destination: destination.current.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data.fare);
      setFare(response.data.fare);
      setPanelOpen(false);
      setChooseVehiclePanel(true);
    } catch (error) {
      console.error("Error getting fare:", error);
    }
  };

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup: pickup.current.value,
          destination: destination.current.value,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setConfirmedRidePanel(false);
      setVehicleFoundPanel(true);
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
      });
      gsap.to(roundRef.current, { borderRadius: "0%" });
      gsap.to(arrowRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        paddingTop: "0rem",
        paddingBottom: "0rem",
      });
      gsap.to(roundRef.current, {
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
      });
      gsap.to(arrowRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (chooseVehiclePanel) {
      gsap.to(chooseVehicleRef.current, { translateY: "0%" });
    } else {
      gsap.to(chooseVehicleRef.current, { translateY: "100%" });
    }
  }, [chooseVehiclePanel]);

  useGSAP(() => {
    if (confirmedRidePanel) {
      gsap.to(confirmedRideRef.current, { translateY: "0%" });
    } else {
      gsap.to(confirmedRideRef.current, { translateY: "100%" });
    }
  }, [confirmedRidePanel]);

  useGSAP(() => {
    if (vehicleFoundPanel) {
      gsap.to(vehicleFoundRef.current, { translateY: "0%" });
    } else {
      gsap.to(vehicleFoundRef.current, { translateY: "100%" });
    }
  }, [vehicleFoundPanel]);

  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverRef.current, { translateY: "0%" });
    } else {
      gsap.to(waitingForDriverRef.current, { translateY: "100%" });
    }
  }, [waitingForDriverPanel]);

  return (
    <div className="h-screen relative">
      {/* Uber Logo */}
      <Link to={"/home"}>
        <img
          className="w-20 absolute top-7 left-7"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
      </Link>

      {/* Background GIF */}
      <div className="h-screen w-screen">
        {/* <LiveTracking/> use his in plave of image */}
        <img
          className="w-full h-screen object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      {/* Form Section */}
      <div className="absolute bottom-0 w-full shadow-lg h-screen flex flex-col justify-end">
        <div
          className="h-[30%] bg-[#1D1D1D] p-6 w-full shadow-lg rounded-t-lg"
          ref={roundRef}
        >
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold text-[#E2E2E2] mb-4">
              Find a trip
            </h4>
            <h4 className="mb-4">
              <i
                className="ri-arrow-down-wide-line text-lg font-semibold text-[#E2E2E2] opacity-0"
                onClick={() => setPanelOpen(false)}
                ref={arrowRef}
              ></i>
            </h4>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => submitHandler(e)}
          >
            <input
              onClick={() => setPanelOpen(true)}
              onChange={(e) => handleInputChange(e, "pickup")}
              type="text"
              placeholder="Add a pick-up location"
              className="bg-[#121212] border border-[#3FC3EE] p-3 rounded-lg text-[#E2E2E2] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3FC3EE] transition duration-300"
              ref={pickup}
            />
            <input
              onClick={() => setPanelOpen(true)}
              onChange={(e) => handleInputChange(e, "destination")}
              type="text"
              placeholder="Enter your destination"
              className="bg-[#121212] border border-[#3FC3EE] p-3 rounded-lg text-[#E2E2E2] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3FC3EE] transition duration-300"
              ref={destination}
            />
          </form>
        </div>
        <div
          className="bg-[#1D1D1D] overflow-y-auto pt-0 pl-6 pr-6"
          ref={panelRef}
        >
          <LocationSearchPanel
            setChooseVehiclePanel={setChooseVehiclePanel}
            setPanelOpen={setPanelOpen}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            getFare={getFare}
          />
        </div>
      </div>

      {/* Choose Vehicle Section */}
      <div
        className="fixed bottom-0 left-0 w-full p-5 bg-[#121212] z-20 shadow-lg translate-y-full rounded-t-lg"
        ref={chooseVehicleRef}
      >
        <VehiclePanel
          setChooseVehiclePanel={setChooseVehiclePanel}
          setConfirmedRidePanel={setConfirmedRidePanel}
          fare={fare}
          setVehicleType={setVehicleType}
          setVehicleImage={setVehicleImage}
        />
      </div>

      {/* Confirmed Ride Section */}
      <div
        className="fixed bottom-0 left-0 w-full p-5 bg-[#121212] z-20 shadow-lg flex flex-col gap-5 translate-y-full rounded-t-lg"
        ref={confirmedRideRef}
      >
        <ConfirmRide
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVehicleFoundPanel={setVehicleFoundPanel}
          createRide={createRide}
          pickup={pickup.current?.value}
          destination={destination.current?.value}
          fare={fare}
          vehicleType={vehicleType}
          vehicleImage={vehicleImage}
        />
      </div>

      {/* Looking for a Driver Section */}
      <div
        className="fixed bottom-0 left-0 w-full p-5 bg-[#121212] z-20 shadow-lg flex flex-col gap-5 translate-y-full rounded-t-lg"
        ref={vehicleFoundRef}
      >
        <LookingForADriver
          setVehicleFoundPanel={setVehicleFoundPanel}
          pickup={pickup.current?.value}
          destination={destination.current?.value}
          fare={fare}
          vehicleType={vehicleType}
          vehicleImage={vehicleImage}
        />
      </div>

      {/* Waiting for a Driver Section */}
      <div
        className="fixed bottom-0 left-0 w-full p-5 translate-y-full bg-[#121212] z-20 shadow-lg flex flex-col gap-5 rounded-t-lg"
        ref={waitingForDriverRef}
      >
        <WaitingForDriver
          setWaitingForDriverPanel={setWaitingForDriverPanel}
          ride={ride}
        />
      </div>
    </div>
  );
}

export default Home;
