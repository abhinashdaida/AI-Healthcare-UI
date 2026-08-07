import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import GlobalConfigView from "./shared/components/GlobalConfigView/GlobalConfigView.js";
import LoadingOverlay from "./shared/components/LoadingOverlay/LoadingOverlay";
import NotificationView from "./shared/components/Notification/NotificationView.jsx";
import withSecurity from "./shared/components/WithSecurity/WithSecurity.js";
import ScrollToTop from "./shared/ScrollToTop/ScrollToTop.jsx";
import MedicalConditions from "./pages/Registration/Patient/Medical-records/MedicalConditions/MedicalConditions.js";
import Insurance from "./pages/Registration/Patient/Medical-records/Insurance/Insurance.js";

import Review from "./pages/Registration/Patient/Medical-records/Review/review";
import CreateLoginId from "./pages/Registration/Patient/Medical-records/CreateLoginId/Createloginid";





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
            <Route path="/medical-conditions" element={<MedicalConditions />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/review" element={<Review />} />
            <Route path="/create-Login-id" element={<CreateLoginId />} />
          </Routes>
        </GlobalConfigView>
      </div>
    </BrowserRouter>
  );
}

export default withSecurity(App);
