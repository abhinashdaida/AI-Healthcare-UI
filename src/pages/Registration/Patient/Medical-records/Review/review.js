<<<<<<<<< Temporary merge branch 1
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import FormHeader from "../../components/layout/FormHeader";
import Footer from "../../components/layout/Footer";
import { reviewData } from "./Reviewdata";
import Sidebar from "../../components/layout/SiderBar";

const cardStyle = {
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    boxShadow: "none",
    height: "100%",
};

const ReviewComplete = () => {
    const navigate = useNavigate();
    const initialValues={};
    const medicalValidation=null;

    const handleUpload = async (validateForm, submitForm) => {
        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
            console.log("Validation Errors:", errors);
            return;
        }
        submitForm();
        navigate("/createloginid");
    };

    const handleSkip=()=>{
        console.log("skip");
    }

    const handleAutoSave = () => {
        console.log("auto save btn click");
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
                    showSkipButton: false,
                    onSkipClick: handleSkip,
                    onAutoSaveClick: handleAutoSave,
                    primaryButtonLabel: "Create Login ID",
                    onPrimaryClick: () => handleUpload(validateForm, submitForm),
                    primaryButtonDisabled: false,
                };
                return (
                    <div className="min-h-screen bg-gray-100 flex justify-center p-3">
                        <div className="w-full max-w-350 bg-white flex min-h-172.5">
                            <Sidebar />
                            <main className="flex-1 flex flex-col">
                                <FormHeader
                                    title="Review Complete"
                                    subtitle="Review all the information you've provided and edit any section before continuing." />
                                <div className="flex-1 px-10 py-6">

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

export default ReviewComplete;
=========
import React from "react";
import { Box } from "@mui/material";

import Sidebar from "../../components/layout/SiderBar";
import FormHeader from "../../components/layout/FormHeader";
import Footer from "../../components/layout/Footer";

import ReviewAccordion from "./ReviewAccordion";
import ReviewCard from "./ReviewCard";

import {
    basicDetails,
    locationDetails,
    emergencyDetails,
    physicalDetails,
    healthDetails,
} from "./reviewConstants";

const Review = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-3">
            <div className="w-full max-w-350 bg-white flex min-h-172.5">

                <Sidebar />

                <main className="flex-1 flex flex-col">

                    <FormHeader
                        title="Review"
                        subtitle="Review all the information before submitting your profile."
                    />

                    <div className="flex-1 px-10 pt-4 pb-6">

                        {/* Personal Information */}
                        <ReviewAccordion
                            title="Personal Information"
                            defaultExpanded={true}
                        >
                            <Box className="grid grid-cols-2 gap-6">

                                <ReviewCard
                                    title="Basic Details"
                                    headerIcon="tabler:user"
                                    data={basicDetails}
                                />

                                <ReviewCard
                                    title="Location"
                                    headerIcon="tabler:map-pin"
                                    data={locationDetails}
                                />

                                <ReviewCard
                                    title="Emergency Contact"
                                    headerIcon="tabler:phone"
                                    data={emergencyDetails}
                                />

                                <ReviewCard
                                    title="Physical Profile"
                                    headerIcon="tabler:ruler-2"
                                    data={physicalDetails}
                                />

                                <ReviewCard
                                    title="Health Overview"
                                    headerIcon="tabler:activity-heartbeat"
                                    data={healthDetails}
                                />

                            </Box>
                        </ReviewAccordion>

                        {/* Medical Records */}
                        <ReviewAccordion title="Medical Records">
                            <Box className="py-6 text-sm text-[#6B7280]">
                                Medical Records information will be displayed here.
                            </Box>
                        </ReviewAccordion>

                        {/* Insurance */}
                        <ReviewAccordion title="Insurance">
                            <Box className="py-6 text-sm text-[#6B7280]">
                                Insurance information will be displayed here.
                            </Box>
                        </ReviewAccordion>

                    </div>

                    <Footer />

                </main>

            </div>
        </div>
    );
};

export default Review;
>>>>>>>>> Temporary merge branch 2
