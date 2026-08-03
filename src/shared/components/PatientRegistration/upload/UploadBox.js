import React, { useRef, useState } from "react";

/**
 * UploadBox — drag-and-drop / click-to-browse file upload dropzone.
 * Styled to match the rest of the registration form (teal accent, rounded
 * borders). Not yet wired into a step — Health Records is still a
 * placeholder page — but ready to use once that step is built out.
 *
 * Props:
 *   onFilesSelected {fn}       — (File[]) => void
 *   accept          {string}   — input "accept" attribute
 *   multiple        {boolean}  — allow selecting multiple files (default: true)
 *   label           {string}   — primary instruction text
 *   hint            {string}   — secondary helper text (file types / size limit)
 */
const UploadBox = ({
  onFilesSelected,
  accept = ".pdf,.jpg,.jpeg,.png",
  multiple = true,
  label = "Click to upload or drag and drop",
  hint = "PDF, JPG or PNG (max. 10MB each)",
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (files.length) onFilesSelected?.(files);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors duration-150 ${
        isDragging
          ? "border-[#096B58] bg-[#F4FAF7]"
          : "border-[#E5E7EB] bg-[#FBFBFB] hover:border-[#096B58]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <span className="text-xs font-medium text-[#096B58]">{label}</span>
      <span className="text-[11px] font-normal text-[#666666]">{hint}</span>
    </div>
  );
};

export default UploadBox;
