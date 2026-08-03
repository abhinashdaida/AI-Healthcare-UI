import {
    CLOSE_NOTIFICATION,
    SHOW_ERROR,
    SHOW_NOTIFICATION,
    SHOW_SUCCESS,
} from './notificationActions';

const initialState = {
  isOpen: false,
  message: '',
  icon: '',
};

const notificationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_NOTIFICATION:
      return {
        isOpen: true,
        message: payload.message,
        icon: payload.icon,
      };

    case SHOW_SUCCESS:
      return {
        isOpen: true,
        message: payload,
        icon: 'IconConfirmation',
      };

    case SHOW_ERROR:
      return {
        isOpen: true,
        message: payload,
        icon: '',
      };

    case CLOSE_NOTIFICATION:
      return {
        isOpen: false,
        message: '',
        icon: '',
      };

    default:
      return state;
  }
};

export default notificationReducer;
