import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalConfigView from "./shared/components/GlobalConfigView/GlobalConfigView.js";
import LoadingOverlay from "./shared/components/LoadingOverlay/LoadingOverlay";
import NotificationView from "./shared/components/Notification/NotificationView.jsx";
import withSecurity from "./shared/components/WithSecurity/WithSecurity.js";
import ScrollToTop from "./shared/ScrollToTop/ScrollToTop.jsx";
import LandingPage from "./pages/LandingPage/Landingpage";
import ProductListing from "./pages/ProductListing/ProductListing";
import Profile from "./pages/Profile/Profile";
import Checkout from "./pages/Checkout/Checkout";



function App() {
  return (
    <BrowserRouter>
      <div>
        <ScrollToTop />
        <LoadingOverlay />
        <NotificationView />
        <GlobalConfigView>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/productlisting" element={<ProductListing />} />
           {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
           />

           
          </Routes>
        </GlobalConfigView>
      </div>
    </BrowserRouter>
  );
}

export default withSecurity(App);
