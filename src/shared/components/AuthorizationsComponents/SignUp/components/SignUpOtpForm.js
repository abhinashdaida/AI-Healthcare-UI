import OtpForm from '@/shared/components/AuthorizationsComponents/OtpForm/OtpForm';
import React from 'react';
import { useSelector } from 'react-redux';

const SignUpOtpForm = ({
  timer,
  setTimer,
  onSubmit,
  onBack,
  handleResendOtp,
}) => {
  const phoneNumber = useSelector((state) => state.security.phoneNumber);

  return (
    <OtpForm
      title="Create Account"
      description="We've sent a 6-digit verification code to your registered phone number."
      phoneNumber={`+91 ${phoneNumber}`}
      timer={timer}
      setTimer={setTimer}
      onSubmit={onSubmit}
      onBack={onBack}
      handleResendOtp={handleResendOtp}
      showPhoneEditButton={true}
    />
  );
}

export default SignUpOtpForm;