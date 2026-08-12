import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox, Typography, IconButton } from "@mui/material";
import { Formik } from "formik";
import Sidebar from "../components/SiderBar/SiderBar";
import FormHeader from "../../../../shared/components/Registration/layout/FormHeader";
import Footer from "../../../../shared/components/Registration/layout/Footer";
import { useNavigate } from "react-router-dom";
import ReviewAccordion from "../../../../shared/components/Registration/review/ReviewAccordion";
import ReviewCard from "../../../../shared/components/Registration/review/reviewcard";
import ReviewDocumentCard from "../../../../shared/components/Registration/review/reviewdocumentcard";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
    getbasicDetails,
    locationDetails,
    emergencyDetails,
    physicalDetails,
    healthDetails,
    getMedicalDetails,
    getinsuranceDetails,
    medicalDocuments,
    insuranceDocuments,
} from "@/shared/constants/PatientRegistration/MedicalRecords/reviewConstants";
import { completeStep } from "@/state-management/modules/patientRegistration/patientRegistrationActions";

const Review = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const initialValues = {};
    const medicalValidation = null;

    const savedmedicalConditions = useSelector((state) => state.patientRegistration.medicalConditions);
    const savedinsurance = useSelector((state) => state.patientRegistration.insurance);
    const savedbasicDetails =useSelector((state)=> state.patientRegistration.basicDetails);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleUpload = async () => {
        console.log("verified login");
        dispatch(completeStep(5));
        navigate("/createloginid");
    };

    const handleSkip = () => {
        console.log("skip");
    }

    const handleAutoSave = () => {
        console.log("auto save btn click");
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={medicalValidation}
            onSubmit={handleUpload}
        >
            <div className="min-h-screen bg-gray-100 flex justify-center p-2 sm:p-3 md:p-4">
                <div className="  w-full max-w-[1440px] bg-white flex flex-col md:flex-row min-h-screen md:min-h-[690px] overflow-hidden">

                    <div className="w-full md:w-[280px] lg:w-[300px] ">
                        <Sidebar />
                    </div>

                    <main className="flex-1 flex flex-col w-full pl-6 lg:pl-10">
                        <FormHeader
                            title="Review"
                            subtitle="Review all the information before submitting your profile."
                        />
                        <div className="flex-1 px-6 pt-4 pb-6 sm:px-6 md:px-8 lg:px-10 w-full max-w-[1104px] ">

                            {/* Personal Information */}
                            <ReviewAccordion
                                title="Personal Information"
                                defaultExpanded={true}
                            >
                                <Box className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">

                                    <ReviewCard
                                        title="Basic Details"
                                        headerIcon="tabler:user"
                                        editPath="/basic-details"
                                        data={getbasicDetails(savedbasicDetails)}
                                    />

                                    <ReviewCard
                                        title="Location"
                                        headerIcon="tabler:map-pin"
                                        editPath="/emergency-contact"
                                        data={locationDetails}
                                    />

                                    <ReviewCard
                                        title="Emergency Contact"
                                        headerIcon="tabler:phone"
                                        editPath="/emergency-contact"
                                        data={emergencyDetails}
                                    />

                                    <ReviewCard
                                        title="Physical Profile"
                                        headerIcon="tabler:ruler-2"
                                        editPath="/health-overview"
                                        data={physicalDetails}
                                    />

                                    <ReviewCard
                                        title="Health Overview"
                                        headerIcon="tabler:activity-heartbeat"
                                        editPath="/health-overview"
                                        data={healthDetails}
                                    />

                                </Box>
                            </ReviewAccordion>

                            {/* Medical Records */}
                            <Box className="py-4 md:py-6 text-sm text-[#6B7280]">
                                <ReviewAccordion
                                    title="Medical Records"
                                    defaultExpanded={true}
                                >
                                    <Box className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
                                        <ReviewCard
                                            title="Medical records"
                                            editPath="/medical-conditions"
                                            headerIcon="tabler:activity-heartbeat"
                                            data={getMedicalDetails(savedmedicalConditions)}
                                        />

                                        <ReviewDocumentCard
                                            title="Uploaded Documents"
                                            editPath="/medical-conditions"
                                            files={savedmedicalConditions?.files || []}
                                        />
                                    </Box>
                                </ReviewAccordion>
                            </Box>

                            {/* Insurance */}

                            <Box className="py-4 md:py-6 text-sm text-[#6B7280]">
                                <ReviewAccordion
                                    title="Insurance"
                                    defaultExpanded={true}
                                >
                                    <Box className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
                                        <ReviewCard
                                            title="Insurance"
                                            editPath="/insurance"
                                            headerIcon="tabler:shield-plus"
                                            data={getinsuranceDetails(savedinsurance)}
                                        />
                                        <ReviewDocumentCard
                                            title="Uploaded Documents"
                                            editPath="/insurance"
                                            files={savedinsurance?.files || []}
                                        />
                                    </Box>
                                </ReviewAccordion>
                            </Box>
                        </div>
                        <div className="flex flex-3 w-full max-w-[1104px] px-4 md:px-8 lg:px-10 pb-4">
                            <FormControlLabel
                                className="items-start"
                                control={<Checkbox
                                    checked={isConfirmed}
                                    onChange={(e) => setIsConfirmed(e.target.checked)}
                                    sx={{ mt: 0.3 }}
                                />}
                                label={
                                    <Typography
                                        sx={{
                                            fontSize: { xs: "12px", sm: "13px", md: "14px", },
                                            color: "#667085", lineHeight: 1.6
                                        }}
                                    >
                                        I confirm that all the information and
                                        documents provided are accurate to the
                                        best of my knowledge. I agree to the
                                        Terms & Conditions and Privacy Policy,
                                        and authorize MediConnect to securely
                                        use my information for healthcare
                                        services in accordance with applicable
                                        regulations.
                                    </Typography>
                                }
                            />
                            <IconButton
                                onClick={scrollToTop}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "50%",
                                    backgroundColor: "#248B8F",
                                    color: "#fff",
                                    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                                    "&:hover": {
                                        backgroundColor: "#1E767A",
                                    },
                                }}
                            >
                                <Icon icon="tabler:chevron-up" width={24} />
                            </IconButton>
                        </div>
                        <Footer config={{
                            showSkipButton: false,
                            onSkipClick: handleSkip,
                            onAutoSaveClick: handleAutoSave,
                            primaryButtonLabel: "Create Login ID",
                            onPrimaryClick: () => handleUpload(),
                            primaryButtonDisabled: !isConfirmed,
                        }} />
                    </main>
                </div>
            </div>
        </Formik>
    );
};

export default Review;