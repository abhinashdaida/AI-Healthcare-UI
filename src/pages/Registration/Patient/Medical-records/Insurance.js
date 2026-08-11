import { Formik } from "formik";
import { Box } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
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
import { governmentProviders, privateProviders } from "../../../../shared/constants/PatientRegistration/MedicalRecords/Insuranceconstants";
import {setInsurance,completeStep} from "@/state-management/modules/patientRegistration/patientRegistrationActions";

const Insurance = () => {
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const location = useLocation();
    const [showUploadSuccess, setShowUploadSuccess] = useState(false);

    useEffect(() => {
        if (location.state?.medicalFileUploaded) {
            setShowUploadSuccess(true);
            const timer = setTimeout(() => {
                setShowUploadSuccess(false);
                navigate(location.pathname, {
                    replace: true,
                    state: null,
                });

            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [location, navigate]);

    const handleUpload = async (values) => {
        
        dispatch(setInsurance(values));
        dispatch(completeStep(4));
        
        console.log("reviewdetails");
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

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={insuranceValidation}
            onSubmit={handleUpload}
        >
            {({
                values,
                setFieldValue,
                
            }) => (
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
                                    <SectionHeader title="Insurance" subtitle="Add your insurance information for seamless coverage and claims processing." />
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

                                    {values.insuranceType && values.insuranceType !== "None" && (
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

                                {values.insuranceType && values.insuranceType !== "None" && (
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
                            {showUploadSuccess && (
                                <Box className=" fixed right-9 bottom-[100px] z-50
                                              w-full max-w-[416px]
                                            min-h-[85px]
                                            rounded-lg
                                            border
                                            border-[0.5px] border-teal-200
                                            bg-teal-0
                                            shadow-md
                                            p-[16px]
                                            flex
                                            items-start
                                            gap-[8px]
                                        " >
                                    <Box className=" w-[24px] h-[24px] bg-[#175A5D] flex items-center justify-center flex-shrink-0 ">
                                        <Icon
                                            icon="tabler:check"
                                            width={16} height={16}
                                            className="text-[#F5F5F5]"
                                        />
                                    </Box>

                                    <Box className="flex-1 w-full gap-[2px] max-w-[320px] ">
                                        <p className="text-xs text-[14px] font-semibold text-[#175A5D] leading-5">
                                            File uploaded successfully
                                        </p>
                                        <p className=" text-[12px] font-normal text-400 text-[#111827] leading-4 ">
                                            Your document has been uploaded successfully and added to your health records.
                                        </p>
                                    </Box>
                                    <button
                                        type="button"
                                        onClick={() => setShowUploadSuccess(false)} className=" w-[24px] h-[24px] bg-[#E3F6F5]  flex items-center justify-center flex-shrink-0 " >
                                        <Icon
                                            icon="tabler:letter-x"
                                            width={16} height={16}
                                            className="text-[#175A5D]"
                                        />
                                    </button>
                                </Box>
                            )}
                            
                            <Footer config={{
                                showSkipButton: true,
                                onSkipClick: handleSkip,
                                onAutoSaveClick: handleAutoSave,
                                primaryButtonLabel: "Review Details",
                                onPrimaryClick: ()=> handleUpload(values),
                                primaryButtonDisabled: false,
                                skipButtonDisabled: values.insuranceType === "None",
                            }} />
                        </main>
                    </div>
                </div >
            )}
        </Formik >
    );
};

export default Insurance;