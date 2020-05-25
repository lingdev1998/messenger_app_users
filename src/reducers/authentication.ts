import axios from "axios";

import { REQUEST, SUCCESS, FAILURE } from "../utils/action-type.util";
import { AUTH_TOKEN_KEY } from "../config/constants";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const ACTION_TYPES = {
  LOGIN: "authentication/LOGIN",
  GET_SESSION: "authentication/GET_SESSION",
  LOGOUT: "authentication/LOGOUT",
  CLEAR_AUTH: "authentication/CLEAR_AUTH",
  ERROR_MESSAGE: "authentication/ERROR_MESSAGE",
  LOCALSTORAGE_SUCCESS: "authentication/LOCALSTORAGE_SUCCESS",
  LOCALSTORAGE_FAILURE: "authentication/LOCALSTORAGE_FAILURE"
};

const initialState = {
  loading: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  isAuthenticated: false,
  isAdmin: false,
  user: {} as any,
  errorMessage: "" as string, // Errors returned from server side
  successMessage: "" as string,
  redirectMessage: "" as string,
  sessionHasBeenFetched: false,
  result: false
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (
  state: AuthenticationState = initialState,
  action
): AuthenticationState => {
  switch (action.type) {
    // REQUESTz
    case REQUEST(ACTION_TYPES.LOGIN):
    case REQUEST(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.response.data.message
      };
    case FAILURE(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      const token = action.payload.data.jwt;
      console.log("Token: ",token);
      if (token) {
        const jwt = token;
        localStorage.setItem(AUTH_TOKEN_KEY, jwt);
      }
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      };
    case SUCCESS(ACTION_TYPES.GET_SESSION): {
      const isAuthenticated = action.payload && action.payload.data;
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        user: action.payload.data
      };
    }
    // No axios
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        isAuthenticated: false,
        loading: false
      };
    case ACTION_TYPES.LOCALSTORAGE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      };
    case ACTION_TYPES.LOCALSTORAGE_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};

// Login - Get User Token
export const loginUser = userData => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: axios.post("/authentication/login", userData),
    meta: {
      successMessage: "Login success"
    }
  });
};

export const checkAuthTokenLocalStorage = () => dispatch => {
  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    dispatch({
      type: ACTION_TYPES.LOCALSTORAGE_SUCCESS
    });
  } else {
    dispatch({
      type: ACTION_TYPES.LOCALSTORAGE_FAILURE
    });
  }
};

export const clearAuthToken = () => {
  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export const logout = () => dispatch => {
  clearAuthToken();
  dispatch({
    type: ACTION_TYPES.LOGOUT
  });
};
