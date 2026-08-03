import React from "react";
import { X } from "lucide-react";

import logo from "../../../../assets/assets/logo.svg";
import time from "../../../../assets/patientRegistration/time.svg";

import user from "../../../../assets/patientRegistration/user.svg";
import userwhite from "../../../../assets/patientRegistration/userwhite.svg";

import AddInfor from "../../../../assets/patientRegistration/AddInfor.svg";
import AddInforwhite from "../../../../assets/patientRegistration/AddInforwhite.svg";

import medHis from "../../../../assets/patientRegistration/medHis.svg";
import medHiswhite from "../../../../assets/patientRegistration/medHiswhite.svg";

import insurInfor from "../../../../assets/patientRegistration/insurInfor.svg";
import insurInforwhite from "../../../../assets/patientRegistration/insurInforwhite.svg";

import healthRec from "../../../../assets/patientRegistration/healthRec.svg";
import healthRecwhite from "../../../../assets/patientRegistration/healthRecwhite.svg";

import reviewCom from "../../../../assets/patientRegistration/review&com.svg";
import reviewCom1 from "../../../../assets/patientRegistration/review&com1.svg";
import reviewComwhite from "../../../../assets/patientRegistration/reviewComwhite.svg";

import tick from "../../../../assets/patientRegistration/tick.svg";
import { useSelector } from "react-redux";
import {
  selectPersonalInfo,
  selectAdditionalInfo,
  selectMedicalHistory,
  selectInsuranceInfo,
  selectHealthRecords,
  selectReviewComplete,
} from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

const steps = [
  {
    key: "personal",
    title: "Personal Information",
    icon: user,
    activeIcon: userwhite,
  },
  {
    key: "additional",
    title: "Additional Information",
    icon: AddInfor,
    activeIcon: AddInforwhite,
  },
  {
    key: "medical",
    title: "Medical History",
    icon: medHis,
    activeIcon: medHiswhite,
  },
  {
    key: "insurance",
    title: "Insurance Information",
    icon: insurInfor,
    activeIcon: insurInforwhite,
  },
  {
    key: "records",
    title: "Health Records",
    icon: healthRec,
    activeIcon: healthRecwhite,
  },
  {
    key: "review",
    title: "Review & Complete",
    icon: reviewCom,
    activeIcon: reviewComwhite,
  },
];

const Sidebar = ({ activeStep, setActiveStep, isOpen, onClose, progress }) => {
  const personalInformation = useSelector(selectPersonalInfo);
  const additionalInformation = useSelector(selectAdditionalInfo);
  const medicalHistory = useSelector(selectMedicalHistory);
  const insuranceInformation = useSelector(selectInsuranceInfo);
  const healthRecords = useSelector(selectHealthRecords);
  const reviewComplete = useSelector(selectReviewComplete);

  const isStepCompleted = (key) => {
    switch (key) {
      case "personal":
        return !!personalInformation && activeStep !== "personal";
      case "additional":
        return !!additionalInformation && activeStep !== "additional";
      case "medical":
        return !!medicalHistory && activeStep !== "medical";
      case "insurance":
        return !!insuranceInformation && activeStep !== "insurance";
      case "records":
        return !!healthRecords && activeStep !== "records";
      case "review":
        return !!reviewComplete && activeStep !== "review";
      default:
        return false;
    }
  };

  const internalCalculateProgress = () => {
    let internalProgress = 10; // base 10% always

    // Personal Information — all fields must have data (+10%)
    const personal = patientInfo.personalInformation;
    if (
      personal?.fullName?.trim() &&
      personal?.dob &&
      personal?.gender &&
      personal?.bloodGroup &&
      personal?.state &&
      personal?.city
    ) {
      internalProgress += 20;
    }

    // Additional Information (+20%)
    const additional = patientInfo.additionalInformation;
    if (
      additional &&
      Object.values(additional).every(
        (v) => v !== "" && v !== null && v !== undefined,
      )
    ) {
      internalProgress += 10;
    }

    // Medical History (+10%)
    const medical = patientInfo.medicalHistory;
    if (
      medical &&
      Object.values(medical).every(
        (v) => v !== "" && v !== null && v !== undefined,
      )
    ) {
      internalProgress += 20;
    }

    // Insurance Information (+20%)
    const insurance = patientInfo.insuranceInformation;
    if (
      insurance &&
      Object.values(insurance).every(
        (v) => v !== "" && v !== null && v !== undefined,
      )
    ) {
      internalProgress += 10;
    }

    // Health Records (+15%)
    const records = patientInfo.healthRecords;
    if (
      records &&
      Object.values(records).every(
        (v) => v !== "" && v !== null && v !== undefined,
      )
    ) {
      internalProgress += 15;
    }

    // Review & Complete (+15%)
    const review = patientInfo.reviewComplete;
    if (
      review &&
      Object.values(review).every(
        (v) => v !== "" && v !== null && v !== undefined,
      )
    ) {
      internalProgress += 15;
    }

    return internalProgress;
  };

  const currentProgress =
    progress !== undefined ? progress : internalCalculateProgress();

  return (
    <>
      {/* Desktop Sidebar (unchanged layout) */}
      <div className="hidden md:block relative w-85.5 min-h-screen bg-[#FBFBFB] border-r border-[#E6E6E6]">
        {/* Logo */}
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

        {/* Steps */}
        <div className="absolute top-39 left-10 w-65.5 min-h-122">
          {steps.map((step, index) => {
            const isActive = activeStep === step.key;

            return (
              <div key={step.key}>
                <div
                  onClick={() => setActiveStep(step.key)}
                  className="flex items-center cursor-pointer"
                >
                  {/* Icon */}
                  <div
                    className={`relative z-10 flex items-center justify-center rounded-lg ${
                      isActive
                        ? "w-8 h-8 bg-[#096B58]  border-white border-[3px]"
                        : "w-8 h-8"
                    }`}
                  >
                    <img
                      src={
                        isActive
                          ? step.activeIcon
                          : isStepCompleted(step.key)
                            ? tick
                            : step.key === "review"
                              ? isStepCompleted("personal")
                                ? reviewCom1
                                : reviewCom
                              : step.icon
                      }
                      alt={step.title}
                      className="w-6 h-6"
                    />
                  </div>

                  {/* Title */}
                  <div
                    className={` flex-1 ${
                      isActive
                        ? "-ml-1 bg-[#EEF4F3] rounded-lg  px-3 py-1.5"
                        : "px-3 py-1.5"
                    }`}
                  >
                    <span
                      className={`text-[13px] font-semibold leading-none ${
                        isActive
                          ? "text-[#096B58]"
                          : step.key === "review" &&
                              !isStepCompleted("personal")
                            ? "text-[#AAAAAA]" // gray until personal done
                            : "text-[#202020]" // normal color once personal done
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>

                {index !== steps.length - 1 && (
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

        {/* Progress Card */}
        <div
          className="absolute left-10 bottom-10 w-65.5 h-44.75 rounded-lg border-[0.5px] border-[#D0D0D0] bg-white px-6 py-5 flex flex-col"
          style={{
            boxShadow:
              "0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.03), 0px 4px 4px rgba(0,0,0,0.03), 0px 8px 8px rgba(0,0,0,0.03)",
          }}
        >
          <h4 className="text-[16px] font-medium text-[#111827] leading-none">
            Profile Progress
          </h4>

          <div className="mt-8">
            <p className="text-[14px] font-semibold text-[#2E6B5F] leading-none mb-4">
              {currentProgress}% Complete
            </p>

            <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2E6B5F] rounded-full transition-all duration-500"
                style={{ width: `${currentProgress}%` }}
              />
            </div>

            <p className="mt-7 flex items-center gap-1 text-[10px] font-normal text-[#6B7280] leading-none">
              <img src={time} alt="Time" className="w-3 h-3" />
              <span className="mt-1">Estimated Time: 2-3 Minutes</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Sidebar Drawer */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-[#000000]/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-[320px] max-w-[85vw] flex-col justify-between bg-[#FBFBFB] border-r border-[#E6E6E6] p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img
              src={logo}
              alt="MediConnect"
              className="w-12 h-11 object-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-[16px] font-semibold leading-none text-[#096B58] font-TypeFace">
                MediConnect
              </h1>
              <p className="text-[10px] font-normal leading-2.5 text-primary font-TypeFace">
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

        {/* Steps navigation */}
        <div className="flex flex-col gap-0 mt-6 overflow-y-auto flex-1 pr-1 py-1">
          {steps.map((step, index) => {
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
                  {/* Icon */}
                  <div
                    className={`relative z-10 flex items-center justify-center rounded-lg shrink-0 ${
                      isActive
                        ? "w-9.5 h-9.5 bg-[#096B58] border-white border-[3px]"
                        : "w-9.5 h-9.5"
                    }`}
                  >
                    <img
                      src={
                        isActive
                          ? step.activeIcon
                          : isStepCompleted(step.key)
                            ? tick
                            : step.key === "review" &&
                                !isStepCompleted("personal")
                              ? reviewCom
                              : step.key === "review" &&
                                  isStepCompleted("personal")
                                ? reviewCom1
                                : step.icon
                      }
                      alt={step.title}
                      className="w-6 h-6"
                    />
                  </div>

                  {/* Title */}
                  <div
                    className={`flex-1 ${
                      isActive
                        ? "-ml-1 bg-[#EEF4F3] rounded-lg px-3 py-1.5"
                        : "px-3 py-1.5"
                    }`}
                  >
                    <span
                      className={`text-[12.5px] font-semibold leading-none ${
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

                {/* Connecting Line */}
                {index !== steps.length - 1 && (
                  <div
                    className={`ml-4.5 h-5 w-0.5 my-1 ${
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

        {/* Progress Card at bottom of drawer */}
        <div
          className="mt-4 w-full rounded-lg border-[0.5px] border-[#D0D0D0] bg-white px-4 py-3.5 flex flex-col shrink-0"
          style={{
            boxShadow:
              "0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.03), 0px 4px 4px rgba(0,0,0,0.03), 0px 8px 8px rgba(0,0,0,0.03)",
          }}
        >
          <h4 className="text-[14px] font-medium text-[#111827] leading-none font-TypeFace">
            Profile Progress
          </h4>

          <div className="mt-4">
            <p className="text-[13px] font-semibold text-[#2E6B5F] leading-none mb-2.5 font-TypeFace">
              {currentProgress}% Complete
            </p>

            <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2E6B5F] rounded-full transition-all duration-500"
                style={{ width: `${currentProgress}%` }}
              />
            </div>

            <p className="mt-3 flex items-center gap-1 text-[9.5px] font-normal text-[#6B7280] leading-none font-TypeFace">
              <img src={time} alt="Time" className="w-3 h-3" />
              <span className="mt-0.5">Estimated Time: 1-2 Minutes</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
