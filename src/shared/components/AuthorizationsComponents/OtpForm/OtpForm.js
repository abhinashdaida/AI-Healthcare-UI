import { Button, InputBase } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import * as Yup from "yup";

const OtpForm = ({
  title = "Verify OTP",
  description = "We've sent a 6-digit verification code to your registered phone number.",
  phoneNumber,
  onSubmit,
  onBack,
  handleResendOtp,
  timer = 30,
  setTimer,
  showPhoneEditButton = true,
}) => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: Yup.object({
      otp: Yup.string()
        .required("Please enter the 6-digit OTP.")
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits."),
    }),
    onSubmit: (values) => {
      onSubmit({ preventDefault: () => {}, ...values });
    },
  });

  // Auto focus first OTP input when component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const joinedOtp = newOtp.join("");
    formik.setFieldValue("otp", joinedOtp, true);

    // Shift focus forward
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/.test(pastedData)) return;

    const digits = pastedData.split('');
    setOtp(digits);
    formik.setFieldValue("otp", pastedData, true);
    if (inputRefs.current[5]) {
      inputRefs.current[5].focus();
    }
  };

  return (
    <div className="flex-1 md:w-1/2 lg:w-1/2 flex flex-col justify-between p-8 lg:p-5 bg-white min-h-[600px] lg:min-h-auto">
      {/* Back Button */}
      <Button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors text-xs font-semibold py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 cursor-pointer self-start shadow-2xs"
      >
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Back
      </Button>

      <div className="max-w-md w-full mx-auto my-auto py-6">
        <div className="text-center mb-8">
          <h2 className="login-form-title text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
          <p className="login-form-desc text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
            {description}
          </p>

          {/* Phone number display pill */}
          <div className="flex items-center justify-center gap-2 mt-4 py-1.5 px-4 w-fit mx-auto">
            <span className="text-xs font-bold text-slate-800 tracking-wide">
              {phoneNumber}
            </span>
            {showPhoneEditButton && (
              <Button
                type="button"
                onClick={onBack}
                className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors border border-emerald-100/80 bg-white hover:bg-emerald-50/50 py-0.5 px-2 rounded-md cursor-pointer shadow-2xs"
              >
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                Edit
              </Button>
            )}
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}  className="space-y-6">
          <div>
            <label className="login-form-label block text-xs font-semibold text-gray-500 mb-3">OTP</label>
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <InputBase
                  key={`otp-${index}`}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputProps={{ maxLength: 1, inputMode: "numeric", pattern: "[0-9]*", className: "h-full w-full text-center" }}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={handleOtpPaste}
                  className="w-full aspect-square flex items-center justify-center text-center text-lg md:text-xl lg:text-2xl font-bold text-slate-800 border border-gray-200 rounded-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all outline-none bg-white shadow-2xs"
                />
              ))}
            </div>
            {formik.touched.otp && formik.errors.otp && (
              <p className="text-red-500 text-xs font-semibold mt-2">
                {formik.errors.otp}
              </p>
            )}
            {!formik.touched.otp && !formik.errors.otp && (
              <p className="text-[11px] text-emerald-700/80 mt-2 font-medium">
                We have sent you an OTP!
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="login-form-btn w-full bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-md transition-colors duration-200 mt-4 cursor-pointer"
          >
            Verify OTP
          </Button>
        </form>

        {/* Resend Link */}
        <div className="text-center mt-6">
          <div className="login-form-footer-text text-xs text-gray-500 flex items-center justify-center gap-1.5 select-none">
            <span>Didn't receive an OTP?</span>
            {timer > 0 ? (
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                Resend in {timer} seconds
                <svg className="animate-spin h-3.5 w-3.5 text-emerald-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            ) : (
              <Button
                type="button"
                onClick={handleResendOtp}
                className="text-emerald-700 font-semibold underline hover:text-emerald-800 cursor-pointer p-0 min-w-0"
              >
                Resend OTP!
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Compliance Badge */}
      <div className="border mb-8 border-gray-100 rounded-2xl p-4 bg-slate-50/50 flex items-start gap-3 max-w-md mx-auto w-full mt-4 lg:mt-0 shadow-xs">
        <div className="text-emerald-800 rounded-lg shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 2.501C10.644 2.614 9.932 2.858 8.838 3.233L8.265 3.428C5.258 4.458 3.755 4.972 3.378 5.51C3.008 6.036 3 7.578 3 10.638L11.25 10.888V2.501ZM11.25 12.468L3 12.218V12.419C3 18.057 7.239 20.793 9.899 21.955C10.409 22.178 10.739 22.322 11.25 22.387V12.468ZM12.75 22.388V12.468L21 12.218V12.419C21 18.057 16.761 20.793 14.101 21.955C13.591 22.178 13.261 22.323 12.75 22.388ZM12.75 10.888V2.5C13.356 2.613 14.068 2.857 15.162 3.232L15.735 3.428C18.742 4.457 20.245 4.971 20.622 5.509C20.992 6.035 21 7.577 21 10.636L12.75 10.888Z" fill="#096B58" />
          </svg>
        </div>
        <div>
          <h4 className="login-form-hipaa-badge-title text-xs font-bold text-slate-800 leading-tight">Secure & HIPAA Ready</h4>
          <p className="login-form-hipaa-badge-desc text-[11px] text-gray-500 leading-normal mt-0.5 font-medium">
            Your healthcare information is protected with enterprise grade encryption and secure authentication.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtpForm;