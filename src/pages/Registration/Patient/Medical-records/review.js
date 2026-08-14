import React, { useState } from "react";
import {
    Box,
    FormControlLabel,
    Checkbox,
    Typography,
    IconButton,
} from "@mui/material";
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
    getlocationDetails,
    getemergencyDetails,
    getphysicalDetails,
    gethealthDetails,
    getMedicalDetails,
    getinsuranceDetails,
    medicalDocuments,
    insuranceDocuments,
} from "@/shared/constants/PatientRegistration/MedicalRecords/reviewConstants";
import { completeStep } from "@/state-management/modules/patientRegistration/patientRegistrationActions";

// Review
const Review = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Confirmation State
    const [isConfirmed, setIsConfirmed] = useState(false);
    // Formik Values
    const initialValues = {};
    const medicalValidation = null;
    // Get Saved Registration Data
    const savedmedicalConditions = useSelector( (state) => state.patientRegistration.medicalConditions );
    const savedinsurance = useSelector( (state) => state.patientRegistration.insurance );
    const savedbasicDetails = useSelector( (state) => state.patientRegistration.basicDetails );
    const savedemergencyDetails = useSelector( (state) => state.patientRegistration.emergencyContact );
    const savedhealthDetails =useSelector((state)=>state.patientRegistration.healthOverview );

    // Scroll To Top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    // Submit
    const handleUpload = async () => {
        console.log("verified login");
        dispatch(completeStep(5));
        navigate("/createloginid");
    };
    // Skip
    const handleSkip = () => {
        console.log("skip");
    };
    // Auto Save
    const handleAutoSave = () => {
        console.log("auto save btn click");
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={medicalValidation}
            onSubmit={handleUpload}
        >
            <div className="min-h-screen bg-[#F5F7F8]">
                {/* Sidebar */}
                <div className="w-full md:w-[280px] lg:w-[300px]">
                    <Sidebar />
                </div>
                {/* Right Content */}
                <main className="ml-[336px] max-lg:ml-[280px] max-md:ml-0 min-h-screen flex flex-col bg-white">
                    {/* Header */}
                    <FormHeader
                        title="Review"
                        subtitle="Review all the information before submitting your profile."
                    />
                    {/* Content */}
                    <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10  pt-[80px] md:pt-[120px] pt-[100px] md:pb-[150px] overflow-y-auto">
                        {/* Personal Information */}
                        <ReviewAccordion
                            title="Personal Information"
                            defaultExpanded={true}
                        >
                            <Box className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
                                {/* Basic Details */}
                                <ReviewCard
                                    title="Basic Details"
                                    headerIcon="tabler:user"
                                    editPath="/basic-details"
                                    data={getbasicDetails(savedbasicDetails)}
                                />
                                {/* Location */}
                                <ReviewCard
                                    title="Location"
                                    headerIcon="tabler:map-pin"
                                    editPath="/emergency-contact"
                                    data={getlocationDetails(savedemergencyDetails)}
                                />
                                {/* Emergency Contact */}
                                <ReviewCard
                                    title="Emergency Contact"
                                    headerIcon="tabler:phone"
                                    editPath="/emergency-contact"
                                    data={getemergencyDetails(savedemergencyDetails)}
                                />
                                {/* Physical Profile */}
                                <ReviewCard
                                    title="Physical Profile"
                                    headerIcon="tabler:ruler-2"
                                    editPath="/health-overview"
                                    data={getphysicalDetails(savedhealthDetails)}
                                />
                                {/* Health Overview */}
                                <ReviewCard
                                    title="Health Overview"
                                    headerIcon="tabler:activity-heartbeat"
                                    editPath="/health-overview"
                                    data={gethealthDetails(savedhealthDetails)}
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
                                    {/* Medical Information */}
                                    <ReviewCard
                                        title="Medical records"
                                        editPath="/medical-conditions"
                                        headerIcon="tabler:activity-heartbeat"
                                        data={getMedicalDetails(savedmedicalConditions)}
                                    />
                                    {/* Medical Documents */}
                                    <ReviewDocumentCard
                                        title="Uploaded Documents"
                                        editPath="/medical-conditions"
                                        files={
                                            savedmedicalConditions?.files || []
                                        }
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
                                    {/* Insurance Information */}
                                    <ReviewCard
                                        title="Insurance"
                                        editPath="/insurance"
                                        headerIcon="tabler:shield-plus"
                                        data={getinsuranceDetails(
                                            savedinsurance
                                        )}
                                    />
                                    {/* Insurance Documents */}
                                    <ReviewDocumentCard
                                        title="Uploaded Documents"
                                        editPath="/insurance"
                                        files={savedinsurance?.files || []}
                                    />
                                </Box>
                            </ReviewAccordion>
                        </Box>

                        {/* Confirmation */}
                        <div className="flex flex-3 w-full max-w-[1104px] px-4 md:px-8 lg:px-10 pb-4">
                            {/* Terms & Conditions Checkbox */}
                            <FormControlLabel
                                className="items-start"
                                control={
                                    <Checkbox
                                        checked={isConfirmed}
                                        onChange={(e) => setIsConfirmed(e.target.checked) }
                                        sx={{ mt: 0.3 }}
                                    />
                                }
                                label={
                                    <Typography
                                        sx={{
                                            fontSize: { xs: "12px",  sm: "13px", md: "14px", },
                                            color: "#667085",
                                            lineHeight: 1.6,
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
                            {/* Scroll To Top */}
                            <IconButton
                                onClick={scrollToTop}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "50%",
                                    backgroundColor: "#248B8F",
                                    color: "#fff",
                                    boxShadow:
                                        "0px 4px 12px rgba(0,0,0,0.15)",
                                    "&:hover": {
                                        backgroundColor: "#1E767A",
                                    },
                                }}
                            >
                                <Icon icon="tabler:chevron-up" width={24} />
                            </IconButton>
                        </div>
                    </div>
                    {/* Footer */}
                    <Footer
                        config={{
                            showSkipButton: false,
                            onSkipClick: handleSkip,
                            onAutoSaveClick: handleAutoSave,
                            primaryButtonLabel: "Create Login ID",
                            onPrimaryClick: () => handleUpload(),
                            primaryButtonDisabled: !isConfirmed,
                        }}
                    />

                </main>
            </div>

            
      </Formik>
    );
};

export default Review;