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
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../../../shared/components/Registration/layout/Footer";
import Sidebar from "../components/SiderBar/SiderBar";
import FormHeader from "../../../../shared/components/Registration/layout/FormHeader";
import UploadFiles from "../../../../shared/components/Registration/UploadFiles/uploadfiles";
import { setMedicalConditions, completeStep } from "@/state-management/modules/patientRegistration/patientRegistrationActions";

const MedicalRecords = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const medicalConditions = useSelector((state) => state.patientRegistration.medicalConditions);

    const handleUpload = async (values) => {
        dispatch(setMedicalConditions(values));
        dispatch(completeStep(3));
        console.log("upload and continue")
        if (values.files && values.files?.length > 0) {
            navigate("/insurance", {
                state: {
                    medicalFileUploaded: true,
                },
            });
        } else {
            navigate("/insurance");
        }
    };

    const handleSkip = () => {
        console.log("skip btn click");
        navigate("/insurance");
    }

    const handleAutoSave = () => {
        console.log("auto save btn click");
    }

    const initialValues = {
        allergies: [],
        conditions: [],
        surgeries: [],
        medications: [],
        files: []
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={medicalValidation}
            onSubmit={handleUpload}
        >
            {({
                values,
                setFieldValue,

            }) => (
                <div className="min-h-screen bg-gray-100 flex justify-center p-2 sm:p-3 md:p-4">
                    <div className="w-full
                        max-w-[1440px]
                        bg-white
                        flex
                        flex-col
                        md:flex-row
                        min-h-screen
                        md:min-h-[690px]
                        overflow-hidden">
                        <div className="  w-full md:w-[280px] lg:w-[300px]  ">
                            <Sidebar />
                        </div>
                        <main className="flex-1 flex flex-col w-full pl-6 lg:pl-10">
                            <FormHeader
                                title="Medical Records"
                                subtitle="Add your basic information to complete your profile and personalize your healthcare journey." />
                            <div className="flex-1 px-6 py-4 sm:px-6 md:px-8 lg:px-10 w-full max-w-[1104px]">
                                <Box className="w-full max-w-[1104px] h-[82px] pt-4  md:pt-6 flex flex-col gap-2">
                                    <SectionHeader title="Medical Conditions"
                                        subtitle="Add your basic health information to help healthcare providers serve you better." />
                                </Box>
                                <Box className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 lg:gap-10 pt-6 md:pt-8 w-full max-w-[1104px]">
                                    <ReusableChipInput
                                        label="Allergies"
                                        name="allergies"
                                        options={allergyOptions}
                                        placeholder="Enter your allergies"
                                        icon="tabler:virus"
                                    />

                                    <ReusableChipInput
                                        label="Existing Conditions"
                                        name="conditions"
                                        options={conditionOptions}
                                        placeholder="Enter your existing conditions"
                                        icon="tabler:stethoscope"
                                    />

                                    <ReusableChipInput
                                        label="Previous Surgeries"
                                        name="surgeries"
                                        options={surgeryOptions}
                                        placeholder="Enter your previous surgeries"
                                        icon="tabler:first-aid-kit"
                                    />

                                    <ReusableChipInput
                                        label="Current Medications"
                                        name="medications"
                                        options={medicationOptions}
                                        placeholder="Enter your current medications"
                                        icon="tabler:pill"
                                    />
                                </Box>
                                <Box className="w-full max-w-[1104px] mt-6 md:mt-8  lg:mt-10">
                                    <UploadFiles
                                        title="Upload Files"
                                        uploadText="Drag and drop your medical records here, or"
                                        showSecurity={true}
                                        securityText="Your medical records are securely stored and used to provide better healthcare, faster diagnosis, and more personalized treatment."
                                        onFilesChange={(files) => setFieldValue("files", files)}
                                    />
                                </Box>
                            </div>
                            <Footer config={{
                                showSkipButton: true,
                                onSkipClick: handleSkip,
                                onAutoSaveClick: handleAutoSave,
                                primaryButtonLabel: "Upload & Continue",
                                onPrimaryClick: () => handleUpload(values),
                                primaryButtonDisabled: false,
                            }} />
                        </main>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default MedicalRecords;