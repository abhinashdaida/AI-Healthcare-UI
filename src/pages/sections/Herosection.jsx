import React from "react";
import { Button, Chip, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

// Replace with your actual image path
import doctorImage from "../../assets/Landingpage/hero-doctor.avif";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-white border-b border-[#F4F4F4] overflow-hidden">
      {/* 
        FIGMA CONTAINER LAYOUT:
        - Canvas Max Width: 1140px
        - Responsive Padding: px-4 sm:px-6 py-6 sm:py-10
        - Column Gap: gap-8
      */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">

        {/* LEFT CONTENT (Frame 481) */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left justify-center w-full">

          {/* AI Badge */}
          <Chip
            icon={<Icon icon="si:ai-fill" width={14} className="!text-[#0F766E]" />}
            label="AI-Powered Healthcare Ecosystem"
            sx={{
              background: "#E6F7F5",
              color: "#0F766E",
              fontWeight: 600,
              fontSize: "12px",
              borderRadius: "999px",
              px: 0.5,
              py: 0.2,
              height: "28px",
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />

          {/* Main Title */}
          <Typography
            variant="h1"
            className="
              !mt-3.5  
              !text-[28px] sm:!text-[34px] lg:!text-[38px]
              !font-bold
              !leading-[1.15]
              !text-[#111827]
              !tracking-tight
            "
          >
            One Platform for the <br className="hidden sm:inline" />
            Entire <span className="text-[#0F766E]">Healthcare</span> <br className="hidden sm:inline" />
            Ecosystem
          </Typography>

          {/* Subtitle / Description */}
          <Typography
            className=" 
              !mt-3.5
              !text-[13px] sm:!text-[14px] 
              !leading-[20px] sm:!leading-[22px]
              !text-[#4B5563]
              max-w-[420px]
            "
          >
            Connect Patients, Doctors, Hospitals, Laboratories, Pharmacies,
            Insurance, and Healthcare providers through one secure AI-powered
            platform.
          </Typography>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mt-6 w-full sm:w-auto">
            <Button
              variant="contained"
              startIcon={<Icon icon="uis:calendar" width={16} />}
              className="w-full sm:w-auto"
              sx={{
                background: "#0F766E",
                borderRadius: "8px",
                textTransform: "none",
                px: "18px",
                py: "9px",
                fontWeight: 600,
                fontSize: "13.5px",
                boxShadow: "none",
                "&:hover": {
                  background: "#0D655E",
                  boxShadow: "none",
                },
              }}
            >
              Book Appointment
            </Button>

            <Button
              variant="outlined"
              startIcon={<Icon icon="tabler:video" width={16} />}
              className="w-full sm:w-auto"
              sx={{
                color: "#0F766E",
                borderColor: "#0F766E",
                borderRadius: "8px",
                textTransform: "none",
                px: "18px",
                py: "9px",
                fontWeight: 600,
                fontSize: "13.5px",
                "&:hover": {
                  borderColor: "#0D655E",
                  background: "rgba(15, 118, 110, 0.04)",
                },
              }}
            >
              Consult Online
            </Button>
          </div>

          {/* Trust Badges Bar */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center lg:justify-start gap-4 mt-7 text-left">

            {/* Trusted by 1M+ Patients */}
            <div className="flex items-center gap-1.5">
              <Icon icon="codicon:workspace-trusted" width={16} className="text-[#0F766E] shrink-0" />
              <div className="leading-none">
                <span className="text-[10px] font-bold text-[#111827] block">Trusted by</span>
                <span className="text-[9px] text-gray-500">1M+ Patients</span>
              </div>
            </div>

            {/* Verified Healthcare Experts */}
            <div className="flex items-center gap-1.5">
              <Icon icon="material-symbols:verified-outline" width={16} className="text-[#0F766E] shrink-0" />
              <div className="leading-none">
                <span className="text-[10px] font-bold text-[#111827] block">Verified</span>
                <span className="text-[9px] text-gray-500">Healthcare Experts</span>
              </div>
            </div>

            {/* Secure & Confidential */}
            <div className="flex items-center gap-1.5">
              <Icon icon="grommet-icons:secure" width={16} className="text-[#0F766E] shrink-0" />
              <div className="leading-none">
                <span className="text-[10px] font-bold text-[#111827] block">Secure & Confidential</span>
                <span className="text-[9px] text-gray-500">Your data is protected</span>
              </div>
            </div>

            {/* 24/7 Care */}
            <div className="flex items-center gap-1.5">
              <Icon icon="carbon:headset" width={16} className="text-[#0F766E] shrink-0" />
              <div className="leading-none">
                <span className="text-[10px] font-bold text-[#111827] block">24/7 Care</span>
                <span className="text-[9px] text-gray-500">We're here for you</span>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT CONTENT CONTAINER */}
        <div className="relative w-full max-w-[340px] sm:max-w-[440px] h-[320px] sm:h-[380px] flex justify-center items-center shrink-0 mt-4 lg:mt-0">

          {/* Hero Image Wrapper */}
          <div className="relative w-full h-full flex justify-center items-center">
            <img
              src={doctorImage}
              alt="Doctor and Patient"
              className="w-full h-full object-contain relative z-10"
            />

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-white via-white/80 to-transparent z-15 pointer-events-none" />

            {/* Soft Teal Backdrop Glow */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[240px] sm:w-[300px] h-[120px] sm:h-[140px] bg-[#E6F7F5] rounded-full blur-[50px] pointer-events-none z-0 opacity-80" />
          </div>


          {/* Floating Card 1: Find Doctors */}
          <div className="absolute top-[20px] sm:top-[40px] left-[-40px] sm:left-[-30px] z-20 w-[130px] sm:w-[145px] h-[46px] sm:h-[50px] bg-white/95 backdrop-blur-md rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-100 px-2 sm:px-2.5 py-1.5 flex items-center gap-2">
            <div className="bg-[#E6F7F5] p-1.5 rounded-lg shrink-0">
              <Icon icon="icon-park-outline:appointment" width={15} className="text-[#0F766E]" />
            </div>
            <div className="overflow-hidden">
              <h3 className="text-[10px] sm:text-[11px] font-bold text-gray-900 truncate">Find Doctors</h3>
              <p className="text-[8px] sm:text-[9px] text-gray-500 truncate">Verified specialists</p>
            </div>
          </div>

          {/* Floating Card 2: Consult Online */}
          <div className="absolute top-[-10px] sm:top-[-20px] right-[0px] sm:right-[20px]  z-20 w-[145px] sm:w-[165px] h-[46px] sm:h-[50px] bg-white/95 backdrop-blur-md rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-100 px-2 sm:px-2.5 py-1.5 flex items-center gap-2">
            <div className="bg-[#E6F7F5] p-1.5 rounded-lg shrink-0">
              <Icon icon="tabler:video" width={15} className="text-[#0F766E]" />
            </div>
            <div className="overflow-hidden">
              <h3 className="text-[10px] sm:text-[11px] font-bold text-gray-900 truncate">Consult Online</h3>
              <p className="text-[8px] sm:text-[9px] text-gray-500 truncate">Connect in Few Seconds</p>
            </div>
          </div>

          {/* Floating Card 3: Lab Tests */}
          <div className="absolute bottom-[10px] left-[30px] sm:left-[50px] z-20 w-[130px] sm:w-[145px] h-[46px] sm:h-[50px] bg-white/95 backdrop-blur-md rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-100 px-2 sm:px-2.5 py-1.5 flex items-center gap-2">
            <div className="bg-[#E6F7F5] p-1.5 rounded-lg shrink-0">
              <Icon icon="streamline-ultimate:lab-tube-experiment" width={15} className="text-[#0F766E]" />
            </div>
            <div className="overflow-hidden">
              <h3 className="text-[10px] sm:text-[11px] font-bold text-gray-900 truncate">Lab Tests</h3>
              <p className="text-[8px] sm:text-[9px] text-gray-500 truncate">Book tests at home</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;