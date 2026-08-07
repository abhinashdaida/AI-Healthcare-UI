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

