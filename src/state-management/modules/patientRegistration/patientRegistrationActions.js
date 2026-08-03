// ── Action Types ──────────────────────────────────────────────────────────────
export const SET_PERSONAL_INFO = "patientRegistration/SET_PERSONAL_INFO";
export const SET_ADDITIONAL_INFO = "patientRegistration/SET_ADDITIONAL_INFO";
export const SET_MEDICAL_HISTORY = "patientRegistration/SET_MEDICAL_HISTORY";
export const SET_INSURANCE_INFO = "patientRegistration/SET_INSURANCE_INFO";
export const SET_HEALTH_RECORDS = "patientRegistration/SET_HEALTH_RECORDS";
export const SET_REVIEW_COMPLETE = "patientRegistration/SET_REVIEW_COMPLETE";
export const SET_ACTIVE_STEP = "patientRegistration/SET_ACTIVE_STEP";
export const RESET_REGISTRATION = "patientRegistration/RESET_REGISTRATION";

// ── Action Creators ───────────────────────────────────────────────────────────

export const setPersonalInfo = (data) => ({
  type: SET_PERSONAL_INFO,
  payload: data,
});

export const setAdditionalInfo = (data) => ({
  type: SET_ADDITIONAL_INFO,
  payload: data,
});

export const setMedicalHistory = (data) => ({
  type: SET_MEDICAL_HISTORY,
  payload: data,
});

export const setInsuranceInfo = (data) => ({
  type: SET_INSURANCE_INFO,
  payload: data,
});

export const setHealthRecords = (data) => ({
  type: SET_HEALTH_RECORDS,
  payload: data,
});

export const setReviewComplete = (data) => ({
  type: SET_REVIEW_COMPLETE,
  payload: data,
});

export const setActiveStep = (step) => ({
  type: SET_ACTIVE_STEP,
  payload: step,
});

export const resetRegistration = () => ({
  type: RESET_REGISTRATION,
});
