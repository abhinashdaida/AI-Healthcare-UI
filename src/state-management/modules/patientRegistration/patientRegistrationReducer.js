

import {
  SET_BASIC_DETAILS,
  SET_EMERGENCY_CONTACT,
  SET_HEALTH_OVERVIEW,
  SET_MEDICAL_CONDITIONS,
  SET_INSURANCE,
  SET_VERIFY_INFORMATION,
  SET_CREATE_LOGIN_ID,
  COMPLETE_STEP,
  RESET_REGISTRATION,
} from "./patientRegistrationActions";

const STORAGE_KEY = "patientRegistration";
const COMPLETED_STEPS_KEY = "patientRegistrationCompletedSteps";

const loadFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    console.error("Failed to load patient registration data:", error);

    return {};
  }
};

const loadCompletedSteps = () => {
  try {
    return JSON.parse(localStorage.getItem(COMPLETED_STEPS_KEY)) || [];
  } catch (error) {
    console.error("Failed to load completed steps:", error);

    return [];
  }
};

const saveFormDataToStorage = (state) => {
  try {
    const { completedSteps, ...formData } = state;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

    localStorage.setItem(COMPLETED_STEPS_KEY, JSON.stringify(completedSteps));
  } catch (error) {
    console.error("Failed to save patient registration:", error);
  }
};

const saved = loadFromStorage();
const savedCompletedSteps = loadCompletedSteps();

const initialState = {
  completedSteps: savedCompletedSteps,
  basicDetails: saved.basicDetails || null,
  emergencyContact: saved.emergencyContact || null,
  healthOverview: saved.healthOverview || null,
  medicalConditions: saved.medicalConditions || null,
  insurance: saved.insurance || null,
  verifyInformation: saved.verifyInformation || null,
  createLoginId: saved.createLoginId || null,
};

const patientRegistrationReducer = (state = initialState, action) => {
  let next;
  switch (action.type) {

    // BASIC DETAILS
    case SET_BASIC_DETAILS:
      next = {
        ...state,
        basicDetails: {
          ...(state.basicDetails || {}),
          ...action.payload,
        },
      };

      saveFormDataToStorage(next);
      return next;

    // EMERGENCY CONTACT
    case SET_EMERGENCY_CONTACT:
      next = {
        ...state,

        emergencyContact: {
          ...(state.emergencyContact || {}),
          ...action.payload,
        },
      };

      saveFormDataToStorage(next);
      return next;

    // HEALTH OVERVIEW
    case SET_HEALTH_OVERVIEW:
      next = {
        ...state,

        healthOverview: {
          ...(state.healthOverview || {}),
          ...action.payload,
        },
      };

      saveFormDataToStorage(next);

      return next;

    // MEDICAL CONDITIONS
    case SET_MEDICAL_CONDITIONS:
      next = {
        ...state,

        medicalConditions: {
          ...(state.medicalConditions || {}),
          ...action.payload,
        },
      };

      saveFormDataToStorage(next);
      return next;

    // INSURANCE
    case SET_INSURANCE:
      next = {
        ...state,

        insurance: {
          ...(state.insurance || {}),
          ...action.payload,
        },
      };

      saveFormDataToStorage(next);

      return next;

    // VERIFY INFORMATION
    case SET_VERIFY_INFORMATION:
      next = {
        ...state,

        verifyInformation: {
          ...(state.verifyInformation || {}),
          ...action.payload,
        },
      };

      saveFormDataToStorage(next);
      return next;

    // CREATE LOGIN ID
    case SET_CREATE_LOGIN_ID:
      next = {
        ...state,

        createLoginId: {
          ...(state.createLoginId || {}),
          ...action.payload,
        },
      };

      saveFormDataToStorage(next);

      return next;

    // COMPLETE STEP

    case COMPLETE_STEP: {
      const step = action.payload;

      if (state.completedSteps.includes(step)) {
        return state;
      }

      next = {
        ...state,

        completedSteps: [...state.completedSteps, step],
      };

      saveFormDataToStorage(next);

      return next;
    }

    // RESET
    // =========================================

    case RESET_REGISTRATION:
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(COMPLETED_STEPS_KEY);

      return {
        completedSteps: [],

        basicDetails: null,
        emergencyContact: null,
        healthOverview: null,
        medicalConditions: null,
        insurance: null,
        verifyInformation: null,
        createLoginId: null,
      };

    default:
      return state;
  }
};

export default patientRegistrationReducer;
