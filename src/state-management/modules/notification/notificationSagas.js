import { takeEvery } from 'redux-saga/effects';
import { SHOW_ERROR, SHOW_NOTIFICATION, SHOW_SUCCESS } from './notificationActions';

// Placeholder for future notification sagas if needed
function* handleShowNotification() {
  // Can add side effects here if needed
}

export default function* notificationSaga() {
  yield takeEvery(SHOW_NOTIFICATION, handleShowNotification);
  yield takeEvery(SHOW_SUCCESS, handleShowNotification);
  yield takeEvery(SHOW_ERROR, handleShowNotification);
}
