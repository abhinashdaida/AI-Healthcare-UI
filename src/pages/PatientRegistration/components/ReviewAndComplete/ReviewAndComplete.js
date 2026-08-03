import AvailableIcon from "@assets/patientRegistration/AvailableIcon.svg";
import CheckCircleIcon from "@assets/patientRegistration/CheckCircleIcon.svg";
import CircleIcon from "@assets/patientRegistration/CircleIcon.svg";
import EyeIcon from "@assets/patientRegistration/eye.svg";
import LockIcon from "@assets/patientRegistration/lock.svg";
import RefreshIcon from "@assets/patientRegistration/refresh.svg";
import TakenIcon from "@assets/patientRegistration/TakenIcon.svg";
import WarningIcon from "@assets/patientRegistration/WarningIcon.svg";
import XCircleIcon from "@assets/patientRegistration/XCircleIcon.svg";
import React, { useState } from "react";

import InfoChip from "@/shared/components/PatientRegistration/common/InfoChip";
import SectionHeader from "@/shared/components/PatientRegistration/common/SectionHeader";
import { setReviewComplete } from "@/state-management/modules/patientRegistration/patientRegistrationActions";
import { selectReviewComplete } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";
import { useDispatch, useSelector } from "react-redux";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const randomSuffix = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return s;
};

const generateSuggestions = (count = 7) =>
  Array.from({ length: count }, () => `PAT-${randomSuffix()}`);

const getStrength = (password) => {
  if (!password)
    return {
      level: 1,
      label: "Weak",
      color: "#F59E0B",
      barW: "w-1/4",
      barColor: "bg-amber-400",
    };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;
  if (score <= 1)
    return {
      level: 1,
      label: "Weak",
      color: "#F59E0B",
      barW: "w-1/4",
      barColor: "bg-amber-400",
    };
  if (score === 2)
    return {
      level: 2,
      label: "Fair",
      color: "#F59E0B",
      barW: "w-2/4",
      barColor: "bg-amber-400",
    };
  if (score === 3)
    return {
      level: 3,
      label: "Good",
      color: "#22C55E",
      barW: "w-3/4",
      barColor: "bg-green-500",
    };
  return {
    level: 4,
    label: "Very Good",
    color: "#096B58",
    barW: "w-full",
    barColor: "bg-[#096B58]",
  };
};

const TAKEN_IDS = new Set(["7G3H81", "AAABBB"]);

// ─── IDDisplay ────────────────────────────────────────────────────────────────
const IDDisplay = ({ idValue, idStatus }) => {
  const chars = (idValue || "7GH381").split("");

  const prefixBg =
    idStatus === "available"
      ? "bg-[#096B58]"
      : idStatus === "taken"
        ? "bg-[#EF4444]"
        : "bg-[#F4F4F4]";

  const prefixText =
    idStatus === "available" || idStatus === "taken"
      ? "text-white"
      : "text-[#141414]";

  return (
    <div className="flex h-11 w-fit overflow-hidden rounded-lg border border-[#D0D0D0]">
      {/* PAT prefix */}
      <div
        className={`${prefixBg} flex w-15 shrink-0 items-center justify-center border-r border-[#D0D0D0] transition-colors duration-200`}
      >
        <span
          className={`${prefixText} font-bold text-xs tracking-wide font-TypeFace`}
        >
          PAT
        </span>
      </div>

      {/* Characters */}
      <div className="flex min-w-45 items-center justify-evenly gap-3 bg-white px-4">
        {chars.map((ch, i) => (
          <span
            key={i}
            className="min-w-3.5 text-center text-xs font-medium text-[#141414] font-TypeFace"
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── IDStatusMessage ──────────────────────────────────────────────────────────
const IDStatusMessage = ({ status, idSuffix }) => {
  if (status === "available")
    return (
      <div className="mt-2 flex items-center gap-1.5">
        <img src={AvailableIcon} alt="" className="h-6 w-6" />
        <span className="text-xs font-normal text-[#096B58] font-TypeFace">
          PAT-{idSuffix} is available
        </span>
      </div>
    );

  if (status === "taken")
    return (
      <div className="mt-2 flex items-center gap-1.5">
        <img src={TakenIcon} alt="" className="h-6 w-6" />
        <span className="text-xs font-normal text-[#EF4444] font-TypeFace">
          This ID is already taken
        </span>
      </div>
    );

  return (
    <div className="mt-2 flex items-center gap-1.5">
      <img src={WarningIcon} alt="" className="h-6 w-6" />
      <span className="text-xs font-normal text-[#666666] font-TypeFace">
        This is auto generated ID, you can select your own ID
      </span>
    </div>
  );
};

// ─── StrengthBar ──────────────────────────────────────────────────────────────
const StrengthBar = ({ password }) => {
  const { label, color, barW, barColor } = getStrength(password);

  return (
    <div className="flex flex-col gap-1">
      {/* Label — occupies space even when empty so layout doesn't shift */}
      <span
        className="text-xs font-medium font-TypeFace h-4.5"
        style={{ color }}
      >
        {label || "​"} {/* zero-width space keeps line height */}
      </span>

      {/* Track — always shown */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E6E6E6]">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barW} ${barColor}`}
        />
      </div>
    </div>
  );
};

// ─── PasswordRequirements ─────────────────────────────────────────────────────
const PasswordRequirements = ({ password }) => {
  const checks = [
    { label: "At least 8 Characters", met: password.length >= 8 },
    { label: "At least one small letter", met: /[a-z]/.test(password) },
    { label: "At least one capital letter", met: /[A-Z]/.test(password) },
    {
      label: "At least one number or symbol",
      met: /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    },
  ];

  const icon = (met) => {
    if (password.length === 0)
      return <img src={CircleIcon} alt="" className="h-4 w-4 shrink-0" />;
    if (met)
      return <img src={CheckCircleIcon} alt="" className="h-4 w-4 shrink-0" />;
    return <img src={XCircleIcon} alt="" className="h-4 w-4 shrink-0" />;
  };

  const textColor = (met) =>
    password.length === 0
      ? "text-[#666666]"
      : met
        ? "text-[#096B58]"
        : "text-[#EF4444]";

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-[#202020] font-TypeFace">
        Should Contain:
      </span>
      {checks.map(({ label, met }) => (
        <div key={label} className="flex items-center gap-2">
          {icon(met)}
          <span
            className={`text-xs font-normal font-TypeFace ${textColor(met)}`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── PasswordInput ────────────────────────────────────────────────────────────
const PasswordInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  showError,
}) => {
  const [visible, setVisible] = useState(false);
  const hasError = showError && error;

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="text-xs font-medium text-[#202020] font-TypeFace"
      >
        {label}
      </label>

      <div className="relative">
        <div
          className={`flex h-12 w-full items-center gap-2 rounded-lg border bg-white px-3.5 box-border
            ${hasError ? "border-[#EF4444]" : "border-[#D0D0D0]"}`}
        >
          {/* Lock — 24×24 */}
          <img
            src={LockIcon}
            alt=""
            className="h-6 w-6 shrink-0"
            style={
              hasError
                ? {
                    filter:
                      "invert(29%) sepia(96%) saturate(1600%) hue-rotate(337deg) brightness(97%) contrast(97%)",
                  }
                : {}
            }
          />

          <input
            id={id}
            type={visible ? "text" : "password"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className="flex-1 border-none bg-transparent text-xs font-normal text-[#141414] outline-none placeholder:text-[#999999] font-TypeFace"
          />

          {/* Eye — 24×24, single asset */}
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className={`flex shrink-0 items-center border-none bg-transparent p-0 cursor-pointer transition-opacity ${visible ? "opacity-100" : "opacity-40"}`}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            <img src={EyeIcon} alt="" className="h-6 w-6" />
          </button>
        </div>

        {hasError && (
          <p className="absolute left-0 top-[calc(100%+4px)] whitespace-nowrap text-[11px] text-[#EF4444] font-TypeFace m-0">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ReviewAndComplete = ({ setActiveStep }) => {
  const dispatch = useDispatch();
  const reviewComplete = useSelector(selectReviewComplete);

  const [suggestions, setSuggestions] = useState(() => generateSuggestions());

  const [touched, setTouched] = useState({ password: false, confirm: false });
  const [confirmError, setConfirmError] = useState("");

  const [idSuffix, setIdSuffix] = useState(
    reviewComplete?.uniqueId
      ? reviewComplete.uniqueId.replace("PAT-", "")
      : "7G3H81",
  );

  const [password, setPassword] = useState(reviewComplete?.password || "");

  const [confirmPassword, setConfirmPassword] = useState(
    reviewComplete?.password || "",
  );
  const [idStatus, setIdStatus] = useState(
    reviewComplete?.uniqueId ? "available" : "default",
  );
  // ── Derived ──────────────────────────────────────────────────────────────────
  const passwordError = !password
    ? "Please enter a password!"
    : getStrength(password).level < 4
      ? "Password is too weak!"
      : "";

  const confirmErr =
    confirmPassword && confirmPassword !== password
      ? "Confirm password should be same as entered password!"
      : "";

  const isFormValid =
    idStatus === "available" &&
    password &&
    getStrength(password).level === 4 &&
    confirmPassword === password;

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleRefresh = () => setSuggestions(generateSuggestions());

  const handleSuggestionSelect = (id) => {
    const suffix = id.replace("PAT-", "");
    setIdSuffix(suffix);
    setIdStatus(TAKEN_IDS.has(suffix.toUpperCase()) ? "taken" : "available");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (touched.confirm && confirmPassword) {
      setConfirmError(
        e.target.value !== confirmPassword
          ? "Confirm password should be same as entered password!"
          : "",
      );
    }
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    if (touched.confirm) {
      setConfirmError(
        e.target.value !== password
          ? "Confirm password should be same as entered password!"
          : "",
      );
    }
  };

  const handleConfirmBlur = () => {
    setTouched((prev) => ({ ...prev, confirm: true }));
    setConfirmError(
      confirmPassword !== password
        ? "Confirm password should be same as entered password!"
        : "",
    );
  };

  const handleCreateProfile = () => {
    if (!isFormValid) return;

    dispatch(
      setReviewComplete({
        uniqueId: `PAT-${idSuffix}`,
        password,
      }),
    );

    setActiveStep("created");
  };

  const handleGoBack = () => setActiveStep("records");

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    // Outer wrapper: relative so footer can be absolute-positioned at bottom
    <div className="relative flex min-h-full w-full flex-col bg-white font-TypeFace">
      {/* ── Scrollable content area — padded bottom so footer never overlaps ── */}
      <div className="flex-1 overflow-y-auto px-7 md:px-10 pt-6 md:pt-12 pb-14 md:pb-18">
        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — Create Your Unique Patient ID
        ══════════════════════════════════════════════════════════════════ */}
        <div>
          <SectionHeader
            size="sm"
            title="Create Your Unique Patient ID"
            description={
              idStatus === "available"
                ? "Your MediConnect ID is a unique username that lets you securely sign in and access appointments, reports, prescriptions, and healthcare services."
                : "This ID will be used to access your health records and services securely"
            }
          />

          {/* ID field */}
          <div>
            <label className="mb-2 block text-xs font-medium text-[#202020] font-TypeFace">
              {idStatus === "available"
                ? "MediConnect ID"
                : "Patient Unique ID"}
            </label>
            <IDDisplay idValue={idSuffix} idStatus={idStatus} />
            <IDStatusMessage status={idStatus} idSuffix={idSuffix} />
          </div>

          {/* Suggestions header */}
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs font-medium text-[#202020] font-TypeFace">
              Suggestions
            </span>
            <button
              type="button"
              onClick={handleRefresh}
              className="flex h-8.5 items-center gap-1.5 rounded-lg border-none bg-[#EEF4F3] px-3 cursor-pointer"
            >
              <img src={RefreshIcon} alt="" className="h-4 w-4" />
              <span className="text-xs font-medium text-[#096B58] font-TypeFace">
                Refresh
              </span>
            </button>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2.5">
            {suggestions.map((s) => (
              <InfoChip key={s} label={s} onSelect={handleSuggestionSelect} />
            ))}
          </div>
        </div>

        {/* ── Divider — 24px gap each side ── */}
        <div className="my-6 h-px bg-[#E5E7EB]" />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — Create a strong password
        ══════════════════════════════════════════════════════════════════ */}
        <div>
          <SectionHeader
            size="sm"
            title="Create a strong password"
            description="Create a strong password with a mix of letters, numbers and symbols"
            descriptionClassName="mb-4 text-xs font-normal leading-relaxed text-[#666666] font-TypeFace"
          />

          {/* Two equal columns — stack on mobile, side-by-side on md+ */}
          <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:gap-6">
            {/* Left: new password + strength bar (always) + requirements */}
            <div className="flex min-w-0 flex-1 flex-col">
              <PasswordInput
                id="new-password"
                label="Create New Password"
                placeholder="Enter your new password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, password: true }))
                }
                error={passwordError}
                showError={touched.password && !password}
              />

              {/* Strength bar — always rendered, empty grey track when no password */}
              <div className="mt-6">
                <StrengthBar password={password} />
              </div>

              {/* Space before requirements */}
              <div className="mt-6">
                <PasswordRequirements password={password} />
              </div>
            </div>

            {/* Right: confirm password */}
            <div className="min-w-0 flex-1">
              <PasswordInput
                id="confirm-password"
                label="Confirm Password"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={handleConfirmChange}
                onBlur={handleConfirmBlur}
                error={confirmErr || confirmError}
                showError={touched.confirm && !!(confirmErr || confirmError)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER — absolute, pinned to bottom of the panel
      ══════════════════════════════════════════════════════════════════ */}
      <div className="mt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-4 px-7 pb-10 md:absolute md:bottom-8 md:left-0 md:right-2 md:pb-0 md:px-10 md:gap-6 md:mt-0">
        {/* Go Back */}
        <button
          type="button"
          onClick={handleGoBack}
          className="h-14 w-full sm:w-auto rounded-lg px-6 text-xs font-medium text-[#096B58] bg-[#F5F5F5] hover:bg-[#EAEAEA] sm:bg-white cursor-pointer transition-colors"
        >
          Go Back
        </button>

        {/* Create Profile */}
        <button
          type="button"
          onClick={handleCreateProfile}
          className={`h-14 w-full sm:w-auto min-w-0 sm:min-w-37 rounded-lg border-none px-7 text-xs font-medium transition-colors duration-200 font-TypeFace
            ${
              isFormValid
                ? "cursor-pointer bg-[#096B58] text-white"
                : "cursor-not-allowed bg-[#F4F4F4] text-[#838383]"
            }`}
        >
          Create Profile
        </button>
      </div>
    </div>
  );
};

export default ReviewAndComplete;
