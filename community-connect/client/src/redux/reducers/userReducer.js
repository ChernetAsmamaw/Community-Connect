import {
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_RESET,
  USER_LOAD_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_RESET,
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_RESET,
  USER_SIGNIN_SUCCESS,
} from "../constants/userConstant.js";

/********** Sign in reducer **********/
export const userReducerSignIn = (
  state = { userInfo: null, isAuthenticated: false },
  action
) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true, userInfo: null, isAuthenticated: false };
    case USER_SIGNIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        isAuthenticated: true,
      };
    case USER_SIGNIN_FAIL:
      return {
        loading: false,
        userInfo: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case USER_SIGNIN_RESET:
      return { userInfo: null, isAuthenticated: false };
    default:
      return state;
  }
};

/********** Load user profile reducer **********/
export const userReducerProfile = (state = { user: null }, action) => {
  switch (action.type) {
    case USER_LOAD_REQUEST:
      return { loading: true, user: null };
    case USER_LOAD_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
      };
    case USER_LOAD_FAIL:
      return { loading: false, user: null, error: action.payload };
    case USER_LOAD_RESET:
      return {};
    default:
      return state;
  }
};

/********** Logout user reducer **********/
export const userReducerLogout = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return { loading: true };
    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        signIn: {}, // Reset the signIn state
      };
    case USER_LOGOUT_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT_RESET:
      return {};
    default:
      return state;
  }
};
