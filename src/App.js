import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
//import PatientRegistration from "./pages/PatientRegistration/PatientRegistration";
import RoleSelection from "./pages/RoleSelection/RoleSelection";
import Login from "./shared/components/AuthorizationsComponents/Login/Login";
import LoginPassword from "./shared/components/AuthorizationsComponents/Login/LoginPassword";
import VerifyOtp from "./shared/components/AuthorizationsComponents/Login/VerifyOtp";
import SignUp from "./shared/components/AuthorizationsComponents/SignUp/SignUp";
import GlobalConfigView from "./shared/components/GlobalConfigView/GlobalConfigView.js";
import GlobalNotificationContainer from "./shared/components/GlobalNotificationContainer/GlobalNotificationContainer";
import LoadingOverlay from "./shared/components/LoadingOverlay/LoadingOverlay";
import withSecurity from "./shared/components/WithSecurity/WithSecurity.js";
import ScrollToTop from "./shared/ScrollToTop/ScrollToTop.jsx";
import RegistrationPage from "./pages/Registration/RegistrationPage";


function App() {
  return (
    <BrowserRouter>
      <div>
        <ScrollToTop />
        <LoadingOverlay />
        <GlobalNotificationContainer />
        <GlobalConfigView>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
           {/*  <Route path="/patient-registration" element={<PatientRegistration />} /> */}
            <Route path="/verify" element={<VerifyOtp />} />
            <Route path="/password" element={<LoginPassword />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </Routes>
        </GlobalConfigView>
      </div>
    </BrowserRouter>
  );
}

export default withSecurity(App);
