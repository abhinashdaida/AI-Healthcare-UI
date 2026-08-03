import {
  RESET_REGISTRATION,
  SET_ACTIVE_STEP,
  SET_ADDITIONAL_INFO,
  SET_HEALTH_RECORDS,
  SET_INSURANCE_INFO,
  SET_MEDICAL_HISTORY,
  SET_PERSONAL_INFO,
  SET_REVIEW_COMPLETE,
} from "./patientRegistrationActions";

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Reads the full saved patient info object from localStorage.
 * Used once on app boot to hydrate the Redux store.
 */
const loadFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("patientInformation")) || {};
  } catch {
    return {};
  }
};

/**
 * Persists the full registration state object back to localStorage
 * whenever a step is saved.
 */
const saveToStorage = (state) => {
  const { activeStep, ...data } = state; // exclude UI-only state from storage
  localStorage.setItem("patientInformation", JSON.stringify(data));
  localStorage.setItem("patientActiveStep", activeStep);
};

// ── Initial State (hydrated from localStorage on first load) ──────────────────
const saved = loadFromStorage();

const initialState = {
  activeStep: localStorage.getItem("patientActiveStep") || "personal",

  personalInformation: saved.personalInformation || null,
  additionalInformation: saved.additionalInformation || null,
  medicalHistory: saved.medicalHistory || null,
  insuranceInformation: saved.insuranceInformation || null,
  healthRecords: saved.healthRecords || null,
  reviewComplete: saved.reviewComplete || null,
};

// ── Reducer ───────────────────────────────────────────────────────────────────
const patientRegistrationReducer = (state = initialState, action) => {
  let next;

  switch (action.type) {
    case SET_ACTIVE_STEP:
      next = { ...state, activeStep: action.payload };
      localStorage.setItem("patientActiveStep", action.payload);
      return next;

    case SET_PERSONAL_INFO:
      next = { ...state, personalInformation: action.payload };
      saveToStorage(next);
      return next;

    case SET_ADDITIONAL_INFO:
      next = { ...state, additionalInformation: action.payload };
      saveToStorage(next);
      return next;

    case SET_MEDICAL_HISTORY:
      next = { ...state, medicalHistory: action.payload };
      saveToStorage(next);
      return next;

    case SET_INSURANCE_INFO:
      next = { ...state, insuranceInformation: action.payload };
      saveToStorage(next);
      return next;

    case SET_HEALTH_RECORDS:
      next = { ...state, healthRecords: action.payload };
      saveToStorage(next);
      return next;

    case SET_REVIEW_COMPLETE:
      next = { ...state, reviewComplete: action.payload };
      saveToStorage(next);
      return next;

    case RESET_REGISTRATION:
  localStorage.removeItem("patientInformation");
  localStorage.removeItem("patientActiveStep");

  return {
    activeStep: "personal",
    personalInformation: null,
    additionalInformation: null,
    medicalHistory: null,
    insuranceInformation: null,
    healthRecords: null,
    reviewComplete: null,
  };

    default:
      return state;
  }
};

export default patientRegistrationReducer;
