import { Formik } from "formik";
import { Box } from "@mui/material";
<<<<<<< HEAD
import React, { useState } from "react";
=======
import React,{useState} from "react";
>>>>>>> karthick
import { insuranceValidation } from "./validations";
import { Icon } from "@iconify/react";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/layout/SiderBar";
import FormHeader from "../../components/layout/FormHeader";
import UploadFiles from "../components/UploadFiles/uploadfiles";
import WhatToUpload from "./whattoupload";
import { useNavigate } from "react-router-dom";
import { governmentProviders, privateProviders } from "./Insuranceconstants";

const Insurance = () => {

    const navigate = useNavigate();
        const handleUpload = async (validateForm, submitForm) => {
        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
            console.log("Validation Errors:", errors);
            return;
        }
        submitForm();
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
        insurancetype: [],
        schemeprovider: [],
        holdername: [],
        customerid: [],
        files: []
    };

    const handleSubmit = (values) => {
        console.log(values);
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
                handleSubmit,
                validateForm,
                submitForm,
                errors,
                touched,
            }) => {
                const footerConfig = {
        showSkipButton: true,
        onSkipClick: handleSkip,
        onAutoSaveClick: handleAutoSave,
        primaryButtonLabel: "Review Details",
        onPrimaryClick: () => handleUpload(validateForm, submitForm),
        primaryButtonDisabled: false,
    };
                const isFileUploaded = values.files && values.files?.length > 0;
                return(
                <div className="min-h-screen bg-gray-100 flex justify-center p-3">
                    <div className="w-full max-w-350 bg-white flex min-h-172.5">
                        <Sidebar />
                        <main className="flex-1 flex flex-col">
                            <FormHeader
                                title="Medical Records"
                                subtitle="Add your basic information to complete your profile and personalize your healthcare journey." />
                            <div className="flex-1 px-10 py-6">
                                <Box className="w-full max-w-[1104px] h-[82px] pt-6  flex flex-col gap-1">
                                    <h3 className="text-sm text-500!">Insurance</h3>
                                    <p className="w-[328px] h-[32px] text-xs font-weight-[400] font-normal text-[#6B7280]">
                                        Add your insurance information for seamless coverage and claims processing.
                                    </p>
                                </Box>
                                {/* First Row */}
                                <Box className="pt-10 grid grid-cols-2 gap-10 w-full max-w-[1104px] h-[208px]">

                                    <div className="col-span-2 md:col-span-1 w-full max-w-[489px] h-[84px]">
                                        <label className="block text-sm font-medium mb-2">
                                            Insurance Type
                                        </label>
                                        <div className="relative w-full max-w-[489px] h-[56px] border gap-2 rounded-[8px] border-[0.5px] px-4 border-[#D1D5DB]">
                                            <Icon
                                                icon="tabler:building-bank"
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                                width={18}
                                            />

                                            <select
                                                name="insuranceType"
                                                value={values.insuranceType}
                                                onChange={(e) => {
                                                    setFieldValue("insuranceType", e.target.value)
                                                    setFieldValue("schemeProvider", "")
                                                }}
                                                className={`w-full h-full  bg-transparent pl-12 pr-12 appearance-none bg-white outline-none ${isFileUploaded ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                                            >
                                                <option value="">Select Insurance Type</option>
                                                <option value="Government">Government</option>
                                                <option value="Private">Private</option>
                                                <option value="None">No Insurance</option>
                                            </select>
                                            <Icon
                                                icon="tabler:circle-chevron-down"

                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                                width={18}
                                            />
                                        </div>
                                    </div>

                                    {/* Empty space before selection */}
                                    {!values.insuranceType && <div></div>}

                                    {values.insuranceType && (
                                        <>
                                            {/* Scheme Provider */}
                                            <div>
                                                <label className="block text-sm mb-2">
                                                    {values.insuranceType === "Private"
                                                        ? "Insurance Provider"
                                                        : "Government Scheme Provider"}
                                                </label>
                                                <div className="relative w-full max-w-[489px] h-[56px] border gap-2 rounded-[8px] border-[0.5px] px-4 border-[#D1D5DB]">
                                                    <Icon
                                                        icon="tabler:shield-plus"
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                                        width={18}
                                                    />
                                                    <select
                                                        name="schemeProvider"
                                                        value={values.schemeProvider}
                                                        onChange={(e) =>
                                                            setFieldValue("schemeProvider", e.target.value)
                                                        }
                                                        className={`w-full h-full pl-12 pr-12 appearance-none outline-none ${isFileUploaded ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                                                            }`}
                                                    >
                                                        <option value="">
                                                            {values.insuranceType === "Private"
                                                                ? "Select Insurance Provider"
                                                                : "Select Government Scheme"}
                                                        </option>

                                                        {(values.insuranceType === "Private"
                                                            ? privateProviders
                                                            : governmentProviders
                                                        ).map((provider) => (
                                                            <option key={provider} value={provider}>
                                                                {provider}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <Icon
                                                        icon="tabler:circle-chevron-down"

                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                                        width={18}
                                                    />
                                                </div>
                                            </div>

                                            {/* Holder Name */}
                                            <div>
                                                <label className="block text-sm mb-2">
                                                    Insurance Holder Name
                                                </label>
                                                <div className="relative w-full max-w-[489px] h-[56px] border gap-2 rounded-[8px] border-[0.5px] px-4 border-[#D1D5DB]">
                                                    <Icon
                                                        icon="tabler:user"
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                                        width={18}
                                                    />

                                                    <input
                                                        type="text"
                                                        name="holderName"
                                                        value={values.holderName}
                                                        onChange={(e) =>
                                                            setFieldValue("holderName", e.target.value)
                                                        }
                                                        className={`w-full h-full rounded-lg px-12 ${isFileUploaded
                                                                ? "bg-gray-100 cursor-not-allowed"
                                                                : "bg-white"
                                                        }`}
                                                    />
                                                </div>
                                            </div>

                                            {/* Customer ID */}
                                            <div>
                                                <label className="block text-sm mb-2">
                                                    Customer ID / Policy Number
                                                </label>
                                                <div className="relative w-full max-w-[489px] h-[56px] border gap-2 rounded-[8px] border-[0.5px] px-4 border-[#D1D5DB]">
                                                    <Icon
                                                        icon="tabler:credit-card"
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                                        width={18}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="customerId"
                                                        value={values.customerId}
                                                        onChange={(e) =>
                                                            setFieldValue("customerId", e.target.value)
                                                        }
                                                        className={`w-full h-full rounded-lg px-12 ${isFileUploaded
                                                                ? "bg-gray-100 cursor-not-allowed"
                                                                : "bg-white"
                                                            }`}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Box>

                                {values.insuranceType && (
                                    <Box className="pt-10 mt-10 w-full max-w-[1104px]">
                                        <UploadFiles
                                            title="Upload Insurance Documents"
                                            uploadText="Drag and drop your insurance card here, or"
                                            maxFiles={2}
                                            showHelpLink={true}
                                            showConfirmation={true}
                                            confirmationText="I confirm that the insurance information provided is accurate and I authorize it to be used for updating my health records."
                                            onFilesChange={(files) => setFieldValue("files", files)}
                                        />
                                        <div className="mt-5 flex items-center gap-2 bg-cyan-50 rounded-lg p-4">
                                            <Icon icon="tabler:lock" />
                                            <p className="text-sm text-[#175A5D]">
                                                Your insurance information will only be used to verify coverage and support healthcare services.
                                            </p>
                                        </div>
                                    </Box>
                                )}
                            </div>
                            <Footer config={footerConfig} />
                        </main>
                    </div>
                </div >
                );
            }}
        </Formik >
    );
};

export default Insurance;