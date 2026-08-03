// ── Base Selector ─────────────────────────────────────────────────────────────
const selectRoot = (state) => state.patientRegistration;

// ── Step data selectors ───────────────────────────────────────────────────────
export const selectActiveStep = (state) => selectRoot(state).activeStep;
export const selectPersonalInfo = (state) => selectRoot(state).personalInformation;
export const selectAdditionalInfo = (state) => selectRoot(state).additionalInformation;
export const selectMedicalHistory = (state) => selectRoot(state).medicalHistory;
export const selectInsuranceInfo = (state) => selectRoot(state).insuranceInformation;
export const selectHealthRecords = (state) => selectRoot(state).healthRecords;
export const selectReviewComplete = (state) => selectRoot(state).reviewComplete;

// ── Step completion booleans ──────────────────────────────────────────────────
export const selectIsPersonalDone = (state) => !!selectPersonalInfo(state);
export const selectIsAdditionalDone = (state) => !!selectAdditionalInfo(state);
export const selectIsMedicalDone = (state) => !!selectMedicalHistory(state);
export const selectIsInsuranceDone = (state) => !!selectInsuranceInfo(state);
export const selectIsHealthRecordsDone = (state) => !!selectHealthRecords(state);
export const selectIsReviewDone = (state) => !!selectReviewComplete(state);

// ── Progress percentage ───────────────────────────────────────────────────────
/**
 * Computes the registration completion percentage (10% base + up to 90% across steps).
 * Used by Sidebar, PatientRegistration header, and any progress indicators.
 *
 * Breakdown:
 *   Base               10%
 *   Personal Info   +  20%
 *   Additional Info +  10%
 *   Medical History +  20%
 *   Insurance Info  +  10%
 *   Health Records  +  15%
 *   Review & Done   +  15%
 *   ─────────────────────
 *   Total             100%
 */
export const selectProgress = (state) => {
  const reg = selectRoot(state);
  let progress = 10;

  const personal = reg.personalInformation;
  if (
    personal?.fullName?.trim() &&
    personal?.dob &&
    personal?.gender &&
    personal?.bloodGroup &&
    personal?.state &&
    personal?.city
  ) {
    progress += 20;
  }

  if (
    reg.additionalInformation &&
    Object.values(reg.additionalInformation).every(
      (v) => v !== "" && v !== null && v !== undefined,
    )
  ) {
    progress += 10;
  }

  if (
    reg.medicalHistory &&
    Object.values(reg.medicalHistory).every(
      (v) => v !== "" && v !== null && v !== undefined,
    )
  ) {
    progress += 20;
  }

  if (
    reg.insuranceInformation &&
    Object.values(reg.insuranceInformation).every(
      (v) => v !== "" && v !== null && v !== undefined,
    )
  ) {
    progress += 10;
  }

  if (
    reg.healthRecords &&
    Object.values(reg.healthRecords).every(
      (v) => v !== "" && v !== null && v !== undefined,
    )
  ) {
    progress += 15;
  }

  if (
    reg.reviewComplete &&
    Object.values(reg.reviewComplete).every(
      (v) => v !== "" && v !== null && v !== undefined,
    )
  ) {
    progress += 15;
  }

  return progress;
};
