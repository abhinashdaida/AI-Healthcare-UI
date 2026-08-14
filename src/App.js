import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";  
import GlobalConfigView from "./shared/components/GlobalConfigView/GlobalConfigView.js";
import LoadingOverlay from "./shared/components/LoadingOverlay/LoadingOverlay";
import NotificationView from "./shared/components/Notification/NotificationView.jsx";
import withSecurity from "./shared/components/WithSecurity/WithSecurity.js";
import ScrollToTop from "./shared/ScrollToTop/ScrollToTop.jsx";
import MedicalConditions from "./pages/Registration/Patient/Medical-records/MedicalConditions";
import Insurance from "./pages/Registration/Patient/Medical-records/Insurance.js";
import ReviewComplete from "./pages/Registration/Patient/Medical-records/review.js";
import BasicDetails from "./pages/Registration/Patient/Personal-Information/BasicDetails";
import EmergencyContact from "./pages/Registration/Patient/Personal-Information/EmergencyContact";
import HealthOverview from "./pages/Registration/Patient/Personal-Information/HealthOverview";
import CreateLoginId from "./pages/Registration/Patient/Medical-records/Createloginid";
import SignUp from "./pages/Signup.js";
import Login from "./pages/Login.js";
function App() {
  return (
    <BrowserRouter>
      <div>
        
        <LoadingOverlay />
        <NotificationView />
        <GlobalConfigView>
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<Login />} />
=======
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
>>>>>>> 527af75c1b89f70bd92db592157f3cbb5f934a57
            <Route path="/basic-details" element={<BasicDetails />} />
            <Route path="/emergency-contact" element={<EmergencyContact />} />
            <Route path="/health-overview" element={<HealthOverview />} />
            <Route path="/medical-conditions" element={<MedicalConditions />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/reviewdetails" element={<ReviewComplete />} />
            <Route path="createloginid" element={<CreateLoginId/>}/>

          </Routes>
        </GlobalConfigView>
      </div>
    </BrowserRouter>
  );
}

export default withSecurity(App);