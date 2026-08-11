import React, { useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";
import { Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import PasswordDialog from "@/shared/components/Registration/PopUp/password";
import SuccessModal from "@/shared/components/Registration/PopUp/SuccessModal";
import Sidebar from "../components/SiderBar/SiderBar";
import FormHeader from "../../../../shared/components/Registration/layout/FormHeader";
import Footer from "../../../../shared/components/Registration/layout/Footer";
import SuggestedIdCard from "../../../../shared/components/Registration/form/SuggestedIdCard";
import { createLoginValidation } from "@/shared/validations/patientRegistration/MedicalrecordsValidations";
import { pageContent, idPrefix, statusMessages, STATUS } from "../../../../shared/constants/PatientRegistration/MedicalRecords/CreateLoginIdconstants";
import { generateId, validateId, generateSuggestionsForValue } from "../../../../shared/components/Registration/form/idGenerator";
import SectionHeader from "@/shared/components/Registration/form/SectionHeader";
import {setCreateLoginId,completeStep} from "@/state-management/modules/patientRegistration/patientRegistrationActions";

const CreateLoginId = () => {
  const dispatch = useDispatch();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

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

  const STATUS_CONFIG = {
    checking: { text: statusMessages.checking, color: "text-[#6B7280]", icon: "svg-spinners:90-ring-with-bg", iconColor: "text-[#9CA3AF]", size: 18 },
    success: { text: statusMessages.available, color: "text-[#2BA39A]", icon: "tabler:circle-check-filled", iconColor: "text-[#2BA39A]", size: 20 },
    exists: { text: statusMessages.exists, color: "text-[#EF4444]", icon: "tabler:circle-x-filled", iconColor: "text-[#EF4444]", size: 20 },
    "invalid-length": { text: "MediConnect ID must contain at least 6 characters.", color: "text-[#EF4444]", icon: "tabler:circle-x-filled", iconColor: "text-[#EF4444]", size: 20 },
    "invalid-format": { text: "Only letters and numbers are allowed.", color: "text-[#EF4444]", icon: "tabler:circle-x-filled", iconColor: "text-[#EF4444]", size: 20 },
  };

  // Selected MediConnect ID
  const [selectedId, setSelectedId] = useState(initialId);

  // Status // checking // success // error
  const [status, setStatus] = useState(() =>
    validateId(`${idPrefix}-${initialId}`, idPrefix)
  );


  const handleUpload = async (values) => {
    console.log("created login id");
    dispatch(setCreateLoginId(values));
    dispatch(completeStep(6));
    setPasswordOpen(true);
  };

  const handleAutoSave = () => {
    console.log("auto save btn click");
  };

  const isError = ["exists", "invalid-length", "invalid-format"].includes(status);
  const currentStatus = STATUS_CONFIG[status];

  const styles =
    status === "success"
      ? STATUS.success
      : isError
        ? STATUS.error
        : STATUS.default;

  const handleIdChange = (e, handleChange, setFieldValue) => {
    handleChange(e);
    let value = e.target.value;
    if (value.toUpperCase().startsWith(`${idPrefix}-`)) {
      value = value.substring(idPrefix.length + 1);
    }
    setFieldValue("mediConnectId", value);
    setSelectedId(value);

    if (!value) {
      setSuggestedIds([]);
      setStatus("");
      return;
    }
    setSuggestedIds(generateSuggestionsForValue(value, idPrefix));
    setStatus(validateId(`${idPrefix}-${value}`, idPrefix));
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{  mediConnectId: selectedId, }}
      validationSchema={createLoginValidation}
      onSubmit={handleUpload}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <div className="min-h-screen bg-[#F8FAFC] flex justify-center p-3">
          <div className="w-full max-w-[1600px] bg-white flex min-h-screen rounded-xl overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col">
              <FormHeader title={pageContent.pageTitle} subtitle={pageContent.pageSubtitle} />

              <div className="flex-1 px-10 py-8 overflow-y-auto">
                {/* Page Heading */}
                <Box className="mb-8 ">
                  <SectionHeader title={pageContent.title} subtitle={pageContent.subtitle} />
                </Box>

                {/* MediConnect ID */}
                <Box className="mb-10">
                  <label className="block text-[14px] font-medium text-[#111827] mb-2">
                    {pageContent.inputLabel}
                  </label>

                  <Box className={` flex items-center w-[350px] h-[40px] rounded-lg border overflow-hidden  bg-white ${styles.border}`}>
                    {/* Prefix */}
                    <Box className={` w-[56px] h-full flex  items-center justify-center transition-all duration-200
                      ${status === "success" ? "bg-[#2BA39A]"
                        : ["exists", "invalid-length", "invalid-format"].includes(status)
                          ? "bg-[#EF4444]" : "bg-[#E5E7EB]"} `} >
                      <span className={` text-[14px] font-semibold transition-all duration-200
                          ${status === "success" || ["exists", "invalid-length", "invalid-format"].includes(status)
                          ? "text-white" : "text-[#374151]"
                        } `} >
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
                      onChange={(e) => handleIdChange(e, handleChange, setFieldValue)}
                      className=" flex-1 min-w-0 h-full px-4 text-[14px] text-[#111827] outline-none  bg-white" />

                    {/* Status */}
                    <Box className="w-[52px] flex justify-center">
                      {currentStatus?.icon && <Icon icon={currentStatus.icon} width={currentStatus.size} className={currentStatus.iconColor} />}
                    </Box>
                  </Box>

                  <Box className="mt-2">
                    {currentStatus?.text && <p className={`text-[13px] ${currentStatus.color}`}>{currentStatus.text}</p>}
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
                      className=" flex items-center gap-2 h-[32px] px-4 rounded-md 
                      border border-[#2BA39A] bg-white text-[#2BA39A] text-[12px] font-medium transition hover:bg-[#ECFEFF] " >
                      <Icon icon="tabler:refresh" width={16} />
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
                <Box className=" mt-12 mb-10 max-w-[480px] rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 ">
                  <Box className="flex items-start gap-3">
                    {/* Icon */}
                    <Icon icon="tabler:lock" width={20} className="text-[#4B5563] shrink-0 mt-0.5" />
                    {/* Content */}
                    <Box>
                      <h3 className="text-[16px] font-semibold text-[#111827]"> {pageContent.infoTitle} </h3>
                      <p className="mt-2 text-[13px] leading-6 text-[#4B5563]"> {pageContent.infoDescription}  </p>
                    </Box>
                  </Box>
                </Box>
              </div>

              {/* Footer */}
              <Footer config={{
                showSkipButton: false,
                
                onAutoSaveClick: handleAutoSave,
                primaryButtonLabel: "Set Password",
                onPrimaryClick: () => handleUpload(values),
                primaryButtonDisabled: false,
              }} />
              <PasswordDialog
                open={passwordOpen}
                handleClose={() => setPasswordOpen(false)}
                onSuccess={() => {
                  setPasswordOpen(false);
                  setSuccessOpen(true);
                }}
              />
              <SuccessModal open={successOpen} handleClose={() => setSuccessOpen(false)} />
            </main>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default CreateLoginId;