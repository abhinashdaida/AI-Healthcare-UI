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

// Import CSS
import "./SignUp.css";

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
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    // Case 1: Empty OTP
    if (!otpCode) {
      setOtpError("Please enter the OTP");
      return;
    }

    // Case 2: Incomplete OTP
    if (otpCode.length < 6) {
      setOtpError("Please enter the correct OTP");
      return;
    }

    // Case 3: Incorrect OTP (Mock Correct OTP: "123456")
    if (otpCode !== "123456") {
      setOtpError("Your OTP is invalid");
      return;
    }

    // Case 4: Valid OTP - Continue with existing project flow directly
    setOtpError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("user", JSON.stringify({ 
        role: selectedRole, 
        phone: `${selectedCountry.code}${phoneNumber}`
      }));
      navigate("/login");
    }, 1000);
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
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center justify-between p-4 md:p-6 lg:p-5 signup-page">
      
      {/* Top Header */}
      <LoginAndSignupHeader onContactSupport={() => {
        Swal.fire({
          title: "Contact Support",
          html: "Need immediate assistance?<br>Email: <b>support@mediconnect.com</b><br>Call: <b>+1 (800) 555-0199</b>",
          icon: "info",
          confirmButtonColor: "#086952"
        });
      }} />

      {/* Main Card Container with Split Screen Layout */}
      <main className="w-full max-w-[1280px] min-h-[650px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col md:flex-row overflow-visible">
        
        {/* Left Side: BrandingSidePanel (always visible in Split Screen) */}
        <Brandingsidepanel />

        {/* Right Side: Interactive Content Panel */}
        <div className="w-full md:w-[55%] flex flex-col justify-between p-6 md:p-8 lg:p-12 relative -mt-6">
          
          {/* Back button container (spacing preserved) */}
          <div className="h-10 w-full flex justify-start">
          </div>

          {/* Screen Content Switcher */}
          <div className="flex-1 flex flex-col justify-center my-3 w-full max-w-lg mx-auto">
            {step === "signup" && (
              // Step 2: Create Account Page (Phone input)
              <div className="animate-fade-in-up flex flex-col gap-6">
                <div className="flex flex-col gap-1.5 text-center">
                  <p className="font-typeface text-3xl font-semibold leading-none tracking-normal text-slate-800">
                    Create Account
                  </p>
                  <p className="text-slate-500 text-sm">
                    Enter your phone number to get started
                  </p>
                </div>

                <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-5">
                  <PhoneNumberField
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    error={phoneError}
                    setError={setPhoneError}
                    selectedCountry={selectedCountry}
                    onCountryChange={handleCountryChange}
                  />

                  <Continuebtn type="submit" loading={loading} />
                </form>

                <div className="text-center text-sm text-slate-500 font-medium mt-1">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#086952] font-semibold hover:underline">
                    Sign in
                  </Link>
                </div>

                {/* Agreement Terms */}
                <p className="text-xs text-slate-400 text-center leading-relaxed max-w-sm mx-auto font-light">
                  By continuing, you agree to receive updates from the MediConnect team and confirm that you have read, understood, and agree to MediConnect's{" "}
                  <Link to="/terms" className="font-semibold text-[#086952] hover:underline">Terms & Conditions</Link> and{" "}
                  <Link to="/privacy" className="font-semibold text-[#086952] hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            )}

            {step === "otp" && (
              // Step 3: Create Account Page (OTP verification)
              <div className="animate-fade-in-up flex flex-col gap-6">
                <div className="flex flex-col gap-1.5 text-center">
                  <p className="font-typeface text-3xl font-semibold leading-none tracking-normal text-slate-800">
                    Create Account
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                    Verify your phone number using the 6-digit code we just sent.
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

                  <Continuebtn type="submit" loading={loading} />
                </form>

                {/* Resend OTP */}
                <div className="text-center text-sm text-slate-500 font-medium mt-1">
                  Didn't receive an OTP?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-[#086952] font-semibold hover:underline bg-transparent border-0 cursor-pointer"
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
      <LoginAndSignupFooter className="mt-2 text-center md:text-left" />
    </div>
  );
};

export default SignUp;
