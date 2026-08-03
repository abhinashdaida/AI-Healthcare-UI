import React from "react";

/**
 * InfoChip — small selectable pill button used for suggestion/option chips
 * (e.g. the auto-generated patient ID suggestions in Review & Complete).
 *
 * Props:
 *   label    {string}  — text shown on the chip
 *   onSelect {fn}      — (label) => void
 */
const InfoChip = ({ label, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect?.(label)}
    className="h-9 whitespace-nowrap rounded-lg border border-[#D0D0D0] bg-white px-3.5 text-xs font-normal text-[#141414] cursor-pointer transition-colors duration-150 hover:border-[#096B58] font-TypeFace"
  >
    {label}
  </button>
);

export default InfoChip;
