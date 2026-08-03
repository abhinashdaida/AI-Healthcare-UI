// Single source of truth for the patient registration step flow.
// Previously this data was duplicated in two places:
//   - PatientRegistration.js  (stepConfig: title + description)
//   - Sidebar.js              (steps: key + title + icon + activeIcon)
// Consolidated here so both the header and the sidebar read from the same data.

import user from "@assets/patientRegistration/user.svg";
import userwhite from "@assets/patientRegistration/userwhite.svg";
import AddInfor from "@assets/patientRegistration/AddInfor.svg";
import AddInforwhite from "@assets/patientRegistration/AddInforwhite.svg";
import medHis from "@assets/patientRegistration/medHis.svg";
import medHiswhite from "@assets/patientRegistration/medHiswhite.svg";
import insurInfor from "@assets/patientRegistration/insurInfor.svg";
import insurInforwhite from "@assets/patientRegistration/insurInforwhite.svg";
import healthRec from "@assets/patientRegistration/healthRec.svg";
import healthRecwhite from "@assets/patientRegistration/healthRecwhite.svg";
import reviewCom from "@assets/patientRegistration/review&com.svg";
import reviewCom1 from "@assets/patientRegistration/review&com1.svg";
import reviewComwhite from "@assets/patientRegistration/reviewComwhite.svg";

export const DEFAULT_STEP_KEY = "personal";

// `unlockedIcon` is only set on the "review" step: once the personal info
// step is complete, the sidebar shows this colored variant instead of the
// default greyed-out icon (matches the original Sidebar.js behaviour).
export const REGISTRATION_STEPS = [
  {
    key: "personal",
    title: "Personal Information",
    description:
      "Add your basic information to complete your profile and personalize your healthcare journey.",
    icon: user,
    activeIcon: userwhite,
  },
  {
    key: "additional",
    title: "Additional Information",
    description:
      "Enhance your profile with optional details for a more personalized healthcare journey.",
    icon: AddInfor,
    activeIcon: AddInforwhite,
  },
  {
    key: "medical",
    title: "Medical History",
    description: "Provide your previous medical history and conditions.",
    icon: medHis,
    activeIcon: medHiswhite,
  },
  {
    key: "insurance",
    title: "Insurance Information",
    description: "Add your insurance information for seamless healthcare access.",
    icon: insurInfor,
    activeIcon: insurInforwhite,
  },
  {
    key: "records",
    title: "Health Records",
    description: "Upload and manage your health records.",
    icon: healthRec,
    activeIcon: healthRecwhite,
  },
  {
    key: "review",
    title: "Review & Complete",
    description:
      "Configure your login credentials to securely manage your healthcare information.",
    icon: reviewCom,
    activeIcon: reviewComwhite,
    unlockedIcon: reviewCom1,
  },
];

/**
 * Look up a step's metadata by key, falling back to the default step.
 */
export const getStepMeta = (stepKey) =>
  REGISTRATION_STEPS.find((step) => step.key === stepKey) ||
  REGISTRATION_STEPS.find((step) => step.key === DEFAULT_STEP_KEY);
