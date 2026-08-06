import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

// Import existing SVG files from assets/icons
import patientIcon from "@assets/icons/Patient.svg";
import doctorIcon from "@assets/icons/Doctor.svg";
import hospitalIcon from "@assets/icons/Hospital.svg";
import insuranceIcon from "@assets/icons/Insurance.svg";
import laboratoryIcon from "@assets/icons/Laboratory.svg";
import pharmacyIcon from "@assets/icons/Pharmacy.svg";

// Default roles configuration matching the design
const DEFAULT_ROLES = [
  {
    id: "Patient",
    name: "Patient",
    description: "Book appointments, consult doctor, and manage your healthcare.",
  },
  {
    id: "Doctor",
    name: "Doctor",
    description: "Manage appointments, consultations, and patient care.",
  },
  {
    id: "Hospital",
    name: "Hospital",
    description: "Manage departments, staff, patients, and operations.",
  },
  {
    id: "Laboratory",
    name: "Laboratory",
    description: "Manage test requests, reports, and diagnostics.",
  },
  {
    id: "Pharmacy",
    name: "Pharmacy",
    description: "Manage prescriptions, inventory, and medicine orders.",
  },
  {
    id: "Insurance Vendor",
    name: "Insurance Vendor",
    description: "Manage policies, claims, approvals, and coverage.",
  },
];

const RoleSection = ({
  roles = DEFAULT_ROLES,
  selectedRole,
  onRoleSelect,
  onContinue,
  title = "Welcome to MediConnect",
  subtitle = "Choose your account type to continue"
}) => {
  // Internal state fallback for standalone usage
  const [internalSelectedRole, setInternalSelectedRole] = useState("Patient");

  // Determine current active selection (controlled vs. uncontrolled)
  const currentRole = onRoleSelect ? selectedRole : internalSelectedRole;

  const handleRoleClick = (roleId) => {
    if (onRoleSelect) {
      onRoleSelect(roleId);
    } else {
      setInternalSelectedRole(roleId);
    }
  };

  const handleContinueClick = () => {
    if (onContinue) {
      onContinue(currentRole);
    } else {
      console.log(`Continuing as ${currentRole}`);
    }
  };

  // Helper to render the appropriate SVG icon (imported asset)
  const renderRoleIcon = (roleId, isSelected) => {
    switch (roleId) {
      case "Patient":
        // Patient.svg contains hardcoded stroke/fill="white" paths inside the SVG.
        // We use brightness-0 on unselected states to display it as a visible dark icon.
        return (
          <img
            src={patientIcon}
            alt="Patient"
            className={`w-6 h-6 object-contain transition-all duration-200 ${
              isSelected ? "" : "brightness-0 opacity-60"
            }`}
          />
        );
      case "Doctor":
        return (
          <img
            src={doctorIcon}
            alt="Doctor"
            className={`w-6 h-6 object-contain transition-all duration-200 ${
              isSelected ? "brightness-0 invert" : "opacity-80 group-hover:opacity-100"
            }`}
          />
        );
      case "Hospital":
        return (
          <img
            src={hospitalIcon}
            alt="Hospital"
            className={`w-6 h-6 object-contain transition-all duration-200 ${
              isSelected ? "brightness-0 invert" : "opacity-80 group-hover:opacity-100"
            }`}
          />
        );
      case "Laboratory":
        return (
          <img
            src={laboratoryIcon}
            alt="Laboratory"
            className={`w-6 h-6 object-contain transition-all duration-200 ${
              isSelected ? "brightness-0 invert" : "opacity-80 group-hover:opacity-100"
            }`}
          />
        );
      case "Pharmacy":
        return (
          <img
            src={pharmacyIcon}
            alt="Pharmacy"
            className={`w-6 h-6 object-contain transition-all duration-200 ${
              isSelected ? "brightness-0 invert" : "opacity-80 group-hover:opacity-100"
            }`}
          />
        );
      case "Insurance Vendor":
        return (
          <img
            src={insuranceIcon}
            alt="Insurance"
            className={`w-6 h-6 object-contain transition-all duration-200 ${
              isSelected ? "brightness-0 invert" : "opacity-80 group-hover:opacity-100"
            }`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center font-sans">
      {/* Title and Subtitle Header */}
      <div className="text-center mb-6 w-full">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] tracking-tight mb-1.5">
          {title}
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          {subtitle}
        </p>
      </div>

      {/* Roles Grid (2 Columns on SM screens and up, 1 Column on Mobile) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {roles.map((role) => {
          const isSelected = currentRole === role.id;
          return (
            <div
              key={role.id}
              onClick={() => handleRoleClick(role.id)}
              className={`group flex flex-col items-start text-left p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
                isSelected
                  ? "bg-[#ebf5f2] border-[#086952] shadow-[0_4px_16px_rgba(8,105,82,0.06)]"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {/* Icon Wrapper */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 border transition-all duration-200 ${
                  isSelected
                    ? "bg-[#086952] border-[#086952] text-white"
                    : "bg-white border-slate-200 text-slate-500 group-hover:text-[#086952] group-hover:border-[#086952]/30"
                }`}
              >
                {renderRoleIcon(role.id, isSelected)}
              </div>

              {/* Role Title */}
              <h3
                className={`text-base font-semibold mb-0.5 transition-colors duration-200 ${
                  isSelected ? "text-[#086952]" : "text-slate-800"
                }`}
              >
                {role.name}
              </h3>

              {/* Role Description */}
              <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">
                {role.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <button
        onClick={handleContinueClick}
        className="w-full max-w-md py-3 px-6 bg-[#086952] hover:bg-[#06523f] text-white font-semibold text-sm sm:text-base rounded-xl shadow-[0_6px_20px_rgba(8,105,82,0.15)] hover:shadow-[0_8px_24px_rgba(8,105,82,0.25)] transition-all duration-200 active:scale-[0.99] cursor-pointer"
      >
        Continue as {currentRole}
      </button>
    </div>
  );
};

export default RoleSection;
