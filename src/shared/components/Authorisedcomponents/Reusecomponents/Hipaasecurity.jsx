import { Icon } from "@iconify/react";
import react from "react";


function Hipaasecurity() {
    return(
        <div className="w-full border border-slate-150 bg-slate-50/50 rounded-2xl p-4 flex gap-3.5 items-start mt-4 select-none">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#086952] shrink-0 mt-0.5">
              <Icon icon="solar:shield-check-bold" className="w-5 h-5 text-[#086952]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-xs font-bold text-slate-800">Secure & HIPAA Ready</h4>
              <p className="text-[10px] text-slate-450 font-normal leading-normal">
                Your healthcare information is protected with enterprise grade encryption and secure authentication.
              </p>
            </div>
          </div>
    )
}

export default Hipaasecurity;