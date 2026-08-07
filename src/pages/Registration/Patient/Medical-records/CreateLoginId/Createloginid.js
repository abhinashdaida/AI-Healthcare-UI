import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Box } from "@mui/material";
import { Icon } from "@iconify/react";

import Sidebar from "../../components/layout/SiderBar";
import FormHeader from "../../components/layout/FormHeader";
import Footer from "../../components/layout/Footer";
import SuggestedIdCard from "./SuggestedIdCard";
import { createLoginValidation } from "./validation";
import { pageContent, idPrefix, statusMessages } from "./constants";
import { generateId, validateId, generateSuggestionsForValue } from "./idGenerator";

const CreateLoginId = () => {
    // Generate initial default plain ID
    const getInitialId = () => {
        const defaultFullId = generateId(idPrefix).toUpperCase();
        return defaultFullId.replace(`${idPrefix}-`, "");
    };

    const initialId = getInitialId();

    // Suggested IDs
    const [suggestedIds, setSuggestedIds] = useState(() =>
        generateSuggestionsForValue(initialId, idPrefix)
    );

    // Selected MediConnect ID
    const [selectedId, setSelectedId] = useState(initialId);

    // Status // checking // success // error
    const [status, setStatus] = useState(() =>
        validateId(`${idPrefix}-${initialId}`, idPrefix)
    );

    const handleUpload = async (validateForm, submitForm) => {
        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
            console.log("Validation Errors:", errors);
            return;
        }
        submitForm();
    };
 
    const handleSkip = () => {
        console.log("skip btn click");
    };
 
    const handleAutoSave = () => {
        console.log("auto save btn click");
    };

    // Submit
    const handleSubmit = (values) => {
        console.log("Create Login ID");
        console.log(values);
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                mediConnectId: selectedId,
            }}
            validationSchema={createLoginValidation}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched,
                validateForm,
                submitForm,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit: formikSubmit,
            }) => (
                <div className="min-h-screen bg-[#F8FAFC] flex justify-center p-3">
                    <div className="w-full max-w-[1600px] bg-white flex min-h-screen rounded-xl overflow-hidden">
                        <Sidebar />

                        <main className="flex-1 flex flex-col">
                            <FormHeader
                                title={pageContent.pageTitle}
                                subtitle={pageContent.pageSubtitle}
                            />

                            <div className="flex-1 px-10 py-8 overflow-y-auto">
                                {/* Page Heading */}
                                <Box className="mb-8">
                                    <h2 className="text-[24px] font-semibold">
                                        {pageContent.title}
                                    </h2>
                                    <p className="text-[14px]">
                                        {pageContent.subtitle}
                                    </p>
                                </Box>

                                {/* MediConnect ID */}
                                <Box className="mb-10">
                                    <label className="block text-[14px] font-medium text-[#111827] mb-2">
                                        {pageContent.inputLabel}
                                    </label>

                                    <Box
                                        className={`
                                            flex
                                            items-center
                                            w-[350px]
                                            h-[40px]
                                            rounded-lg
                                            border
                                            overflow-hidden
                                            bg-white
                                            ${
                                                status === "success"
                                                    ? "border-[#2BA39A]"
                                                    : ["exists", "invalid-length", "invalid-format"].includes(status)
                                                    ? "border-[#EF4444]"
                                                    : "border-[#D1D5DB]"
                                            }
                                        `}
                                    >
                                        {/* Prefix */}
                                        <Box
                                            className={`
                                                w-[56px]
                                                h-full
                                                flex
                                                items-center
                                                justify-center
                                                transition-all
                                                duration-200
                                                ${
                                                    status === "success"
                                                        ? "bg-[#2BA39A]"
                                                        : ["exists", "invalid-length", "invalid-format"].includes(status)
                                                        ? "bg-[#EF4444]"
                                                        : "bg-[#E5E7EB]"
                                                }
                                            `}
                                        >
                                            <span
                                                className={`
                                                    text-[14px]
                                                    font-semibold
                                                    transition-all
                                                    duration-200
                                                    ${
                                                        status === "success" || ["exists", "invalid-length", "invalid-format"].includes(status)
                                                            ? "text-white"
                                                            : "text-[#374151]"
                                                    }
                                                `}
                                            >
                                                {idPrefix}
                                            </span>
                                        </Box>

                                        {/* Input */}
                                        <input
                                            type="text"
                                            name="mediConnectId"
                                            placeholder="Enter MediConnect ID"
                                            autoComplete="off"
                                            value={values.mediConnectId}
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                                let value = e.target.value;

                                                // Strip prefix if user types or pastes it by mistake
                                                if (value.toUpperCase().startsWith(`${idPrefix}-`)) {
                                                    value = value.substring(idPrefix.length + 1);
                                                }

                                                setFieldValue("mediConnectId", value);
                                                setSelectedId(value);

                                                if (value) {
                                                    // Update suggested IDs dynamically as user types
                                                    const ids = generateSuggestionsForValue(value, idPrefix);
                                                    setSuggestedIds(ids);

                                                    setStatus(
                                                        validateId(`${idPrefix}-${value}`, idPrefix)
                                                    );
                                                } else {
                                                    setSuggestedIds([]);
                                                    setStatus("");
                                                }
                                            }}
                                            className="
                                                flex-1
                                                min-w-0
                                                h-full
                                                px-4
                                                text-[14px]
                                                text-[#111827]
                                                outline-none
                                                bg-white
                                            "
                                        />

                                        {/* Status */}
                                        <Box className="w-[52px] flex justify-center">
                                            {status === "checking" && (
                                                <Icon
                                                    icon="svg-spinners:90-ring-with-bg"
                                                    width={18}
                                                    className="text-[#9CA3AF]"
                                                />
                                            )}

                                            {status === "success" && (
                                                <Icon
                                                    icon="tabler:circle-check-filled"
                                                    width={20}
                                                    className="text-[#2BA39A]"
                                                />
                                            )}

                                            {["exists", "invalid-length", "invalid-format"].includes(status) && (
                                                <Icon
                                                    icon="tabler:circle-x-filled"
                                                    width={20}
                                                    className="text-[#EF4444]"
                                                />
                                            )}
                                        </Box>
                                    </Box>

                                    {/* Message */}
                                    <Box className="mt-2">
                                        {status === "checking" && (
                                            <p className="text-[13px] text-[#6B7280]">
                                                {statusMessages.checking}
                                            </p>
                                        )}

                                        {status === "success" && (
                                            <p className="text-[13px] text-[#2BA39A]">
                                                {statusMessages.available}
                                            </p>
                                        )}

                                        {status === "exists" && (
                                            <p className="text-[13px] text-[#EF4444]">
                                                {statusMessages.exists}
                                            </p>
                                        )}

                                        {status === "invalid-length" && (
                                            <p className="text-[13px] text-[#EF4444]">
                                                MediConnect ID must contain at least 6 characters.
                                            </p>
                                        )}

                                        {status === "invalid-format" && (
                                            <p className="text-[13px] text-[#EF4444]">
                                                Only letters and numbers are allowed.
                                            </p>
                                        )}
                                    </Box>
                                </Box>

                                {/* Suggested IDs */}
                                <Box className="mt-10">
                                    {/* Header */}
                                    <Box className="flex items-start justify-between mb-5">
                                        <Box>
                                            <h3 className="text-[14px] font-semibold text-[#111827] leading-5">
                                                {pageContent.suggestionTitle}
                                            </h3>
                                            <p className="mt-1 text-[11px] text-[#6B7280] leading-4">
                                                {pageContent.suggestionSubtitle}
                                            </p>
                                        </Box>

                                        {/* Generate More */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // Generate more suggestions based on current user input (selectedId)
                                                const ids = generateSuggestionsForValue(selectedId, idPrefix);
                                                setSuggestedIds(ids);
                                            }}
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                h-[32px]
                                                px-4
                                                rounded-md
                                                border
                                                border-[#2BA39A]
                                                bg-white
                                                text-[#2BA39A]
                                                text-[12px]
                                                font-medium
                                                transition
                                                hover:bg-[#ECFEFF]
                                            "
                                        >
                                            <Icon
                                                icon="tabler:refresh"
                                                width={16}
                                            />
                                            {pageContent.generateButton}
                                        </button>
                                    </Box>

                                    {/* Cards */}
                                    <Box className="flex flex-wrap gap-3">
                                        {suggestedIds.map((id) => {
                                            const plainId = id.replace(`${idPrefix}-`, "");

                                            return (
                                                <SuggestedIdCard
                                                    key={id}
                                                    id={id}
                                                    selected={plainId === values.mediConnectId}
                                                    onClick={() => {
                                                        setFieldValue("mediConnectId", plainId);
                                                        setSelectedId(plainId);
                                                        setStatus(validateId(id, idPrefix));
                                                    }}
                                                />
                                            );
                                        })}
                                    </Box>
                                </Box>

                                {/* Important To Know */}
                                <Box
                                    className="
                                        mt-12
                                        mb-10
                                        max-w-[480px]
                                        rounded-2xl
                                        border
                                        border-[#E5E7EB]
                                        bg-[#F9FAFB]
                                        p-6
                                    "
                                >
                                    <Box className="flex items-start gap-3">
                                        {/* Icon */}
                                        <Icon
                                            icon="tabler:lock"
                                            width={20}
                                            className="text-[#4B5563] shrink-0 mt-0.5"
                                        />

                                        {/* Content */}
                                        <Box>
                                            <h3 className="text-[16px] font-semibold text-[#111827]">
                                                {pageContent.infoTitle}
                                            </h3>
                                            <p className="mt-2 text-[13px] leading-6 text-[#4B5563]">
                                                {pageContent.infoDescription}
                                            </p>
                                        </Box>
                                    </Box>
                                </Box>
                            </div>

                            {/* Footer */}
                            <Footer config={{
          showSkipButton: true,
          onSkipClick: handleSkip,
          onAutoSaveClick: handleAutoSave,
          primaryButtonLabel: "Upload & Continue",
          onPrimaryClick: () => handleUpload(validateForm, submitForm),
          primaryButtonDisabled: false,
        }} />
                        </main>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default CreateLoginId;
