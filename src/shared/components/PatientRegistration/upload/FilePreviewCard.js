import { Pause, Pencil, RotateCcw, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const getFileExtension = (fileName = "") => {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.pop().toUpperCase() : "FILE";
};

const FilePreviewCard = ({
  fileName,
  fileSize,
  fileType = "",
  previewUrl = "",
  progress = 100,
  status = "uploaded", // queued | uploading | uploaded | failed
  documentType = "Title",
  onRemove,
  onCancel,
  onDelete,
  onRetry,
  onTitleChange,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(documentType || "Title");

  useEffect(() => {
    setTitleValue(documentType || "Title");
  }, [documentType]);

  const isImage = previewUrl && fileType?.startsWith("image/");
  const safeProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);

  const handleSaveTitle = () => {
    const finalTitle = titleValue.trim() || "Title";
    setTitleValue(finalTitle);
    if (onTitleChange) {
      onTitleChange(finalTitle);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSaveTitle();
    }

    if (event.key === "Escape") {
      setTitleValue(documentType || "Title");
      setIsEditingTitle(false);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else if (onRemove) {
      onRemove();
    }
  };

  const renderPreview = () => {
    if (isImage) {
      return (
        <img
          src={previewUrl}
          alt={fileName}
          className="h-full w-full object-cover"
        />
      );
    }

    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#F5EDE6]">
        <div className="w-full h-full overflow-hidden">
          <div className="h-full w-full bg-[#F3E6DB] flex items-center justify-center">
            <div className="text-[18px] font-semibold text-[#8A7C70]">
              {getFileExtension(fileName)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTitle = () => {
    if (isEditingTitle) {
      return (
        <input
          value={titleValue}
          onChange={(event) => setTitleValue(event.target.value)}
          onBlur={handleSaveTitle}
          onKeyDown={handleTitleKeyDown}
          autoFocus
          className="h-5 w-full rounded border border-[#D8D8D8] px-1 text-[11px] font-medium text-[#202020] outline-none focus:border-[#096B58]"
        />
      );
    }

    return (
      <div className="flex items-center gap-1">
        <p className="truncate text-[11px] font-medium leading-4 text-[#202020]">
          {titleValue}
        </p>

        <button
          type="button"
          onClick={() => setIsEditingTitle(true)}
          className="shrink-0 text-[#8A8A8A] hover:text-[#096B58]"
          aria-label="Edit title"
        >
          <Pencil size={10} strokeWidth={2} />
        </button>
      </div>
    );
  };

  const renderMeta = () => (
    <p className="mt-0.5 truncate text-[9px] uppercase leading-3 text-[#9A9A9A]">
      {getFileExtension(fileName)} {fileSize ? `• ${fileSize}` : ""}
    </p>
  );

  const renderQueuedState = () => (
    <div className="mt-2 flex items-center justify-between">
      <span className="text-[9px] font-normal text-[#666666]">Queued</span>

      <button
        type="button"
        onClick={onCancel || onRemove}
        className="inline-flex items-center gap-1 rounded border border-[#D8D8D8] bg-white px-2 py-[3px] text-[9px] font-medium text-[#666666] hover:bg-[#F9F9F9]"
      >
        <X size={10} strokeWidth={2.4} />
        Cancel
      </button>
    </div>
  );

  const renderUploadingState = () => (
    <div className="mt-2 flex items-center gap-2">
      <span className="text-[9px] font-normal text-[#666666]">00</span>

      <span className="min-w-[28px] text-[9px] font-normal text-[#666666]">
        {safeProgress}%
      </span>

      <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">
        <div
          className="h-full rounded-full bg-[#0C8A72] transition-all duration-300"
          style={{ width: `${safeProgress}%` }}
        />
      </div>

      <button
        type="button"
        onClick={onCancel || onRemove}
        className="flex h-5 w-5 shrink-0 items-center justify-center text-[#F87171] hover:text-[#EF4444]"
        aria-label="Pause upload"
      >
        <Pause size={12} strokeWidth={2.4} fill="currentColor" />
      </button>
    </div>
  );

  const renderUploadedState = () => (
    <div className="mt-2 flex items-center justify-between">
      <span className="text-[9px] font-normal text-[#666666]">
        Upload Successful
      </span>

      <button
        type="button"
        onClick={handleDelete}
        className="inline-flex items-center gap-1 rounded bg-[#FEF2F2] px-2 py-[3px] text-[9px] font-medium text-[#EF4444] hover:bg-[#FEE2E2]"
      >
        <Trash2 size={10} strokeWidth={2} />
        Delete
      </button>
    </div>
  );

  const renderFailedState = () => (
    <div className="mt-2 flex items-center justify-between">
      <span className="text-[9px] font-normal text-[#666666]">
        Upload Failed
      </span>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-1 rounded bg-[#ECFDF5] px-2 py-[3px] text-[9px] font-medium text-[#0C8A72] hover:bg-[#DDF7ED]"
      >
        <RotateCcw size={10} strokeWidth={2} />
        Retry
      </button>
    </div>
  );

  const renderFooter = () => {
    switch (status) {
      case "queued":
        return renderQueuedState();
      case "uploading":
        return renderUploadingState();
      case "failed":
        return renderFailedState();
      case "uploaded":
      default:
        return renderUploadedState();
    }
  };

  return (
    <div className="w-full max-w-[210px] rounded-[10px] border border-[#E8E8E8] bg-white p-2 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="h-[106px] w-full overflow-hidden rounded-[8px] border border-[#EFEFEF] bg-[#F8F8F8]">
        {renderPreview()}
      </div>

      <div className="mt-2 min-w-0">
        {renderTitle()}
        {renderMeta()}
        {renderFooter()}
      </div>
    </div>
  );
};

export default FilePreviewCard;