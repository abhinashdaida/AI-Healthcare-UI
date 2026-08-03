import React from "react";

/**
 * SectionHeader — reusable "title + description" header block.
 *
 * Used in two contexts:
 *   size="lg" — the page-level step header (e.g. "Personal Information")
 *               rendered inside RegistrationShell, with an optional
 *               `rightSlot` for the mobile support icon button.
 *   size="sm" — smaller inline section headers used inside a step's own
 *               content (e.g. the "Create Your Unique Patient ID" /
 *               "Create a strong password" headers in Review & Complete).
 *
 * Props:
 *   title                {string}
 *   description          {string}
 *   size                 {"lg"|"sm"} — default "lg"
 *   rightSlot            {node}      — only used with size="lg"
 *   descriptionClassName {string}    — override for the description's
 *                                      classes (size="sm" only — the two
 *                                      Review & Complete headers use
 *                                      slightly different bottom spacing)
 *   className            {string}    — extra classes on the outer wrapper
 */
const SectionHeader = ({
  title,
  description,
  size = "lg",
  rightSlot,
  descriptionClassName,
  className = "",
}) => {
  if (size === "sm") {
    return (
      <div className={className}>
        <h2 className="mb-1.5 text-base font-semibold text-[#141414] leading-none font-TypeFace">
          {title}
        </h2>
        <p
          className={
            descriptionClassName ||
            "mb-2 text-xs font-normal leading-relaxed text-[#666666] font-TypeFace"
          }
        >
          {description}
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-full md:h-16.5 md:w-82 md:gap-1 ${className}`}>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-[20px] font-semibold leading-7 text-[#000000] md:text-[20px] md:leading-6 md:text-black">
          {title}
        </h1>
        {rightSlot}
      </div>
      <p className="text-[12px] font-normal leading-5 text-[#666666] mt-1.5 md:text-[13px] md:leading-4.75 md:mt-1">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
