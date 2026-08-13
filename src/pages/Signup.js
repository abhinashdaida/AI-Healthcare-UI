// Signup.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

// Import reusable components
import Continuebtn from "@/shared/components/Authorisedcomponents/Reusecomponents/Continuebtn";
import LoginAndSignupHeader from "@/shared/components/Authorisedcomponents/Reusecomponents/Login&signupheader";
import LoginAndSignupFooter from "@/shared/components/Authorisedcomponents/Reusecomponents/Login&signupfooter";
import Hipaasecurity from "@/shared/components/Authorisedcomponents/Reusecomponents/Hipaasecurity";
import Brandingsidepanel from "@/shared/components/Authorisedcomponents/Reusecomponents/Brandingsidepanel";
import PhoneNumberField from "@/shared/components/Authorisedcomponents/Reusecomponents/PhoneNumberField";
import OtpInput from "@/shared/components/Authorisedcomponents/Reusecomponents/OtpInput";
import RoleSection from "@/shared/components/Authorisedcomponents/Reusecomponents/Rolesection";
import Backbtn from "@/shared/components/Authorisedcomponents/Reusecomponents/Backbtn";

// Import CSS
import "./SignUp.css";

// Import services / components
import { verifyOtpApi } from "@/shared/components/Authorisedcomponents/Reusecomponents/OtpInput";

// Initial country for default selection
const defaultCountry = {
  name: "India",
  code: "+91",
  flag: "twemoji:flag-india"
};

const SignUp = () => {
  const navigate = useNavigate();

  // Multi-step states: "roleselect", "signup" (phone entry), or "otp" (verification)
  const [step, setStep] = useState("roleselect");
  const [selectedRole, setSelectedRole] = useState("Patient");
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [loading, setLoading] = useState(false);

  // Phone number and error states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // OTP and error states
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  // Handle country dropdown changes
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setPhoneNumber("");
    setPhoneError("");
  };

  // Handle step change from RoleSection to Create Account phone number page
  const handleRoleFinalize = (role) => {
    setSelectedRole(role);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("signup");
    }, 500);
  };

  // Validate and transition from Phone screen to OTP screen
  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      setPhoneError("Enter the phone number");
      return;
    }

    if (phoneNumber.length < 10) {
      setPhoneError("Enter the phone number 10 digit");
      return;
    }

    setPhoneError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 500);
  };

  // Validate and submit the OTP code
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    // Case 1: Empty OTP
    if (!otpCode) {
      setOtpError("please enter the otp");
      return;
    }

    // Case 2: Incomplete OTP
    if (otpCode.length < 6) {
      setOtpError("please enter the correct otp");
      return;
    }

    setOtpError("");
    setLoading(true);

    try {
      const response = await verifyOtpApi(phoneNumber, otpCode);
      if (response.success) {
        sessionStorage.setItem("user", JSON.stringify({ 
          role: selectedRole, 
          phone: `${selectedCountry.code}${phoneNumber}`
        }));
        sessionStorage.setItem("phoneNumber", phoneNumber);
        navigate("/");
      } else {
        setOtpError(response.error || "your otp invalid");
      }
    } catch (err) {
      setOtpError("verification failed. please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    Swal.fire({
      icon: "info",
      title: "OTP Resent",
      text: "A new 6-digit verification code has been sent.",
      timer: 1500,
      showConfirmButton: false
    });
  };

  return (
       <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center justify-between p-4 md:p-6 lg:p-5 font-sans signup-page">
 
      
      {/* Top Header */}
      <div className="w-full max-w-[1344px] mx-auto px-4 md:px-0">
        <LoginAndSignupHeader onContactSupport={() => {
          Swal.fire({
            title: "Contact Support",
            html: "Need immediate assistance?<br>Email: <b>support@mediconnect.com</b><br>Call: <b>+1 (800) 555-0199</b>",
            icon: "info",
            confirmButtonColor: "#086952"
          });
        }} />
      </div>

      {/* Main Card Container with Split Screen Layout */}
      <main className={`w-full max-w-[1280px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col md:flex-row overflow-visible ${step === "roleselect" ? "min-h-[650px]" : "min-h-[760px]"}`}>
        
        {/* Left Side: BrandingSidePanel (always visible in Split Screen) */}
        <Brandingsidepanel />

        {/* Right Side: Interactive Content Panel */}
        <div className={`w-full md:w-[55%] flex flex-col relative ${step === "roleselect" ? "justify-between p-6 md:p-8 lg:p-12 -mt-6" : "justify-start px-6 pt-6 pb-16 md:px-10 md:pt-10 md:pb-32 lg:px-16 lg:pt-16 lg:pb-36"}`}>
          
          {/* Back button container (spacing preserved) */}
          <div className="h-10 w-full flex justify-start">
            {step === "otp" && (
              <Backbtn onClick={() => setStep("signup")} />
            )}
          </div>

          {/* Screen Content Switcher */}
          <div className={`flex flex-col w-full mx-auto ${step === "roleselect" ? "flex-1 justify-center max-w-[560px] my-3" : "max-w-lg mt-6 md:mt-10 mb-10"}`}>
            {step === "signup" && (
              // Step 2: Create Account Page (Phone input)
              <div className="animate-fade-in-up flex flex-col gap-6 pt-4 md:pt-6 pb-0">
                <div className="flex flex-col gap-2 text-center mt-2 md:mt-4">
                  <p className="font-typeface text-3xl font-medium leading-none tracking-normal text-[#0D1412]">
                    Create Account
                  </p>
                  <p className="text-[#666666] text-sm">
                    Enter your phone number to get started
                  </p>
                </div>

                <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-5 mt-2">
                  <PhoneNumberField
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    error={phoneError}
                    setError={setPhoneError}
                    selectedCountry={selectedCountry}
                    onCountryChange={handleCountryChange}
                  />

                  <Continuebtn type="submit" loading={loading} className="!rounded-lg !font-normal !text-[#FFFFFF] !bg-[#096B58] hover:!bg-[#075344]" />
                </form>

                <div className="text-center text-sm text-[#666666] font-normal mt-4 mb-4">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-[#096B58] font-medium hover:underline hover:decoration-[1.2px] hover:underline-offset-[3.36px]">
                    Sign up
                  </Link>
                </div>

                {/* Agreement Terms */}
                <p className="text-xs text-[#666666] text-center leading-snug max-w-md mx-auto font-normal mt-0 mb-0 whitespace-pre-line">
                  By continuing, you agree to receive updates from the MediConnect{"\n"}
                  team and confirm that you have read, understood, and agree to{"\n"}
                  MediConnect’s <Link to="/terms" className="font-medium text-[#096B58] hover:underline hover:decoration-[1.2px] hover:underline-offset-[3.36px]">Terms & Conditions</Link> and <Link to="/privacy" className="font-medium text-[#096B58] hover:underline hover:decoration-[1.2px] hover:underline-offset-[3.36px]">Privacy Policy</Link>.
                </p>
              </div>
            )}

            {step === "otp" && (
              // Step 3: Create Account Page (OTP verification)
              <div className="animate-fade-in-up flex flex-col gap-6 pt-4 md:pt-6 pb-0">
                <div className="flex flex-col gap-1.5 text-center">
                  <p className="font-typeface text-3xl font-medium leading-none tracking-normal text-[#0D1412]">
                    Create Account
                  </p>
                  <p className="text-[#666666] text-sm leading-relaxed max-w-md mx-auto whitespace-pre-line">
                    Verify your phone number using the 6-digit{"\n"}code we just sent.
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">
                  {/* Reusable OTP Input Component */}
                  <OtpInput
                    otp={otp}
                    setOtp={setOtp}
                    error={otpError}
                    setError={setOtpError}
                  />

                  <Continuebtn type="submit" loading={loading} className="!rounded-lg !font-normal !text-[#FFFFFF] !bg-[#096B58] hover:!bg-[#075344]" />
                </form>

                {/* Resend OTP */}
                <div className="text-center text-sm text-[#666666] font-normal mt-3">
                  Didn't receive an OTP?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-[#096B58] font-medium hover:underline hover:decoration-[1.2px] hover:underline-offset-[3.36px] bg-transparent border-0 cursor-pointer"
                  >
                    Resend OTP!
                  </button>
                </div>
              </div>
            )}

            {step === "roleselect" && (
              // Step 1: RoleSection Screen
              <div className="animate-fade-in-up w-full">
                <RoleSection 
                  selectedRole={selectedRole}
                  onRoleSelect={setSelectedRole}
                  onContinue={handleRoleFinalize}
                />
              </div>
            )}
          </div>

          {/* Bottom HIPAA Security Shield Card (Hidden on RoleSection view) */}
          {step !== "roleselect" && <Hipaasecurity />}

        </div>
        
      </main>
      
      {/* Footer Wrapper */}
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-0 text-left">
        <LoginAndSignupFooter />
      </div>
    </div>
  );
};

export default SignUp;
