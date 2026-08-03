import React, { useEffect, useRef, useState } from "react";
import downArrow from "@assets/patientRegistration/downarrow.svg";

/**
 * UnitToggle — small inline dropdown for switching units (cm/ft, kg/lb).
 * Renders as a compact button inside a form input's right side.
 *
 * Props:
 *   value    {string}   — currently selected unit
 *   options  {string[]} — list of unit strings e.g. ["cm", "ft"]
 *   onChange {fn}       — (unit: string) => void
 */
const UnitToggle = ({ value, options = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={btnRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((c) => !c)}
        className="flex items-center gap-1.5 text-xs text-[#666666] cursor-pointer select-none"
      >
        <img
          src={downArrow}
          alt=""
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
        <span className="font-medium">{value}</span>
      </button>

      {isOpen && (
        <div className="absolute -right-2.5 top-full mt-1 min-w-14 rounded-xl border border-[#E5E7EB] bg-white shadow-[0px_10px_28px_rgba(20,20,20,0.14)] overflow-hidden z-50">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`w-full h-8 px-4 text-left text-sm font-normal transition-colors cursor-pointer ${
                opt === value
                  ? "bg-[#EEF4F3] text-[#096B58] font-semibold"
                  : "text-[#141414] hover:bg-[#F5F5F5]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnitToggle;
