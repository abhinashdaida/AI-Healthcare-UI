import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";

import ActionButtons from "@/shared/components/PatientRegistration/common/ActionButtons";
import RequiredNotice from "@/shared/components/PatientRegistration/common/RequiredNotice";
import FormInput from "@/shared/components/PatientRegistration/form/FormInput";
import FormSelect from "@/shared/components/PatientRegistration/form/FormSelect";
import { bloodGroups, genders, stateCities, states, } from "@/shared/constants/patientRegistration/registrationConfig";
import { setActiveStep, setPersonalInfo, } from "@/state-management/modules/patientRegistration/patientRegistrationActions";
import { selectPersonalInfo } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

import bloodgrp from "@assets/patientRegistration/bloodgrp.svg";
import calender from "@assets/patientRegistration/calender.svg";
import calender1 from "@assets/patientRegistration/calender1.svg";
import dob from "@assets/patientRegistration/dob.svg";
import email from "@assets/patientRegistration/email.svg";
import gender from "@assets/patientRegistration/gender.svg";
import locations from "@assets/patientRegistration/location.svg";
import phone from "@assets/patientRegistration/phone.svg";
import user from "@assets/patientRegistration/user.svg";

// ── Validation ────────────────────────────────────────────────────────────────
const validateField = (name, value) => {
  switch (name) {
    case "fullName":
      return !value?.trim() ? "Please enter your full name!" : "";
    case "dob": {
      if (!value) return "Please select your date of birth.";

      const dob = new Date(value);
      const today = new Date();

      // Remove time portion
      dob.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (dob >= today) {
        return "Date of birth must be before today.";
      }

      return "";
    }
    case "gender":
      return !value ? "Please select your gender!" : "";
    case "bloodGroup":
      return !value ? "Please select your blood group!" : "";
    case "state":
      return !value ? "Please select your state!" : "";
    case "city":
      return !value ? "Please select your current city!" : "";
    case "email": {
      // Optional field
      if (!value.trim()) return "";

      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

      if (!emailRegex.test(value.trim())) {
        return "Please enter a valid email address.";
      }

      return "";
    }
    default:
      return "";
  }
};

const REQUIRED_FIELDS = [
  "fullName",
  "dob",
  "gender",
  "bloodGroup",
  "state",
  "city",
  "email",
];

// ── PersonalInformation ───────────────────────────────────────────────────────
const PersonalInformation = () => {
  const dispatch = useDispatch();
  const saved = useSelector(selectPersonalInfo);

  
  const phoneNumber = useSelector(
      (state) => state.security.phoneNumber
    );

  const [formData, setFormData] = useState(
    saved || {
      fullName: "",
      dob: "",
      phone: phoneNumber,
      email: "",
      gender: "",
      bloodGroup: "",
      state: "",
      city: "",
    },
  );

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const showError = (name) => !!touched[name];

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleChange = (e) => {
  const { name, value } = e.target;

  let updatedValue = value;

  if (name === "email") {
    updatedValue = value.replace(/\s/g, "");
  }

  if (name === "emergencyContact") {
    updatedValue = value.replace(/\D/g, "").slice(0, 10);
  }

  const updated = {
    ...formData,
    [name]: updatedValue,
  };

  setFormData(updated);

  if (touched[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, updatedValue, updated),
    }));
  }
};

  const handleBlur = (name, value) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSelectChange = (name, value) => {
    const updated = {
      ...formData,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    };
    setFormData(updated);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  const handleSelectBlur = (name) => {
    if (!formData[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, formData[name]),
      }));
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────────
  const handleNext = () => {
    const newErrors = {};
    REQUIRED_FIELDS.forEach((f) => {
      newErrors[f] = validateField(f, formData[f]);
    });
    const hasErrors = Object.values(newErrors).some((e) => e !== "");
    if (hasErrors) return;

    dispatch(setPersonalInfo(formData));
    dispatch(setActiveStep("additional"));
  };

  const isFormValid =
    formData.fullName?.trim() &&
    formData.dob &&
    formData.gender &&
    formData.bloodGroup &&
    formData.state &&
    formData.city;

  const labelClass = "block mb-2 text-[12px] font-normal text-[#202020]";

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="px-7 md:px-10 mt-6 md:mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className={labelClass}>
            Full Name <span className="text-[#EF4444]">*</span>
          </label>
          <FormInput
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={(e) => handleBlur("fullName", e.target.value)}
            placeholder="Enter your full name"
            icon={user}
            iconAlt="user"
            error={errors.fullName}
            showError={showError("fullName")}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className={labelClass}>
            Date of Birth <span className="text-[#EF4444]">*</span>
          </label>
          <div className="relative">
            <img
              src={formData.dob ? dob : calender1}
              alt="dob"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 z-10 pointer-events-none"
            />
            <DatePicker
              selected={formData.dob ? new Date(formData.dob) : null}
              maxDate={new Date(Date.now() - 24 * 60 * 60 * 1000)}
              dateFormat="d MMMM yyyy"
              placeholderText="Select date of birth"
              wrapperClassName="w-full"
              popperClassName="dob-datepicker-popper"
              className={`w-full h-10 rounded-lg border border-[#E5E7EB] pl-12 pr-16 text-xs font-normal text-[#141414] outline-none placeholder:text-[#666666] focus:border-[#096B58] transition-colors ${
                showError("dob") && errors.dob ? "border-[#EF4444]" : ""
              }`}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              onChange={(date) => {
                const value = date ? date.toISOString().split("T")[0] : "";

                handleChange({ target: { name: "dob", value } });

                setTouched((prev) => ({ ...prev, dob: true }));

                setErrors((prev) => ({
                  ...prev,
                  dob: validateField("dob", value),
                }));
              }}
              onChangeRaw={(e) => {
                const value = e.target.value;
                const parsed = new Date(value);

                if (!isNaN(parsed.getTime())) {
                  const formatted = parsed.toISOString().split("T")[0];

                  setTouched((prev) => ({ ...prev, dob: true }));

                  setErrors((prev) => ({
                    ...prev,
                    dob: validateField("dob", formatted),
                  }));
                }
              }}
              onCalendarClose={() => {
                if (!formData.dob) {
                  setTouched((prev) => ({ ...prev, dob: true }));
                  setErrors((prev) => ({
                    ...prev,
                    dob: validateField("dob", formData.dob),
                  }));
                }
              }}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none "
            >
              <img src={calender} alt="calendar" className="w-6 h-6" />
            </button>
            {showError("dob") && errors.dob && (
              <p className="absolute left-0 top-[calc(100%+2px)] text-xs text-[#EF4444]">
                {errors.dob}
              </p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className={labelClass}>Phone Number</label>

          <FormInput
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876 543 210"
            icon={phone}
            iconAlt="phone"
            disabled
          />
        </div>

        {/* Email Address */}
        <div>
          <label className={labelClass}>Email Address</label>
          <FormInput
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={(e) => handleBlur("email", e.target.value)}
            placeholder="Enter your email (optional)"
            icon={email}
            iconAlt="email"
            error={errors.email}
            showError={showError("email")}
          />
        </div>

        {/* Gender */}
        <div>
          <label className={labelClass}>
            Gender <span className="text-[#EF4444]">*</span>
          </label>
          <FormSelect
            name="gender"
            value={formData.gender}
            options={genders}
            placeholder="Select your gender"
            searchPlaceholder="Search gender"
            icon={gender}
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
            error={errors.gender}
            showError={showError("gender")}
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className={labelClass}>
            Blood Group <span className="text-[#EF4444]">*</span>
          </label>
          <FormSelect
            name="bloodGroup"
            value={formData.bloodGroup}
            options={bloodGroups}
            placeholder="Select your blood group"
            searchPlaceholder="Search blood group"
            icon={bloodgrp}
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
            error={errors.bloodGroup}
            showError={showError("bloodGroup")}
          />
        </div>

        {/* State */}
        <div>
          <label className={labelClass}>
            State <span className="text-[#EF4444]">*</span>
          </label>
          <FormSelect
            name="state"
            value={formData.state}
            options={states}
            placeholder="Select state"
            searchPlaceholder="Search state"
            icon={locations}
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
            error={errors.state}
            showError={showError("state")}
          />
        </div>

        {/* Current City */}
        <div>
          <label className={labelClass}>
            Current City <span className="text-[#EF4444]">*</span>
          </label>
          <FormSelect
            name="city"
            value={formData.city}
            options={formData.state ? stateCities[formData.state] || [] : []}
            placeholder="Select your current city"
            searchPlaceholder="Search city"
            icon={locations}
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
            error={errors.city}
            showError={showError("city")}
          />
        </div>
      </div>

      <RequiredNotice />

      {/* CTA */}
      <div className="mt-16 md:mt-40 flex justify-end pb-10 md:pb-0">
        <ActionButtons
          next={{
            label: "Add Additional Information",
            onClick: handleNext,
            disabled: !isFormValid,
          }}
        />
      </div>
    </div>
  );
};

export default PersonalInformation;
