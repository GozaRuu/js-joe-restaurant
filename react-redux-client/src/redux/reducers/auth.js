import * as actionTypes from "../actionTypes";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage.
//TODO: check if token is expired

export const auth = (
  state = {
    isLoading: false,
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
    user: localStorage.getItem("creds")
      ? JSON.parse(localStorage.getItem("creds"))
      : null,
    errMess: null
  },
  action
) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: action.creds
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: "",
        token: action.token
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message
      };
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: "",
        user: null
      };
    default:
      return state;
  }
};
