import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormHeader from "@/shared/components/Registration/layout/FormHeader";
import SiderBar from "../components/SiderBar/SiderBar";
import Footer from "@/shared/components/Registration/layout/Footer";
import CustomLabel from "@/shared/components/Registration/Common/CustomLabel";
import CustomTextField from "@/shared/components/Registration/Common/CustomTextField";
import CustomSelect from "@/shared/components/Registration/Common/CustomSelect";
import { Box, Typography } from "@mui/material";
import { Form, Formik, useFormikContext } from "formik";
import { RELATIONSHIP_OPTIONS } from "@/shared/constants/PatientRegistration/dropdownOptions";
import { emergencyContactValidation } from "@/shared/validations/patientRegistration/PersonalInfoValidation";
  
import {
  setEmergencyContact,
  completeStep,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";
import { selectBasicDetails } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

const initialValues = {
     relationship: "",
     emergencyName: "",
   };
// ---------Form Footer--------
    const FormFooter = ({ config }) => {
      const { isValid, submitForm } = useFormikContext();
    
      const footerConfig = {
        ...config,
        // Keep button visible
        showPrimaryButton: true,
        // Disable when required fields are not valid
        primaryButtonDisabled: !isValid,
        onPrimaryClick: submitForm,
      };
      return <Footer config={footerConfig} />;
    };

   
const EmergencyContact=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Event Handlers
    const handleContinue = (values) => {
      console.log("Emergency concat data", values);
      dispatch(setEmergencyContact(values));
      dispatch(completeStep(1));
      navigate("/health-overview");
    };

    //auto save
    const handleAutoSave = () => {
      console.log("Auto Save");
    };


   // Footer Config
    const footerConfig = useMemo(
      () => ({
        showAutoSave: true,
        showSkipButton: false,
  
        primaryButtonLabel: "Save & Continue",
        onAutoSaveClick: handleAutoSave,
      }),
      [],
    );

    return (
      <div className="min-h-screen bg-[#F5F7F8] flex justify-center p-3">
        <div className="w-full max-w-[1400px] bg-white rounded-lg overflow-hidden shadow-sm flex min-h-screen">
          {/* Sidebar */}
          <SiderBar />

          {/* Right Content */}
          <main className="flex flex-1 flex-col min-w-0">
            {/* Header */}
            <FormHeader
              title="Personal Information"
              subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
            />

            <Formik
              initialValues={initialValues}
              onSubmit={handleContinue}
              validationSchema={emergencyContactValidation}
              validateOnMount
            >
              <Form className="flex flex-1 flex-col min-h-0">
                {/* Content */}
                <div className=" flex-1 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 overflow-y-auto ">
                  {/* secation header */}
                  <Box className=" w-full max-w-[1104px] pt-2 sm:pt-4 md:pt-6 flex flex-col gap-1 ">
                    <Typography className="text-[16px] font-medium leading-[100%] text-[#0B1117]">
                      Emergency Contact
                    </Typography>
                    <Typography className="w-full max-w-[356px] text-[12px]! font-normal leading-4 text-[#6B7280]">
                      Choose someone we can contact in case of an emergency.
                      This information stays private and secure.
                    </Typography>
                  </Box>

                  {/* fields */}
                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 w-full max-w-[1104px] pt-6 sm:pt-7 md:pt-8">
                    {/* realtionship */}
                    <Box className="w-full min-w-0">
                      <CustomLabel required>
                        Emergency Contact Relationship
                      </CustomLabel>
                      <CustomSelect
                        name="relationship"
                        placeholder="Select your emergency contact relationship"
                        startIcon="tabler:heart-handshake"
                        options={RELATIONSHIP_OPTIONS}
                      />
                    </Box>
                    {/* emergency conact number */}
                    <Box className="w-full min-w-0">
                      <CustomLabel required>Emergency Contact Name</CustomLabel>
                      <CustomTextField
                        name="emergencyName"
                        placeholder="Enter emergency contact name"
                        type="text"
                        startIcon="tabler:user"
                      />
                    </Box>
                  </Box>
                </div>
                {/* Footer */}
                <FormFooter config={footerConfig} />
              </Form>
            </Formik>
          </main>
        </div>
      </div>
    );
};
export default EmergencyContact;