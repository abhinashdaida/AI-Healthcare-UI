import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RegistrationShell from "@/shared/components/PatientRegistration/layout/RegistrationShell";
import { getStepMeta } from "@/shared/constants/patientRegistration/registrationSteps";

import AdditionalInformation from "./components/AdditionalInformation/AdditionalInformation";
import HealthRecord from "./components/HealthRecord/HealthRecord";
import InsuranceInformation from "./components/InsuranceInformation/InsuranceInformation";
import MedicalHistory from "./components/MedicalHistory/MedicalHistory";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation";
import ReviewAndComplete from "./components/ReviewAndComplete/ReviewAndComplete";

import { setActiveStep } from "@/state-management/modules/patientRegistration/patientRegistrationActions";

import {
    selectActiveStep,
    selectProgress,
} from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

import "./PatientRegistration.css";
import CreatedAccount from "./components/CreatedAccount/CreatedAccount";

const PatientRegistration = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector(selectActiveStep);
  const progress = useSelector(selectProgress);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeStep]);

  const handleSetActiveStep = (step) => {
    dispatch(setActiveStep(step));
  };

  const renderStep = () => {
    switch (activeStep) {
      case "personal":
        return <PersonalInformation />;

      case "additional":
        return <AdditionalInformation />;

      case "medical":
        return <MedicalHistory setActiveStep={handleSetActiveStep} />;

      case "insurance":
        return <InsuranceInformation setActiveStep={handleSetActiveStep} />;

      case "records":
        return <HealthRecord setActiveStep={handleSetActiveStep} />;

      case "review":
        return <ReviewAndComplete setActiveStep={handleSetActiveStep} />;

        case "created":
      return <CreatedAccount />;

      default:
        return <PersonalInformation />;
    }
  };

  const { title, description } = getStepMeta(activeStep);
  if (activeStep === "created") {
  return <CreatedAccount />;
}

  return (
    <RegistrationShell
      activeStep={activeStep}
      setActiveStep={handleSetActiveStep}
      isSidebarOpen={isSidebarOpen}
      onOpenSidebar={() => setIsSidebarOpen(true)}
      onCloseSidebar={() => setIsSidebarOpen(false)}
      progress={progress}
      title={title}
      description={description}
    >
      {renderStep()}
    </RegistrationShell>
  );
};

export default PatientRegistration;