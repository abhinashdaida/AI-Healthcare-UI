const STORAGE_KEY =
  "patientRegistration";

const DEFAULT_STATE = {
  currentStep: 0,
  completedSteps: [],
  formData: {},
};

// =====================================================
// Load state
// =====================================================

const getInitialState = () => {
  try {
    const savedState =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (savedState) {
      return {
        ...DEFAULT_STATE,
        ...JSON.parse(savedState),
      };
    }
  } catch (error) {
    console.error(
      "Failed to load patient registration state:",
      error
    );
  }

  return DEFAULT_STATE;
};

const initialState =
  getInitialState();

// =====================================================
// Action Types
// =====================================================

const SET_CURRENT_STEP =
  "sidebar/SET_CURRENT_STEP";

const COMPLETE_STEP =
  "sidebar/COMPLETE_STEP";

const SAVE_FORM_DATA =
  "sidebar/SAVE_FORM_DATA";

const RESET_FORM =
  "sidebar/RESET_FORM";

// =====================================================
// Actions
// =====================================================

export const setCurrentStep = (step) => ({
  type: SET_CURRENT_STEP,
  payload: step,
});

export const completeStep = (step) => ({
  type: COMPLETE_STEP,
  payload: step,
});

export const saveFormData = (
  stepName,
  data
) => ({
  type: SAVE_FORM_DATA,

  payload: {
    stepName,
    data,
  },
});

export const resetForm = () => ({
  type: RESET_FORM,
});

// =====================================================
// Save Redux state
// =====================================================

const saveState = (state) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch (error) {
    console.error(
      "Failed to save patient registration state:",
      error
    );
  }
};

// =====================================================
// Reducer
// =====================================================

const sidebarReducer = (
  state = initialState,
  action
) => {
  let newState;

  switch (action.type) {
    // =================================================
    // Current Step
    // =================================================

    case SET_CURRENT_STEP:

      newState = {
        ...state,

        currentStep:
          action.payload,
      };

      saveState(newState);

      return newState;

    // =================================================
    // Complete Step
    // =================================================

    case COMPLETE_STEP:

      newState = {
        ...state,

        currentStep:
          action.payload + 1,

        completedSteps:
          state.completedSteps.includes(
            action.payload
          )
            ? state.completedSteps
            : [
                ...state.completedSteps,
                action.payload,
              ],
      };

      saveState(newState);

      return newState;

    // =================================================
    // Save Form Data
    // =================================================

    case SAVE_FORM_DATA:

      newState = {
        ...state,

        formData: {
          ...state.formData,

          [action.payload.stepName]: {
            ...(
              state.formData[
                action.payload.stepName
              ] || {}
            ),

            ...action.payload.data,
          },
        },
      };

      saveState(newState);

      return newState;

    // =================================================
    // Reset
    // =================================================

    case RESET_FORM:

      localStorage.removeItem(
        STORAGE_KEY
      );

      return {
        ...DEFAULT_STATE,
      };

    default:
      return state;
  }
};

export default sidebarReducer;
