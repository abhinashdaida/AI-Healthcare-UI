import { Formik } from "formik";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { insuranceValidation } from "@/shared/validations/patientRegistration/MedicalrecordsValidations";
import { Icon } from "@iconify/react";
import Footer from "../../../../shared/components/Registration/layout/Footer";
import Sidebar from "../components/SiderBar/SiderBar";
import FormHeader from "../../../../shared/components/Registration/layout/FormHeader";
import UploadFiles from "../../../../shared/components/Registration/UploadFiles/uploadfiles";
import ReusableInput from "@/shared/components/Registration/form/FormInput";
import ReusableSelect from "@/shared/components/Registration/form/FormSelectInput";
import SectionHeader from "@/shared/components/Registration/form/SectionHeader";
import { useLocation, useNavigate } from "react-router-dom";
import {  governmentProviders, privateProviders, } from "../../../../shared/constants/PatientRegistration/MedicalRecords/Insuranceconstants";
import { setInsurance, completeStep, } from "@/state-management/modules/patientRegistration/patientRegistrationActions";

// Insurance
const Insurance = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    // Form States
    const [confirmed, setConfirmed] = useState(false);
    const [showUploadSuccess, setShowUploadSuccess] = useState(false);
    // Get previously saved insurance data from Redux
    const savedData = useSelector( (state) => state.patientRegistration.insurance );
    // Upload Success Message
    useEffect(() => {
        if (location.state?.medicalFileUploaded) {
            setShowUploadSuccess(true);
            const timer = setTimeout(() => {
                setShowUploadSuccess(false);
                navigate(location.pathname, {
                    replace: true,
                    state: null,
                });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [location, navigate]);
    // Submit
    const handleUpload = async (values) => {
        dispatch(setInsurance(values));
        dispatch(completeStep(4));
        console.log("reviewdetails");
        if (location.state?.fromReview) {
        navigate("/reviewdetails", {
            replace: true,
        });
        return;
    }
        // Show success message when documents are uploaded
        if (values.files && values.files.length > 0) {
            setShowUploadSuccess(true);
            setTimeout(() => {
                setShowUploadSuccess(false);
                navigate("/reviewdetails");
            }, 2000);
            return;
        }
        // Navigate directly when no document is uploaded
        navigate("/reviewdetails");
    };
    // Skip
    const handleSkip = () => {
        console.log("skip btn click");
        navigate("/reviewdetails");
    };
    // Auto Save
    const handleAutoSave = () => {
        console.log("auto save btn click");
    };
    // Initial Form Values
    const initialValues = {
        insuranceType: savedData?.insuranceType || "",
        schemeProvider: savedData?.schemeProvider || "",
        holderName: savedData?.holderName || "",
        customerId: savedData?.customerId || "",
        files: savedData?.files || [],
    };
    // Check whether Insurance Form is Complete
    const isInsuranceComplete = (values) => {
        if (!values.insuranceType) {
            return false;
        }
        if (values.insuranceType === "No Insurance") {
            return true;
        }
        return Boolean(
            values.schemeProvider &&
            values.holderName?.trim() &&
            values.customerId?.trim() &&
            values.files?.length > 0 &&
            confirmed
        );
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={insuranceValidation}
            onSubmit={handleUpload}
        >
            {({ values, setFieldValue }) => (
                <div className="min-h-screen bg-[#F5F7F8]">
                    {/* Sidebar */}
                    <div className="w-full md:w-[280px] lg:w-[300px]">
                        <Sidebar />
                    </div>
                    {/* Right Content */}
                    <main className="ml-[336px] max-lg:ml-[280px] max-md:ml-0 min-h-screen flex flex-col bg-white">
                        {/* Header */}
                        <FormHeader
                            title="Medical Records"
                            subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
                        />
                        {/* Content */}
                        <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 pt-[180px] sm:pt-[150px] md:pt-[120px] pb-[250px] sm:pb-[180px] md:pb-[150px] overflow-y-auto">
                            {/* Section Header */}
                            <Box className="w-full max-w-[1104px] pt-4 md:pt-6 flex flex-col gap-2">
                                <SectionHeader
                                    title="Insurance"
                                    subtitle="Add your insurance information for seamless coverage and claims processing."
                                />
                            </Box>
                            {/* Insurance Fields */}
                            <Box className="pt-6 md:pt-8 lg:pt-10 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 w-full max-w-[1104px]">
                                {/* Insurance Type */}
                                <div className="col-span-1 w-full">
                                    <ReusableSelect
                                        label="Insurance Type"
                                        name="insuranceType"
                                        onChange={() => { setFieldValue("schemeProvider", ""); }}
                                        placeholder="Select your Insurance Type"
                                        startIcon="tabler:building-bank"
                                        endIcon="tabler:circle-chevron-down"
                                        options={[
                                            {label: "Government", value: "Government",},
                                            { label: "Private", value: "Private",},
                                            {label: "No Insurance", value: "No Insurance", },
                                        ]}
                                    />
                                </div>
                                {/* Empty Space */}
                                {!values.insuranceType && <div></div>}

                                {values.insuranceType &&
                                    values.insuranceType !== "No Insurance" && (
                                        <>
                                            {/* Scheme Provider */}
                                            <div className="w-full">
                                                <ReusableSelect
                                                    required
                                                    label={
                                                        values.insuranceType === "Private"
                                                            ? "Insurance Provider" : "Government Scheme Provider"
                                                    }
                                                    name="schemeProvider"
                                                    placeholder={
                                                        values.insuranceType === "Private"
                                                            ? "Select Insurance Provider" : "Select Government Scheme"
                                                    }
                                                    startIcon="tabler:shield-plus"
                                                    endIcon="tabler:circle-chevron-down"
                                                    options={ values.insuranceType === "Private" ? privateProviders : governmentProviders  }
                                                />
                                            </div>
                                            {/* Insurance Holder Name */}
                                            <div className="w-full">
                                                <ReusableInput
                                                    required
                                                    label="Insurance Holder Name"
                                                    name="holderName"
                                                    placeholder="Enter holder name"
                                                    startIcon="tabler:user"
                                                />
                                            </div>
                                            {/* Customer ID */}
                                            <div className="w-full">
                                                <ReusableInput
                                                    required
                                                    label="Customer ID / Policy Number"
                                                    name="customerId"
                                                    placeholder="Enter policy number"
                                                    startIcon="tabler:credit-card"
                                                />
                                            </div>
                                        </>
                                    )}
                            </Box>
                            {/* Upload Insurance Documents */}
                            {values.insuranceType &&
                                values.insuranceType !== "No Insurance" && (
                                    <Box className="pt-6 md:pt-8 lg:pt-10 mt-6 md:mt-8 w-full max-w-[1104px]">
                                        <UploadFiles
                                            required
                                            title="Upload Insurance Documents"
                                            uploadText="Drag and drop your insurance card here, or"
                                            maxFiles={2}
                                            initialFiles={values.files}
                                            showHelpLink={true}
                                            showConfirmation={true}
                                            onConfirmationChange={setConfirmed}
                                            confirmationText="I confirm that the insurance information provided is accurate and I authorize it to be used for updating my health records."
                                            onFilesChange={(files) =>setFieldValue("files", files) }
                                        />
                                        {/* Security Information */}
                                        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-cyan-50 rounded-lg p-4">
                                            <Icon icon="tabler:lock" />
                                            <p className="text-xs md:text-sm text-[#175A5D]">
                                                Your insurance information will only be used to verify coverage and support healthcare services.
                                            </p>
                                        </div>
                                    </Box>
                                )}
                        </div>

                        {/* Upload Success Message */}
                        {showUploadSuccess && (
                            <Box className="fixed right-9 bottom-[100px] z-50 w-full max-w-[416px] min-h-[85px] rounded-lg border border-[0.5px] border-[#9FDAD8] bg-[#F5FCFC] shadow-md p-[16px] flex items-start gap-[8px]">
                                {/* Success Icon */}
                                <Box className="w-[24px] h-[24px] bg-[#175A5D] flex items-center justify-center flex-shrink-0">
                                    <Icon icon="tabler:check" width={16} height={16} className="text-[#F5F5F5]" />
                                </Box>

                                {/* Success Message */}
                                <Box className="flex-1 w-full gap-[2px] max-w-[320px]">
                                    <p className="text-xs text-[14px] font-semibold text-[#175A5D] leading-5">
                                        File uploaded successfully
                                    </p>
                                    <p className="text-[12px] font-normal text-[#111827] leading-4">
                                        Your document has been uploaded successfully and added to your health records.
                                    </p>
                                </Box>

                                {/* Close Success Message */}
                                <button
                                    type="button"
                                    onClick={() => setShowUploadSuccess(false)}
                                    className="w-[24px] h-[24px] bg-[#E3F6F5] flex items-center justify-center flex-shrink-0"
                                >
                                    <Icon icon="tabler:letter-x" width={16} height={16} className="text-[#175A5D]" />
                                </button>
                            </Box>
                        )}
                        {/* Footer */}
                        <Footer
                            config={{
                                showSkipButton: true,
                                onSkipClick: handleSkip,
                                onAutoSaveClick: handleAutoSave,
                                primaryButtonLabel: "Review Details",
                                onPrimaryClick: () => handleUpload(values),
                                primaryButtonDisabled:!isInsuranceComplete(values),
                                skipButtonDisabled: true,
                            }}
                        />
                    </main>
                </div>
            )}
        </Formik>
    );
};

export default Insurance;