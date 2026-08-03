import React, { useState } from "react";
import headphone from "../../../../assets/header/contactsupport.svg";

const Header = ({ title, description }) => {
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <div className="w-full px-7 pt-6 md:mt-10 md:flex md:h-16.5 md:items-center md:justify-between md:px-10 md:pt-0 relative">
      {/* Title & Description & Mobile Support Button */}
      <div className="flex flex-col w-full md:h-16.5 md:w-82 md:gap-1">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-[20px] font-semibold leading-7 text-[#000000] md:text-[20px] md:leading-6 md:text-black">
            {title}
          </h1>
          {/* Mobile support headphone icon button */}
          <button 
            type="button"
            onClick={() => setShowSupportModal(true)} 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4FAF7] text-[#096B58] border border-[#E0F0EB] md:hidden cursor-pointer shrink-0"
            aria-label="Contact Support"
          >
            <img src={headphone} alt="Support" className="w-5.5 h-5.5" />
          </button>
        </div>
        <p className="text-[12px] font-normal leading-5 text-[#666666] mt-1.5 md:text-[13px] md:leading-4.75 md:mt-1">
          {description}
        </p>
      </div>

      {/* Desktop Support block */}
      <div className="hidden md:flex h-9.5 items-center gap-4 md:mt-0 md:ml-auto md:w-fit md:gap-2">
        <div className="flex items-center justify-center">
          <img
            src={headphone}
            alt="Contact Support"
            className="w-9.5 h-9.5"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-[16px] font-normal leading-5 text-[#586B88] md:text-[12px] md:leading-4.75 md:text-[#141414]">
            Need Help?
          </span>

          <button className="text-left text-[16px] font-semibold leading-5 text-[#096B58] underline md:text-[12px] md:font-medium md:leading-4.75 cursor-pointer whitespace-nowrap">
            Contact Support
          </button>
        </div>
      </div>

      {/* Mobile Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-[#000000]/40 backdrop-blur-xs p-4 md:hidden">
          <div className="w-full max-w-[280px] rounded-2xl bg-white p-6 shadow-2xl flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4FAF7] text-[#096B58] mb-4">
              <img src={headphone} alt="" className="w-6 h-6" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#141414] mb-1">Need Help?</h3>
            <p className="text-[12px] text-[#666666] mb-6">Our support team is ready to assist you with your health registration.</p>
            <div className="flex flex-col gap-2 w-full">
              <button 
                type="button"
                className="w-full h-10 rounded-lg bg-[#096B58] text-white text-xs font-semibold hover:bg-[#075344] transition-colors cursor-pointer"
              >
                Contact Support
              </button>
              <button 
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] text-[#666666] text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;