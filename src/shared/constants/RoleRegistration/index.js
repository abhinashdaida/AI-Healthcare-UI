import doctorSidebar from './sidebarConfig/DoctorSidebar';
import hospitalSidebar from './sidebarConfig/HospitalSidebar';
import insuranceVendorSidebar from './sidebarConfig/InsuranceVendorSidebar';
import laboratorySidebar from './sidebarConfig/LaboratorySidebar';
import patientSidebar from './sidebarConfig/PatientSidebar';
import pharmacySidebar from './sidebarConfig/PharmacySidebar';

export { getStepComponent } from './formRegistry';

const sidebarByRole = {
  patient: patientSidebar,
  doctor: doctorSidebar,
  hospital: hospitalSidebar,
  laboratory: laboratorySidebar,
  pharmacy: pharmacySidebar,
  insurance: insuranceVendorSidebar,
};

export default sidebarByRole;