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
import ProductDetailsPage from "./pages/ProductDetails/ProductDetailsPage";
import CartPage from "./pages/Cart/CartPage";
import Header_1 from "./components/common/Header_1/Header_1";
import Header_2 from "./components/common/Header_2/Header_2";
import Footer from "./components/common/Footer/Footer"

function App() {
  return (
    <BrowserRouter>
      <div>
        <LoadingOverlay />
        <NotificationView />
        <GlobalConfigView>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/shop" element={<ProductListing />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/productlisting" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/product" element={<ProductDetailsPage />} />
            <Route path="/product-details" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            
          </Routes>
        </GlobalConfigView>
      </div>
    </BrowserRouter>
  );
}

export default withSecurity(App);