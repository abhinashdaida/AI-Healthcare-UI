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
<<<<<<< HEAD

import Review from "./pages/Registration/Patient/Medical-records/Review/review";
import CreateLoginId from "./pages/Registration/Patient/Medical-records/CreateLoginId/CreateLoginid";




=======
import ReviewComplete from "./pages/Registration/Patient/Medical-records/Review/review.js";
import CreateLoginid from "./pages/Registration/Patient/Medical-records/CreateLoginId/Createloginid";
>>>>>>> d78b91130c7d1344760d523ba4fb90a7fc0f0be0

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
<<<<<<< HEAD
            <Route path="/review" element={<Review />} />
            <Route path="/create-Login-id" element={<CreateLoginId />} />
=======
            <Route path="/reviewdetails" element={<ReviewComplete />} />
            <Route path="/createloginid" element={<CreateLoginid/>}/>
>>>>>>> d78b91130c7d1344760d523ba4fb90a7fc0f0be0
          </Routes>
        </GlobalConfigView>
      </div>
    </BrowserRouter>
  );
}

export default withSecurity(App);
