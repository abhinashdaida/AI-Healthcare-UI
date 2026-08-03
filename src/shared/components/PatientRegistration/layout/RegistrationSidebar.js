import { X } from "lucide-react";
import React from "react";

import logo from "@assets/assets/logo.svg";
import tick from "@assets/patientRegistration/tick.svg";

import { REGISTRATION_STEPS } from "@/shared/constants/patientRegistration/registrationSteps";
import ProfileProgressCard from "./ProfileProgressCard";

const RegistrationSidebar = ({
  activeStep,
  setActiveStep,
  isOpen,
  onClose,
  progress,
}) => {
  const patientInfo =
    JSON.parse(localStorage.getItem("patientInformation")) || {};

  const hasValue = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(hasValue);
  }

  return value !== null && value !== undefined && value !== false;
};

const isStepCompleted = (key) => {
  switch (key) {
    case "personal":
      return !!(
        patientInfo.personalInformation?.fullName?.trim() &&
        patientInfo.personalInformation?.dob &&
        patientInfo.personalInformation?.gender &&
        patientInfo.personalInformation?.bloodGroup &&
        patientInfo.personalInformation?.state &&
        patientInfo.personalInformation?.city
      );

    case "additional":
      return !!(
        patientInfo.additionalInformation?.emergencyRelationship?.trim() &&
        patientInfo.additionalInformation?.emergencyContact?.trim()
      );

    case "medical":
      return (
        hasValue(patientInfo.medicalHistory?.allergies) ||
        hasValue(patientInfo.medicalHistory?.allergyTags) ||
        hasValue(patientInfo.medicalHistory?.currentMedications) ||
        hasValue(patientInfo.medicalHistory?.existingConditions) ||
        hasValue(patientInfo.medicalHistory?.conditionTags) ||
        hasValue(patientInfo.medicalHistory?.previousSurgeries)
      );

    case "insurance":
      return (
        hasValue(patientInfo.insuranceInformation?.insuranceType) ||
        hasValue(patientInfo.insuranceInformation?.policyNumber) ||
        hasValue(patientInfo.insuranceInformation?.insuranceCards) ||
        hasValue(patientInfo.insuranceInformation?.insuranceCard)
      );

    case "records":
      return (
        Array.isArray(patientInfo.healthRecords) &&
        patientInfo.healthRecords.length > 0
      );

    default:
      return false;
  }
};

  const resolveIcon = (step, isActive) => {
    if (isActive) return step.activeIcon;
    if (isStepCompleted(step.key)) return tick;
    if (step.unlockedIcon && isStepCompleted("personal")) {
      return step.unlockedIcon;
    }

    return step.icon;
  };

  return (
    <>
      <div className="hidden md:block relative w-85.5 min-h-screen bg-[#FBFBFB] border-r border-[#E6E6E6]">
        <div className="absolute top-10 left-10 flex items-center gap-1">
          <img
            src={logo}
            alt="MediConnect"
            className="w-12 h-11 object-contain"
          />

          <div className="flex flex-col">
            <h1 className="text-[16px] font-semibold leading-none text-[#096B58]">
              MediConnect
            </h1>

            <p className="text-[10px] font-normal leading-2.5 text-primary">
              Healthcare Ecosystem
            </p>
          </div>
        </div>

        <div className="absolute top-39 left-10 w-65.5 min-h-122">
          {REGISTRATION_STEPS.map((step, index) => {
            const isActive = activeStep === step.key;

            return (
              <div key={step.key}>
                <div
                  onClick={() => setActiveStep(step.key)}
                  className="flex items-center cursor-pointer"
                >
                  <div
                    className={`relative z-10 flex items-center justify-center rounded-lg ${
                      isActive
                        ? "w-8 h-8 bg-[#096B58] border-white border-[3px]"
                        : "w-8 h-8"
                    }`}
                  >
                    <img
                      src={resolveIcon(step, isActive)}
                      alt={step.title}
                      className="w-6 h-6"
                    />
                  </div>

                  <div
                    className={`flex-1 ${
                      isActive
                        ? "-ml-1 bg-[#EEF4F3] rounded-lg px-3 py-1.5"
                        : "px-3 py-1.5"
                    }`}
                  >
                    <span
                      className={`text-[13px] font-semibold leading-none ${
                        isActive
                          ? "text-[#096B58]"
                          : step.key === "review" &&
                              !isStepCompleted("personal")
                            ? "text-[#AAAAAA]"
                            : "text-[#202020]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>

                {index !== REGISTRATION_STEPS.length - 1 && (
                  <div
                    className={`ml-3.5 h-9 w-0.5 ${
                      isStepCompleted(step.key)
                        ? "bg-[#14B392]"
                        : "bg-[#E6E6E6]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <ProfileProgressCard variant="desktop" progress={progress} />
      </div>

      <div
        className={`fixed inset-0 z-50 bg-[#000000]/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-[320px] max-w-[85vw] flex-col bg-[#FBFBFB] border-r border-[#E6E6E6] pt-10 pb-10 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pl-10 pr-6 shrink-0">
          <div className="flex items-center gap-1">
            <img
              src={logo}
              alt="MediConnect"
              className="w-12 h-11 object-contain"
            />

            <div className="flex flex-col">
              <h1 className="text-[16px] font-semibold leading-none text-[#096B58]">
                MediConnect
              </h1>

              <p className="text-[10px] font-normal leading-2.5 text-primary">
                Healthcare Ecosystem
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#2E6B5F] hover:bg-[#E5E7EB] cursor-pointer"
            aria-label="Close menu"
          >
            <span className="sr-only">Close menu</span>
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col gap-0 mt-8 overflow-y-auto flex-1 pl-10 pr-6 py-1">
          {REGISTRATION_STEPS.map((step, index) => {
            const isActive = activeStep === step.key;

            return (
              <div key={step.key} className="flex flex-col">
                <div
                  onClick={() => {
                    setActiveStep(step.key);
                    onClose();
                  }}
                  className="flex items-center cursor-pointer"
                >
                  <div
                    className={`relative z-10 flex items-center justify-center rounded-lg shrink-0 ${
                      isActive
                        ? "w-8 h-8 bg-[#096B58] border-white border-[3px]"
                        : "w-8 h-8"
                    }`}
                  >
                    <img
                      src={resolveIcon(step, isActive)}
                      alt={step.title}
                      className="w-6 h-6"
                    />
                  </div>

                  <div
                    className={`flex-1 ${
                      isActive
                        ? "-ml-1 bg-[#EEF4F3] rounded-lg px-3 py-1.5"
                        : "px-3 py-1.5"
                    }`}
                  >
                    <span
                      className={`text-[13px] font-semibold leading-none ${
                        isActive
                          ? "text-[#096B58]"
                          : step.key === "review" &&
                              !isStepCompleted("personal")
                            ? "text-[#AAAAAA]"
                            : "text-[#202020]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>

                {index !== REGISTRATION_STEPS.length - 1 && (
                  <div
                    className={`ml-3.5 h-7 w-0.5 ${
                      isStepCompleted(step.key)
                        ? "bg-[#14B392]"
                        : "bg-[#E6E6E6]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="px-10 mt-auto shrink-0">
          <ProfileProgressCard variant="mobile" progress={progress} />
        </div>
      </div>
    </>
  );
};

export default RegistrationSidebar;