/**
 * fileUtils — small helpers for working with uploaded files. Used by
 * UploadBox / FilePreviewCard and ready for the Health Records Upload step.
 */

/**
 * Formats a byte count as a human-readable size string, e.g. 1536 -> "1.5 KB".
 */
export const formatFileSize = (bytes) => {
  if (bytes === null || bytes === undefined || Number.isNaN(bytes)) return "";
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    units.length - 1,
    Math.floor(Math.log(bytes) / Math.log(1024)),
  );
  const value = bytes / 1024 ** exponent;

  return `${value % 1 === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
};

/**
 * Returns the lowercase file extension (without the dot), or "" if none.
 */
export const getFileExtension = (fileName = "") => {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
};

/**
 * Checks a file's extension against an allow-list (default: common
 * document/image types accepted for health records).
 */
export const isAllowedFileType = (
  fileName,
  allowedExtensions = ["pdf", "jpg", "jpeg", "png"],
) => allowedExtensions.includes(getFileExtension(fileName));

/**
 * Checks a File object is within a maximum size, in MB (default: 10MB).
 */
export const isWithinMaxSize = (file, maxSizeMB = 10) =>
  !!file && file.size <= maxSizeMB * 1024 * 1024;
