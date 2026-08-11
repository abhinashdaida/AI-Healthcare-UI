<<<<<<< HEAD
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
=======
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
>>>>>>> 4c1ebc7329f2598a2cf59699920d727022694eb5
export const setBasicDetails = (data) => ({
  type: SET_BASIC_DETAILS,
  payload: data,
});

<<<<<<< HEAD
=======

// Emergency Contact
>>>>>>> 4c1ebc7329f2598a2cf59699920d727022694eb5
export const setEmergencyContact = (data) => ({
  type: SET_EMERGENCY_CONTACT,
  payload: data,
});

<<<<<<< HEAD
=======

// Health Overview
>>>>>>> 4c1ebc7329f2598a2cf59699920d727022694eb5
export const setHealthOverview = (data) => ({
  type: SET_HEALTH_OVERVIEW,
  payload: data,
});

<<<<<<< HEAD
=======

// Medical Conditions
>>>>>>> 4c1ebc7329f2598a2cf59699920d727022694eb5
export const setMedicalConditions = (data) => ({
  type: SET_MEDICAL_CONDITIONS,
  payload: data,
});

<<<<<<< HEAD
=======

// Insurance
>>>>>>> 4c1ebc7329f2598a2cf59699920d727022694eb5
export const setInsurance = (data) => ({
  type: SET_INSURANCE,
  payload: data,
});
<<<<<<< HEAD
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
=======


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
>>>>>>> 4c1ebc7329f2598a2cf59699920d727022694eb5
