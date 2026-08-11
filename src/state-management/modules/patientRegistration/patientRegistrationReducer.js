import {
  SET_BASIC_DETAILS,
  SET_EMERGENCY_CONTACT,
  SET_HEALTH_OVERVIEW,
  SET_MEDICAL_CONDITIONS,
  SET_INSURANCE,
  SET_VERIFY_INFORMATION,
  SET_CREATE_LOGIN_ID,

  SET_CURRENT_STEP,
  COMPLETE_STEP,

  RESET_REGISTRATION,
} from "./patientRegistrationActions";


// ── Storage Keys ──────────────────────────────────────────────────────────────

const STORAGE_KEY = "patientRegistration";
const ACTIVE_STEP_KEY =  "patientRegistrationActiveStep";

// ── Helpers ───────────────────────────────────────────────────────────────────

/* Reads patient registration data from localStorage.*/
const loadFromStorage = () => {
  try {
    return ( JSON.parse( localStorage.getItem( STORAGE_KEY )  ) || {} );
  } catch (error) {
    console.error(
      "Failed to load patient registration data:",
      error
    );

    return {};
  }
};


/*Reads completed steps from localStorage.*/
const loadCompletedSteps = () => {
  try {
    return ( JSON.parse( localStorage.getItem( "patientRegistrationCompletedSteps" ) ) || [] );
  } catch (error) {
    console.error(
      "Failed to load completed steps:",
      error
    );

    return [];
  }
};

/**
 * Saves form data to localStorage.
 * currentStep and completedSteps are kept
 * separately because they are sidebar/UI state.
 */
const saveFormDataToStorage = (state) => {
  try {
    const {
      currentStep,
      completedSteps,
      ...formData
    } = state;

    localStorage.setItem( STORAGE_KEY, JSON.stringify(formData) );
    localStorage.setItem( ACTIVE_STEP_KEY, currentStep );
    localStorage.setItem( "patientRegistrationCompletedSteps", JSON.stringify(completedSteps)  );
  } catch (error) {
    console.error(
      "Failed to save patient registration:",
      error
    );
  }
};


// ── Load Saved Data ───────────────────────────────────────────────────────────
const saved = loadFromStorage();
const savedCompletedSteps = loadCompletedSteps();


// ── Initial State ─────────────────────────────────────────────────────────────

const initialState = {
  // Sidebar
  currentStep:Number(localStorage.getItem(ACTIVE_STEP_KEY)) || 0,

  completedSteps:savedCompletedSteps,

  // Forms
  basicDetails: saved.basicDetails || null,
  emergencyContact: saved.emergencyContact || null,
  healthOverview: saved.healthOverview || null,
  medicalConditions: saved.medicalConditions || null,
  insurance: saved.insurance || null,
  verifyInformation: saved.verifyInformation || null,
  createLoginId: saved.createLoginId || null,
};


// ── Reducer ───────────────────────────────────────────────────────────────────

const patientRegistrationReducer = ( state = initialState, action) => {
  let next;
  switch (action.type) {

    // CURRENT STEP
    case SET_CURRENT_STEP:
      next = {...state, currentStep:action.payload,};
      // Save current sidebar step
      localStorage.setItem( ACTIVE_STEP_KEY, action.payload );
      return next;


    // COMPLETE STEP
    case COMPLETE_STEP: {
      const step = action.payload;
      const nextStep = step + 1;
      const completedSteps =
        state.completedSteps.includes(
          step
        )
          ? state.completedSteps
          : [
              ...state.completedSteps,
              step,
            ];
      next = {
        ...state,
        currentStep:
          nextStep,
        completedSteps,
      };
      saveFormDataToStorage(next);
      return next;
    }


    // BASIC DETAILS
    case SET_BASIC_DETAILS:
      next = { ...state,
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


    // RESET REGISTRATION

    case RESET_REGISTRATION:
      localStorage.removeItem(STORAGE_KEY);

      localStorage.removeItem(ACTIVE_STEP_KEY);

      localStorage.removeItem("patientRegistrationCompletedSteps");

      return {
        currentStep: 0,
        completedSteps: [],
        basicDetails: null,
        emergencyContact: null,
        healthOverview: null,
        medicalConditions: null,
        insurance: null,
        verifyInformation: null,
        createLoginId: null,
      };


    // DEFAULT
    default:
      return state;
  }
};


export default patientRegistrationReducer;
