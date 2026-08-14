import React from "react";
import { Icon } from "@iconify/react";

const Backbtn = ({ onClick, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 text-[#202020] hover:text-black font-medium text-sm transition-colors group ${className}`}
    >
      <div className="w-10 h-7 rounded-full bg-[#F4F4F4] flex items-center justify-center group-hover:bg-[#EAEAEA] transition-colors">
        <Icon icon="lucide:chevron-left" className="w-4 h-4 text-slate-600" />
      </div>
      <span>Back</span>
    </button>
  );
};

export default Backbtn;
