// ── Action Types ──────────────────────────────────────────────────────────────

// Form Data
export const SET_BASIC_DETAILS = "patientRegistration/SET_BASIC_DETAILS";

export const SET_EMERGENCY_CONTACT = "patientRegistration/SET_EMERGENCY_CONTACT";

export const SET_HEALTH_OVERVIEW = "patientRegistration/SET_HEALTH_OVERVIEW";

export const SET_MEDICAL_CONDITIONS = "patientRegistration/SET_MEDICAL_CONDITIONS";

export const SET_INSURANCE = "patientRegistration/SET_INSURANCE";

export const SET_VERIFY_INFORMATION = "patientRegistration/SET_VERIFY_INFORMATION";

export const SET_CREATE_LOGIN_ID = "patientRegistration/SET_CREATE_LOGIN_ID";


// Sidebar / Step
export const SET_CURRENT_STEP = "patientRegistration/SET_CURRENT_STEP";

export const COMPLETE_STEP = "patientRegistration/COMPLETE_STEP";


// Reset
export const RESET_REGISTRATION = "patientRegistration/RESET_REGISTRATION";


// ── Action Creators ───────────────────────────────────────────────────────────

// Basic Details
export const setBasicDetails = (data) => ({
  type: SET_BASIC_DETAILS,
  payload: data,
});


// Emergency Contact
export const setEmergencyContact = (data) => ({
  type: SET_EMERGENCY_CONTACT,
  payload: data,
});


// Health Overview
export const setHealthOverview = (data) => ({
  type: SET_HEALTH_OVERVIEW,
  payload: data,
});


// Medical Conditions
export const setMedicalConditions = (data) => ({
  type: SET_MEDICAL_CONDITIONS,
  payload: data,
});


// Insurance
export const setInsurance = (data) => ({
  type: SET_INSURANCE,
  payload: data,
});


// Verify Information
export const setVerifyInformation = (data) => ({
  type: SET_VERIFY_INFORMATION,
  payload: data,
});


// Create Login ID
export const setCreateLoginId = (data) => ({
  type: SET_CREATE_LOGIN_ID,
  payload: data,
});


// Current Step
export const setCurrentStep = (step) => ({
  type: SET_CURRENT_STEP,
  payload: step,
});


// Complete Step
export const completeStep = (step) => ({
  type: COMPLETE_STEP,
  payload: step,
});


// Reset Registration
export const resetRegistration = () => ({
  type: RESET_REGISTRATION,
});
