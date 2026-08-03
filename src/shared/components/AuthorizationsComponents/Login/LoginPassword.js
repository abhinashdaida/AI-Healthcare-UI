import React from "react";
import { useNavigate } from "react-router-dom";
import doctorImg from "@assets/doctor.jpg";
import LoginHeader from "./components/LoginHeader";
import LoginBranding from "./components/LoginBranding";
import PasswordForm from "./components/PasswordForm";
import LoginFooter from "./components/LoginFooter";

const LoginPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-4 md:p-6 lg:p-8 font-TypeFace">
      <LoginHeader onLogoClick={() => navigate("/")} />

      <main className="flex-1 flex items-center justify-center py-6">
        <div className="login-card-container max-w-[1200px] w-full bg-white rounded-[32px] shadow-xl border border-gray-100/80 flex flex-col md:flex-row min-h-[640px] md:min-h-[700px] overflow-hidden">
          <LoginBranding doctorImg={doctorImg} />
          
          <PasswordForm />
        </div>
      </main>

      <LoginFooter />
    </div>
  );
};

export default LoginPassword;
