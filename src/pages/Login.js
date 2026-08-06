// Login.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

// Import reusable components
import Continuebtn from "@/shared/components/Authorisedcomponents/Reusecomponents/Continuebtn";
import Verifyotpbtn from "@/shared/components/Authorisedcomponents/Reusecomponents/Verifyotpbtn";
import LoginAndSignupHeader from "@/shared/components/Authorisedcomponents/Reusecomponents/Login&signupheader";
import LoginAndSignupFooter from "@/shared/components/Authorisedcomponents/Reusecomponents/Login&signupfooter";
import Hipaasecurity from "@/shared/components/Authorisedcomponents/Reusecomponents/Hipaasecurity";
import Brandingsidepanel from "@/shared/components/Authorisedcomponents/Reusecomponents/Brandingsidepanel";
import CountryCode from "@/shared/components/Authorisedcomponents/Reusecomponents/Countrycode";

// Import CSS
import "./Login.css";

// Initial country for default selection
const defaultCountry = {
  name: "India",
  code: "+91",
  flag: "twemoji:flag-india"
};

// Country-specific phone number validation
const getPhoneValidationSchema = (countryCode) => {
  let pattern = /^[0-9]{4,15}$/; // default pattern
  let message = "Please enter a valid phone number";

  if (countryCode === "+91") {
    // India: 10 digits
    pattern = /^[0-9]{10}$/;
    message = "Please enter a valid 10-digit  phone number";
  } else if (countryCode === "+1") {
    pattern = /^[0-9]{10}$/;
    message = "Please enter a valid 10-digit phone number";
  }

  return Yup.object({
    phoneNumber: Yup.string()
      .matches(pattern, message)
      .required("Phone number is required"),
  });
};

const uniqueIdValidationSchema = Yup.object({
  uniqueId: Yup.string()
    .min(3, "Unique ID must be at least 3 characters")
    .required("Unique ID is required"),
});

const passwordValidationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  // Multi-step state
  const [step, setStep] = useState("signin");
  const [selectedRole, setSelectedRole] = useState(null);

  // Form states
  const [activeTab, setActiveTab] = useState("phone");
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  // OTP states
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [resendTimer, setResendTimer] = useState(30);
  const [otpSentMessage, setOtpSentMessage] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Get validation schema based on selected country
  const getValidationSchema = () => {
    if (activeTab === "phone") {
      return getPhoneValidationSchema(selectedCountry.code);
    }
    return uniqueIdValidationSchema;
  };

  // Formik for Sign In
  const signInFormik = useFormik({
    initialValues: {
      phoneNumber: "",
      uniqueId: "",
    },
    validationSchema: getValidationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setLoading(true);
      
      setTimeout(() => {
        setLoading(false);
        if (activeTab === "phone") {
          setResendTimer(30);
          setOtpSentMessage(true);
          setOtp(["", "", "", "", "", ""]);
          setStep("otp");
        } else {
          setStep("password");
        }
      }, 800);
    },
  });

  // Update validation when country changes
  useEffect(() => {
    if (activeTab === "phone" && signInFormik.values.phoneNumber) {
      signInFormik.validateField("phoneNumber");
    }
  }, [selectedCountry.code]);

  // Formik for Password
  const passwordFormik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Authentication Successful",
          text: `Welcome back! Logged in as ${selectedRole?.name || "User"}.`,
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          sessionStorage.setItem("user", JSON.stringify({ role: selectedRole?.id, id: signInFormik.values.uniqueId }));
          navigate("/dashboard");
        });
      }, 1000);
    },
  });

  // OTP inputs key navigation
  const handleOtpChange = (index, value) => {
    const num = value.replace(/\D/g, "");
    if (!num) return;

    const newOtp = [...otp];
    newOtp[index] = num.substring(num.length - 1);
    setOtp(newOtp);

    if (index < 5 && newOtp[index] !== "") {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "") {
        if (index > 0) {
          newOtp[index - 1] = "";
          setOtp(newOtp);
          otpRefs[index - 1].current.focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter the complete 6-digit OTP code.",
        confirmButtonColor: "#086952"
      });
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "OTP Verified",
        text: `Logged in securely as ${selectedRole?.name || "User"}.`,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        sessionStorage.setItem("user", JSON.stringify({ role: selectedRole?.id, phone: signInFormik.values.phoneNumber }));
        navigate("/dashboard");
      });
    }, 1000);
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      setResendTimer(30);
      setOtp(["", "", "", "", "", ""]);
      setOtpSentMessage(true);
      Swal.fire({
        icon: "info",
        title: "OTP Resent",
        text: "A new 6-digit verification code has been sent.",
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  // Resend timer countdown
  useEffect(() => {
    let interval = null;
    if ((step === "otp" || step === "signup-otp") && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Handle tab switch - reset form errors
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    signInFormik.resetForm();
  };

  // Handle country change
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    // Clear phone number when country changes
    signInFormik.setFieldValue("phoneNumber", "");
    signInFormik.setFieldTouched("phoneNumber", false);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center justify-between p-4 md:p-6 lg:p-5 font-sans">
      
      {/* Top Header */}
      <LoginAndSignupHeader onContactSupport={() => {
        Swal.fire({
          title: "Contact Support",
          html: "Need immediate assistance?<br>Email: <b>support@mediconnect.com</b><br>Call: <b>+1 (800) 555-0199</b>",
          icon: "info",
          confirmButtonColor: "#086952"
        });
      }} />

      {/* Main card container */}
     <main className="w-full max-w-[1280px] h-[650px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col md:flex-row overflow-visible">
        
        {/* Left Branding Side Panel */}
        <Brandingsidepanel/>

        {/* Right Interactive Form Area */}
        <div className="w-full md:w-[55%] flex flex-col justify-between p-6 md:p-8 lg:p-16 relative -mt-12">
          
          {/* Back button container */}
          <div className="h-10">
            {step !== "signin" && (
              <button
                type="button"
                onClick={() => {
                  if (step === "otp") setStep("signin");
                  else if (step === "password") setStep("signin");
                  else if (step === "signup-otp") setStep("signin");
                }}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold text-sm transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <Icon icon="lucide:chevron-left" className="w-4 h-4" />
                </div>
                <span>Back</span>
              </button>
            )}
          </div>

          {/* Interactive Screen Steps */}
          <div className="flex-1 flex flex-col justify-center my-3 max-w-md mx-auto w-full">
            {/* SIGN IN STEP */}
            {step === "signin" && (
              <div className="animate-fade-in-up flex flex-col gap-5">
                <div className="flex flex-col gap-1.5 text-center">
                  <p className="font-typeface text-3xl font-medium text-center leading-none tracking-normal">
  Welcome Back!
</p>
                  <p className="text-slate-500 text-xs md:text-sm">
                    Continue securely using your phone number or Unique ID.
                  </p>
                </div>

                {/* Tab buttons */}
                <div className="w-full bg-slate-100 p-1 rounded-xl flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleTabSwitch("phone")}
                    className={`flex-1 py-2.5 rounded-lg font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                      activeTab === "phone"
                        ? "bg-white text-[#086952] shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Icon icon="lucide:phone" className="w-4 h-4" />
                    <span>Phone Number</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabSwitch("uniqueId")}
                    className={`flex-1 py-2.5 rounded-lg font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                      activeTab === "uniqueId"
                        ? "bg-white text-[#086952] shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Icon icon="lucide:user" className="w-4 h-4" />
                    <span>Unique ID</span>
                  </button>
                </div>

                {/* Tab fields */}
                <form onSubmit={signInFormik.handleSubmit} className="flex flex-col gap-3.5">
                  {activeTab === "phone" ? (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500">Phone Number</label>
                      <div className={`w-full flex items-center border rounded-xl px-3 bg-white transition-all ${
                        signInFormik.touched.phoneNumber && signInFormik.errors.phoneNumber
                          ? "border-red-500 focus-within:border-red-500"
                          : "border-slate-200 focus-within:border-[#086952] focus-within:ring-2 focus-within:ring-[#086952]/10"
                      }`}>
                        <CountryCode 
                          value={selectedCountry} 
                          onChange={handleCountryChange}
                        />
                        <input
                          type="tel"
                          placeholder={`Enter phone number`}
                          name="phoneNumber"
                          value={signInFormik.values.phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 15) {
                              signInFormik.setFieldValue("phoneNumber", value);
                            }
                          }}
                          onBlur={signInFormik.handleBlur}
                          className={`w-full py-3.5 pl-3 border-0 focus:outline-none focus:ring-0 text-sm text-slate-700 font-medium placeholder-slate-400 ${
                            signInFormik.touched.phoneNumber && signInFormik.errors.phoneNumber
                              ? "text-red-600"
                              : ""
                          }`}
                        />
                      </div>
                      {signInFormik.touched.phoneNumber && signInFormik.errors.phoneNumber && (
                        <p className="text-red-500 text-xs font-medium mt-1">{signInFormik.errors.phoneNumber}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500">Unique ID *</label>
                      <div className={`w-full flex items-center border rounded-xl px-3 bg-white transition-all ${
                        signInFormik.touched.uniqueId && signInFormik.errors.uniqueId
                          ? "border-red-500 focus-within:border-red-500"
                          : "border-slate-200 focus-within:border-[#086952] focus-within:ring-2 focus-within:ring-[#086952]/10"
                      }`}>
                        <Icon icon="fluent:person-card-20-regular" className="w-5 h-5 text-slate-400 pr-2 border-r border-slate-200" />
                        <input
                          type="text"
                          placeholder="Enter your unique ID"
                          name="uniqueId"
                          value={signInFormik.values.uniqueId}
                          onChange={signInFormik.handleChange}
                          onBlur={signInFormik.handleBlur}
                          className={`w-full py-3.5 pl-3 border-0 focus:outline-none focus:ring-0 text-sm text-slate-700 font-medium placeholder-slate-400 ${
                            signInFormik.touched.uniqueId && signInFormik.errors.uniqueId
                              ? "text-red-600"
                              : ""
                          }`}
                        />
                      </div>
                      {signInFormik.touched.uniqueId && signInFormik.errors.uniqueId && (
                        <p className="text-red-500 text-xs font-medium mt-1">{signInFormik.errors.uniqueId}</p>
                      )}
                    </div>
                  )}

                  <Continuebtn type="submit" loading={loading} />
                </form>

                {/* Sign up toggle link */}
                <div className="text-center text-xs text-slate-500 font-medium">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-[#086952] font-semibold hover:underline"
                  >
                    Sign up
                  </Link>
                </div>

                {/* Privacy and Policy Disclaimer */}
                <p className="text-[10px] text-slate-400 text-center leading-relaxed max-w-sm mx-auto font-light">
                  By continuing, you agree to receive updates from the MediConnect team and confirm that you have read, understood, and agree to MediConnect's{" "}
                  <span className="font-semibold text-[#086952] cursor-pointer hover:underline">Terms & Conditions</span> and{" "}
                  <span className="font-semibold text-[#086952] cursor-pointer hover:underline">Privacy Policy</span>.
                </p>
              </div>
            )}

            {/* PASSWORD ENTRY STEP */}
            {step === "password" && (
              <form onSubmit={passwordFormik.handleSubmit} className="animate-fade-in-up flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    Secure Access
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Enter your password to continue securely to your healthcare workspace.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Password</label>
                  <div className={`w-full flex items-center border rounded-xl px-3 bg-white transition-all ${
                    passwordFormik.touched.password && passwordFormik.errors.password
                      ? "border-red-500 focus-within:border-red-500"
                      : "border-slate-200 focus-within:border-[#086952] focus-within:ring-2 focus-within:ring-[#086952]/10"
                  }`}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={passwordFormik.values.password}
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      className={`w-full py-3.5 border-0 focus:outline-none focus:ring-0 text-sm text-slate-700 font-medium placeholder-slate-400 ${
                        passwordFormik.touched.password && passwordFormik.errors.password
                          ? "text-red-600"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <Icon icon={showPassword ? "lucide:eye-off" : "lucide:eye"} className="w-4 h-4" />
                    </button>
                  </div>
                  {passwordFormik.touched.password && passwordFormik.errors.password && (
                    <p className="text-red-500 text-xs font-medium mt-1">{passwordFormik.errors.password}</p>
                  )}
                </div>

                <Continuebtn type="submit" loading={loading} />

                <div className="text-center text-xs">
                  <span className="text-slate-400">Forgot your password? </span>
                  <button
                    type="button"
                    onClick={() => {
                      Swal.fire({
                        title: "Reset Password",
                        input: "email",
                        inputLabel: "Enter your registered email address",
                        inputPlaceholder: "name@domain.com",
                        confirmButtonColor: "#086952",
                        showCancelButton: true
                      }).then((result) => {
                        if (result.isConfirmed && result.value) {
                          Swal.fire({
                            title: "Reset Link Sent",
                            text: "A recovery link has been sent to your email.",
                            icon: "success",
                            confirmButtonColor: "#086952"
                          });
                        }
                      });
                    }}
                    className="text-[#086952] font-semibold hover:underline"
                  >
                    Reset here!
                  </button>
                </div>
              </form>
            )}

            {/* OTP ENTRY STEP */}
            {step === "otp" && (
              <form onSubmit={handleOtpVerify} className="animate-fade-in-up flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    Secure Access
                  </h1>
                  <p className="text-slate-500 text-sm">
                    We've sent a 6-digit verification code to your registered phone number.
                  </p>
                </div>

                {/* Display phone with Edit capability */}
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 self-center">
                  <span className="text-sm font-semibold text-slate-700">
                    {selectedCountry.code} {signInFormik.values.phoneNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep("signin")}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#086952] bg-white border border-[#086952]/20 px-2 py-0.5 rounded-md hover:bg-[#086952]/5 transition-colors"
                  >
                    <Icon icon="lucide:pencil" className="w-2.5 h-2.5" />
                    <span>Edit</span>
                  </button>
                </div>

                {/* 6 Grid OTP input */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-slate-500 text-center">OTP</label>
                  <div className="grid grid-cols-6 gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={otpRefs[idx]}
                        type="tel"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-full aspect-square border border-slate-200 focus:border-[#086952] focus:ring-2 focus:ring-[#086952]/10 rounded-xl text-center font-bold text-lg text-slate-800 bg-white otp-input transition-all"
                      />
                    ))}
                  </div>
                  {otpSentMessage && (
                    <span className="text-xs font-medium text-emerald-600 text-center mt-1">
                      We have sent you an OTP!
                    </span>
                  )}
                </div>

                <Verifyotpbtn type="submit" loading={loading} />

                {/* Resend otp timer / action */}
                <div className="text-center text-xs text-slate-500 font-medium">
                  {resendTimer > 0 ? (
                    <span>
                      Didn't receive an OTP? Resend in{" "}
                      <span className="text-[#086952] font-bold">{resendTimer} seconds</span>
                    </span>
                  ) : (
                    <span>
                      Didn't receive an OTP?{" "}
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-[#086952] font-bold hover:underline"
                      >
                        Resend OTP!
                      </button>
                    </span>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Bottom HIPAA Security Shield Card */}
          <Hipaasecurity/>

        </div>
        
      </main>
      <LoginAndSignupFooter className="mt-2  text-center md:text-left" />
    </div>
  );
};

export default Login;