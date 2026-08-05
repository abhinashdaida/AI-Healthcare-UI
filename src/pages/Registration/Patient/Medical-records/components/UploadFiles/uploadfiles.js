import { useRef, useState } from "react";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { FILE_ERRORS, FILE_TYPES, MAX_SIZE } from "./uploadConstants";
import WhatToUpload from "../../Insurance/whattoupload";

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
    const inputRef = useRef();

    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenUploadDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenUploadDialog(false);
    };
    const validateFiles = (selectedFiles) => {
        setError(null);

        for (const file of selectedFiles) {
            if (!FILE_TYPES.includes(file.type))
                return setError(FILE_ERRORS.INVALID_TYPE);

            if (file.size > MAX_SIZE)
                return setError(FILE_ERRORS.SIZE);

            if (
                files.some(
                    f => f.name === file.name && f.file.size === file.size
                )
            )
                return setError(FILE_ERRORS.DUPLICATE);
        }

        if (files.length + selectedFiles.length > maxFiles)
            return setError({
                title: "Maximum Files",
                message: `Only ${maxFiles} files allowed.`,
            });

        return true;
    };

    const addFiles = (selectedFiles) => {
        if (!validateFiles(selectedFiles)) return;
        const uploadedFiles = selectedFiles.map(file => ({
            id: crypto.randomUUID(),
            file,
            name: file.name,
            size: Math.round(file.size / 1024),
        }));

        const updatedFiles = [...files, ...uploadedFiles];
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    };



    return (
        <div className="w-full">

            {/* Header */}

            <div className="flex justify-between mb-3">
                <h3 className="font-semibold text-[15px]">
                    {title}
                </h3>
                <div className="flex items-center gap-1">
                    <Icon
                        icon="tabler:info-circle"
                        className="text-[#12A5B5]"
                        width={18}
                    />
                    {title === "Upload Insurance Documents" && (
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={handleOpenDialog}
                        >

                            <span className="text-[#12A5B5] text-[12px] underline hover:text-[#0f8d99]">
                                What to upload?
                            </span>
                        </div>
                    )}
                </div>

            </div>

            {/* Upload */}

            <div
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                    e.preventDefault();
                    addFiles([...e.dataTransfer.files]);
                }}
                className="h-14 border border-dashed rounded-lg flex items-center justify-center text-sm"
            >

                <Icon icon="tabler:cloud-upload" width={20} />

                <span className="ml-2">
                    {uploadText}
                    <button
                        onClick={() => inputRef.current.click()}
                        className="text-[#12A5B5] underline ml-1"
                    >
                        browse
                    </button>

                </span>

                <input
                    hidden
                    multiple
                    ref={inputRef}
                    type="file"
                    onChange={e => addFiles([...e.target.files])}
                />

            </div>

            {/* Bottom */}

            <Stack
                direction="row"
                justifyContent="space-between"
                mt={2}
                mb={3}
            >
                <Typography
                    sx={{
                        fontSize: "12px",
                        color: "#4B5563",
                    }}
                >
                    Files Supported: JPEG, PNG, PDF
                </Typography>

                <Typography
                    sx={{
                        fontSize: "12px",
                        color: "#6B7280",
                        ml: "auto",
                    }}
                >
                    Maximum size: 2MB
                    {maxFiles && ` | Upload up to ${maxFiles} files`}
                </Typography>
            </Stack>
            {/* Error */}

            {error && (
                <div className="flex gap-2 border border-red-300 bg-red-50 rounded-lg p-3 mt-4">
                    <Icon
                        icon="tabler:alert-circle"
                        className="text-red-600 mt-1"
                    />
                    <div>
                        <p className="text-red-700 font-semibold text-sm">
                            {error.title}
                        </p>

                        <p className="text-red-600 text-xs">
                            {error.message}
                        </p>
                    </div>
                </div>
            )}

            {/* Files */}

            <div className="grid md:grid-cols-3 gap-4 mt-4">
                {files.map(file => (
                    <div
                        key={file.id}
                        className="border rounded-lg p-3 flex justify-between"
                    >
                        <div className="flex gap-2">

                            <Icon
                                icon="vscode-icons:file-type-pdf2"
                                width={24}
                            />
                            <div>
                                <p className="text-sm">
                                    {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    PDF • {file.size} KB
                                </p>
                            </div>
                        </div>

                        <Icon
                            icon="mdi:close"
                            className="cursor-pointer"
                            onClick={() => {
                                const updatedFiles = files.filter(f => f.id !== file.id);
                                setFiles(updatedFiles);
                                onFilesChange?.(updatedFiles);
                            }}
                        />
                    </div>
                ))}
            </div>

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
                        className="mt-1 h-4 w-4 accent-[#12A5B5]"
                    />

                    <label
                        htmlFor="confirm"
                        className="text-sm text-[#374151] cursor-pointer"
                    >
                        {confirmationText}
                    </label>
                </div>
            )}

            {/* Security */}

            {showSecurity && files.length === 0 && (
                <div className="mt-5 flex items-center gap-2 bg-cyan-50 rounded-lg p-4">
                    <Icon icon="tabler:lock" />
                    <p className="text-sm text-[#175A5D]">
                        {securityText}
                    </p>
                </div>
            )}
        </div>
    );
}