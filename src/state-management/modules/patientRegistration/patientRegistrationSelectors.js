// ── Base Selector ──────────────────────────────────────────────────────────────
const selectRoot = (state) =>
  state.patientRegistration;

// ── Sidebar Selectors ─────────────────────────────────────────────────────────
export const selectCurrentStep = (state) =>
  selectRoot(state).currentStep;

export const selectCompletedSteps = (state) =>
  selectRoot(state).completedSteps;

// ── Form Data Selectors ───────────────────────────────────────────────────────
// Basic Details
export const selectBasicDetails = (state) =>
  selectRoot(state).basicDetails;

// Emergency Contact
export const selectEmergencyContact = (state) =>
  selectRoot(state).emergencyContact;

// Health Overview
export const selectHealthOverview = (state) =>
  selectRoot(state).healthOverview;

// Medical Conditions
export const selectMedicalConditions = (state) =>
  selectRoot(state).medicalConditions;

// Insurance
export const selectInsurance = (state) =>
  selectRoot(state).insurance;

// Verify Information
export const selectVerifyInformation = (state) =>
  selectRoot(state).verifyInformation;

// Create Login ID
export const selectCreateLoginId = (state) =>
  selectRoot(state).createLoginId;

// ── Step Completion Selectors ─────────────────────────────────────────────────

// Basic Details → Step 0
export const selectIsBasicDetailsDone = (state) =>
  selectCompletedSteps(state).includes(0);


// Emergency Contact → Step 1
export const selectIsEmergencyContactDone = (state) =>
  selectCompletedSteps(state).includes(1);


// Health Overview → Step 2
export const selectIsHealthOverviewDone = (state) =>
  selectCompletedSteps(state).includes(2);


// Medical Conditions → Step 3
export const selectIsMedicalConditionsDone = (state) =>
  selectCompletedSteps(state).includes(3);


// Insurance → Step 4
export const selectIsInsuranceDone = (state) =>
  selectCompletedSteps(state).includes(4);


// Verify Information → Step 5
export const selectIsVerifyInformationDone = (state) =>
  selectCompletedSteps(state).includes(5);


// Create Login ID → Step 6
export const selectIsCreateLoginIdDone = (state) =>
  selectCompletedSteps(state).includes(6);


// ── Generic Step Selectors ────────────────────────────────────────────────────
export const selectIsStepCompleted =(step) =>
  (state) =>
    selectCompletedSteps(
      state
    ).includes(step);

export const selectIsCurrentStep =
  (step) =>
  (state) =>
    selectCurrentStep(
      state
    ) === step;
