import { call, put, takeLatest } from "redux-saga/effects";
import { failure, success } from "./../../reduxPromiseNames.js";

import {
  DISPATCH_AUTHENTICATE,
  FETCH_AUTH_TOKEN,
} from "./securityActions";


// import { loginApi } from "./authApi";

function* loginWorker(action) {
    const {payload, apiClientService} = action;

    console.log('apiClientService:', apiClientService);
  try {
    const response = yield call(apiClientService.post, '/users/1', {});

    sessionStorage.setItem(
      "user",
      JSON.stringify(response)
    );

    yield put({type: success(FETCH_AUTH_TOKEN), payload: response});


    
  } catch (error) {
    yield put({type: failure(FETCH_AUTH_TOKEN), payload: error.message});
  }

  yield put({type: FETCH_AUTH_TOKEN});
}

export function* watchLoginSaga() {
  yield takeLatest(DISPATCH_AUTHENTICATE, loginWorker);
}