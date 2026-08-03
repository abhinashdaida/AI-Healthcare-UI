import { failure, pending, success } from './../../reduxPromiseNames.js';
import { DENY_ACCESS, DISPATCH_LOGOUT, FETCH_AUTH_TOKEN, USER_LAST_INTERACTION } from './securityActions.js';


const initialState = {
  user: null,
  isLoading: false,
  isError: null,
  isAuthenticated: true,
  ifFetchingToken: false,
  failCounter: 0,
  isLoggedOut: false,
  usserLastInteractionTime: null,
  token:{
    expiryTime: null,
    headerKey: null,
    token: null,
    tokenPrefix: null,
  },
  userInfo: {
    active: null,
    emailId: null,
    firstName: null,
    lastName: null,
    sorAuthMap:{},
    sorRoleMap:{},
    userId: null,
    lastLoginTime: null,
    previousLoginTime: null,
  }
};

const secuirityReducer = (state = initialState, action) => {

  const { type, payload } = action;
  switch (action.type) {
    case USER_LAST_INTERACTION:
      return {
        ...state,
        userLastInterectedAt: new Date()
      };

    case pending(FETCH_AUTH_TOKEN):
      return {
        ...state,
        isFetchingToken: true
      };

    case success(FETCH_AUTH_TOKEN):
      console.log(
        'Fetched a token with expiry time:',
        moment
          .utc(Date.now() + payload.expiresIn * Token.MS_IN_SEC)
          .local()
          .format('h:mm:ss A')
      );
      return {
        ...state,
        token: {
          expiryTime: Date.now() + payload.expiresIn * Token.MS_IN_SEC,
          headerKey: payload.headerKey,
          token: payload.token,
          tokenPrefix: payload.tokenPrefix
        },
        userInfo: payload.userDetail,
        isAuthenticated: true,
        isLoading: false,
        isFetchingToken: false
      };
  case failure(FETCH_AUTH_TOKEN):
      return {
        ...state,
        isError: true,
        isLoading: false,
        isFetchingToken: false,
        failCounter: state.failCounter + 1
      };
  case DENY_ACCESS:
    return {
      ...state,
      isAuthenticated: false,
      isError: true,
      isLoading: false,
      isFetchingToken: false
    };

  case success(DISPATCH_LOGOUT):
    return {
      ...state,
      isLoggedout: payload
    };

  case failure(DISPATCH_LOGOUT):
    return {
      ...state,
      isLoggedout: false
    };
  default:
      return state;
  }
};

export default secuirityReducer;