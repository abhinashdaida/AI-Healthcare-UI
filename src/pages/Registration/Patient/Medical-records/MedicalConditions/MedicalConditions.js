import { Formik } from "formik";
import { Box } from "@mui/material";
import React from "react";
import { medicalValidation } from "./validation";
import { Icon } from "@iconify/react";
import MedicalInput from "./MedicalInput";
import {
    allergyOptions,
    conditionOptions,
    surgeryOptions,
    medicationOptions,
} from "./constants";

import { useNavigate } from "react-router-dom";
import Footer from "../../../../../shared/components/Patient/layout/Footer";
import Sidebar from "../../components/SiderBar/SiderBar";
import FormHeader from "../../../../../shared/components/Patient/layout/FormHeader";
import UploadFiles from "../components/UploadFiles/uploadfiles";

const MedicalRecords = () => {
    const navigate = useNavigate();

    const handleUpload = async (validateForm, submitForm) => {
        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
            console.log("Validation Errors:", errors);
            return;
        }
        submitForm();
        navigate("/insurance");
    };

    const handleSkip = () => {
        console.log("skip btn click");
        navigate("/reviewdetails");
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

    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={medicalValidation}
            onSubmit={handleSubmit}
        >
            {({

                values,
                setFieldValue,
                validateForm,
                submitForm,
                errors,
                handleSubmit

            }) => {
                const footerConfig = {
                    showSkipButton: true,
                    onSkipClick: handleSkip,
                    onAutoSaveClick: handleAutoSave,
                    primaryButtonLabel: "Upload & Continue",
                    onPrimaryClick: () => handleUpload(validateForm, submitForm),
                    primaryButtonDisabled: false,
                };
                return (

                    <div className="min-h-screen bg-gray-100 flex justify-center p-3">
                        <div className="w-full max-w-350 bg-white flex min-h-172.5">
                            <Sidebar />
                            <main className="flex-1 flex flex-col">
                                <FormHeader
                                    title="Medical Records"
                                    subtitle="Add your basic information to complete your profile and personalize your healthcare journey." />
                                <div className="flex-1 px-10 py-6">
                                    <Box className="w-full max-w-[1104px] h-[82px] pt-6  flex flex-col gap-1">
                                        <h3 className="text-sm text-500!">Medical Conditions</h3>
                                        <p className="w-[328px] h-[32px] text-xs font-weight-[400] font-normal text-[#6B7280]">
                                            Add your basic health information to help healthcare
                                            providers serve you better.
                                        </p>
                                    </Box>
                                    <Box className="grid grid-cols-2 gap-10 pt-8 w-full max-w-[1104px]">
                                        <MedicalInput
                                        label="Allergies"
                                        name="allergies"
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        options={allergyOptions}
                                        placeholder="Enter your allergies"
                                        icon="tabler:virus"
                                    />

                                    <MedicalInput
                                        label="Existing Conditions"
                                        name="conditions"
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        options={conditionOptions}
                                        placeholder="Enter your existing conditions"
                                        icon="tabler:stethoscope"
                                    />

                                    <MedicalInput
                                        label="Previous Surgeries"
                                        name="surgeries"
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        options={surgeryOptions}
                                        placeholder="Enter your previous surgeries"
                                        icon="tabler:first-aid-kit"
                                    />

                                    <MedicalInput
                                        label="Current Medications"
                                        name="medications"
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        options={medicationOptions}
                                        placeholder="Enter your current medications"
                                        icon="tabler:pill"
                                    />
                                    </Box>
                                    <Box className="w-full max-w-[1104px] mt-10">
                                        <UploadFiles
                                            title="Upload Files"
                                            uploadText="Drag and drop your medical records here, or"
                                            showSecurity={true}
                                            securityText="Your medical records are securely stored and used to provide better healthcare, faster diagnosis, and more personalized treatment."
                                        />
                                    </Box>
                                </div>
                                <Footer config={footerConfig} />
                            </main>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

export default MedicalRecords;