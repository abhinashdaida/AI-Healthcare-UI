import React from "react";
import { Icon } from "@iconify/react";
 
const Continuebtn = ({
  onClick,
  type = "submit",
  disabled = false,
  loading = false,
  text = "Continue",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-3.5 px-4 bg-[#086952] hover:bg-[#06503e] active:bg-[#054032] text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform active:scale-[0.99] ${className}`}
    >
      {loading ? (
        <Icon icon="svg-spinners:180-ring" className="w-5 h-5" />
      ) : null}
      <span>{text}</span>
    </button>
  );
};
 
export default Continuebtn;