export const SUCCESS_SUFFIX = "_SUCCESS";
export const FAILURE_SUFFIX = "_FAILURE";   
export const PENDINFG_SUFFIX = "_REQUEST";

export const success = (actionType) => `${actionType}${SUCCESS_SUFFIX}`;
export const failure = (actionType) => `${actionType}${FAILURE_SUFFIX}`;
export const pending = (actionType) => `${actionType}${PENDINFG_SUFFIX}`;

export const original = (actionType) => actionType.replace(`${PENDINFG_SUFFIX}`, "")
.replace().replace(`${SUCCESS_SUFFIX}`, "")
.replace(`${FAILURE_SUFFIX}`, "");
