import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { validateFiles } from "@/shared/validations/patientRegistration/MedicalrecordsValidations";
import WhatToUpload from "../PopUp/whattoupload";

export default function UploadFiles({
    title = "Upload Files",
    uploadText = "Drag and drop your files here, or",
    maxFiles = null,
    showHelpLink = false,
    showSecurity = false,
    securityText = null,
    showConfirmation = false,
    confirmationText = "",
    onFilesChange,
}) {
    const inputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState([]);
    const [confirmed, setConfirmed] = useState(false);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);

    const handleOpenDialog = () => setOpenUploadDialog(true);
    const handleCloseDialog = () => setOpenUploadDialog(false);


    // Add error without duplicates
    const addError = (error) => {
        setErrors((prev) =>
            prev.some((item) => item.type === error.type)
                ? prev
                : [...prev, error]
        );
    };

    // Remove error
    const removeError = (type) => {
        setErrors((prev) =>
            prev.filter((error) => error.type !== type)
        );
    };

    // Add files
    const addFiles = (selectedFiles) => {
        if (!selectedFiles?.length) return;
        const valid = validateFiles({
            selectedFiles,
            existingFiles: files,
            maxFiles,
        });
        if (!valid) return;
        if (valid.length) {
            setErrors(valid);
            return;
        }
        const uploadedFiles = selectedFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            name: file.name,
            size: Math.round(file.size / 1024),
        }));
        const updatedFiles = [ ...files, ...uploadedFiles,];
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    };

    // Browse upload
    const handleFileChange = (e) => {
        addFiles([...e.target.files]);
        // Allows selecting the same file again
        e.target.value = "";
    };

    // Drag and drop
    const handleDrop = (e) => {
        e.preventDefault();
        addFiles([...e.dataTransfer.files]);
    };

    // Remove file
    const removeFile = (id) => {
        const updatedFiles = files.filter( (file) => file.id !== id );
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex justify-between mb-3">
                <h3 className="font-normal text-[14px]">{title}</h3>
                <div className="flex items-center gap-1">
                    <Icon icon="tabler:info-circle" className="text-[#248B8F]" width={18} />
                    {title === "Upload Insurance Documents" && (
                        <div className="flex items-center gap-1 cursor-pointer"
                            onClick={handleOpenDialog}
                        >
                            <span className="text-[#248B8F] text-[12px] underline">
                                What to upload?
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Area */}
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className=" h-14 border border-[#A3AAB2] border-dashed rounded-lg flex items-center justify-center text-sm " >
                <Icon icon="tabler:cloud-upload" width={20} />

                <span className="ml-2">
                    {uploadText}
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="text-[#248B8F] underline ml-1"
                    >
                        browse
                    </button>
                </span>

                <input
                    hidden
                    multiple
                    ref={inputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                />
            </div>

            {/* File Information */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 3, }}  >
                <Typography sx={{ fontSize: "12px", color: "#4B5563", }} >
                    Files Supported: JPEG, PNG, PDF
                </Typography>

                <Typography sx={{ fontSize: "12px", color: "#6B7280", ml: "auto", }} >
                    Maximum size: 5 MB
                    {maxFiles &&
                        ` | Upload up to ${maxFiles} files`}
                </Typography>
            </Box>

            {/* Errors */}
            {errors.length > 0 && (
                <div className="flex flex-col gap-3 mt-4">
                    {errors.map((error) => (
                        <div key={error.type}
                            className=" flex items-start gap-3 border border-[#F5B7B7] bg-[#FFF5F5] rounded-md px-3  py-3 " >
                            <Icon
                                icon="tabler:alert-triangle"
                                width={18}
                                className="text-[#C53030] mt-[2px] shrink-0"
                            />

                            <div className="flex-1">
                                <p className=" text-[#A52828] font-medium text-[12px] "> {error.title} </p>
                                <p className=" text-[#6B7280] text-[10px] mt-[2px] "> {error.message}  </p>
                            </div>

                            <button type="button"
                                onClick={() => removeError(error.type)}
                                className=" w-5 h-5 rounded bg-[#FECACA] flex items-center justify-center shrink-0 hover:bg-[#FCA5A5] " >
                                <Icon
                                    icon="tabler:x"
                                    width={13}
                                    className="text-[#B91C1C]"
                                />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {files.length > 0 && (
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                    {files.map((file) => {
                        const isPdf = file.file.type === "application/pdf";
                        return (
                            <div key={file.id}
                                className=" border border-[#E6E6E6] rounded-lg  p-3 flex justify-between " >
                                <div className="flex gap-2">
                                    <Icon color="#248B8F"
                                        icon={ isPdf ? "vscode-icons:file-type-pdf2"  : "tabler:photo" }
                                        width={24}
                                    />

                                    <div>
                                        <p className="text-sm">
                                            {file.name}
                                        </p>

                                        <p className=" text-xs text-gray-500 ">
                                            {isPdf ? "PDF" : "Image"}{" "}
                                            • {file.size} KB
                                        </p>
                                    </div>
                                </div>

                                <Icon color="#374151"
                                    icon="mdi:close"
                                    className="cursor-pointer"
                                    onClick={() => removeFile(file.id)}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            <WhatToUpload
                open={openUploadDialog}
                handleClose={handleCloseDialog}
            />

            {showConfirmation && (
                <div className="mt-5 flex items-start gap-2">
                    <input
                        type="checkbox"
                        id="confirm"
                        checked={confirmed}
                        onChange={(e) => setConfirmed(e.target.checked)}
                        className=" mt-1  h-4 w-4 accent-[#12A5B5] " />

                    <label htmlFor="confirm" className=" text-sm text-[#374151] cursor-pointer "  >
                        {confirmationText}
                    </label>
                </div>
            )}

            {showSecurity && files.length === 0 && (
                <div className=" mt-5 flex items-center gap-2 bg-cyan-50 rounded-lg  p-4 ">
                    <Icon icon="tabler:lock" />
                    <p className="text-sm text-[#175A5D]">
                        {securityText}
                    </p>
                </div>
            )}
        </div>
    );
}