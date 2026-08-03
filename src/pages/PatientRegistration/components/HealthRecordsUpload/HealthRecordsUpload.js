import BiotechIcon from "@mui/icons-material/Biotech";
import DescriptionIcon from "@mui/icons-material/Description";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";
import ActionButtons from "../../../../shared/components/PatientRegistration/common/ActionButtons";
import SectionHeader from "../../../../shared/components/PatientRegistration/common/SectionHeader";
import FilePreviewCard from "../../../../shared/components/PatientRegistration/upload/FilePreviewCard";
import UploadBox from "../../../../shared/components/PatientRegistration/upload/UploadBox";
import {
  createFileRecord,
  validateFiles,
} from "../../../../shared/utils/PatientRegistration/fileUtils";

const supportedDocuments = [
  {
    label: "Prescription",
    icon: <DescriptionIcon sx={{ fontSize: 14 }} />,
  },
  {
    label: "Lab reports",
    icon: <BiotechIcon sx={{ fontSize: 14 }} />,
  },
  {
    label: "Scan",
    icon: <DocumentScannerIcon sx={{ fontSize: 14 }} />,
  },
  {
    label: "Discharge summary",
    icon: <InsertDriveFileOutlinedIcon sx={{ fontSize: 14 }} />,
  },
];

const HealthRecordsUpload = ({
  records = [],
  setFormData,
  onBack,
  onSubmit,
  onSkip,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFilesUpload = (files) => {
    const { validFiles, invalidFiles } = validateFiles(files);

    if (invalidFiles.length > 0) {
      setErrorMessage(
        "Some files were skipped. Please upload only PDF, JPG, or PNG files below 5MB."
      );
    } else {
      setErrorMessage("");
    }

    const formattedFiles = validFiles.map((file) =>
      createFileRecord(file, "Prescription")
    );

    if (!formattedFiles.length) return;

    setFormData((previousData) => ({
      ...previousData,
      healthRecords: [...previousData.healthRecords, ...formattedFiles],
    }));
  };

  const removeFile = (fileId) => {
    setFormData((previousData) => ({
      ...previousData,
      healthRecords: previousData.healthRecords.filter(
        (item) => item.id !== fileId
      ),
    }));
  };

  return (
    <section className="pr-screen">
      <SectionHeader
        title="Upload Health Records"
        description="Keep all your medical documents in one secure and convenient place."
      />

      {errorMessage && (
        <Alert severity="warning" className="pr-alert-message">
          {errorMessage}
        </Alert>
      )}

      <div className="pr-health-upload-section">
        <label className="pr-form-label">Upload your health records</label>

        <UploadBox
          title="Drag and drop your health records here, or"
          browseText="browse"
          supportText="JPG, PNG or PDF (Max. 20MB)"
          multiple
          onFilesSelect={handleFilesUpload}
        />
      </div>

      <div className="pr-supported-documents">
        <h4>Supported Documents</h4>

        <div className="pr-supported-documents-list">
          {supportedDocuments.map((item) => (
            <span key={item.label} className="pr-supported-document-item">
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {records.length > 0 && (
        <div className="pr-health-records-scroll">
          <div className="pr-health-records-grid">
            {records.map((item) => (
              <FilePreviewCard
                key={item.id}
                file={item.file}
                title={item.documentType || "Prescription"}
                status="Upload Successful"
                progress={item.progress}
                showProgress
                onRemove={() => removeFile(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      <ActionButtons
        onSkip={onSkip}
        onBack={onBack}
        onNext={onSubmit}
        nextLabel="Create Unique ID"
      />
    </section>
  );
};

export default HealthRecordsUpload;