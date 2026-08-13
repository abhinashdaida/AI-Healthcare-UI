import React from "react";
import { Icon } from "@iconify/react";
import logo from "@assets/signup&loginassest/Logo.avif";

const LoginAndSignupHeader = ({ onContactSupport }) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between py-6 px-8 font-sans">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="MediConnect Logo"
          className="w-[158px] h-[44px] object-contain"
        />
      </div>

      {/* Contact Support */}
      <div
        onClick={onContactSupport}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-[#5E6670] hover:text-[#086952] hover:bg-[#F3F4F6] transition-all duration-300">
          <Icon icon="solar:headphones-round-outline" width="22" height="22" />
        </div>

        <div className="text-right">
          <p className="font-medium text-sm text-[#6B7280] font-sans">
            Need Help?
          </p>
          <p className="font-semibold text-[15px] text-[#086952] underline font-sans">
            Contact Support
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignupHeader;
