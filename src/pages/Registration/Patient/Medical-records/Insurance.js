import { Formik } from "formik";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { insuranceValidation } from "@/shared/validations/patientRegistration/MedicalrecordsValidations"; 
import { Icon } from "@iconify/react";
import Footer from "../../../../shared/components/Registration/layout/Footer";
import Sidebar from "../../../../shared/components/Registration/layout/SiderBar";
import FormHeader from "../../../../shared/components/Registration/layout/FormHeader";
import UploadFiles from "../../../../shared/components/Registration/UploadFiles/uploadfiles";
import WhatToUpload from "../../../../shared/components/Registration/PopUp/whattoupload";
import ReusableInput from "@/shared/components/Registration/form/FormInput";
import ReusableSelect from "@/shared/components/Registration/form/FormSelectInput";
import { useNavigate } from "react-router-dom";
import { governmentProviders, privateProviders } from "../../../../shared/constants/PatientRegistration/MedicalRecords/Insuranceconstants";

const Insurance = () => {
    const navigate = useNavigate();
    const handleUpload = async () => {
       console.log("reviewdetails")
        navigate("/reviewdetails");
    };

    const handleSkip = () => {
        console.log("skip btn click");
        navigate("/reviewdetails");
    }

    const handleAutoSave = () => {
        console.log("auto save btn click");
    }

    const initialValues = {
        insuranceType: "",
        schemeProvider: "",
        holderName: "",
        customerId: "",
        files: []
    };

    const handleSubmit = (values) => {
        console.log(values);
    };

     const footerConfig = {
                    showSkipButton: true,
                    onSkipClick: handleSkip,
                    onAutoSaveClick: handleAutoSave,
                    primaryButtonLabel: "Review Details",
                    onPrimaryClick: () => handleUpload(validateForm, submitForm),
                    primaryButtonDisabled: false,
                };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={insuranceValidation}
            onSubmit={handleSubmit}
        >
            {({
                values,
                setFieldValue,
            }) =>  (
                    <div className="min-h-screen bg-gray-100 flex justify-center p-2 sm:p-3 md:p-4">
                        <div className=" w-full  max-w-[1440px]
            bg-white flex flex-col md:flex-row  min-h-screen md:min-h-[690px] overflow-hidden">
                            <div className="w-full md:w-[280px] lg:w-[300px] ">
                                <Sidebar />
                            </div>
                            <main className="flex-1 flex flex-col w-full pl-6 lg:pl-10">
                                <FormHeader
                                    title="Medical Records"
                                    subtitle="Add your basic information to complete your profile and personalize your healthcare journey." />
                                <div className="flex-1 px-6 py-4 sm:px-8 md:px-8 lg:px-10 ">
                                    <Box className="w-full max-w-[1104px]  pt-4 md:pt-6 flex flex-col gap-2">
                                        <h3 className="text-sm text-500!">Insurance</h3>
                                        <p className="w-full md:max-w-[328px] h-[32px] text-xs md:text-sm font-weight-[400] font-normal text-[#6B7280]">
                                            Add your insurance information for seamless coverage and claims processing.
                                        </p>
                                    </Box>
                                    {/* First Row */}
                                    <Box className="pt-6 md:pt-8 lg:pt-10 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 w-full max-w-[1104px] ">
                                        <div className="col-span-1 w-full">
                                            <ReusableSelect
                                                label="Insurance Type"
                                                name="insuranceType"
                                                onChange={() => {
                                                    setFieldValue("schemeProvider", "");
                                                }}
                                                placeholder="Select your Insurance Type"
                                                startIcon="tabler:building-bank"
                                                options={[
                                                    { label: "Government", value: "Government" },
                                                    { label: "Private", value: "Private" },
                                                    { label: "No Insurance", value: "None" },
                                                ]}
                                            />
                                        </div>

                                        {/* Empty space before selection */}
                                        {!values.insuranceType && <div></div>}

                                        {values.insuranceType && (
                                            <>
                                                {/* Scheme Provider */}
                                                <div className="w-full">
                                                    <ReusableSelect
                                                        label={values.insuranceType === "Private"
                                                            ? "Insurance Provider"
                                                            : "Government Scheme Provider"
                                                        }
                                                        name="schemeProvider"
                                                        placeholder={values.insuranceType === "Private"
                                                            ? "Select Insurance Provider"
                                                            : "Select Government Scheme"
                                                        }
                                                        startIcon="tabler:shield-plus"
                                                        options={
                                                            values.insuranceType === "Private"
                                                                ? privateProviders
                                                                : governmentProviders
                                                        }
                                                    />
                                                </div>

                                                {/* Holder Name */}
                                                <div className="w-full">
                                                    <ReusableInput
                                                        label="Insurance Holder Name"
                                                        name="holderName"
                                                        placeholder="Enter holder name"
                                                        startIcon="tabler:user"
                                                        />
                                                </div>

                                                {/* Customer ID */}
                                                <div className="w-full">
                                                    <ReusableInput
                                                        label="Customer ID / Policy Number"
                                                        name="customerId"
                                                        placeholder="Enter policy number"
                                                        startIcon="tabler:credit-card"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </Box>

                                    {values.insuranceType && (
                                        <Box className="pt-6 md:pt-8 lg:pt-10 mt-6 md:mt-8 w-full max-w-[1104px]">
                                            <UploadFiles
                                                title="Upload Insurance Documents"
                                                uploadText="Drag and drop your insurance card here, or"
                                                maxFiles={2}
                                                showHelpLink={true}
                                                showConfirmation={true}
                                                confirmationText="I confirm that the insurance information provided is accurate and I authorize it to be used for updating my health records."
                                                onFilesChange={(files) => setFieldValue("files", files)}
                                            />
                                            <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-cyan-50 rounded-lg p-4">
                                                <Icon icon="tabler:lock" />
                                                <p className="text-xs md:text-sm text-[#175A5D]">
                                                    Your insurance information will only be used to verify coverage and support healthcare services.
                                                </p>
                                            </div>
                                        </Box>
                                    )}
                                </div>
                                <Footer config={{
          showSkipButton: true,
          onSkipClick: handleSkip,
          onAutoSaveClick: handleAutoSave,
          primaryButtonLabel: "Upload & Continue",
          onPrimaryClick: () => handleUpload(),
          primaryButtonDisabled: false,
        }} />
                            </main>
                        </div>
                    </div >
                )}
        </Formik >
    );
};

export default Insurance;