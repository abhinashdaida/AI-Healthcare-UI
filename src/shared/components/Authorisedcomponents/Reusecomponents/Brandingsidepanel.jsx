import { Icon } from "@iconify/react";
import React from "react";
import brandingImage from "@assets/signup&loginassest/brandingimage.avif"
 
function Brandingsidepanel() {
  return (
    <div className="w-full md:w-[60%] bg-[#096B58] md:rounded-l-[24px] md:rounded-r-none text-white p-6 md:p-10 lg:p-12 flex flex-col justify-between items-start text-left relative overflow-hidden min-h-[600px]">
     
      {/* Top section */}
      <div className="flex flex-col gap-4 items-start z-10 w-full mt-6 max-w-[450px] mx-auto">
        {/* Pill Badge */}
        <div
          className="inline-flex items-center justify-center px-[24px] py-[12px] h-[46px] gap-[10px] rounded-full bg-[#096B58] backdrop-blur-md text-[13.5px] font-normal tracking-normal text-white select-none"
          style={{
            boxShadow: 'inset 0px 0px 2px 0px rgba(255, 255, 255, 0.25), inset 0px 0px 4px 0px rgba(255, 255, 255, 0.25), inset 0px 0px 8px 0px rgba(255, 255, 255, 0.25)'
          }}
        >
          <span>AI-Powered Healthcare Ecosystem</span>
        </div>
 
        {/* Title & Description */}
        <div className="flex flex-col gap-3 items-start">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] tracking-tight leading-tight font-normal max-w-xl text-white">
            One Secure Access for Every <br /> Healthcare User
          </h2>
          <p className="text-[#FFFFFF] text-[13px] leading-relaxed font-light max-w-xl">
            Patients, Doctors, Hospital, Pharmacies, Laboratories, and Insurance providers <br /> connected through one intelligent healthcare ecosystem.
          </p>
        </div>
      </div>
 
      {/* Image & Cards bottom grouped section to prevent justify-between from adding gap */}
      <div className="w-full flex flex-col items-center z-10 mt-10">
        {/* Image Section */}
        <div className="relative flex justify-center -mt-25 mb-0 z-0 w-full max-w-[560px] mx-auto">
          <img
            src={brandingImage}
            alt="Healthcare Branding"
            className="w-full max-w-[450px] h-auto object-contain mx-auto -mb-8 z-0"
          />
        </div>
 
        {/* Bottom Cards Section */}
        <div className="flex gap-[15px] justify-start z-10 mb-[16px] w-full max-w-[450px] mx-auto">
         
          {/* Card 1: 24/7 Access */}
          <div
            className="w-[140px] h-[76px] bg-[#096B58] rounded-[16px] p-[16px] flex flex-col items-start text-left backdrop-blur-md hover:bg-[#096B58] transition-all duration-200 select-none"
            style={{
              boxShadow: 'inset 0px 0px 2px 0px rgba(255, 255, 255, 0.25), inset 0px 0px 4px 0px rgba(255, 255, 255, 0.25), inset 0px 0px 8px 0px rgba(255, 255, 255, 0.25)'
            }}
          >
            <div className="flex items-center gap-[4px]">
              <Icon icon="iconoir:clock-solid" className="text-[#14B392] text-xl shrink-0" />
              <span className="text-lg font-normal text-white leading-none">24/7</span>
            </div>
            <p className="text-[#FFFFFF] text-[11px] font-light leading-tight mt-[8px]">Healthcare Access</p>
          </div>
 
          {/* Card 2: 100% Encrypted */}
          <div
            className="w-[140px] h-[76px] bg-[#096B58] rounded-[16px] p-[16px] flex flex-col items-start text-left backdrop-blur-md hover:bg-[#096B58] transition-all duration-200 select-none"
            style={{
              boxShadow: 'inset 0px 0px 2px 0px rgba(255, 255, 255, 0.25), inset 0px 0px 4px 0px rgba(255, 255, 255, 0.25), inset 0px 0px 8px 0px rgba(255, 255, 255, 0.25)'
            }}
          >
            <div className="flex items-center gap-[4px]">
              <Icon icon="mingcute:shield-fill" className="text-[#14B392] text-xl shrink-0" />
              <span className="text-lg font-normal text-white leading-none">100%</span>
            </div>
            <p className="text-[#FFFFFF] text-[11px] font-light leading-tight mt-[8px]">Encrypted Login</p>
          </div>
 
          {/* Card 3: AI Enabled */}
          <div
            className="w-[140px] h-[76px] bg-[#096B58] rounded-[16px] p-[16px] flex flex-col items-start text-left backdrop-blur-md hover:bg-[#096B58] transition-all duration-200 select-none"
            style={{
              boxShadow: 'inset 0px 0px 2px 0px rgba(255, 255, 255, 0.25), inset 0px 0px 4px 0px rgba(255, 255, 255, 0.25), inset 0px 0px 8px 0px rgba(255, 255, 255, 0.25)'
            }}
          >
            <div className="flex items-center gap-[4px]">
              <Icon icon="mingcute:ai-fill" className="text-[#14B392] text-xl shrink-0" />
              <span className="text-lg font-normal text-white leading-none">AI</span>
            </div>
            <p className="text-[#FFFFFF] text-[11px] font-light leading-tight mt-[8px]">AI Enabled Platform</p>
          </div>
 
        </div>
      </div>
    </div>
  );
}
 
export default Brandingsidepanel;