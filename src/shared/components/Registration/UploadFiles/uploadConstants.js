export const FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "application/pdf",
];

export const MAX_SIZE = 5 * 1024 * 1024; // 2 MB

export const FILE_ERRORS = {
    INVALID_TYPE: {
        type: "INVALID_TYPE",
        title: "Unsupported File Format",
        message: "Please upload a PDF, JPG, or PNG file.",
    },

    SIZE: {
        type: "SIZE",
        title: "File Size Exceeded",
        message: "The selected file exceeds the maximum size limit of 5 MB.",
    },

    CONNECTION: {
        type: "CONNECTION",
        title: "Connection Error",
        message: "Check your internet connection and try again.",
    },

    INVALID_FILE: {
        type: "INVALID_FILE",
        title: "Invalid File",
        message:
            "The selected file cannot be opened. Please choose another file.",
    },

    DUPLICATE: {
        type: "DUPLICATE",
        title: "File Already Uploaded",
        message: "This document has already been uploaded.",
    },

    UPLOAD_FAILED: {
        type: "UPLOAD_FAILED",
        title: "Upload Failed",
        message: "Something went wrong. Please try again.",
    },

    UPLOAD_INTERRUPTED: {
        type: "UPLOAD_INTERRUPTED",
        title: "Upload interrupted",
        message: "The upload was interrupted. Please try again.",
    },

    MAX_FILES: {
        type: "MAX_FILES",
        title: "Maximum Files",
        message: "Maximum number of files exceeded.",
    },
};