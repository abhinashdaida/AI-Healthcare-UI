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
import ReviewComplete from "./pages/Registration/Patient/Medical-records/Review/review.js";
import BasicDetails from "./pages/Registration/Patient/Personal-Information/Basic Details/BasicDetails";
import EmergencyContact from "./pages/Registration/Patient/Personal-Information/Emergency Contact/EmergencyContact";
import HealthOverview from "./pages/Registration/Patient/Personal-Information/Health Overview/HealthOverview";
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
            <Route path="/reviewdetails" element={<ReviewComplete />} />
            <Route path="/basic-details" element={<BasicDetails />} />
            <Route path="/emergency-contact" element={<EmergencyContact />} />
            <Route path="/health-overview" element={<HealthOverview />} />
          </Routes>
        </GlobalConfigView>
      </div>
    </BrowserRouter>
  );
}

export default withSecurity(App);
