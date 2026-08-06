import { Icon } from "@iconify/react";
import React from "react";


function Hipaasecurity() {
    return(
        <div className="w-full border border-[#C2D0CB] bg-slate-50/50 rounded-2xl p-3 flex gap-3.5 items-start mt-4 select-none">
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              <Icon icon="solar:shield-bold" className="w-6 h-6 text-[#086952]" />
            </div>
            <div className="flex flex-col gap-0.5">
             <h4 className="font-TypeFace text-md font-medium leading-none tracking-normal text-slate-800">
  Secure & HIPAA Ready
</h4>
              <p className="font-TypeFace text-[12px] font-normal leading-none tracking-normal text-[#666666]">
  Your healthcare information is protected with enterprise grade encryption and secure authentication.
</p>
            </div>
          </div>
    )
}

export default Hipaasecurity;