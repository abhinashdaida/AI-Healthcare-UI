import { Formik } from "formik";
import { Box } from "@mui/material";
import React from "react";
import { medicalValidation } from "@/shared/validations/patientRegistration/MedicalrecordsValidations";
import { Icon } from "@iconify/react";
import ReusableChipInput from "@/shared/components/Registration/form/FormChipInput";
import {
    allergyOptions,
    conditionOptions,
    surgeryOptions,
    medicationOptions,
} from "../../../../shared/constants/PatientRegistration/MedicalRecords/MedicalConditionsconstants";
import SectionHeader from "@/shared/components/Registration/form/SectionHeader";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../../../shared/components/Registration/layout/Footer";
import Sidebar from "../components/SiderBar/SiderBar";
import FormHeader from "../../../../shared/components/Registration/layout/FormHeader";
import UploadFiles from "../../../../shared/components/Registration/UploadFiles/uploadfiles";
import {
    setMedicalConditions,
    completeStep,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";

// Medical Records
const MedicalRecords = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location =useLocation();

     

    // Get previously saved medical information from Redux
    const savedData = useSelector(
        (state) => state.patientRegistration.medicalConditions
    );
    // Submit
    const handleUpload = async (values) => {
        dispatch(setMedicalConditions(values));
        dispatch(completeStep(3));
        if (location.state?.fromReview) {
        navigate("/reviewdetails", {
            replace: true,
        });
        return;
    }
        console.log("upload and continue");
        if (values.files && values.files.length > 0) {
            navigate("/insurance", {
                state: {
                    medicalFileUploaded: true,
                },
            });
        } else {
            navigate("/insurance");
        }
    };
    // Skip
    const handleSkip = () => {
        console.log("skip btn click");
        navigate("/insurance");
    };

    // Auto Save
    const handleAutoSave = () => {
        console.log("auto save btn click");
    };

    // Initial Form Values
    const initialValues = {
        allergies: savedData?.allergies || [],
        conditions: savedData?.conditions || [],
        surgeries: savedData?.surgeries || [],
        medications: savedData?.medications || [],
        files: savedData?.files || [],
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={medicalValidation}
            onSubmit={handleUpload}
        >
            {({ values, setFieldValue }) => (
                <div className="min-h-screen bg-[#F5F7F8]">
                    {/* Sidebar */}
                    <div className="w-full md:w-[280px] lg:w-[300px]">
                        <Sidebar />
                    </div>
                    {/* Right Content */}
                    <main className="ml-[336px] max-lg:ml-[280px] max-md:ml-0 min-h-screen flex flex-col bg-white">
                        {/* Header */}
                        <FormHeader
                            title="Medical Records"
                            subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
                        />
                        {/* Content */}
                        <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 pt-[120px] pb-[150px] overflow-y-auto">
                            {/* Section Header */}
                            <Box className="w-full max-w-[1104px] h-[82px] pt-4 md:pt-6 flex flex-col gap-2">
                                <SectionHeader
                                    title="Medical Conditions"
                                    subtitle="Add your basic health information to help healthcare providers serve you better."
                                />
                            </Box>
                            {/* Medical Condition Fields */}
                            <Box className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 lg:gap-10 pt-6 md:pt-8 w-full max-w-[1104px]">
                                {/* Allergies */}
                                <ReusableChipInput
                                    label="Allergies"
                                    name="allergies"
                                    options={allergyOptions}
                                    placeholder="Enter your allergies"
                                    icon="tabler:virus"
                                />
                                {/* Existing Conditions */}
                                <ReusableChipInput
                                    label="Existing Conditions"
                                    name="conditions"
                                    options={conditionOptions}
                                    placeholder="Enter your existing conditions"
                                    icon="tabler:stethoscope"
                                />
                                {/* Previous Surgeries */}
                                <ReusableChipInput
                                    label="Previous Surgeries"
                                    name="surgeries"
                                    options={surgeryOptions}
                                    placeholder="Enter your previous surgeries"
                                    icon="tabler:first-aid-kit"
                                />
                                {/* Current Medications */}
                                <ReusableChipInput
                                    label="Current Medications"
                                    name="medications"
                                    options={medicationOptions}
                                    placeholder="Enter your current medications"
                                    icon="tabler:pill"
                                />
                            </Box>
                            {/* Upload Medical Records */}
                            <Box className="w-full max-w-[1104px] mt-6 md:mt-8 lg:mt-10">
                                <UploadFiles
                                    title="Upload Files"
                                    initialFiles={values.files}
                                    uploadText="Drag and drop your medical records here, or"
                                    showSecurity={true}
                                    securityText="Your medical records are securely stored and used to provide better healthcare, faster diagnosis, and more personalized treatment."
                                    onFilesChange={(files) =>
                                        setFieldValue("files", files)
                                    }
                                />
                            </Box>
                        </div>
                        {/* Footer */}
                        <Footer
                            config={{
                                showSkipButton: true,
                                onSkipClick: handleSkip,
                                onAutoSaveClick: handleAutoSave,
                                primaryButtonLabel: "Upload & Continue",
                                onPrimaryClick: () => handleUpload(values),
                                primaryButtonDisabled: false,
                            }}
                        />
                    </main>
                </div>
        )}
      </Formik>
    );
};

export default MedicalRecords;