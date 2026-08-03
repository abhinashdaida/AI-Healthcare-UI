import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { showError, showSuccess } from "@/state-management/modules/notification/notificationActions";
import { setUserRole } from "@/state-management/modules/auth/authActions";

import LoginBranding from "../Login/components/LoginBranding";
import LoginFooter from "../Login/components/LoginFooter";
import LoginHeader from "../Login/components/LoginHeader";

import SignUpOtpForm from "./components/SignUpOtpForm";
import SignUpPhoneForm from "./components/SignUpPhoneForm";
import SignUpRoleGrid from "./components/SignUpRoleGrid";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("patient");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (step !== 3 || timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);

  const handleRoleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePhoneSubmit = (submittedPhoneNumber) => {
    const normalizedPhoneNumber = (
      submittedPhoneNumber ||
      phoneNumber ||
      ""
    )
      .toString()
      .trim();

    if (!/^\d{10}$/.test(normalizedPhoneNumber)) return;

    setPhoneNumber(normalizedPhoneNumber);
    setTimer(30);
    setStep(3);
  };

  const handleOtpVerify = (values) => {
    if (values.otp.length < 6) {
      dispatch(showError("Please enter all 6 digits of the OTP."));
      return;
    }

    // Save selected role in Redux
    dispatch(setUserRole(selectedRole));

    dispatch(
      showSuccess("Account created successfully! Redirecting to registration...")
    );

    navigate("/registration");
  };

  const handleResendOtp = () => {
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-4 md:p-6 lg:p-8 font-TypeFace">
      <LoginHeader onLogoClick={() => navigate("/")} />

      <main className="flex-1 flex items-center justify-center py-6">
        <div className="login-card-container max-w-[1200px] w-full bg-white rounded-[32px] shadow-xl border border-gray-100/80 flex flex-col md:flex-row min-h-[640px] md:min-h-[700px] overflow-hidden">
          <LoginBranding />

          {step === 1 && (
            <SignUpRoleGrid
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              onSubmit={handleRoleSubmit}
            />
          )}

          {step === 2 && (
            <SignUpPhoneForm
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              handlePhoneSubmit={handlePhoneSubmit}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <SignUpOtpForm
              phoneNumber={phoneNumber}
              otp={otp}
              setOtp={setOtp}
              timer={timer}
              setTimer={setTimer}
              onSubmit={handleOtpVerify}
              onBack={() => setStep(2)}
              handleResendOtp={handleResendOtp}
            />
          )}
        </div>
      </main>

      <LoginFooter />
    </div>
  );
};

export default SignUp;