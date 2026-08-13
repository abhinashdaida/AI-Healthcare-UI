import React, { useMemo,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { Formik, Form, useFormikContext } from "formik";
import { Box, Typography } from "@mui/material";

import FormHeader from "@/shared/components/Registration/layout/FormHeader";
import SiderBar from "../components/SiderBar/SiderBar";
import Footer from "@/shared/components/Registration/layout/Footer";

import CustomLabel from "@/shared/components/Registration/Common/CustomLabel";
import CustomTextField from "@/shared/components/Registration/Common/CustomTextField";
import CustomSelect from "@/shared/components/Registration/Common/CustomSelect";

import {
  HealthOverviewValidation,
} from "@/shared/validations/patientRegistration/PersonalInfoValidation";

import {
  HEIGHT_UNIT_OPTIONS,
  WEIGHT_UNIT_OPTIONS,
  PHYSICAL_ACTIVITY_OPTIONS,
  DIETARY_PREFERENCE_OPTIONS,
  SMOKING_STATUS_OPTIONS,
  ALCOHOL_CONSUMPTION_OPTIONS,
} from "@/shared/constants/PatientRegistration/dropdownOptions";

import {
  setHealthOverview,
  completeStep,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";
import { selectHealthOverview } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";
import HealthcarePersonalizationPopup from "./HealthcarePersonalizationPopup";


// ----------------- Form Footer -----------------

const FormFooter = ({ config }) => {
  const { isValid, submitForm } = useFormikContext();

  const footerConfig = {
    ...config,

    showPrimaryButton: true,

    primaryButtonDisabled: !isValid,

    onPrimaryClick: submitForm,
  };

  return <Footer config={footerConfig} />;
};

// ----------------- Health Overview -----------------

const HealthOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location =useLocation();

  const savedData = useSelector(selectHealthOverview) || {};
  // ----------------- Initial Values -----------------

  const initialValues = {
    height: savedData.height || "",
    heightUnit: "cm",
    weight: savedData.weight || "",
    weightUnit: "kg",
    bloodPressure: savedData.bloodPressure || "",
    bloodSugar: savedData.bloodSugar || "",
    physicalActivityLevel: savedData.physicalActivityLevel || "",
    dietaryPreference: savedData.dietaryPreference || "",
    smokingStatus: savedData.smokingStatus || "",
    alcoholConsumption: savedData.alcoholConsumption || "",
  };

  //--------------------HealthcarePersonalizationPopup-------------
  const [showPopup, setShowPopup] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  //------------popuu Continue btn funcation -----------
  const handlePopUpContinue= ()=>{
    if (dontShowAgain) {
      localStorage.setItem("hideHealthcarePersonalization", "true");
    }
    //Continue to your next step
    setShowPopup(false);
  };
  
  const handlePopUpSkip =()=>{
    if (dontShowAgain) {
      localStorage.setItem("hideHealthcarePersonalization", "true");
    }
    //Skip medical information
     navigate("/reviewdetails");
    setShowPopup(false);
   

  };


  // ----------------- Submit -----------------

  const handleContinue = (values) => {
    console.log("Health Overview Data:", values);

    dispatch(setHealthOverview(values));
    dispatch(completeStep(2));
    if (location.state?.fromReview) {
        navigate("/reviewdetails", {
            replace: true,
        });
        return;
    }

    navigate("/medical-conditions");
  };

  // ----------------- Auto Save -----------------

  const handleAutoSave = () => {
    console.log("Health Overview Auto Save");
  };

  // ----------------- Footer Config -----------------

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

      {/* Right Content */}
      <main className=" ml-[336px] max-lg:ml-[280px] max-md:ml-0 min-h-screen  flex flex-col  bg-white">
        {/* Header */}
        <FormHeader
          title="Personal Information"
          subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
        />

        {/* Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={HealthOverviewValidation}
          onSubmit={handleContinue}
          validateOnMount
        >
          <Form className="flex flex-1 flex-col min-h-0">
            {/* Content */}
            <div className=" flex-1 px-4 sm:px-6 md:px-8 lg:px-10  pt-[180px] sm:pt-[150px] md:pt-[120px] pb-[250px] sm:pb-[180px] md:pb-[150px] overflow-y-auto">
              {/* Section Header */}
              <Box className="w-full max-w-[1104px] pt-2 sm:pt-4 md:pt-6 flex flex-col gap-1">
                <Typography className="text-[16px] font-medium leading-[100%] text-[#0B1117]">
                  Health Overview
                </Typography>

                <Typography className="w-full max-w-[356px] text-[12px]! font-normal leading-4 text-[#6B7280]">
                  Add your basic health information to help us provide more
                  personalized care and better health recommendations. You can
                  skip any field if you're unsure.
                </Typography>
              </Box>

              {/* Fields */}
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 w-full max-w-[1104px] pt-6 sm:pt-7 md:pt-8">
                {/* ---------------- Height ---------------- */}
                <Box className="w-full min-w-0">
                  <CustomLabel required>Height</CustomLabel>

                  <CustomTextField
                    name="height"
                    placeholder="Enter your height"
                    type="text"
                    startIcon="tabler:ruler-measure-2"
                    endSelectName="heightUnit"
                    endSelectOptions={HEIGHT_UNIT_OPTIONS}
                  />
                </Box>

                {/* ---------------- Weight ---------------- */}
                <Box className="w-full min-w-0">
                  <CustomLabel required>Weight</CustomLabel>

                  <CustomTextField
                    name="weight"
                    placeholder="Enter your weight"
                    type="text"
                    startIcon="tabler:scale-outline"
                    endSelectName="weightUnit"
                    endSelectOptions={WEIGHT_UNIT_OPTIONS}
                  />
                </Box>

                {/* ---------------- Blood Pressure ---------------- */}
                <Box className="w-full min-w-0">
                  <CustomLabel>Blood Pressure</CustomLabel>

                  <CustomTextField
                    name="bloodPressure"
                    placeholder="Enter Blood Pressure(If Known),e.g.120/80"
                    type="text"
                    startIcon="tabler:heartbeat"
                    endText="mm/Hg"
                  />
                </Box>

                {/* ---------------- Blood Sugar ---------------- */}
                <Box className="w-full min-w-0">
                  <CustomLabel>Blood Sugar</CustomLabel>

                  <CustomTextField
                    name="bloodSugar"
                    placeholder="Enter Blood Sugar (If Known), e.g. 90 mg/dl"
                    type="text"
                    startIcon="tabler:droplet"
                    endText="mg/dl"
                  />
                </Box>

                {/* ---------------- Physical Activity ---------------- */}
                <Box className="w-full min-w-0">
                  <CustomLabel>Physical Activity Level</CustomLabel>

                  <CustomSelect
                    name="physicalActivityLevel"
                    placeholder="Select your physical activity level"
                    startIcon="tabler:run"
                    endIcon="tabler:circle-chevron-down"
                    options={PHYSICAL_ACTIVITY_OPTIONS}
                  />
                </Box>

                {/* ---------------- Dietary Preference ---------------- */}
                <Box className="w-full min-w-0">
                  <CustomLabel>Dietary Preference</CustomLabel>

                  <CustomSelect
                    name="dietaryPreference"
                    placeholder="Select your dietary preference"
                    startIcon="tabler:chef-hat"
                    endIcon="tabler:circle-chevron-down"
                    options={DIETARY_PREFERENCE_OPTIONS}
                  />
                </Box>

                {/* ---------------- Smoking Status ---------------- */}
                <Box className="w-full min-w-0">
                  <CustomLabel>Smoking Status</CustomLabel>

                  <CustomSelect
                    name="smokingStatus"
                    placeholder="Select your smoking status"
                    startIcon="tabler:smoking"
                    endIcon="tabler:circle-chevron-down"
                    options={SMOKING_STATUS_OPTIONS}
                  />
                </Box>

                {/* ---------------- Alcohol Consumption ---------------- */}
                <Box className="w-full min-w-0">
                  <CustomLabel>Alcohol Consumption</CustomLabel>

                  <CustomSelect
                    name="alcoholConsumption"
                    placeholder="Select your alcohol consumption"
                    startIcon="tabler:glass-full"
                    endIcon="tabler:circle-chevron-down"
                    options={ALCOHOL_CONSUMPTION_OPTIONS}
                  />
                </Box>
              </Box>
            </div>

            {/* Footer */}
            <FormFooter config={footerConfig} />
          </Form>
        </Formik>
        {/*  Health care Personalization Popup*/}
        <HealthcarePersonalizationPopup
          open={showPopup}
          onClose={() => setShowPopup(false)}
          onContinue={handlePopUpContinue}
          onSkip={handlePopUpSkip}
          dontShowAgain={dontShowAgain}
          setDontShowAgain={setDontShowAgain}
        />
      </main>
    </div>
  );
};;

export default HealthOverview;