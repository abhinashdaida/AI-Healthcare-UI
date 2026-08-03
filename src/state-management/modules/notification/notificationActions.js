export const SHOW_NOTIFICATION = 'notification/SHOW_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'notification/CLOSE_NOTIFICATION';
export const SHOW_SUCCESS = 'notification/SHOW_SUCCESS';
export const SHOW_ERROR = 'notification/SHOW_ERROR';

export const showNotification = (message, icon = '') => ({
  type: SHOW_NOTIFICATION,
  payload: { message, icon },
});

export const showSuccess = (message) => ({
  type: SHOW_SUCCESS,
  payload: message,
});

export const showError = (message) => ({
  type: SHOW_ERROR,
  payload: message,
});

export const closeNotification = () => ({
  type: CLOSE_NOTIFICATION,
});
