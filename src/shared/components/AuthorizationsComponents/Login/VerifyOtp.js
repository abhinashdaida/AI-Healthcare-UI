import React from "react";
import { useNavigate } from "react-router-dom";
import doctorImg from "@assets/doctor.jpg";
import LoginHeader from "./components/LoginHeader";
import LoginBranding from "./components/LoginBranding";
import VerifyForm from "./components/VerifyForm";
import LoginFooter from "./components/LoginFooter";


const VerifyOtp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-4 md:p-6 lg:p-8 font-TypeFace">
      <LoginHeader onLogoClick={() => navigate("/")} />

      <main className="flex-1 flex items-center justify-center py-6">
        <div className="login-card-container max-w-300 w-full bg-white rounded-4xl shadow-xl border border-gray-100/80 flex flex-col md:flex-row min-h-160 md:min-h-175 overflow-hidden">
          <LoginBranding doctorImg={doctorImg} />
          
          <VerifyForm />
        </div>
      </main>

      <LoginFooter />
    </div>
  );
};

export default VerifyOtp;
