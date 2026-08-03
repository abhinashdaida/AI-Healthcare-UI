import { ClipboardList, FileText, FlaskConical, ScanLine } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActionButtons from "@/shared/components/PatientRegistration/common/ActionButtons";
import FilePreviewCard from "@/shared/components/PatientRegistration/upload/FilePreviewCard";
import UploadBox from "@/shared/components/PatientRegistration/upload/UploadBox";

import {
  formatFileSize,
  isAllowedFileType,
  isWithinMaxSize,
} from "@/shared/utils/PatientRegistration/fileUtils";

import {
  setActiveStep,
  setHealthRecords,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";

import { selectHealthRecords } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

const supportedDocuments = [
  {
    label: "Prescription",
    icon: FileText,
  },
  {
    label: "Lab reports",
    icon: FlaskConical,
  },
  {
    label: "Scan",
    icon: ScanLine,
  },
  {
    label: "Discharge summary",
    icon: ClipboardList,
  },
];


const normalizeHealthRecords = (records) => {
  if (!Array.isArray(records)) return [];

  return records.map((record, index) => ({
    ...record,
    documentType: record.documentType || record.name || "Uploaded File",
    status: record.status || "uploaded",
    progress: record.progress ?? 100,
  }));
};

const HealthRecord = () => {
  const dispatch = useDispatch();
  const savedHealthRecords = useSelector(selectHealthRecords);

  const [records, setRecords] = useState(() =>
    normalizeHealthRecords(savedHealthRecords)
  );

  const [errorMessage, setErrorMessage] = useState("");

  const updateRecordProgress = (recordId) => {
    const progressSteps = [0, 32, 55, 78, 100];

    progressSteps.forEach((progressValue, index) => {
      window.setTimeout(() => {
        setRecords((previousRecords) =>
          previousRecords.map((record) => {
            if (record.id !== recordId) return record;

            return {
              ...record,
              progress: progressValue,
              status:
                progressValue === 0
                  ? "queued"
                  : progressValue === 100
                    ? "uploaded"
                    : "uploading",
            };
          })
        );
      }, index * 600);
    });
  };

  const handleFilesSelected = (files) => {
    const selectedFiles = Array.from(files || []);

    if (!selectedFiles.length) return;

    const validRecords = [];
    const invalidFiles = [];

    selectedFiles.forEach((file, index) => {
      const hasValidType = isAllowedFileType(file.name, [
        "pdf",
        "jpg",
        "jpeg",
        "png",
      ]);

      const hasValidSize = isWithinMaxSize(file, 20);

      if (!hasValidType || !hasValidSize) {
        invalidFiles.push(file);
        return;
      }

      const recordId = `${Date.now()}-${index}-${file.name}`;

      validRecords.push({
        id: recordId,
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
        "Some files were skipped. Please upload only PDF, JPG, JPEG, or PNG files below 20MB."
      );
    } else {
      setErrorMessage("");
    }

    if (!validRecords.length) return;

    setRecords((previousRecords) => [...previousRecords, ...validRecords]);

    validRecords.forEach((record) => updateRecordProgress(record.id));
  };

  const removeRecord = (recordId) => {
    setRecords((previousRecords) =>
      previousRecords.filter((record) => record.id !== recordId)
    );
  };

  const updateRecordTitle = (recordId, title) => {
    setRecords((previousRecords) =>
      previousRecords.map((record) =>
        record.id === recordId
          ? {
              ...record,
              documentType: title,
            }
          : record
      )
    );
  };

  const retryRecord = (recordId) => {
    setRecords((previousRecords) =>
      previousRecords.map((record) =>
        record.id === recordId
          ? {
              ...record,
              status: "queued",
              progress: 0,
            }
          : record
      )
    );

    updateRecordProgress(recordId);
  };

  const saveHealthRecords = () => {
    dispatch(setHealthRecords(records));
  };

  const handleNext = () => {
    saveHealthRecords();
    dispatch(setActiveStep("review"));
  };

  const handleBack = () => {
    saveHealthRecords();
    dispatch(setActiveStep("insurance"));
  };

  const handleSkip = () => {
    dispatch(setActiveStep("review"));
  };

  const labelClass = "block mb-2 text-[12px] font-normal text-[#202020]";

  return (
    <div className="px-7 md:px-10 mt-6 md:mt-12 pb-8">
      <div className="max-w-[880px] space-y-8">
        {errorMessage && (
          <div className="rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3 text-xs font-normal text-[#92400E]">
            {errorMessage}
          </div>
        )}

        <div>
          <label className={labelClass}>Upload your health records</label>

          <UploadBox
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            label="Drag and drop your health records here, or browse"
            hint="JPG, PNG or PDF (Max. 20MB)"
            onFilesSelected={handleFilesSelected}
          />
        </div>

        <div>
          <h4 className="mb-3 text-[12px] font-semibold text-[#202020]">
            Supported Documents
          </h4>

          <div className="flex flex-wrap items-center gap-3 md:gap-5">
            {supportedDocuments.map((item) => {
              const IconComponent = item.icon;

              return (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-md bg-white text-[11px] font-normal text-[#666666]"
                >
                  <IconComponent size={15} strokeWidth={1.8} />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>

        {records.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {records.map((record) => (
              <div key={record.id} className="shrink-0">
                <FilePreviewCard
                  fileName={record.name}
                  fileSize={formatFileSize(record.size)}
                  fileType={record.type}
                  previewUrl={record.previewUrl}
                  documentType={record.documentType || record.name || "Uploaded File"}
                  status={record.status}
                  progress={record.progress}
                  onCancel={() => removeRecord(record.id)}
                  onDelete={() => removeRecord(record.id)}
                  onRemove={() => removeRecord(record.id)}
                  onRetry={() => retryRecord(record.id)}
                  onTitleChange={(title) => updateRecordTitle(record.id, title)}
                />
              </div>
            ))}
          </div>
        )}
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
            label: "Create Unique ID",
            onClick: handleNext,
          }}
        />
      </div>
    </div>
  );
};

export default HealthRecord;