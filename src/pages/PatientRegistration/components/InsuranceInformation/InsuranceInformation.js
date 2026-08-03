import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActionButtons from "@/shared/components/PatientRegistration/common/ActionButtons";
import FormInput from "@/shared/components/PatientRegistration/form/FormInput";
import FormSelect from "@/shared/components/PatientRegistration/form/FormSelect";
import FilePreviewCard from "@/shared/components/PatientRegistration/upload/FilePreviewCard";
import UploadBox from "@/shared/components/PatientRegistration/upload/UploadBox";

import { insuranceTypes } from "@/shared/constants/patientRegistration/registrationConfig";

import {
  formatFileSize,
  isAllowedFileType,
  isWithinMaxSize,
} from "@/shared/utils/PatientRegistration/fileUtils";

import {
  setActiveStep,
  setInsuranceInfo,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";

import { selectInsuranceInfo } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

import insurInfor from "@assets/patientRegistration/insurInfor.svg";

const defaultInsuranceInfo = {
  insuranceType: "",
  policyNumber: "",
  insuranceCards: [],
};

const normalizeInsuranceInfo = (saved) => {
  const insuranceCards = Array.isArray(saved?.insuranceCards)
    ? saved.insuranceCards
    : saved?.insuranceCard
      ? [saved.insuranceCard]
      : [];

  return {
    insuranceType: saved?.insuranceType || "",
    policyNumber: saved?.policyNumber || "",
    insuranceCards: insuranceCards.map((card) => ({
      ...card,
      documentType: card.documentType || card.name || "Uploaded File",
      status: card.status || "uploaded",
      progress: card.progress ?? 100,
    })),
  };
};

const InsuranceInformation = () => {
  const dispatch = useDispatch();
  const savedInsuranceInfo = useSelector(selectInsuranceInfo);

  const [formData, setFormData] = useState(() =>
    normalizeInsuranceInfo(savedInsuranceInfo || defaultInsuranceInfo)
  );

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleSelectChange = (name, value) => {
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const updateCardProgress = (cardId) => {
    const progressSteps = [0, 32, 55, 78, 100];

    progressSteps.forEach((progressValue, index) => {
      window.setTimeout(() => {
        setFormData((previousData) => ({
          ...previousData,
          insuranceCards: previousData.insuranceCards.map((card) => {
            if (card.id !== cardId) return card;

            return {
              ...card,
              progress: progressValue,
              status:
                progressValue === 0
                  ? "queued"
                  : progressValue === 100
                    ? "uploaded"
                    : "uploading",
            };
          }),
        }));
      }, index * 600);
    });
  };

  const handleFilesSelected = (files) => {
    const selectedFiles = Array.from(files || []);

    if (!selectedFiles.length) return;

    const validCards = [];
    const invalidFiles = [];

    selectedFiles.forEach((file, index) => {
      const hasValidType = isAllowedFileType(file.name, [
        "pdf",
        "jpg",
        "jpeg",
        "png",
      ]);

      const hasValidSize = isWithinMaxSize(file, 5);

      if (!hasValidType || !hasValidSize) {
        invalidFiles.push(file);
        return;
      }

      const cardId = `${Date.now()}-${index}-${file.name}`;

      validCards.push({
        id: cardId,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: file.type?.startsWith("image/")
          ? URL.createObjectURL(file)
          : "",
        documentType: file.name,
        status: "queued",
        progress: 0,
        uploadedAt: new Date().toISOString(),
      });
    });

    if (invalidFiles.length > 0) {
      setErrorMessage(
        "Some files were skipped. Please upload only PDF, JPG, JPEG, or PNG files below 5MB."
      );
    } else {
      setErrorMessage("");
    }

    if (!validCards.length) return;

    setFormData((previousData) => ({
      ...previousData,
      insuranceCards: [...previousData.insuranceCards, ...validCards],
    }));

    validCards.forEach((card) => updateCardProgress(card.id));
  };

  const removeInsuranceCard = (cardId) => {
    setFormData((previousData) => ({
      ...previousData,
      insuranceCards: previousData.insuranceCards.filter(
        (card) => card.id !== cardId
      ),
    }));
  };

  const updateInsuranceCardTitle = (cardId, title) => {
    setFormData((previousData) => ({
      ...previousData,
      insuranceCards: previousData.insuranceCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              documentType: title,
            }
          : card
      ),
    }));
  };

  const retryInsuranceCard = (cardId) => {
    setFormData((previousData) => ({
      ...previousData,
      insuranceCards: previousData.insuranceCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              status: "queued",
              progress: 0,
            }
          : card
      ),
    }));

    updateCardProgress(cardId);
  };

  const saveInsuranceInfo = () => {
    dispatch(setInsuranceInfo(formData));
  };

  const handleNext = () => {
    saveInsuranceInfo();
    dispatch(setActiveStep("records"));
  };

  const handleBack = () => {
    saveInsuranceInfo();
    dispatch(setActiveStep("medical"));
  };

  const handleSkip = () => {
    dispatch(setActiveStep("records"));
  };

  const handleSelectBlur = () => {};

  const labelClass = "block mb-2 text-[12px] font-normal text-[#202020]";

  return (
    <div className="px-7 md:px-10 mt-6 md:mt-12 pb-8">
      <div className="max-w-[880px] space-y-8">
        {errorMessage && (
          <div className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-xs font-normal text-[#B91C1C]">
            {errorMessage}
          </div>
        )}

        <div>
          <label className={labelClass}>Insurance Type</label>
          <FormSelect
            name="insuranceType"
            value={formData.insuranceType}
            options={insuranceTypes}
            placeholder="Select insurance type (Optional)"
            searchPlaceholder="Search insurance type"
            icon={insurInfor}
            iconAlt="insurance type"
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
          />
        </div>

        <div>
          <label className={labelClass}>Customer ID / Policy Number</label>
          <FormInput
            name="policyNumber"
            value={formData.policyNumber}
            onChange={handleChange}
            placeholder="Enter Customer ID or Policy Number (Optional)"
            icon={insurInfor}
            iconAlt="policy number"
          />
        </div>

        <div>
          <label className={labelClass}>Upload Insurance Card (Optional)</label>

          <UploadBox
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            label="Drag and drop your insurance card here, or browse"
            hint="JPG, PNG or PDF (Max. 5MB)"
            onFilesSelected={handleFilesSelected}
          />

          <div className="mt-2 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-[11px] font-normal text-[#666666]">
            Make sure the card is clear and all details are visible.
          </div>

          {formData.insuranceCards.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {formData.insuranceCards.map((card) => (
                <FilePreviewCard
                  key={card.id}
                  fileName={card.name}
                  fileSize={formatFileSize(card.size)}
                  fileType={card.type}
                  previewUrl={card.previewUrl}
                  documentType={card.documentType || card.name || "Uploaded File"}
                  status={card.status}
                  progress={card.progress}
                  onCancel={() => removeInsuranceCard(card.id)}
                  onDelete={() => removeInsuranceCard(card.id)}
                  onRemove={() => removeInsuranceCard(card.id)}
                  onRetry={() => retryInsuranceCard(card.id)}
                  onTitleChange={(title) =>
                    updateInsuranceCardTitle(card.id, title)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 md:mt-28 flex items-center justify-between pb-10 md:pb-0">
        <ActionButtons
          skip={{
            label: "Skip for now",
            onClick: handleSkip,
          }}
          back={{
            label: "Go Back",
            onClick: handleBack,
          }}
          next={{
            label: "Upload Health Records",
            onClick: handleNext,
          }}
        />
      </div>
    </div>
  );
};

export default InsuranceInformation;