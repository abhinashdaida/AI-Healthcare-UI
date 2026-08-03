import React from "react";
import star from "@assets/patientRegistration/star.svg";

/**
 * RequiredNotice — the "★ These fields are required!" notice bar
 * rendered at the bottom of a form step above the CTA row.
 *
 * Props:
 *   message {string} — override the default message (optional)
 */
const RequiredNotice = ({ message = "These fields are required!" }) => {
  return (
    <div className="mt-11 w-full md:w-136.25 h-10 border border-[#E5E7EB] rounded-lg px-4 flex items-center gap-2 bg-[#FBFBFB] relative">
      <img
        src={star}
        alt="required"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3"
      />
      <span className="text-xs font-medium text-[#141414] pl-5">
        {message}
      </span>
    </div>
  );
};

export default RequiredNotice;
