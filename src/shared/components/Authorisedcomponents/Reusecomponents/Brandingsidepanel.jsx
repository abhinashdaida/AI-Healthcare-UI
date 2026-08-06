import { Icon } from "@iconify/react";
import React from "react";
import brandingImage from "@assets/signup&loginassest/brandingimage.avif"

function Brandingsidepanel() {
  return (
    <div className="w-full md:w-[60%] bg-[#096B58] rounded-[24px] text-white p-6 md:p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[600px]">
      
      {/* Top section */}
      <div className="flex flex-col gap-3 z-10">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 w-fit text-xs font-semibold tracking-wide">
          <span>AI-Powered Healthcare Ecosystem</span>
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl lg:text-4xl tracking-tight leading-tight font-medium max-w-xl">
            One Secure Access for Every Healthcare User
          </h2>
          <p className="text-white/80 text-sm leading-relaxed font-light max-w-md">
            Patients, Doctors, Hospitals, Pharmacies, Laboratories, and Insurance providers connected through one intelligent healthcare ecosystem.
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative flex justify-center my-4 z-10">
        <img
          src={brandingImage}
          alt="Healthcare Branding"
          className="w-full max-w-[480px] h-auto rounded-xl object-cover -mt-11 -ml-14"
        />
      </div>

      {/* Bottom Cards Section */}
      <div className="absolute bottom-6 grid grid-cols-1 sm:grid-cols-3 gap-2 ml-12 z-10">
        
        {/* Card 1: 24/7 Access */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all duration-200">
          <div className="flex items-center gap-2 mb-1">
            <Icon icon="iconoir:clock-solid" className="text-[#14B392] text-xl" />
            <span className="text-lg font-semibold">24/7</span>
          </div>
          <p className="text-white/70 text-xs font-light">Healthcare Access</p>
        </div>

        {/* Card 2: 100% Encrypted */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all duration-200">
          <div className="flex items-center gap-2 mb-1">
            <Icon icon="mingcute:shield-fill" className="text-[#14B392] text-xl" />
            <span className="text-lg font-semibold">100%</span>
          </div>
          <p className="text-white/70 text-xs font-light">Encrypted Login</p>
        </div>

        {/* Card 3: AI Enabled */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all duration-200">
          <div className="flex items-center gap-2 mb-1">
            <Icon icon="boxicons:sparkles-filled" className="text-[#14B392] text-xl" />
            <span className="text-lg font-semibold">AI</span>
          </div>
          <p className="text-white/70 text-xs font-light">AI Enabled Platform</p>
        </div>

      </div>
    </div>
  );
}

export default Brandingsidepanel;