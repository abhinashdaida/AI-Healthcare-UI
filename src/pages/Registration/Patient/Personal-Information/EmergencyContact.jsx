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
import {
  RELATIONSHIP_OPTIONS,
  NATIONALITY_OPTIONS,
  STATE_OPTIONS,
  CITY_OPTIONS,
} from "@/shared/constants/PatientRegistration/dropdownOptions";
import { emergencyContactValidation } from "@/shared/validations/patientRegistration/PersonalInfoValidation";
import {
  setEmergencyContact,
  completeStep,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";

// INITIAL VALUES

const initialValues = {
  relationship: "",
  emergencyName: "",
  emergencyContactNumber: "",
  nationality: "",
  State: "",
  City: "",
};

// FORM FOOTER

const FormFooter = ({ config }) => {
  const { isValid, submitForm } = useFormikContext();

  const footerConfig = {
    ...config,

    // Keep button visible
    showPrimaryButton: true,
    // Disable button when required fields are invalid
    primaryButtonDisabled: !isValid,
    // Submit Formik form
    onPrimaryClick: submitForm,
  };

  return <Footer config={footerConfig} />;
};

// EMERGENCY CONTACT
const EmergencyContact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // SUBMIT
  const handleContinue = (values) => {
    console.log("Emergency contact data:", values);
    dispatch(setEmergencyContact(values));
    dispatch(completeStep(1));
    navigate("/health-overview");
  };

  // AUTO SAVE
  const handleAutoSave = () => {
    console.log("Auto Save");
  };

  // FOOTER CONFIG
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
      {/* SiderBar */}
      <SiderBar />
      {/*RIGHT SIDE CONTENT  */}
      <main
        className="
          ml-[336px]
          max-lg:ml-[280px]
          max-md:ml-0
          h-screen
          flex flex-col
          bg-white
        "
      >
        {/*             FIXED HEADER */}
        <FormHeader
          title="Personal Information"
          subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
        />

        <Formik
          initialValues={initialValues}
          validationSchema={emergencyContactValidation}
          onSubmit={handleContinue}
          validateOnMount
        >
          <Form className="flex flex-col h-screen">
            <div
              className="
                flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-[120px]  pb-[180px]
              "
            >
              {/*                   EMERGENCY CONTACT SECTION  */}
              <Box
                className="
                  w-full
                  max-w-[1104px]
                  pt-2 sm:pt-4  md:pt-6
                  flex flex-col  gap-1
                "
              >
                <Typography
                  className="
                    text-[16px]!
                    font-medium!
                    leading-[100%]!
                    text-[#0B1117]!
                  "
                >
                  Emergency Contact
                </Typography>

                <Typography
                  className="
                    w-full
                    max-w-[356px]
                    text-[12px]!
                    font-normal!
                    leading-4!
                    text-[#6B7280]!
                  "
                >
                  Choose someone we can contact in case of an emergency. This
                  information stays private and secure.
                </Typography>
              </Box>

              <Box
                className="  grid  grid-cols-1  md:grid-cols-2
                  gap-x-10  gap-y-10  w-full  max-w-[1104px]
                  pt-6 sm:pt-7 md:pt-8
                "
              >
                {/* ---------------------------------------------
                    RELATIONSHIP
                --------------------------------------------- */}

                <Box className="w-full min-w-0">
                  <CustomLabel required>
                    Emergency Contact Relationship
                  </CustomLabel>

                  <CustomSelect
                    name="relationship"
                    placeholder="Select your emergency contact relationship"
                    startIcon="tabler:heart-handshake"
                    endIcon="tabler:circle-chevron-down"
                    options={RELATIONSHIP_OPTIONS}
                  />
                </Box>

                {/* ---------------------------------------------
                    EMERGENCY CONTACT NAME
                --------------------------------------------- */}

                <Box className="w-full min-w-0">
                  <CustomLabel required>Emergency Contact Name</CustomLabel>

                  <CustomTextField
                    name="emergencyName"
                    placeholder="Enter emergency contact name"
                    type="text"
                    startIcon="tabler:user"
                  />
                </Box>

                {/* ---------------------------------------------
                    EMERGENCY CONTACT PHONE
                --------------------------------------------- */}

                <Box className="w-full min-w-0">
                  <CustomLabel required>
                    Emergency Contact Phone Number
                  </CustomLabel>

                  <CustomTextField
                    name="emergencyContactNumber"
                    placeholder="Enter Emergency contact Number"
                    type="text"
                    startIcon="tabler:phone"
                  />
                </Box>
              </Box>

              {/* =================================================
                  LOCATION SECTION
              ================================================= */}

              <Box
                className="
                  w-full  max-w-[1104px]
                  pt-12 sm:pt-14  md:pt-16
                  flex flex-col
                  gap-1
                "
              >
                <Typography
                  className="
                    text-[16px]!
                    font-medium!
                    leading-[100%]!
                    text-[#0B1117]!
                  "
                >
                  Location
                </Typography>

                <Typography
                  className="
                    w-full max-w-[356px]
                    text-[12px]! font-normal!
                    leading-4!
                    text-[#6B7280]!
                  "
                >
                  Help us reach you when needed and show healthcare services
                  available in your area.
                </Typography>
              </Box>

              {/* =================================================
                  LOCATION FIELDS
              ================================================= */}

              <Box
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-x-10
                  gap-y-10
                  w-full
                  max-w-[1104px]

                  pt-6
                  sm:pt-7
                  md:pt-8
                "
              >
                {/* ---------------------------------------------
                    NATIONALITY
                --------------------------------------------- */}

                <Box className="w-full min-w-0">
                  <CustomLabel required>Nationality</CustomLabel>

                  <CustomSelect
                    name="nationality"
                    placeholder="Select your nationality"
                    startIcon="tabler:map-pin"
                    endIcon="tabler:circle-chevron-down"
                    options={NATIONALITY_OPTIONS}
                  />
                </Box>

                {/* ---------------------------------------------
                    STATE
                --------------------------------------------- */}

                <Box className="w-full min-w-0">
                  <CustomLabel required>State</CustomLabel>

                  <CustomSelect
                    name="State"
                    placeholder="Select your state"
                    startIcon="tabler:map-pin"
                    endIcon="tabler:circle-chevron-down"
                    options={STATE_OPTIONS}
                  />
                </Box>

                {/* ---------------------------------------------
                    CITY
                --------------------------------------------- */}

                <Box className="w-full min-w-0">
                  <CustomLabel required>City</CustomLabel>

                  <CustomSelect
                    name="City"
                    placeholder="Select your city"
                    startIcon="tabler:map-pin"
                    endIcon="tabler:circle-chevron-down"
                    options={CITY_OPTIONS}
                  />
                </Box>
              </Box>
            </div>

            {/* =================================================
                FIXED FOOTER
            ================================================= */}

            <FormFooter config={footerConfig} />
          </Form>
        </Formik>
      </main>
    </div>
  );
};

export default EmergencyContact;
