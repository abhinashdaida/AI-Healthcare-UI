import CreditCardIcon from "@mui/icons-material/CreditCard";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";
import ActionButtons from "../../../../shared/components/PatientRegistration/common/ActionButtons";
import SectionHeader from "../../../../shared/components/PatientRegistration/common/SectionHeader";
import FormInput from "../../../../shared/components/PatientRegistration/form/FormInput";
import FormSelect from "../../../../shared/components/PatientRegistration/form/FormSelect";
import FilePreviewCard from "../../../../shared/components/PatientRegistration/upload/FilePreviewCard";
import UploadBox from "../../../../shared/components/PatientRegistration/upload/UploadBox";
import { insuranceProviders } from "../../../../shared/constants/patientRegistration/registrationConfig";
import {
  isValidFileSize,
  isValidFileType,
} from "../../../../shared/utils/PatientRegistration/fileUtils";

const InsuranceDetails = ({ data, updateData, onNext, onBack, onSkip }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrorMessage("");

    updateData({
      [name]: value,
    });
  };

  const handleInsuranceCardUpload = (files) => {
    const selectedFile = files[0];

    if (!selectedFile) return;

    if (!isValidFileType(selectedFile)) {
      setErrorMessage("Only PDF, JPG, and PNG files are allowed.");
      return;
    }

    if (!isValidFileSize(selectedFile)) {
      setErrorMessage("File size should be below 5MB.");
      return;
    }

    setErrorMessage("");

    updateData({
      insuranceCard: selectedFile,
    });
  };

  const removeInsuranceCard = () => {
    updateData({
      insuranceCard: null,
    });
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <section className="pr-screen">
      <SectionHeader
        title="Insurance Details"
        description="Add your insurance information for seamless coverage and claims processing."
      />

      {errorMessage && (
        <Alert severity="error" className="pr-alert-message">
          {errorMessage}
        </Alert>
      )}

      <FormSelect
        label="Insurance Provider"
        name="provider"
        value={data.provider}
        onChange={handleChange}
        options={insuranceProviders}
        placeholder="Select insurance provider (Optional)"
        icon={<VerifiedUserIcon sx={{ fontSize: 14, color: "#94A3B8" }} />}
      />

      <FormInput
        label="Customer ID / Policy Number"
        name="policyNumber"
        value={data.policyNumber}
        onChange={handleChange}
        placeholder="Enter Customer ID or Policy Number (Optional)"
        icon={<CreditCardIcon sx={{ fontSize: 14, color: "#94A3B8" }} />}
      />

      <div className="pr-insurance-upload-section">
        <label className="pr-form-label">Upload Insurance Card (Optional)</label>

        <UploadBox
          title="Drag and drop your health records here, or"
          browseText="browse"
          supportText="JPG, PNG or PDF (Max. 5MB)"
          multiple={false}
          onFilesSelect={handleInsuranceCardUpload}
        />

        <div className="pr-upload-note">
          <InfoOutlinedIcon sx={{ fontSize: 14 }} />
          <span>Make sure the card is clear and all details are visible</span>
        </div>

        {data.insuranceCard && (
          <div className="pr-insurance-preview-wrap">
            <FilePreviewCard
              file={data.insuranceCard}
              title="Insurance"
              status="Queued"
              showDocumentType={false}
              onRemove={removeInsuranceCard}
            />
          </div>
        )}
      </div>

      <ActionButtons
        onSkip={onSkip}
        onBack={onBack}
        onNext={handleNext}
        nextLabel="Upload Health Records"
      />
    </section>
  );
};

export default InsuranceDetails;