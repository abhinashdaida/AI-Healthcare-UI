import React, { useRef, useEffect } from "react";

const OtpInput = ({ otp, setOtp, error, setError }) => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // Handle value change in one of the 6 inputs
  const handleChange = (index, value) => {
    // Only allow numbers
    const num = value.replace(/\D/g, "");
    if (!num) return;

    const newOtp = [...otp];
    // Keep only the last character entered
    newOtp[index] = num.substring(num.length - 1);
    setOtp(newOtp);

    // Clear error message automatically as typing occurs and resets
    setError("");

    // Auto-focus next input box
    if (index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "") {
        // If current box is empty, clear previous box and focus it
        if (index > 0) {
          newOtp[index - 1] = "";
          setOtp(newOtp);
          inputRefs[index - 1].current.focus();
        }
      } else {
        // If current box has value, just clear it
        newOtp[index] = "";
        setOtp(newOtp);
      }
      setError("");
    }
  };

  // Handle paste event (allows pasting a 6-digit OTP code)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").substring(0, 6);
    if (pastedData.length === 6) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      setError("");
      inputRefs[5].current.focus();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-500 text-left">OTP</label>
      <div className="grid grid-cols-6 gap-2 sm:gap-3" onPaste={handlePaste}>
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={inputRefs[idx]}
            type="tel"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className={`w-full aspect-square border rounded-xl text-center font-bold text-lg sm:text-xl text-slate-800 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#086952]/10 ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-slate-200 focus:border-[#086952]"
            }`}
          />
        ))}
      </div>
      
      {/* We have sent you an OTP! indicator message */}
      {!error && (
        <p className="text-emerald-600 text-xs font-medium text-left mt-1">
          We have sent you an OTP!
        </p>
      )}

      {/* Red Error Message display below input field */}
      {error && (
        <p className="text-red-500 text-xs font-semibold text-left mt-1 transition-opacity duration-150">
          {error}
        </p>
      )}
    </div>
  );
};

export default OtpInput;
