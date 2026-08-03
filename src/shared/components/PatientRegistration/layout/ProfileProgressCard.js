import time from "@assets/patientRegistration/time.svg";
import React from "react";

const BOX_SHADOW =
  "0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.03), 0px 4px 4px rgba(0,0,0,0.03), 0px 8px 8px rgba(0,0,0,0.03)";

const ProfileProgressCard = ({ progress, variant = "desktop" }) => {
  if (variant === "mobile") {
    return (
      <div
        className="w-full rounded-lg border-[0.5px] border-[#D0D0D0] bg-white px-6 py-5 flex flex-col shrink-0"
        style={{ boxShadow: BOX_SHADOW }}
      >
        <h4 className="text-[16px] font-medium text-[#111827] leading-none">
          Profile Progress
        </h4>

        <div className="mt-8">
          <p className="text-[14px] font-semibold text-[#2E6B5F] leading-none mb-4">
            {progress}% Complete
          </p>

          <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2E6B5F] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-7 flex items-center gap-1 text-[10px] font-normal text-[#6B7280] leading-none">
            <img src={time} alt="Time" className="w-3 h-3" />
            <span className="mt-1">Estimated Time: 2-3 Minutes</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute left-10 bottom-10 w-65.5 h-44.75 rounded-lg border-[0.5px] border-[#D0D0D0] bg-white px-6 py-5 flex flex-col"
      style={{ boxShadow: BOX_SHADOW }}
    >
      <h4 className="text-[16px] font-medium text-[#111827] leading-none">
        Profile Progress
      </h4>

      <div className="mt-8">
        <p className="text-[14px] font-semibold text-[#2E6B5F] leading-none mb-4">
          {progress}% Complete
        </p>

        <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2E6B5F] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-7 flex items-center gap-1 text-[10px] font-normal text-[#6B7280] leading-none">
          <img src={time} alt="Time" className="w-3 h-3" />
          <span className="mt-1">Estimated Time: 2-3 Minutes</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileProgressCard;