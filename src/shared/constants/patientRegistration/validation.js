// ── Field-level validators ─────────────────────────────────────────────────────
// Each returns an error string or "" (no error).

export const validators = {
  fullName: (v) =>
    !v?.trim() ? "Full name is required" : "",

  dob: (v) =>
    !v ? "Date of birth is required" : "",

  gender: (v) =>
    !v ? "Gender is required" : "",

  bloodGroup: (v) =>
    !v ? "Blood group is required" : "",

  state: (v) =>
    !v ? "State is required" : "",

  city: (v) =>
    !v ? "City is required" : "",

  email: (v) => {
    if (!v) return ""; // optional field
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? ""
      : "Enter a valid email address";
  },

  emergencyRelationship: (v) =>
    !v ? "Relationship is required" : "",

  emergencyContact: (v) => {
    if (!v?.trim()) return "Emergency contact is required";
    if (!/^\+?[\d\s\-()]{7,15}$/.test(v.trim()))
      return "Enter a valid phone number";
    return "";
  },

  height: (v) =>
    v !== "" && v !== undefined && isNaN(Number(v))
      ? "Enter a valid height"
      : "",

  weight: (v) =>
    v !== "" && v !== undefined && isNaN(Number(v))
      ? "Enter a valid weight"
      : "",
};

// ── Form-level helpers ─────────────────────────────────────────────────────────

/**
 * Validate all fields in personalInformation step.
 * @param {object} formData
 * @returns {{ [field]: string }} — error map (empty string = valid)
 */
export const validatePersonalInfo = (formData) => ({
  fullName: validators.fullName(formData.fullName),
  dob: validators.dob(formData.dob),
  gender: validators.gender(formData.gender),
  bloodGroup: validators.bloodGroup(formData.bloodGroup),
  state: validators.state(formData.state),
  city: validators.city(formData.city),
  email: validators.email(formData.email),
});

/**
 * Validate required fields in additionalInformation step.
 */
export const validateAdditionalInfo = (formData) => ({
  emergencyRelationship: validators.emergencyRelationship(
    formData.emergencyRelationship
  ),
  emergencyContact: validators.emergencyContact(formData.emergencyContact),
  height: validators.height(formData.height),
  weight: validators.weight(formData.weight),
});

/**
 * Returns true when every value in the error map is "".
 */
export const isValid = (errorMap) =>
  Object.values(errorMap).every((msg) => msg === "");
