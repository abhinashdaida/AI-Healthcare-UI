import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button, FormControlLabel,
    Divider, Checkbox
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Icon } from "@iconify/react";
import FormHeader from "../../components/layout/FormHeader";
import Footer from "../../components/layout/Footer";
import { reviewData } from "./Reviewdata";
import Sidebar from "../../components/layout/SiderBar";
import ReviewCard from "./reviewcard";
import DocumentCard from "./reviewdocumentcard";

const cardStyle = {
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    boxShadow: "none",
    height: "100%",
};

const ReviewComplete = () => {
    const navigate = useNavigate();
    const initialValues = {};
    const medicalValidation = null;

    const handleUpload = async (validateForm, submitForm) => {
        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
            console.log("Validation Errors:", errors);
            return;
        }
        submitForm();
        navigate("/createloginid");
    };

    const handleSkip = () => {
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
                                <div className="w-full max-w-[1104px] h-[1958px] pb-10 flex flex-col gap-10  ">
                                    <div className="w-full max-w-[1104px] h-[960px] px-10 gap-6">

                                    </div>
                                    <div className="w-full max-w-[1104px] h-[368px]">
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mb: 3,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "16px",
                                                    fontWeight: 500,
                                                    color: "#101828",
                                                }}
                                            >
                                                Medical Records
                                            </Typography>

                                            <Icon
                                                icon="mdi:chevron-down"
                                                width={20}
                                                height={20}
                                            />
                                        </Box>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <ReviewCard
                                                    title="Medical Records"
                                                    titleIcon="tabler:activity-heartbeat"
                                                    actionIcon="tabler:edit"
                                                    data={[
                                                        {
                                                            label: "Allergies",
                                                            value: reviewData.medical.allergies,
                                                        },
                                                        {
                                                            label: "Existing Conditions",
                                                            value: reviewData.medical.conditions,
                                                        },
                                                        {
                                                            label: "Previous Surgeries",
                                                            value: reviewData.medical.surgeries,
                                                        },
                                                        {
                                                            label: "Current Medications",
                                                            value: reviewData.medical.medications,
                                                        },
                                                    ]}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <DocumentCard
                                                    files={reviewData.medicalDocuments}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="w-full max-w-[1104px] h-[368px]">

                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mb: 3,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "16px",
                                                    fontWeight: 500,
                                                    color: "#101828",
                                                }}
                                            >
                                                Insurance
                                            </Typography>

                                            <Icon
                                                icon="mdi:chevron-down"
                                                width={20}
                                                height={20}
                                            />
                                        </Box>

                                        <Grid container spacing={3} className="mt-10">
                                            <Grid item xs={12} md={6}>
                                                <ReviewCard
                                                    title="Insurance"
                                                    titleIcon="tabler:shield-check"
                                                    actionIcon="tabler:edit"
                                                    data={[
                                                        {
                                                            label: "Insurance Type",
                                                            value: reviewData.insurance.type,
                                                        },
                                                        {
                                                            label: "Insurance Provider",
                                                            value: reviewData.insurance.provider,
                                                        },
                                                        {
                                                            label: "Insurance Holder Name",
                                                            value: reviewData.insurance.holder,
                                                        },
                                                        {
                                                            label: "Policy Number",
                                                            value: reviewData.insurance.policyNumber,
                                                        },
                                                    ]}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <DocumentCard
                                                    files={reviewData.insuranceDocuments}
                                                />
                                            </Grid>
                                        </Grid>
                                        </div>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label={
                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                        color: "#667085",
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