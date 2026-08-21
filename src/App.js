import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import GlobalConfigView from "./shared/components/GlobalConfigView/GlobalConfigView.js";
import LoadingOverlay from "./shared/components/LoadingOverlay/LoadingOverlay";
import NotificationView from "./shared/components/Notification/NotificationView.jsx";
import withSecurity from "./shared/components/WithSecurity/WithSecurity.js";
import ScrollToTop from "./shared/ScrollToTop/ScrollToTop.jsx";
import LandingPage from "./pages/LandingPage/Landingpage";
import ProductListing from "./pages/ProductListing/ProductListing";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Confirmation from "./pages/Confirmation/Confirmation";
import NewPassword from "./pages/NewPassword/NewPassword";

// Preload Images
import signInImg from "./assets/signIn.png";
import signUpImg from "./assets/SignUp.png";
import forgotPasswordImg from "./assets/Forgotpassword.png";
import conformationImg from "./assets/conformation.png";
import newPasswordImg from "./assets/newpassword.png";

const ImagePreloader = () => (
  <div style={{ display: "none" }}>
    <img src={signInImg} alt="preload" />
    <img src={signUpImg} alt="preload" />
    <img src={forgotPasswordImg} alt="preload" />
    <img src={conformationImg} alt="preload" />
    <img src={newPasswordImg} alt="preload" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div>
        <ImagePreloader />
        <ScrollToTop />
        <LoadingOverlay />
        <NotificationView />
        <GlobalConfigView>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/productlisting" element={<ProductListing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/new-password" element={<NewPassword />} />
          </Routes>
        </GlobalConfigView>
      </div>
    </BrowserRouter>
  );
}

export default withSecurity(App);
