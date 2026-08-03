import OtpForm from '@/shared/components/AuthorizationsComponents/OtpForm/OtpForm';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the phone number passed from the login form, fallback if none
  const phoneNumber = location.state?.phoneNumber || '+91 1010 110 100';

  const [timer, setTimer] = useState(30);

  // Resend OTP Countdown Timer Effect
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(30);
  };

  const handleVerify = (e) => {
    // Simulated authentication completion
    navigate('/'); // Redirect to landing page / dashboard
  };

  return (
    <OtpForm
      title="Secure Access"
      description="We've sent a 6-digit verification code to your registered phone number."
      phoneNumber={phoneNumber}
      timer={timer}
      setTimer={setTimer}
      onSubmit={handleVerify}
      onBack={() => navigate('/login')}
      handleResendOtp={handleResend}
      showPhoneEditButton={true}
    />
  );
}

export default VerifyForm;