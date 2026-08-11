import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Box } from "@mui/material";
import { Icon } from "@iconify/react";
import PasswordDialog from "@/shared/components/Registration/PopUp/password";
import SuccessModal from "@/shared/components/Registration/layout/SuccessModal";
import Sidebar from "../components/SiderBar/SiderBar";
import FormHeader from "../../../../shared/components/Registration/layout/FormHeader";
import Footer from "../../../../shared/components/Registration/layout/Footer";
import SuggestedIdCard from "../../../../shared/components/Registration/form/SuggestedIdCard";
import { createLoginValidation } from "@/shared/validations/patientRegistration/MedicalrecordsValidations";
import { pageContent, idPrefix, statusMessages } from "../../../../shared/constants/PatientRegistration/MedicalRecords/CreateLoginIdconstants";
import { validateId, generateSuggestionsForValue } from "../../../../shared/components/Registration/form/idGenerator";
const CreateLoginId = () => {
  // Suggested IDs
  const [suggestedIds, setSuggestedIds] = useState([]);

  // Selected MediConnect ID
  const [selectedId, setSelectedId] = useState("");

  // Status // checking // success // error
  const [status, setStatus] = useState("");

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  // Generate Initial Suggested IDs
  useEffect(() => {
    setSuggestedIds([]);
    setSelectedId("");
    setStatus("");
  }, []);

  const handleUpload = async () => {
    console.log("Review clicked");
    setPasswordOpen(true);
  };

  const handleSkip = () => {
    console.log("skip btn click");
    navigate("/reviewdetails");
  }

  const handleAutoSave = () => {
    console.log("auto save btn click");
  }

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
        handleChange,
        submitForm,
        validateForm,
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
                      className={` flex items-center w-[350px] h-[40px] rounded-lg border overflow-hidden
                                            bg-white
                                            ${status === "success" ? "border-[#14B8A6]"
                          : status === "error" ? "border-[#EF4444]" : "border-[#D1D5DB]"
                        }
                                        `}
                    >
                      {/* Prefix */}
                      <Box className=" w-[56px]  h-full  flex  items-center justify-center bg-[#2BA39A] " >
                        <span className="text-[14px] font-semibold text-white">
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
                              validateId(`${idPrefix}-${value}`)
                            );
                          } else {
                            setSuggestedIds([]);
                            setStatus("");
                          }
                        }}
                        className=" flex-1 min-w-0  h-full  px-4 text-[14px] text-[#111827] outline-none bg-white "
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
                            className="text-[#14B8A6]"
                          />
                        )}

                        {status === "error" && (
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
                        <p className="text-[13px] text-[#16A34A]">
                          {statusMessages.available(`${idPrefix}-${selectedId}`)}
                        </p>
                      )}

                      {status === "error" && (
                        <p className="text-[13px] text-[#EF4444]">
                          {statusMessages.exists(`${idPrefix}-${selectedId}`)}
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
                        className=" flex items-center gap-2 h-[32px] px-4 rounded-md border border-[#2BA39A]
                                                bg-white text-[#2BA39A] text-[12px] font-medium transition hover:bg-[#ECFEFF]
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
                              setStatus(validateId(id));
                            }}
                          />
                        );
                      })}
                    </Box>
                  </Box>

                  {/* Important To Know */}
                  <Box
                    className=" mt-10 max-w-[480px] rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6  ">
                    <Box className="flex items-start gap-4">
                      {/* Icon */}
                      <Box className=" w-10 h-10 rounded-full bg-[#E6F4F2] flex items-center  justify-center shrink-0">
                        <Icon
                          icon="tabler:lock"
                          width={20}
                          className="text-[#2BA39A]"
                        />
                      </Box>

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
                <Footer  config={{
                            showSkipButton: true,
                            onSkipClick: handleSkip,
                            onAutoSaveClick: handleAutoSave,
                            primaryButtonLabel: "Upload & Continue",
                            onPrimaryClick: () => handleUpload(),
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
                <SuccessModal
                  open={successOpen}
                  handleClose={() => setSuccessOpen(false)}
                />
              </main>
            </div>
          </div>
        )}
    </Formik>
  );
};

export default CreateLoginId;
