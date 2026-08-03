const initialState = {
  role: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_ROLE":
      return {
        ...state,
        role: action.payload,
      };

    default:
      return state;
  }
}

export const getUserRole = (state) => state.auth.role;