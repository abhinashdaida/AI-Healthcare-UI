import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import GlobalConfigView from "./shared/components/GlobalConfigView/GlobalConfigView.js";
import LoadingOverlay from "./shared/components/LoadingOverlay/LoadingOverlay";
import NotificationView from "./shared/components/Notification/NotificationView.jsx";
import withSecurity from "./shared/components/WithSecurity/WithSecurity.js";
import LandingPage from "./pages/LandingPage/Landingpage";
import ProductListing from "./pages/ProductListing/ProductListing";
import ProductDetailsPage from "./pages/ProductDetails/ProductDetailsPage";
import CartPage from "./pages/Cart/CartPage";
import Header_1 from "./components/common/Header_1/Header_1";
import Header_2 from "./components/common/Header_2/Header_2";
import Footer from "./components/common/Footer/Footer"
import Profile from "./pages/Profile/Profile";
import Checkout from "./pages/Checkout/Checkout";
 
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
            <Route path="/profile" element={<Profile />}/>
 
            {/* Checkout */}
            <Route
              path="/checkout"
              element={<Checkout />}
            />           
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