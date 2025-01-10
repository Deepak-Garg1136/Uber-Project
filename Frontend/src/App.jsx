import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import CaptainLogin from "./components/CaptainLogin";
import CaptainSignup from "./components/CaptainSignup";
import Start from "./components/Start";
import UserProtectedWrapper from "./components/UserProtectedWrapper";
import UserLogout from "./components/UserLogout";
import CaptainHome from "./components/CaptainHome";
import CaptainProtectedWrapper from "./components/CaptainProtectedWrapper";
import CaptainLogout from "./components/CaptainLogout";
import Riding from "./components/Riding";
import CaptainRiding from "./components/CaptainRiding";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        />

        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
      </Routes>
    </>
  );
}

export default App;
