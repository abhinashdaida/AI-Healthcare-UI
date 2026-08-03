import { all } from "redux-saga/effects";

import notificationSaga from "./notification/notificationSagas";
import { watchLoginSaga } from "./security/securitySagas";

export default function* rootSaga() {
  yield all([
    watchLoginSaga(),
    notificationSaga(),
  ]);
}