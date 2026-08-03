import Token from "../../shared/constants/Token";
import { FETCH_AUTH_TOKEN, fetchAuthToken, USER_LAST_INTERACTION } from "../modules/security/securityActions";
import * as securitySelectors from "../modules/security/securitySelectors";


const RETRY_ATTEMPTS = 5;

const token = securitySelectors.getToken(store.getState());
const isFetchingToken = securitySelectors.getIsFetchingToken(store.getState());
const failCounter = securitySelectors.getFailCounter(store.getState());

const isTokenExpiring = (token) => {
  const now = Date.now();
  const curatedExpiryTime =
    token.expiryTime - Token.TOKEN_EXPIRY_CUTOFF;

  // Disregard our initial token fetch actions
  if (token.expiryTime === 0) {
    return false;
  }

  // Token is expired
  if (now >= token.expiryTime) {
    return true;
  }

  // Token will expire shortly
  return now > curatedExpiryTime;
};

const isFetchingTokenFn = ({
  store,
  next,
  isFetchingToken,
  failCounter,
  action,
  token
}) => {
  if (!isFetchingToken) {
    // console.log(
    //   `Token has (or will) expire at ${
    //     moment
    //       .utc(token.expiryTime)
    //       .local()
    //       .format('h:mm:ss A')
    //   }, requesting a new token...`
    // );

    // To stop an infinite loop we should only attempt to retry 5x
    if (failCounter < RETRY_ATTEMPTS) {
      // Token isn't yet refreshing, dispatch FETCH_AUTH_TOKEN
      // and queue the initiating action
      store.dispatch(fetchAuthToken());

      return next({
        ...action,
        type: waitForToken(action)
      });
    }
  } else {
    // Token is refreshing, queue action
    return next({
      ...action,
      type: waitForToken(action)
    });
  }

  return next(action);
};

export default function tokenMiddleware() {
  return (store) => (next) => (action) => {
    if (
      action.type.indexOf(FETCH_AUTH_TOKEN) > -1 ||
      action.type.indexOf(USER_LAST_INTERACTION) > -1
    ) {
      return next(action);
    }

    

    const isExpiring = isTokenExpiring(token);

    if (isExpiring) {
      return isFetchingTokenFn({
        store,
        next,
        isFetchingToken,
        failCounter,
        action,
        token
      });
    }

    return next(action);
  };
}