import BasicDetails from "@/pages/Registration/Patient/BasicDetails";
import ContactLocation from "@/pages/Registration/Patient/ContactLocation";
import CreateLoginId from "@/pages/Registration/Patient/CreateLoginId";
import HealthOverview from "@/pages/Registration/Patient/HealthOverview";
import Insurance from "@/pages/Registration/Patient/Insurance";
import MedicalConditions from "@/pages/Registration/Patient/MedicalConditions";
import VerifyInformation from "@/pages/Registration/Patient/VerifyInformation";

/* import DoctorBasicDetails from "@/pages/Registration/Doctor/BasicDetails"; */

// Keyed by stepKey — must match the child `key` in each role's sidebarConfig file
const formRegistryByRole = {
  patient: {
    basic: BasicDetails,
    contact: ContactLocation,
    health: HealthOverview,
    medical: MedicalConditions,
    insurance: Insurance,
    information: VerifyInformation,
    loginid: CreateLoginId,
  },
  /* doctor: {
    basic: DoctorBasicDetails,
  }, */
};

export const getStepComponent = (role, stepKey) => {
  return formRegistryByRole[role]?.[stepKey] || null;
};

export default formRegistryByRole;