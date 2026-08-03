import { all } from "redux-saga/effects";

import { watchLoginSaga } from "./security/securitySagas";

export default function* rootSaga() {
  yield all([
    watchLoginSaga(),
  ]);
}