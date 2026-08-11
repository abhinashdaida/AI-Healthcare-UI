import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, useFormikContext } from "formik";
import { Box, Typography } from "@mui/material";

import FormHeader from "@/shared/components/Patient/layout/FormHeader";
import SiderBar from "../components/SiderBar/SiderBar";
import Footer from "@/shared/components/Patient/layout/Footer";
import CustomLabel from "@/shared/components/Patient/Common/CustomLabel";
import CustomTextField from "@/shared/components/Patient/Common/CustomTextField";
import CustomSelect from "@/shared/components/Patient/Common/CustomSelect";
// import { completeStep, saveFormData } from "@/state-management/modules/patientRegistration/sidebarReducer";
import { HealthOverviewValidation } from "@/shared/validations/patientRegistration/PersonalInfoValidation";
import {
  setHealthOverview,resetRegistration,
  completeStep,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";
import { selectBasicDetails } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

//-----------initial values----
const initialValues={
  name:"",
}

//---------------form footer --------
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

const HealthOverview=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

     // Event Handlers
     const handleContinue = (values) => {
       console.log("health overview data :" , values);
       dispatch(setHealthOverview(values));
       dispatch(completeStep(2));
       navigate("/medical-conditions");
     };

     const handleAutoSave = () => {
       console.log("Auto Save");
       dispatch(resetRegistration());
     };


     // Footer Configuration
     const footerConfig = useMemo(
       () => ({
         showAutoSave: true,
         showSkipButton: false,

         primaryButtonLabel: "Save & Continue",
         primaryButtonDisabled: false,

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
           <main className="flex flex-1 flex-col">
             {/* Header */}
             <FormHeader
               title="Personal Information"
               subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
             />
             {/*Formik*/}
             <Formik
               initialValues={initialValues}
               validationSchema={HealthOverviewValidation}
               onSubmit={handleContinue}
               validateOnMount
             >
               <Form className="flex flex-1 flex-col min-h-0">
                 {/* Content */}
                 <div className=" flex-1 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 overflow-y-auto ">
                   {/* Section Header */}
                   <Box className=" w-full max-w-[1104px] pt-2 sm:pt-4 md:pt-6 flex flex-col gap-1 ">
                     <Typography className="text-[16px] font-medium leading-[100%] text-[#0B1117]">
                       Health Overview
                     </Typography>
                     <Typography className="w-full max-w-[356px] text-[12px]! font-normal leading-4 text-[#6B7280]">
                       Add your basic health information to help us provide more
                       personalized care and better health recommendations. You
                       can skip any field if you're unsure.
                     </Typography>
                   </Box>
                   {/* Fields*/}
                   <Box className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 w-full max-w-[1104px] pt-6 sm:pt-7 md:pt-8">
                     <Box className="w-full min-w-0">
                       <CustomLabel required>Name</CustomLabel>
                       <CustomTextField
                         name="name"
                         placeholder="Enter  Name"
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
}
export default HealthOverview;