import React from "react";
import { Icon } from "@iconify/react";

const ContactSupportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 px-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xs p-6 flex flex-col items-center text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-full bg-[#EAF3EF] flex items-center justify-center mb-3">
          <Icon
            icon="tabler:headset"
            width={24}
            height={24}
            className="text-[#248B8F]"
          />
        </div>

        <h3 className="text-base font-semibold text-[#0B1117] mb-1">
          Need Help?
        </h3>
        <p className="text-xs text-[#6B7280] mb-5 leading-relaxed">
          Our support team is ready to assist you with your health
          registration.
        </p>

        <button
          onClick={() => {
            // hook up your actual contact-support action here
            onClose();
          }}
          className="w-full bg-[#248B8F] text-white text-sm font-medium rounded-lg py-2.5 mb-2 hover:bg-[#1D7275]"
        >
          Contact Support
        </button>

        <button
          onClick={onClose}
          className="w-full border border-[#D1D5DB] text-[#374151] text-sm font-medium rounded-lg py-2.5 hover:bg-slate-50"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ContactSupportModal;