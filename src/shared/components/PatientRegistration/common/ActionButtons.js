import React from "react";

/**
 * PrimaryButton — the main green CTA button used across all registration steps.
 * (internal — not exported; only ever used inside ActionButtons)
 */
const PrimaryButton = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}) => (
  <button
    type={type}
    onClick={!disabled ? onClick : undefined}
    disabled={disabled}
    className={`
      h-14 rounded-lg px-6 text-xs font-medium font-TypeFace
      flex items-center justify-center transition-colors duration-150
      w-full sm:w-auto
      ${
        disabled
          ? "bg-[#F4F4F4] text-[#838383] cursor-not-allowed"
          : "bg-[#096B58] text-white cursor-pointer hover:bg-[#074f40]"
      }
      ${className}
    `}
  >
    {children}
  </button>
);

/**
 * SecondaryButton — ghost/subtle button for "Go Back" / "Skip for now".
 * (internal — not exported; only ever used inside ActionButtons)
 */
const SecondaryButton = ({
  children,
  onClick,
  variant = "back",
  type = "button",
  disabled = false,
}) => {
  const variantClass = disabled
    ? "bg-[#F4F4F4] text-[#838383] cursor-not-allowed"
    : variant === "skip"
      ? "bg-[#EEF4F3] text-[#096B58] hover:bg-[#ddf0ec]"
      : "bg-[#F5F5F5] text-[#096B58] hover:bg-[#EAEAEA] sm:bg-white";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={`
        h-14 w-full sm:w-auto rounded-lg px-6 text-xs font-medium font-TypeFace
        transition-colors duration-150
        ${variantClass}
      `}
    >
      {children}
    </button>
  );
};
/**
 * ActionButtons — the Skip / Go Back / Next row shared by every registration
 * step's footer. Each slot is optional so a step can render just a single
 * "Next" CTA (Personal Information) or the full skip + back + next row
 * (Additional Information).
 *
 * Props:
 *   skip {{ label, onClick }}                  — optional "Skip for now" button
 *   back {{ label, onClick }}                  — optional "Go Back" button
 *   next {{ label, onClick, disabled }}        — the primary forward action
 *
 * The wrapping layout (margins, justify-between vs justify-end) is left to
 * the parent step, since spacing differs slightly per step — this component
 * only owns the buttons themselves and their grouping.
 */
const ActionButtons = ({ skip, back, next }) => {
  const nextButton = next && (
    <PrimaryButton onClick={next.onClick} disabled={next.disabled}>
      {next.label}
    </PrimaryButton>
  );

  // Single button (no skip/back) — render with no extra wrapper so the
  // parent's `justify-end` / `justify-between` layout is unaffected.
  if (!skip && !back) {
    return nextButton || null;
  }

  return (
    <>
      {skip && (
        <SecondaryButton
          variant="skip"
          onClick={skip.onClick}
          disabled={skip.disabled}
        >
          {skip.label}
        </SecondaryButton>
      )}

      <div className="flex flex-col-reverse sm:flex-row gap-4 items-stretch sm:items-center">
        {back && (
          <SecondaryButton variant="back" onClick={back.onClick}>
            {back.label}
          </SecondaryButton>
        )}
        {nextButton}
      </div>
    </>
  );
};

export default ActionButtons;