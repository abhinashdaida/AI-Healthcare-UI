import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CustomerManagement from "./pages/AdminPanel/CustomerManagement";
import Dashboard from "./pages/AdminPanel/Dashboard";
import Order from "./pages/AdminPanel/Order";
import Product from "./pages/AdminPanel/Product";
import Reports from "./pages/AdminPanel/Reports";
import Review from "./pages/AdminPanel/Review";
import Settings from "./pages/AdminPanel/Settings";
import Login from "./pages/Login";
import GlobalConfigView from "./shared/components/GlobalConfigView/GlobalConfigView.js";
import LoadingOverlay from "./shared/components/LoadingOverlay/LoadingOverlay";
import NotificationView from "./shared/components/Notification/NotificationView.jsx";
import withSecurity from "./shared/components/WithSecurity/WithSecurity.js";
import ScrollToTop from "./shared/ScrollToTop/ScrollToTop.jsx";




function App() {
  return (
    <BrowserRouter>
      <div>
        <ScrollToTop />
        <LoadingOverlay />
        <NotificationView />
        <GlobalConfigView>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
            <Route path="/customer-management" element={<CustomerManagement />} />
            <Route path="/review" element={<Review />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </GlobalConfigView>
      </div>
    </BrowserRouter>
  );
}

export default withSecurity(App);
