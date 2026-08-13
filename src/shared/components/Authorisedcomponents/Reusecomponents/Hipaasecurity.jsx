import { Icon } from "@iconify/react";
import React from "react";

function Hipaasecurity() {
  return (
    <div className="w-full border border-[#C2D0CB] bg-[#FFFFFF] rounded-[20px] pt-3 pb-3 px-3.5 flex gap-2.5 items-start mt-4 select-none">
      <div className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
        <Icon icon="solar:shield-bold" className="w-6 h-6 text-[#096B58]" />
      </div>
      <div className="flex flex-col gap-0.5">
        <h4 className="font-TypeFace text-[15px] font-medium leading-tight tracking-normal text-[#141414]">
          Secure & HIPAA Ready
        </h4>
        <p className="font-TypeFace text-[12px] font-normal leading-[17px] tracking-normal text-[#666666]">
          Your healthcare information is protected with enterprise grade encryption and <br /> secure authentication.
        </p>
      </div>
    </div>
  );
}

export default Hipaasecurity;