import { combineReducers } from "redux";

import secuirityReducer from "./security/securityReducer";

const rootReducer = combineReducers({
  security: secuirityReducer,
});

export default rootReducer;