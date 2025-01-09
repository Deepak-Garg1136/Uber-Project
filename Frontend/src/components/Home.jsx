import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "./LocationSearchPanel";
import VehiclePanel from "./VechiclePanel";
import ConfirmRide from "./ConfirmRide";
import LookingForADriver from "./LookingForADriver";
import WaitingForDriver from "./WaitingForDriver";

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

  const [panelOpen, setPanelOpen] = useState(false);
  const [chooseVehiclePanel, setChooseVehiclePanel] = useState(false);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(pickup.current.value, destination.current.value);
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
              type="text"
              placeholder="Add a pick-up location"
              className="bg-[#121212] border border-[#3FC3EE] p-3 rounded-lg text-[#E2E2E2] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3FC3EE] transition duration-300"
              ref={pickup}
            />
            <input
              onClick={() => setPanelOpen(true)}
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
        />
      </div>

      {/* Looking for a Driver Section */}
      <div
        className="fixed bottom-0 left-0 w-full p-5 bg-[#121212] z-20 shadow-lg flex flex-col gap-5 translate-y-full rounded-t-lg"
        ref={vehicleFoundRef}
      >
        <LookingForADriver setVehicleFoundPanel={setVehicleFoundPanel} />
      </div>

      {/* Waiting for a Driver Section */}
      <div
        className="fixed bottom-0 left-0 w-full p-5 translate-y-full bg-[#121212] z-20 shadow-lg flex flex-col gap-5 rounded-t-lg"
        ref={waitingForDriverRef}
      >
        <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </div>
  );
}

export default Home;
