import { useState } from "react";
import { STEP_INDEXES } from "../data/registrationSteps";

const initialFormData = {
  medicalHistory: {
    allergies: "",
    currentMedications: "",
    existingConditions: "",
    previousSurgeries: "",
  },

  insurance: {
    provider: "",
    policyNumber: "",
    insuranceCard: null,
    confirmation: false,
  },

  healthRecords: [],
};

const usePatientRegistration = () => {
  const [currentStep, setCurrentStep] = useState(STEP_INDEXES.MEDICAL_HISTORY);
  const [formData, setFormData] = useState(initialFormData);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const updateFormSection = (section, sectionData) => {
    setFormData((previousData) => ({
      ...previousData,
      [section]: {
        ...previousData[section],
        ...sectionData,
      },
    }));
  };

  const scrollToPageTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goToNextStep = () => {
    if (currentStep < STEP_INDEXES.HEALTH_RECORDS) {
      setCurrentStep((previousStep) => previousStep + 1);
      scrollToPageTop();
      return;
    }

    // TODO: Replace with API call later.
    setNotificationOpen(true);
  };

  const goToPreviousStep = () => {
    if (currentStep > STEP_INDEXES.MEDICAL_HISTORY) {
      setCurrentStep((previousStep) => previousStep - 1);
      scrollToPageTop();
      return;
    }

    window.history.back();
  };

  const closeNotification = () => {
    setNotificationOpen(false);
  };

  return {
    currentStep,
    formData,
    setFormData,
    notificationOpen,

    updateFormSection,
    goToNextStep,
    goToPreviousStep,
    closeNotification,

    // Extra aliases to avoid future mismatch issues
    goNext: goToNextStep,
    goBack: goToPreviousStep,
    skipStep: goToNextStep,
    setNotificationOpen,
  };
};

export { usePatientRegistration };
export default usePatientRegistration;