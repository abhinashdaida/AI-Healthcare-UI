import { Formik } from "formik";
import { Box } from "@mui/material";
import React from "react";

import { medicalValidation } from "./validation";
import MedicalInput from "./MedicalInput";
import {
    allergyOptions,
    conditionOptions,
    surgeryOptions,
    medicationOptions,
} from "./constants";

import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/layout/SiderBar";
import FormHeader from "../../components/layout/FormHeader";
import UploadFiles from "../components/UploadFiles/uploadfiles";

const MedicalRecords = () => {
    const initialValues = {
        allergies: [],
        conditions: [],
        surgeries: [],
        medications: [],
        files: [],
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
            {({ values, setFieldValue, handleSubmit }) => (
                <div className="min-h-screen bg-gray-100 flex justify-center p-3">
                    <div className="w-full max-w-350 bg-white flex min-h-172.5">
                        <Sidebar />

                        <main className="flex-1 flex flex-col">
                            <FormHeader
                                title="Medical Records"
                                subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
                            />

                            <div className="flex-1 px-10 py-6">

                                {/* Heading */}
                                <Box className="w-full max-w-[1104px] pt-6 mb-8 flex flex-col gap-2">
                                    <h3 className="text-base font-semibold text-[#111827]">
                                        Medical Conditions
                                    </h3>

                                    <p className="w-[328px] text-sm font-normal text-[#6B7280] leading-5">
                                        Add your basic health information to help
                                        healthcare providers serve you better.
                                    </p>
                                </Box>

                                {/* Medical Inputs */}
                                <Box className="grid grid-cols-2 gap-10 w-full max-w-[1104px]">

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

                                {/* Upload Files */}
                                <Box className="w-full max-w-[1104px] mt-10">
                                    <UploadFiles
                                        title="Upload Files"
                                        uploadText="Drag and drop your medical records here, or"
                                        showSecurity={true}
                                        securityText="Your medical records are securely stored and used to provide better healthcare, faster diagnosis, and more personalized treatment."
                                    />
                                </Box>

                            </div>

                            <Footer onSave={handleSubmit} />
                        </main>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default MedicalRecords;