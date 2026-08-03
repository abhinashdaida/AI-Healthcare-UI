import { combineReducers } from "redux";

import notificationReducer from "./notification/notificationReducer";
import patientRegistrationReducer from "./patientRegistration/patientRegistrationReducer";
import secuirityReducer from "./security/securityReducer";
import authReducer from "./auth/authReducer";
import registrationReducer from "./registration/registrationReducer";

const rootReducer = combineReducers({
  security: secuirityReducer,
  patientRegistration: patientRegistrationReducer,
  notification: notificationReducer,
  auth: authReducer,
  registration:registrationReducer,
});

export default rootReducer;