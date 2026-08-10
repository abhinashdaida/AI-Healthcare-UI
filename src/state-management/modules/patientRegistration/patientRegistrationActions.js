// ─=====================Action Types===========================
export const SET_BASIC_DETAILS = "patientRegistration/SET_BASIC_DETAILS";
export const SET_EMERGENCY_CONTACT =
  "patientRegistration/SET_EMERGENCY_CONTACT";
export const SET_HEALTH_OVERVIEW = "patientRegistration/SET_HEALTH_OVERVIEW";
export const SET_MEDICAL_CONDITIONS =
  "patientRegistration/SET_MEDICAL_CONDITIONS";
export const SET_INSURANCE = "patientRegistration/SET_INSURANCE";
export const SET_REVIEW_COMPLETE = "patientRegistration/SET_REVIEW_COMPLETE";
export const SET_ACCOUNT_CREATE = "patientRegistration/SET_ACCOUNT_CREATE";
export const SET_ACTIVE_STEP = "patientRegistration/SET_ACTIVE_STEP";
export const RESET_REGISTRATION = "patientRegistration/RESET_REGISTRATION";

//===============Action Creators====================
export const setBasicDetails = (data) => ({
  type: SET_BASIC_DETAILS,
  payload: data,
});

export const setEmergencyContact = (data) => ({
  type: SET_EMERGENCY_CONTACT,
  payload: data,
});

export const setHealthOverview = (data) => ({
  type: SET_HEALTH_OVERVIEW,
  payload: data,
});

export const setMedicalConditions = (data) => ({
  type: SET_MEDICAL_CONDITIONS,
  payload: data,
});

export const setInsurance = (data) => ({
  type: SET_INSURANCE,
  payload: data,
});
SET_REVIEW_COMPLETE;
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