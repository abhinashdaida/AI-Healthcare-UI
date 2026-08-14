import React, { useMemo } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, useFormikContext } from "formik";
import { Box, Typography } from "@mui/material";

import FormHeader from "@/shared/components/Registration/layout/FormHeader";
import SiderBar from "../components/SiderBar/SiderBar";
import Footer from "@/shared/components/Registration/layout/Footer";
import CustomLabel from "@/shared/components/Registration/Common/CustomLabel";
import CustomTextField from "@/shared/components/Registration/Common/CustomTextField";
import CustomSelect from "@/shared/components/Registration/Common/CustomSelect";
import CustomDatePicker from "@/shared/components/Registration/Common/CustomDatePicker/CustomDatePicker";
import { basicDetalisValidation } from "@/shared/validations/patientRegistration/PersonalInfoValidation";
import {
  GENDER_OPTIONS,
  BLOODGROUP_OPTIONS,
  MARITALSTATUS_OPTIONS,
  OCCUPATION_OPTIONS,
} from "@/shared/constants/PatientRegistration/dropdownOptions";

import {setBasicDetails,completeStep,} from "@/state-management/modules/patientRegistration/patientRegistrationActions";
import { selectBasicDetails } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";



// -----------------Form Footer-----------
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

// Basic Details
const BasicDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupPhoneNumber = sessionStorage.getItem("phoneNumber") || "";
  const location=useLocation();
 
  const savedData = useSelector(selectBasicDetails) || {};

  const initialValues = {
    firstName: savedData.firstName ||"",
    dateOfBirth: savedData.dateOfBirth || "",
    gender:savedData.gender ||"",
    bloodGroup:savedData.bloodGroup ||"",
    maritalStatus: savedData.maritalStatus ||"",
    occupation:savedData.occupation ||"",
    phoneNumber:signupPhoneNumber,
    email:savedData.email ||"",
  };


  // Submit
  const handleContinue = (values) => {
    console.log("Form submitted:", values);
    dispatch(setBasicDetails(values));
    dispatch(completeStep(0));   
    if (location.state?.fromReview) {
        navigate("/reviewdetails", {
            replace: true,
        });
        return;
    }// move siderbar step 

    navigate("/emergency-contact");
  };

  // Auto Save
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
    <div className="min-h-screen bg-[#F5F7F8]">
      {/* Sidebar */}
      <SiderBar />
      {/*Right Content */}
      <main className=" ml-[336px] max-lg:ml-[280px] max-md:ml-0 min-h-screen  flex flex-col  bg-white">
        {/* Header*/}
        <FormHeader
          title="Personal Information"
          subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
        />

        {/*Formik*/}
        <Formik
          initialValues={initialValues}
          validationSchema={basicDetalisValidation}
          onSubmit={handleContinue}
          enableReinitialize={true}
          validateOnMount
        >
          <Form className="flex flex-1 flex-col min-h-0">
            {/* Content */}
            <div className=" flex-1 px-4 sm:px-6 md:px-8 lg:px-10  pt-[80px] md:pt-[120px] pt-[100px] md:pb-[150px] overflow-y-auto">
              {/* Section Header */}
              <Box className=" w-full max-w-[1104px] pt-2 sm:pt-4 md:pt-6 flex flex-col gap-1 ">
                <Typography className="text-[16px] font-medium leading-[100%] text-[#0B1117]">
                  Basic Details
                </Typography>

                <Typography className="w-full max-w-[356px] text-[12px]! font-normal leading-4 text-[#6B7280]">
                  Tell us a little about yourself so we can personalize your
                  healthcare experience.
                </Typography>
              </Box>

              {/* Fields*/}

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 w-full max-w-[1104px] pt-6 sm:pt-7 md:pt-8">
                {/* First Name*/}
                <Box className="w-full min-w-0">
                  <CustomLabel required>First Name</CustomLabel>
                  <CustomTextField
                    name="firstName"
                    placeholder="Enter your full name"
                    type="text"
                    startIcon="tabler:user"
                  />
                </Box>
                {/* Date of Birth */}
                <Box className="w-full min-w-0">
                  <CustomLabel required>Date of Birth</CustomLabel>
                  <CustomDatePicker
                    name="dateOfBirth"
                    placeholder="Select your date of birth"
                    startIcon="tabler:cake"
                    endIcon="tabler:calendar-due"
                  />
                </Box>
                {/* Gender */}
                <Box className="w-full min-w-0">
                  <CustomLabel required>Gender</CustomLabel>
                  <CustomSelect
                    name="gender"
                    placeholder="Select your gender"
                    startIcon="tabler:gender-bigender"
                    endIcon="tabler:circle-chevron-down"
                    options={GENDER_OPTIONS}
                  />
                </Box>
                {/* Blood Group */}
                <Box className="w-full min-w-0">
                  <CustomLabel required>Blood Group</CustomLabel>
                  <CustomSelect
                    name="bloodGroup"
                    placeholder="Select your blood group"
                    startIcon="tabler:droplet"
                    endIcon="tabler:circle-chevron-down"
                    options={BLOODGROUP_OPTIONS}
                  />
                </Box>
                {/* Marital Status */}
                <Box className="w-full min-w-0">
                  <CustomLabel>Marital Status</CustomLabel>
                  <CustomSelect
                    name="maritalStatus"
                    placeholder="Select your marital status"
                    startIcon="tabler:heart-handshake"
                    endIcon="tabler:circle-chevron-down"
                    options={MARITALSTATUS_OPTIONS}
                  />
                </Box>
                {/* Occupation */}
                <Box className="w-full min-w-0">
                  <CustomLabel>Occupation</CustomLabel>
                  <CustomSelect
                    name="occupation"
                    placeholder="Select your occupation"
                    startIcon="tabler:briefcase"
                    endIcon="tabler:circle-chevron-down"
                    options={OCCUPATION_OPTIONS}
                  />
                </Box>
                {/* Phone Number*/}
                <Box className="w-full min-w-0">
                  <CustomLabel>Phone Number</CustomLabel>
                  <CustomTextField
                    name="phoneNumber"
                    placeholder="+91 9876 543 210"
                    type="tel"
                    disabled
                    startIcon="tabler:phone"
                    sx={{
                      "& .MuiInputBase-root": {
                        backgroundColor: "#F7F7F7",
                      },
                    }}
                  />
                </Box>
                {/* Email Address*/}
                <Box className="w-full min-w-0">
                  <CustomLabel>Email Address</CustomLabel>
                  <CustomTextField
                    name="email"
                    placeholder="Enter your email address"
                    type="email"
                    startIcon="tabler:mail"
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
  );
};

export default BasicDetails;
