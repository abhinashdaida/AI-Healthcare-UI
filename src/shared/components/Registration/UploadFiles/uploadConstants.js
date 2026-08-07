export const FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
];

export const MAX_SIZE = 2 * 1024 * 1024;

export const FILE_ERRORS = {
  INVALID_TYPE: {
    title: "Unsupported File Format",
    message: "Please upload a PDF, JPG or PNG file.",
  },
  SIZE: {
    title: "File Size Exceeded",
    message: "Maximum file size is 2MB.",
  },
  DUPLICATE: {
    title: "File Already Uploaded",
    message: "This document has already been uploaded.",
  },
};