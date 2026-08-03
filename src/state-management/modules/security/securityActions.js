export const DISPATCH_AUTHENTICATE = 'security/DISPATCH_AUTHENTICATE';
export const FETCH_AUTH_TOKEN = 'security/FETCH_AUTH_TOKEN';
export const DISPATCH_LOGOUT = 'security/DISPATCH_LOGOUT';
export const DENY_ACCESS = 'security/DENY_ACCESS';
export const USER_LAST_INTERACTION = 'security/USER_LAST_INTERACTION';


export const dispatchAuthenticate = (username) => ({
  type: DISPATCH_AUTHENTICATE,
  username,
});

export const fetchAuthToken = () => ({
  type: FETCH_AUTH_TOKEN,
  
});

export const dispatchLogout = () => ({
  type: DISPATCH_LOGOUT,
});