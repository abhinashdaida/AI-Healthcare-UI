import { combineReducers } from "redux";

import secuirityReducer from "./security/securityReducer";
// import sidebarReducer from "./patientRegistration/sidebarReducer";
import patientRegistrationReducer from "./patientRegistration/patientRegistrationReducer";

const rootReducer = combineReducers({
  security: secuirityReducer,
  // patientRegistration: sidebarReducer,
  patientRegistration: patientRegistrationReducer,
});

export default rootReducer;