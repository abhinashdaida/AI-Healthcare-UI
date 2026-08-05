import { Formik } from "formik";
import { Box } from "@mui/material";
import React,{useState} from "react";
import { insuranceValidation } from "./validations";
import { Icon } from "@iconify/react";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/layout/SiderBar";
import FormHeader from "../../components/layout/FormHeader";
import UploadFiles from "../components/UploadFiles/uploadfiles";
import WhatToUpload from "./whattoupload";  
const Insurance = () => {

    

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
                handleSubmit

            }) => (

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
                                <Box className="grid grid-cols-2 gap-10 w-full max-w-[1104px] h-[208px]">
                                </Box>
                                <Box className="w-full max-w-[1104px] mt-10">
                                    <UploadFiles
                                        title="Upload Insurance Documents"
                                        uploadText="Drag and drop your insurance card here, or"
                                        maxFiles={2}
                                        showHelpLink={true}
                                        showConfirmation={true}
                                        confirmationText="I confirm that the insurance information provided is accurate and I authorize it to be used for updating my health records."
                                    />
                                    <div className="mt-5 flex items-center gap-2 bg-cyan-50 rounded-lg p-4">
                                    
                                              <Icon icon="tabler:lock"/>
                                    
                                              <p className="text-sm text-[#175A5D]">
                                    
                                                Your insurance information will only be used to verify coverage and support healthcareservices.
                                    
                                              </p>
                                    
                                            </div>
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

export default Insurance;