import React, {
  useEffect,
  useRef,
} from "react";

const OTPInput = ({
  length = 6,
  value = "",
  onChange,
  disabled = false,
  error = false,
  autoFocus = true,
}) => {
  const inputRefs = useRef([]);

  const otpValue = String(value)
    .replace(/\D/g, "")
    .slice(0, length);

  useEffect(() => {
    if (
      autoFocus &&
      !disabled &&
      inputRefs.current[0]
    ) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  const handleChange = (event, index) => {
    const inputValue = event.target.value;

    if (!/^\d*$/.test(inputValue)) {
      return;
    }

    const digit = inputValue.slice(-1);

    const otpArray = otpValue
      .padEnd(length, "")
      .split("");

    otpArray[index] = digit;

    const newValue = otpArray
      .join("")
      .replace(/\s/g, "");

    onChange?.(newValue);

    if (
      digit &&
      index < length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !otpValue[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue =
      event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, length);

    if (!pastedValue) return;

    onChange?.(pastedValue);

    const focusIndex = Math.min(
      pastedValue.length,
      length - 1
    );

    inputRefs.current[
      focusIndex
    ]?.focus();
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map(
        (_, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] =
                element;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otpValue[index] || ""}
            disabled={disabled}
            autoComplete={
              index === 0
                ? "one-time-code"
                : "off"
            }
            onChange={(event) =>
              handleChange(
                event,
                index
              )
            }
            onKeyDown={(event) =>
              handleKeyDown(
                event,
                index
              )
            }
            onPaste={handlePaste}
            className={`h-12 w-10 rounded-lg border bg-white text-center text-lg font-semibold text-gray-900 outline-none transition sm:h-14 sm:w-12 ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-100"
            } ${
              disabled
                ? "cursor-not-allowed bg-gray-100"
                : ""
            }`}
          />
        )
      )}
    </div>
  );
};

export default OTPInput;